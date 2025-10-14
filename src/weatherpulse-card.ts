import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { WeatherPulseCardConfig, WeatherData } from './types';
import {
  getTemperatureGradient,
  getGreeting,
  getWeatherSuggestion,
  formatTime,
  formatDate,
  getDayName,
  getWeatherIcon
} from './utils';
import { getAnimatedWeatherIcon } from './icons';

// Import the editor
import './editor';

// Define the card in the customElements registry
@customElement('weatherpulse-card')
export class WeatherPulseCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: WeatherPulseCardConfig;
  @state() private currentTime: string = formatTime();
  @state() private currentDate: string = formatDate();
  @state() private forecastData: any[] = [];

  private timeInterval?: number;
  private forecastUpdateInterval?: number;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./editor');
    return document.createElement('weatherpulse-card-editor') as LovelaceCardEditor;
  }

  public static getStubConfig(): WeatherPulseCardConfig {
    return {
      type: 'custom:weatherpulse-card',
      entity: 'weather.home',
      header_mode: 'time-focused',
      show_date: true,
      show_time: true,
      forecast_days: 5,
      view_mode: 'standard',
      animate_icons: true,
      data_rows: ['temperature', 'precipitation', 'wind']
    };
  }

  public setConfig(config: WeatherPulseCardConfig): void {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }

    this.config = {
      header_mode: 'time-focused',
      show_date: true,
      show_time: true,
      forecast_days: 5,
      view_mode: 'standard',
      animate_icons: true,
      data_rows: ['temperature', 'precipitation'],
      show_forecast: true,
      temp_display_mode: 'forecast',
      ...config
    };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.startClock();
    this.fetchForecast();
    // Update forecast every 30 minutes
    this.forecastUpdateInterval = window.setInterval(() => this.fetchForecast(), 30 * 60 * 1000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stopClock();
    if (this.forecastUpdateInterval) {
      clearInterval(this.forecastUpdateInterval);
    }
  }

  private startClock(): void {
    this.updateTime();
    this.timeInterval = window.setInterval(() => this.updateTime(), 1000);
  }

  private stopClock(): void {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  private updateTime(): void {
    this.currentTime = formatTime();
    this.currentDate = formatDate();
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('config')) {
      return true;
    }

    if (changedProps.has('hass')) {
      const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
      if (oldHass) {
        return oldHass.states[this.config.entity] !== this.hass.states[this.config.entity];
      }
      return true;
    }

    return true;
  }

  private async fetchForecast(): Promise<void> {
    if (!this.hass || !this.config?.entity) {
      return;
    }

    try {
      // Try to get forecast using the weather.get_forecasts service (HA 2023.9+)
      console.log('Attempting to fetch forecast for:', this.config.entity);

      // Call service with return_response in the service data
      const serviceData = {
        entity_id: this.config.entity,
        type: 'daily',
      };

      const response = await this.hass.callService(
        'weather',
        'get_forecasts',
        serviceData,
        true // returnResponse parameter
      );

      console.log('Forecast service response:', response);

      // Type the response properly
      const forecastResponse = response as any;
      if (forecastResponse && forecastResponse[this.config.entity]?.forecast) {
        this.forecastData = forecastResponse[this.config.entity].forecast;
        console.log('✅ Forecast fetched via service:', this.forecastData.length, 'days');
      } else {
        console.log('⚠️ No forecast in service response, trying legacy method');
        // Fallback to legacy forecast from attributes
        const entity = this.hass.states[this.config.entity];
        if (entity?.attributes?.forecast) {
          this.forecastData = entity.attributes.forecast;
          console.log('✅ Forecast from attributes (legacy):', this.forecastData.length, 'days');
        } else {
          console.log('❌ No forecast data available from entity');
        }
      }
    } catch (error) {
      console.log('❌ Weather service call failed:', error);
      // Fallback to legacy forecast from attributes
      const entity = this.hass.states[this.config.entity];
      if (entity?.attributes?.forecast) {
        this.forecastData = entity.attributes.forecast;
        console.log('✅ Forecast from attributes (legacy fallback):', this.forecastData.length, 'days');
      } else {
        console.log('❌ No forecast data available');
      }
    }
  }

  private getWeatherData(): WeatherData {
    const entity = this.hass.states[this.config.entity];
    if (!entity) {
      return {};
    }

    // Use fetched forecast data or fall back to entity attributes
    let forecast = this.forecastData.length > 0 ? this.forecastData : (entity.attributes.forecast || []);

    // Log for debugging
    console.log('Weather entity:', entity.entity_id);
    console.log('Weather attributes:', entity.attributes);
    console.log('Forecast data:', forecast);

    return {
      temperature: entity.attributes.temperature,
      temperature_unit: entity.attributes.temperature_unit || '°F',
      humidity: entity.attributes.humidity,
      pressure: entity.attributes.pressure,
      wind_speed: entity.attributes.wind_speed,
      wind_bearing: entity.attributes.wind_bearing,
      condition: entity.state,
      forecast: forecast
    };
  }

  private getCurrentTemp(): number {
    if (this.config.outdoor_temp_sensor) {
      const sensorEntity = this.hass.states[this.config.outdoor_temp_sensor];
      if (sensorEntity) {
        return parseFloat(sensorEntity.state);
      }
    }

    const weatherData = this.getWeatherData();
    return weatherData.temperature || 70;
  }

  private renderHeader(): unknown {
    const weatherData = this.getWeatherData();
    const currentTemp = this.getCurrentTemp();
    const gradient = getTemperatureGradient(currentTemp, weatherData.temperature_unit);

    const headerMode = this.config.header_mode || 'time-focused';

    let headerContent;

    switch (headerMode) {
      case 'greeting':
        headerContent = html`
          <div class="greeting-header">
            <div class="weather-icon ${getWeatherIcon(weatherData.condition || 'clear')}">
              ${this.renderWeatherIcon(weatherData.condition || 'clear')}
            </div>
            <div class="greeting-content">
              <div class="greeting-text">
                ${getGreeting(this.config.greeting_name, weatherData.condition, currentTemp)}
              </div>
              <div class="suggestion-text">
                ${getWeatherSuggestion(weatherData.condition, currentTemp)}
              </div>
              ${this.config.show_time ? html`<div class="time-small">${this.currentTime}</div>` : ''}
              ${this.config.show_date ? html`<div class="date-small">${this.currentDate}</div>` : ''}
              <div class="temp-display">${Math.round(currentTemp)}${weatherData.temperature_unit}</div>
            </div>
          </div>
        `;
        break;

      case 'minimal':
        headerContent = html`
          <div class="minimal-header">
            <div class="weather-icon ${getWeatherIcon(weatherData.condition || 'clear')}">
              ${this.renderWeatherIcon(weatherData.condition || 'clear')}
            </div>
            <div class="temp-display">${Math.round(currentTemp)}${weatherData.temperature_unit}</div>
          </div>
        `;
        break;

      case 'date-focused':
        headerContent = html`
          <div class="datetime-header">
            <div class="weather-icon ${getWeatherIcon(weatherData.condition || 'clear')}">
              ${this.renderWeatherIcon(weatherData.condition || 'clear')}
            </div>
            <div class="datetime-content">
              <div class="date-large">${this.currentDate}</div>
              ${this.config.show_time ? html`<div class="time-small">${this.currentTime}</div>` : ''}
              <div class="temp-display">${Math.round(currentTemp)}${weatherData.temperature_unit}</div>
            </div>
          </div>
        `;
        break;

      case 'balanced':
        headerContent = html`
          <div class="datetime-header balanced">
            <div class="weather-icon ${getWeatherIcon(weatherData.condition || 'clear')}">
              ${this.renderWeatherIcon(weatherData.condition || 'clear')}
            </div>
            <div class="datetime-content">
              ${this.config.show_time ? html`<div class="time-medium">${this.currentTime}</div>` : ''}
              ${this.config.show_date ? html`<div class="date-medium">${this.currentDate}</div>` : ''}
              <div class="temp-display">${Math.round(currentTemp)}${weatherData.temperature_unit}</div>
            </div>
          </div>
        `;
        break;

      default: // time-focused
        headerContent = html`
          <div class="datetime-header">
            <div class="weather-icon ${getWeatherIcon(weatherData.condition || 'clear')}">
              ${this.renderWeatherIcon(weatherData.condition || 'clear')}
            </div>
            <div class="datetime-content">
              <div class="time-large">${this.currentTime}</div>
              ${this.config.show_date ? html`<div class="date-small">${this.currentDate}</div>` : ''}
              <div class="temp-display">${Math.round(currentTemp)}${weatherData.temperature_unit}</div>
            </div>
          </div>
        `;
    }

    return html`
      <div class="card-header" style="background: ${gradient.color}; color: ${gradient.textColor};">
        ${headerContent}
      </div>
    `;
  }

  private renderWeatherIcon(condition: string): unknown {
    const iconClass = getWeatherIcon(condition);
    const animate = this.config.animate_icons !== false;

    // Use animated SVG icons if animation is enabled
    if (animate) {
      return getAnimatedWeatherIcon(iconClass, true);
    }

    // Fallback to emoji icons
    const iconMap: Record<string, string> = {
      'clear-day': '☀️',
      'cloudy': '☁️',
      'rainy': '🌧️',
      'snowy': '❄️',
      'lightning': '⛈️',
      'fog': '🌫️',
      'windy': '💨'
    };

    return html`<span class="icon-emoji">${iconMap[iconClass] || '☀️'}</span>`;
  }

  private renderForecast(): unknown {
    const weatherData = this.getWeatherData();
    const forecast = weatherData.forecast?.slice(0, this.config.forecast_days || 5) || [];

    if (forecast.length === 0) {
      return html`
        <div class="no-forecast">
          <p>No forecast data available</p>
          <p class="helper">Your weather integration may not provide forecast data, or you may need to use a weather service call to fetch it.</p>
        </div>
      `;
    }

    return html`
      <div class="forecast-container">
        ${forecast.map(day => this.renderForecastDay(day, weatherData.temperature_unit || '°F'))}
      </div>
    `;
  }

  private renderForecastDay(day: any, unit: string): unknown {
    const dayName = getDayName(day.datetime);
    const highTemp = Math.round(day.temperature || 0);
    const lowTemp = Math.round(day.templow || 0);
    const precipProb = day.precipitation_probability || 0;

    // Calculate bar width percentages
    const tempRange = highTemp - lowTemp;
    const highPercent = 70; // Max 70% for visual balance
    const lowPercent = tempRange > 0 ? (lowTemp / highTemp) * highPercent : 30;

    // Get actual temperature if sensor is configured
    const showActual = this.config.temp_display_mode === 'actual' || this.config.temp_display_mode === 'both';
    const showForecast = this.config.temp_display_mode !== 'actual';

    let actualTemp: number | undefined;
    if (showActual && this.config.outdoor_temp_sensor) {
      const sensorEntity = this.hass.states[this.config.outdoor_temp_sensor];
      if (sensorEntity) {
        actualTemp = Math.round(parseFloat(sensorEntity.state));
      }
    }

    return html`
      <div class="forecast-day">
        <div class="day-name">${dayName}</div>
        <div class="day-icon">
          ${this.renderWeatherIcon(day.condition || 'clear')}
        </div>
        <div class="day-temp-range">
          ${showForecast ? html`
            <span class="temp-low">${lowTemp}°</span>
            <div class="temp-bar">
              <div class="temp-bar-low" style="width: ${lowPercent}%"></div>
              <div class="temp-bar-high" style="width: ${highPercent - lowPercent}%"></div>
            </div>
            <span class="temp-high">${highTemp}°</span>
          ` : ''}
          ${showActual && actualTemp !== undefined ? html`
            <span class="temp-actual" title="Actual outdoor temperature">
              ${actualTemp}° <span class="actual-label">Actual</span>
            </span>
          ` : ''}
        </div>
        ${precipProb > 0 ? html`
          <div class="precip-prob">${precipProb}%</div>
        ` : ''}
      </div>
    `;
  }

  protected render(): unknown {
    if (!this.hass || !this.config) {
      return html``;
    }

    const entity = this.hass.states[this.config.entity];
    if (!entity) {
      return html`
        <ha-card>
          <div class="error">Entity ${this.config.entity} not found</div>
        </ha-card>
      `;
    }

    const weatherData = this.getWeatherData();
    const hasForecast = weatherData.forecast && weatherData.forecast.length > 0;
    const showForecast = this.config.show_forecast !== false && hasForecast;

    return html`
      <ha-card>
        ${this.renderHeader()}
        ${showForecast ? html`
          <div class="card-content">
            ${this.renderForecast()}
          </div>
        ` : ''}
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      ha-card {
        overflow: hidden;
        border-radius: 12px;
      }

      .error {
        padding: 20px;
        color: var(--error-color, #ff0000);
        text-align: center;
      }

      .card-header {
        padding: 24px;
        border-radius: 12px 12px 0 0;
        transition: background 0.5s ease;
      }

      .datetime-header {
        display: flex;
        align-items: center;
        gap: 20px;
      }

      .greeting-header {
        display: flex;
        align-items: center;
        gap: 20px;
      }

      .minimal-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
      }

      .weather-icon {
        font-size: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 100px;
      }

      .icon-emoji {
        display: block;
        filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
      }

      .weather-icon-svg {
        width: 80px;
        height: 80px;
        filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
      }

      .day-icon .weather-icon-svg {
        width: 32px;
        height: 32px;
      }

      .datetime-content {
        flex: 1;
      }

      .greeting-content {
        flex: 1;
      }

      .time-large {
        font-size: 64px;
        font-weight: 300;
        line-height: 1;
        margin-bottom: 8px;
      }

      .time-medium {
        font-size: 48px;
        font-weight: 300;
        line-height: 1;
        margin-bottom: 8px;
      }

      .time-small {
        font-size: 24px;
        font-weight: 300;
        opacity: 0.9;
      }

      .date-large {
        font-size: 32px;
        font-weight: 400;
        line-height: 1.2;
        margin-bottom: 8px;
      }

      .date-medium {
        font-size: 24px;
        font-weight: 400;
        line-height: 1.2;
      }

      .date-small {
        font-size: 18px;
        font-weight: 400;
        opacity: 0.9;
      }

      .temp-display {
        font-size: 28px;
        font-weight: 500;
        margin-top: 8px;
      }

      .greeting-text {
        font-size: 32px;
        font-weight: 500;
        margin-bottom: 8px;
      }

      .suggestion-text {
        font-size: 18px;
        opacity: 0.9;
        margin-bottom: 8px;
      }

      .card-content {
        padding: 20px;
      }

      .forecast-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .forecast-day {
        display: grid;
        grid-template-columns: 50px 50px 1fr auto;
        align-items: center;
        gap: 12px;
        padding: 8px 0;
        border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.1));
      }

      .forecast-day:last-child {
        border-bottom: none;
      }

      .day-name {
        font-weight: 500;
        font-size: 16px;
      }

      .day-icon {
        font-size: 32px;
        text-align: center;
      }

      .day-temp-range {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
      }

      .temp-low, .temp-high {
        font-size: 16px;
        font-weight: 500;
        min-width: 35px;
      }

      .temp-low {
        opacity: 0.7;
        text-align: right;
      }

      .temp-bar {
        flex: 1;
        height: 8px;
        border-radius: 4px;
        background: var(--divider-color, rgba(0,0,0,0.1));
        display: flex;
        overflow: hidden;
      }

      .temp-bar-low {
        background: linear-gradient(90deg, #a8dadc 0%, #457b9d 100%);
        border-radius: 4px 0 0 4px;
      }

      .temp-bar-high {
        background: linear-gradient(90deg, #f1c40f 0%, #e67e22 100%);
        border-radius: 0 4px 4px 0;
      }

      .precip-prob {
        font-size: 14px;
        opacity: 0.7;
        min-width: 40px;
        text-align: right;
      }

      .no-forecast {
        text-align: center;
        padding: 20px;
        opacity: 0.7;
      }

      .no-forecast p {
        margin: 8px 0;
      }

      .no-forecast .helper {
        font-size: 0.85em;
        color: var(--secondary-text-color);
      }

      .temp-actual {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 16px;
        font-weight: 500;
        color: var(--primary-color);
        margin-left: 8px;
      }

      .actual-label {
        font-size: 12px;
        font-weight: 400;
        opacity: 0.8;
      }
    `;
  }
}

// Register the card with Home Assistant
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'weatherpulse-card',
  name: 'WeatherPulse Card',
  description: 'A modern, highly configurable weather card for Home Assistant',
  preview: true,
  documentationURL: 'https://github.com/imCharlieB/WeatherPulse'
});

console.info(
  `%c WEATHERPULSE-CARD %c v0.1.0 `,
  'color: white; background: #4facfe; font-weight: 700;',
  'color: #4facfe; background: white; font-weight: 700;'
);
