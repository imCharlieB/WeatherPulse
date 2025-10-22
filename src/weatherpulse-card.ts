import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { WeatherPulseCardConfig, WeatherData, NWSAlert } from './types';
import {
  getTemperatureGradient,
  getGreeting,
  getWeatherSuggestion,
  formatTime,
  formatDate,
  getDayName,
  getWeatherIcon,
  getForecastIcon,
  getSeasonalBackground,
  getCurrentSeason
} from './utils';
import { getAnimatedWeatherIcon, getMoonPhaseIcon, getTemperatureIcon } from './icons';

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
  @state() private hourlyForecastData: any[] = []; // For rain timing detection
  @state() private nwsAlerts: NWSAlert[] = [];

  private timeInterval?: number;
  private forecastUpdateInterval?: number;
  private alertUpdateInterval?: number;
  private lastAlertFetch: number = 0;

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
      forecast_type: 'daily',
      forecast_days: 5,
      hourly_count: 12,
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
      forecast_type: 'daily',
      forecast_days: 5,
      hourly_count: 12,
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
    this.fetchNWSAlerts();
    // Update forecast every 30 minutes
    this.forecastUpdateInterval = window.setInterval(() => this.fetchForecast(), 30 * 60 * 1000);
    // Update alerts every 5 minutes
    this.alertUpdateInterval = window.setInterval(() => this.fetchNWSAlerts(), 5 * 60 * 1000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stopClock();
    if (this.forecastUpdateInterval) {
      clearInterval(this.forecastUpdateInterval);
    }
    if (this.alertUpdateInterval) {
      clearInterval(this.alertUpdateInterval);
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
      // Determine forecast type from config
      const forecastType = this.config.forecast_type || 'daily';

      this.hass.connection.subscribeMessage(
        (event: any) => {
          if (event?.forecast) {
            this.forecastData = event.forecast;
          }
        },
        {
          type: 'weather/subscribe_forecast',
          forecast_type: forecastType,
          entity_id: this.config.entity,
        }
      );

      // Fetch hourly forecast for rain timing detection
      await this.fetchHourlyForRainTiming();
    } catch (error) {
      // Fallback to legacy forecast from attributes
      const entity = this.hass.states[this.config.entity];
      if (entity?.attributes?.forecast) {
        this.forecastData = entity.attributes.forecast;
      }
    }
  }

  /**
   * Fetch hourly forecast data for rain timing detection
   * Uses weather.get_forecasts WebSocket call
   */
  private async fetchHourlyForRainTiming(): Promise<void> {
    // Always use forecast_sensor (user-selected) for forecast data
    const forecastEntity = this.config.forecast_sensor;
  
    if (!this.hass || !forecastEntity) {
      this.hourlyForecastData = [];
      return;
    }
  
    // Get forecast data from the selected sensor's attributes
    const entity = this.hass.states[forecastEntity];
    if (entity?.attributes?.forecast) {
      this.hourlyForecastData = entity.attributes.forecast;
     // console.debug('Used hourly forecast from selected sensor:', this.hourlyForecastData);
    } else {
      this.hourlyForecastData = [];
      console.debug('No hourly forecast data available in selected sensor attributes.');
    }
  }

  private getWeatherData(): WeatherData {
    const entity = this.hass.states[this.config.entity];
    if (!entity) {
      return {};
    }

    // Use fetched forecast data or fall back to entity attributes
    let forecast = this.forecastData.length > 0 ? this.forecastData : (entity.attributes.forecast || []);

    return {
      temperature: entity.attributes.temperature,
      temperature_unit: entity.attributes.temperature_unit || '°F',
      humidity: entity.attributes.humidity,
      pressure: entity.attributes.pressure,
      pressure_unit: entity.attributes.pressure_unit,
      wind_speed: entity.attributes.wind_speed,
      wind_speed_unit: entity.attributes.wind_speed_unit,
      wind_bearing: entity.attributes.wind_bearing,
      wind_gust_speed: entity.attributes.wind_gust_speed,
      condition: entity.state,
      forecast: forecast,
      apparent_temperature: entity.attributes.apparent_temperature,
      uv_index: entity.attributes.uv_index,
      visibility: entity.attributes.visibility,
      visibility_unit: entity.attributes.visibility_unit,
      precipitation: entity.attributes.precipitation,
      precipitation_unit: entity.attributes.precipitation_unit,
      cloud_coverage: entity.attributes.cloud_coverage,
      dew_point: entity.attributes.dew_point,
      ozone: entity.attributes.ozone
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

  private getSunEntity() {
    const entityId = this.config.sun_entity || 'sun.sun';
    return this.hass.states[entityId];
  }

  private getMoonEntity() {
    const entityId = this.config.moon_entity || 'sensor.moon_phase';
    return this.hass.states[entityId];
  }

  private isNightTime(): boolean {
    // Check if sun entity exists
    const sunEntity = this.getSunEntity();
    if (sunEntity) {
      // Sun entity state is 'below_horizon' at night, 'above_horizon' during day
      return sunEntity.state === 'below_horizon';
    }

    // Fallback: check time (rough estimate - night is 8 PM to 6 AM)
    const hour = new Date().getHours();
    return hour >= 20 || hour < 6;
  }

  private getMoonPhase(): string {
    const moonEntity = this.getMoonEntity();
    if (moonEntity) {
      return moonEntity.state;
    }
    return 'unknown';
  }

  /**
   * Check if rain is coming in the next 4 hours
   * Returns object with isRaining flag and timing message
   * Uses hourly forecast data regardless of card display mode
   */
  private getRainTiming(): { isRaining: boolean; message: string; time: string } | null {
    const forecast = this.hourlyForecastData;
  
    if (!forecast || forecast.length === 0) {
      return null;
    }
  
    const now = new Date();
    const fourHoursFromNow = new Date(now.getTime() + (4 * 60 * 60 * 1000));
  
    for (const item of forecast) {
      const forecastTime = new Date(item.datetime);
  
      if (forecastTime <= now || forecastTime > fourHoursFromNow) {
        continue;
      }
  
      // Support both probability and actual precipitation
      const hasHighPrecipChance = (item.precipitation_probability ?? 0) > 50;
      const hasRainAmount = (item.precipitation ?? 0) > 0;
      const isRainyCondition = ['rainy', 'pouring', 'rain', 'drizzle', 'lightning-rainy', 'thunderstorm', 'thunderstorms'].includes(
        (item.condition || '').toLowerCase()
      );
  
      if (hasHighPrecipChance || hasRainAmount || isRainyCondition) {
        const hoursUntilRain = Math.round((forecastTime.getTime() - now.getTime()) / (60 * 60 * 1000));
        const timeString = forecastTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  
        let message = '';
        if (hoursUntilRain < 1) {
          message = 'Rain expected within the hour';
        } else if (hoursUntilRain === 1) {
          message = 'Rain expected in 1 hour';
        } else {
          message = `Rain expected in ${hoursUntilRain} hours`;
        }
  
        return {
          isRaining: true,
          message: message,
          time: timeString
        };
      }
    }
  
    return null;
  }

  private getCurrentHoliday(): string | null {
    if (!this.config?.holiday_themes) {
      return null;
    }

    const now = new Date();
    const month = now.getMonth() + 1; // 1-12
    const day = now.getDate();

    // Halloween (Oct 25-31)
    if (month === 10 && day >= 25) {
      return 'halloween';
    }

    // Christmas (Dec 18-25)
    if (month === 12 && day >= 18 && day <= 25) {
      return 'christmas';
    }

    // New Year (Dec 31 - Jan 1)
    if ((month === 12 && day === 31) || (month === 1 && day === 1)) {
      return 'newyear';
    }

    // Valentine's Day (Feb 13-14)
    if (month === 2 && (day === 13 || day === 14)) {
      return 'valentine';
    }

    // St. Patrick's Day (Mar 17)
    if (month === 3 && day === 17) {
      return 'stpatrick';
    }

    // Cinco de Mayo (May 5)
    if (month === 5 && day === 5) {
      return 'cincodemayo';
    }

    // 4th of July (Jul 4)
    if (month === 7 && day === 4) {
      return 'july4th';
    }

    // Easter - week before (approximation - typically late March/April)
    // Using a simple range for now
    if ((month === 3 && day >= 25) || (month === 4 && day <= 10)) {
      return 'easter';
    }

    return null;
  }

  private renderHolidayDecorations(): unknown {
    const holiday = this.getCurrentHoliday();
    if (!holiday) {
      return html``;
    }

    const decorations: { [key: string]: string[] } = {
      halloween: ['🎃', '👻', '🦇', '🕷️'],
      christmas: ['🎄', '⛄', '🎅', '❄️'],
      newyear: ['🎆', '🎊', '🥳', '✨'],
      valentine: ['❤️', '💕', '💝', '🌹'],
      stpatrick: ['🍀', '🌈', '☘️', '💚'],
      july4th: ['🇺🇸', '🎆', '⭐', '🎇'],
      easter: ['🐰', '🥚', '🌷', '🐣'],
      cincodemayo: ['🇲🇽', '🌮', '🌵', '🎉']
    };

    const icons = decorations[holiday] || [];

    return html`
      <div class="holiday-overlay">
        <span class="holiday-icon holiday-icon-1">${icons[0] || ''}</span>
        <span class="holiday-icon holiday-icon-2">${icons[1] || ''}</span>
        <span class="holiday-icon holiday-icon-3">${icons[2] || ''}</span>
        <span class="holiday-icon holiday-icon-4">${icons[3] || ''}</span>
      </div>
    `;
  }

  private async fetchNWSAlerts(): Promise<void> {
    if (!this.config?.show_nws_alerts || !this.hass) {
      return;
    }

    // Cache for 5 minutes
    const now = Date.now();
    if (now - this.lastAlertFetch < 5 * 60 * 1000) {
      return;
    }

    try {
      let url: string;

      // Test mode: Fetch all active US alerts and take first few for display testing
      if (this.config?.nws_test_mode) {
        url = 'https://api.weather.gov/alerts/active?status=actual&message_type=alert';
        console.log('NWS Test Mode: Fetching active US alerts for display testing');
      } else {
        const lat = this.hass.config.latitude;
        const lon = this.hass.config.longitude;
        url = `https://api.weather.gov/alerts/active?point=${lat},${lon}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        console.warn('Failed to fetch NWS alerts:', response.status);
        return;
      }

      const data = await response.json();
      const alerts: NWSAlert[] = [];

      if (data.features && Array.isArray(data.features)) {
        // In test mode, limit to first 2 alerts for display
        const features = this.config?.nws_test_mode ? data.features.slice(0, 2) : data.features;

        for (const feature of features) {
          const props = feature.properties;
          if (props) {
            alerts.push({
              id: props.id || '',
              event: props.event || '',
              headline: props.headline || '',
              description: props.description || '',
              instruction: props.instruction || '',
              severity: props.severity || 'Unknown',
              urgency: props.urgency || 'Unknown',
              certainty: props.certainty || 'Unknown',
              onset: props.onset || '',
              expires: props.expires || '',
              areaDesc: props.areaDesc || ''
            });
          }
        }
      }

      this.nwsAlerts = alerts;
      this.lastAlertFetch = now;

      if (this.config?.nws_test_mode && alerts.length > 0) {
        console.log(`NWS Test Mode: Displaying ${alerts.length} sample alert(s)`, alerts);
      }
    } catch (error) {
      console.error('Failed to fetch NWS alerts:', error);
    }
  }

  private renderNWSAlerts(): unknown {
    if (!this.config?.show_nws_alerts || this.nwsAlerts.length === 0) {
      return html``;
    }

    return html`
      <div class="nws-alerts-section">
        ${this.nwsAlerts.map(alert => {
          // Determine severity class for styling
          let severityClass = 'alert-unknown';
          let severityIcon = '⚠️';
          let urgencyBadge = '';

          switch (alert.severity) {
            case 'Extreme':
              severityClass = 'alert-extreme';
              severityIcon = '🔴';
              break;
            case 'Severe':
              severityClass = 'alert-severe';
              severityIcon = '🟠';
              break;
            case 'Moderate':
              severityClass = 'alert-moderate';
              severityIcon = '🟡';
              break;
            case 'Minor':
              severityClass = 'alert-minor';
              severityIcon = '🔵';
              break;
          }

          // Add urgency badge
          if (alert.urgency === 'Immediate') {
            urgencyBadge = 'IMMEDIATE';
          } else if (alert.urgency === 'Expected') {
            urgencyBadge = 'EXPECTED';
          }

          return html`
            <div class="nws-alert ${severityClass}">
              <div class="alert-header">
                <span class="alert-icon">${severityIcon}</span>
                <div class="alert-title">
                  <div class="alert-event">
                    ${alert.event}
                    ${urgencyBadge ? html`<span class="urgency-badge">${urgencyBadge}</span>` : ''}
                  </div>
                  <div class="alert-area">${alert.areaDesc}</div>
                </div>
              </div>
              <div class="alert-headline">${alert.headline}</div>
              ${alert.instruction ? html`
                <div class="alert-instruction">
                  <strong>⚠️ What to do:</strong> ${alert.instruction}
                </div>
              ` : ''}
              ${alert.expires ? html`
                <div class="alert-expires">
                  Expires: ${new Date(alert.expires).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
              ` : ''}
            </div>
          `;
        })}
      </div>
    `;
  }

  private renderWeatherInfo(forceLayout?: 'compact' | 'standard' | 'detailed'): unknown {
    const showInfo = this.config?.show_weather_info;
    if (!showInfo || showInfo.length === 0) {
      return html``;
    }

    const weatherData = this.getWeatherData();
    const layout = forceLayout || this.config?.weather_info_layout || 'standard';
    const items = [];

    for (const infoType of showInfo) {
      let icon = '';
      let label = '';
      let value = '';

      switch (infoType) {
        case 'uv_index':
          if (weatherData.uv_index !== undefined) {
            icon = '☀️';
            label = 'UV Index';
            value = String(Math.round(weatherData.uv_index));
          }
          break;

        case 'wind':
          if (weatherData.wind_speed !== undefined) {
            icon = '💨';
            label = 'Wind';
            const unit = weatherData.wind_speed_unit || 'mph';
            value = `${Math.round(weatherData.wind_speed)} ${unit}`;
            if (weatherData.wind_gust_speed) {
              value += ` (gusts ${Math.round(weatherData.wind_gust_speed)} ${unit})`;
            }
          }
          break;

        case 'feels_like':
          // Use apparent_temperature if available, otherwise calculate it
          let feelsLike = weatherData.apparent_temperature;

          if (feelsLike === undefined && weatherData.temperature !== undefined) {
            // Calculate feels like based on temperature and wind
            const temp = weatherData.temperature;
            const windSpeed = weatherData.wind_speed || 0;

            if (temp <= 50 && windSpeed > 3) {
              // Wind chill formula (for temps <= 50°F and wind > 3 mph)
              feelsLike = 35.74 + (0.6215 * temp) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temp * Math.pow(windSpeed, 0.16));
            } else if (temp >= 80) {
              // Heat index approximation for temps >= 80°F
              const rh = weatherData.humidity || 50;
              feelsLike = -42.379 + (2.04901523 * temp) + (10.14333127 * rh) - (0.22475541 * temp * rh) - (0.00683783 * temp * temp) - (0.05481717 * rh * rh) + (0.00122874 * temp * temp * rh) + (0.00085282 * temp * rh * rh) - (0.00000199 * temp * temp * rh * rh);
            } else {
              // Feels like = actual temp if no wind chill or heat index applies
              feelsLike = temp;
            }
          }

          if (feelsLike !== undefined) {
            icon = '🌡️';
            label = 'Feels Like';
            const unit = weatherData.temperature_unit?.replace('°', '') || 'F';
            value = `${Math.round(feelsLike)}°${unit}`;
          }
          break;

        case 'precipitation':
          // Only show if we have actual precipitation data
          if (weatherData.precipitation !== undefined && weatherData.precipitation > 0) {
            icon = '💧';
            label = 'Precipitation';
            const unit = weatherData.precipitation_unit || 'in';
            value = `${weatherData.precipitation} ${unit}`;
          }
          break;

        case 'humidity':
          if (weatherData.humidity !== undefined) {
            icon = '💧';
            label = 'Humidity';
            value = `${Math.round(weatherData.humidity)}%`;
          }
          break;

        case 'pressure':
          if (weatherData.pressure !== undefined) {
            icon = '🔽';
            label = 'Pressure';
            const unit = weatherData.pressure_unit || 'hPa';
            value = `${Math.round(weatherData.pressure)} ${unit}`;
          }
          break;

        case 'visibility':
          // Only show if we have actual visibility data
          if (weatherData.visibility !== undefined) {
            icon = '👁️';
            label = 'Visibility';
            const unit = weatherData.visibility_unit || 'mi';
            value = `${weatherData.visibility} ${unit}`;
          }
          break;

        case 'sunrise_sunset':
          const sunEntity = this.getSunEntity();
          if (sunEntity && sunEntity.attributes) {
            const isDay = sunEntity.state === 'above_horizon';
            const nextTime = isDay ? sunEntity.attributes.next_setting : sunEntity.attributes.next_rising;

            if (nextTime) {
              const time = new Date(nextTime);
              const timeStr = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
              icon = isDay ? '🌅' : '🌄';
              label = isDay ? 'Sunset' : 'Sunrise';
              value = timeStr;
            }
          }
          break;
      }

      if (value) {
        if (layout === 'compact') {
          // Compact: icon below value
          items.push(html`
            <div class="weather-info-item weather-info-compact">
              <div class="weather-info-value">${value}</div>
              <span class="weather-info-icon">${icon}</span>
            </div>
          `);
        } else if (layout === 'detailed') {
          // Detailed: Larger, with label above value
          items.push(html`
            <div class="weather-info-item weather-info-detailed">
              <span class="weather-info-icon">${icon}</span>
              <div class="weather-info-content">
                <div class="weather-info-label">${label}</div>
                <div class="weather-info-value">${value}</div>
              </div>
            </div>
          `);
        } else {
          // Standard: Icon, label and value side by side
          items.push(html`
            <div class="weather-info-item">
              <span class="weather-info-icon">${icon}</span>
              <div class="weather-info-content">
                <div class="weather-info-label">${label}</div>
                <div class="weather-info-value">${value}</div>
              </div>
            </div>
          `);
        }
      }
    }

    if (items.length === 0) {
      return html``;
    }

    const sectionClass = `weather-info-section weather-info-layout-${layout}`;

    return html`
      <div class="${sectionClass}">
        ${items}
      </div>
    `;
  }

  private renderHeader(): unknown {
    const weatherData = this.getWeatherData();
    const currentTemp = this.getCurrentTemp();
    const forecastTemp = weatherData.temperature;
    const hasOutdoorSensor = !!this.config.outdoor_temp_sensor;
    const gradient = getTemperatureGradient(currentTemp, weatherData.temperature_unit);

    const headerMode = this.config.header_mode || 'time-focused';

    // Determine what temp to show based on mode
    const tempDisplayMode = this.config.temp_display_mode || 'forecast';
    const unit = weatherData.temperature_unit || '°F';
    let tempDisplay: unknown = '';
    let tempLabel = '';

    if (tempDisplayMode === 'both' && hasOutdoorSensor && forecastTemp) {
      tempDisplay = html`
        <div class="temp-display-wrapper">
          <div class="temp-display">
            <div class="temp-main">${Math.round(currentTemp)}°${unit.replace('°', '')}</div>
            <div class="temp-label">Actual</div>
          </div>
          <div class="temp-display">
            <div class="temp-main">${Math.round(forecastTemp)}°${unit.replace('°', '')}</div>
            <div class="temp-label">Forecast</div>
          </div>
        </div>
      `;
    } else if (tempDisplayMode === 'actual' && hasOutdoorSensor) {
      tempDisplay = html`
        <div class="temp-display">
          <div class="temp-main">${Math.round(currentTemp)}°${unit.replace('°', '')}</div>
          <div class="temp-label">Actual</div>
        </div>
      `;
    } else {
      tempDisplay = html`
        <div class="temp-display">
          <div class="temp-main">${Math.round(currentTemp)}°${unit.replace('°', '')}</div>
          <div class="temp-label">Forecast</div>
        </div>
      `;
    }

    let headerContent;

    switch (headerMode) {
      case 'greeting':
        headerContent = html`
          <div class="greeting-header">
            <div class="weather-icon ${getWeatherIcon(weatherData.condition || 'clear')}">
              ${this.renderWeatherIcon(weatherData.condition || 'clear')}
            </div>
            <div class="greeting-content">
              <div class="time-large">
                ${this.currentTime.replace(/\s?(AM|PM)/i, '')}<span class="time-period">${this.currentTime.match(/(AM|PM)/i)?.[0] || ''}</span>
              </div>
              <div class="greeting-text">
                ${getGreeting(this.config.greeting_name, weatherData.condition, currentTemp)}
              </div>
              ${tempDisplay}
            </div>
          </div>
        `;
        break;

      case 'graphical':
        const season = getCurrentSeason();
        const customImage = this.config.seasonal_images?.[season];
        const seasonalBg = getSeasonalBackground(season, customImage);

        headerContent = html`
          <div class="graphical-header" style="background: ${seasonalBg}; background-size: cover; background-position: center;">
            <div class="graphical-overlay">
              <div class="graphical-content">
                <div class="graphical-main">
                  <div class="weather-icon-graphical ${getWeatherIcon(weatherData.condition || 'clear')}">
                    ${this.renderWeatherIcon(weatherData.condition || 'clear')}
                  </div>
                  <div class="graphical-right">
                    ${this.config.show_time !== false ? html`
                      <div class="graphical-time">
                        ${this.currentTime.replace(/\s?(AM|PM)/i, '')}<span class="time-period">${this.currentTime.match(/(AM|PM)/i)?.[0] || ''}</span>
                      </div>
                    ` : ''}
                    ${this.config.show_date !== false ? html`
                      <div class="graphical-date">${this.currentDate}</div>
                    ` : ''}
                    ${tempDisplay}
                  </div>
                </div>
              </div>
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
            ${tempDisplay}
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
              ${this.config.show_time ? html`<div class="time-small">
                ${this.currentTime.replace(/\s?(AM|PM)/i, '')}<span class="time-period-small">${this.currentTime.match(/(AM|PM)/i)?.[0] || ''}</span>
              </div>` : ''}
              ${tempDisplay}
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
              ${this.config.show_time ? html`<div class="time-medium">
                ${this.currentTime.replace(/\s?(AM|PM)/i, '')}<span class="time-period-medium">${this.currentTime.match(/(AM|PM)/i)?.[0] || ''}</span>
              </div>` : ''}
              ${this.config.show_date ? html`<div class="date-medium">${this.currentDate}</div>` : ''}
              ${tempDisplay}
            </div>
          </div>
        `;
        break;

      default: // time-focused
        // Format condition text (capitalize first letter of each word)
        // Handle unavailable/unknown states gracefully
        let conditionText = (weatherData.condition || 'clear');
        if (conditionText.toLowerCase().includes('unavail') || conditionText.toLowerCase().includes('unknown')) {
          conditionText = 'Loading';
        } else {
          conditionText = conditionText.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }

        headerContent = html`
          <div class="datetime-header time-focused-header">
            <div class="weather-icon ${getWeatherIcon(weatherData.condition || 'clear')}">
              ${this.renderWeatherIcon(weatherData.condition || 'clear')}
            </div>
            <div class="datetime-content">
              <div class="condition-temp">${conditionText}, ${Math.round(forecastTemp || currentTemp)}°${unit.replace('°', '')}</div>
              <div class="time-large">
                ${this.currentTime.replace(/\s?(AM|PM)/i, '')}<span class="time-period">${this.currentTime.match(/(AM|PM)/i)?.[0] || ''}</span>
              </div>
              ${this.config.show_date ? html`<div class="date-small">${this.currentDate}</div>` : ''}
              ${tempDisplayMode === 'both' && hasOutdoorSensor ? html`
                <div class="actual-temp-below">
                  <span class="actual-temp-value">${Math.round(currentTemp)}°${unit.replace('°', '')}</span>
                  <span class="actual-temp-label">Actual</span>
                </div>
              ` : tempDisplayMode === 'actual' && hasOutdoorSensor ? html`
                <div class="actual-temp-below">
                  <span class="actual-temp-value">${Math.round(currentTemp)}°${unit.replace('°', '')}</span>
                  <span class="actual-temp-label">Actual</span>
                </div>
              ` : ''}
            </div>
          </div>
        `;
    }

    // Check if we should show weather info in header (compact layout)
    const layout = this.config?.weather_info_layout || 'standard';
    const showWeatherInfoInHeader = layout === 'compact';
    const weatherInfoInHeader = showWeatherInfoInHeader ? this.renderWeatherInfo('compact') : '';

    // Graphical mode doesn't use card-header wrapper (it has its own background)
    if (headerMode === 'graphical') {
      return html`
        ${headerContent}
        ${showWeatherInfoInHeader ? html`
          <div class="weather-info-in-header">
            ${weatherInfoInHeader}
          </div>
        ` : ''}
      `;
    }

    return html`
      <div class="card-header" style="background: ${gradient.color}; color: ${gradient.textColor};">
        ${headerContent}
        ${showWeatherInfoInHeader ? html`
          <div class="weather-info-in-header">
            ${weatherInfoInHeader}
          </div>
        ` : ''}
      </div>
    `;
  }

  private renderWeatherIcon(condition: string, useForecastIcon: boolean = false): unknown {
    // Determine icon class - for main icon, use sun entity for accurate day/night detection
    let iconClass: string;
    if (useForecastIcon) {
      iconClass = getForecastIcon(condition);
    } else {
      // Use the card's isNightTime() which checks sun entity, not utils isNightTime()
      const isNight = this.isNightTime();
      const conditionLower = condition.toLowerCase();

      if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
        iconClass = isNight ? 'clear-night' : 'clear-day';
      } else if (conditionLower.includes('partlycloudy') || conditionLower.includes('partly') || conditionLower.includes('partial')) {
        iconClass = isNight ? 'partlycloudy-night' : 'partlycloudy';
      } else {
        // For other conditions, use the utility function
        iconClass = getWeatherIcon(condition);
      }
    }

    const animate = this.config.animate_icons !== false;

    // For night conditions, use moon phase icons if enabled and available
    if ((iconClass === 'clear-night' || iconClass === 'partlycloudy-night') && animate && this.config.show_moon_phase !== false) {
      const moonPhase = this.getMoonPhase();
      if (moonPhase && moonPhase !== 'unknown') {
        // For clear night, show just the moon phase
        if (iconClass === 'clear-night') {
          return getMoonPhaseIcon(moonPhase, true);
        }
        // For partly cloudy night, still show regular icon (has clouds + moon)
        return getAnimatedWeatherIcon(iconClass, true);
      }
    }

    // Use animated SVG icons if animation is enabled
    if (animate) {
      return getAnimatedWeatherIcon(iconClass, true);
    }

    // Fallback to emoji icons
    const iconMap: Record<string, string> = {
      'clear-day': '☀️',
      'clear-night': '🌙',
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
    const forecastType = this.config.forecast_type || 'daily';

    // Determine how many items to show based on forecast type
    const itemCount = forecastType === 'hourly'
      ? (this.config.hourly_count || 12)
      : (this.config.forecast_days || 5);

    const forecast = weatherData.forecast?.slice(0, itemCount) || [];
    const viewMode = this.config.view_mode || 'standard';

    if (forecast.length === 0) {
      return html`
        <div class="no-forecast">
          <p>No forecast data available</p>
          <p class="helper">Your weather integration may not provide forecast data, or you may need to use a weather service call to fetch it.</p>
        </div>
      `;
    }

    // Chart view mode - render temperature trend chart
    if (viewMode === 'chart') {
      return this.renderChartView(forecast, weatherData.temperature_unit || '°F', forecastType);
    }

    // Add forecast-type class for hourly vs daily styling
    const containerClass = `forecast-container forecast-${viewMode} forecast-type-${forecastType}`;

    return html`
      <div class="${containerClass}">
        ${forecast.map(item => forecastType === 'hourly'
          ? this.renderForecastHour(item, weatherData.temperature_unit || '°F', viewMode)
          : this.renderForecastDay(item, weatherData.temperature_unit || '°F', viewMode)
        )}
      </div>
    `;
  }

  private renderForecastHour(hour: any, unit: string, viewMode: string = 'standard'): unknown {
    // Parse the datetime to get hour
    const date = new Date(hour.datetime);
    const hourString = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
    const temp = Math.round(hour.temperature || 0);
    const precipProb = hour.precipitation_probability || 0;
    const condition = hour.condition || 'clear';
    const humidity = hour.humidity;
    const windSpeed = hour.wind_speed;

    // Compact mode - vertical card in horizontal row (same as daily)
    if (viewMode === 'compact') {
      return html`
        <div class="forecast-hour forecast-compact">
          <div class="hour-name">${hourString}</div>
          <div class="day-icon-small">
            ${this.renderWeatherIcon(condition, true)}
          </div>
          <div class="hour-temp">${temp}°</div>
          ${precipProb > 0 ? html`<div class="precip-compact">💧${precipProb}%</div>` : ''}
        </div>
      `;
    }

    // Detailed mode - with extra weather details
    if (viewMode === 'detailed') {
      return html`
        <div class="forecast-hour forecast-detailed">
          <div class="hour-info-row">
            <div class="hour-name">${hourString}</div>
            <div class="day-icon">
              ${this.renderWeatherIcon(condition, true)}
            </div>
            <div class="hour-temp-display">${temp}°</div>
          </div>
          ${precipProb > 0 || humidity || windSpeed ? html`
            <div class="hour-details">
              ${precipProb > 0 ? html`<div class="detail-item"><span>💧</span> ${precipProb}%</div>` : ''}
              ${humidity ? html`<div class="detail-item"><span>💨</span> ${humidity}%</div>` : ''}
              ${windSpeed ? html`<div class="detail-item"><span>🌬️</span> ${Math.round(windSpeed)} mph</div>` : ''}
            </div>
          ` : ''}
        </div>
      `;
    }

    // Standard mode - simple grid layout
    return html`
      <div class="forecast-hour">
        <div class="hour-name">${hourString}</div>
        <div class="day-icon">
          ${this.renderWeatherIcon(condition, true)}
        </div>
        <div class="hour-temp">${temp}°</div>
        ${precipProb > 0 ? html`<div class="precip-prob">${precipProb}%</div>` : ''}
      </div>
    `;
  }

  private renderForecastDay(day: any, unit: string, viewMode: string = 'standard'): unknown {
    const dayName = getDayName(day.datetime);
    const highTemp = Math.round(day.temperature || 0);
    const lowTemp = Math.round(day.templow || 0);
    const precipProb = day.precipitation_probability || 0;
    const humidity = day.humidity;
    const windSpeed = day.wind_speed;

    // Calculate bar width percentages
    const tempRange = highTemp - lowTemp;
    const highPercent = 70; // Max 70% for visual balance
    const lowPercent = tempRange > 0 ? (lowTemp / highTemp) * highPercent : 30;

    // Compact mode - vertical card in horizontal row
    if (viewMode === 'compact') {
      const gradient = getTemperatureGradient(highTemp, unit);
      // Convert diagonal gradient to vertical for compact boxes
      const verticalGradient = gradient.color.replace('135deg', '180deg');
      return html`
        <div class="forecast-day forecast-compact" style="background: ${verticalGradient}; color: ${gradient.textColor}; background-clip: padding-box;">
          <div class="day-name">${dayName}</div>
          <div class="day-icon-small">
            ${this.renderWeatherIcon(day.condition || 'clear', true)}
          </div>
          <div class="compact-temps">
            <span class="temp-high-compact">${highTemp}°</span>
            <span class="temp-low-compact">${lowTemp}°</span>
          </div>
          ${precipProb > 0 ? html`<div class="precip-compact">💧${precipProb}%</div>` : ''}
        </div>
      `;
    }

    // Detailed mode - icon next to day name
    if (viewMode === 'detailed') {
      // Convert wind bearing to compass direction
      const getWindDirection = (bearing?: number): string => {
        if (bearing === undefined) return '';
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round(bearing / 22.5) % 16;
        return directions[index];
      };

      const windDirection = day.wind_bearing !== undefined ? getWindDirection(day.wind_bearing) : '';
      const precipAmount = day.precipitation !== undefined && day.precipitation > 0 ? day.precipitation : null;

      return html`
        <div class="forecast-day forecast-detailed">
          <div class="detailed-name-icon">
            <div class="day-name">${dayName}</div>
            <div class="day-icon">
              ${this.renderWeatherIcon(day.condition || 'clear', true)}
            </div>
          </div>
          <div class="detailed-temps">
            <span class="temp-item">${getTemperatureIcon('colder', this.config.animate_icons !== false)}${lowTemp}°</span>
            <span class="temp-item">${getTemperatureIcon('warmer', this.config.animate_icons !== false)}${highTemp}°</span>
          </div>
          <div class="detailed-info">
            <div class="detail-item">
              <span class="detail-icon">💧</span>
              <span class="detail-text">${precipProb > 0 ? `${precipProb}%${precipAmount ? ` (${precipAmount}")` : ''}` : '0%'}</span>
            </div>
            <div class="detail-item">
              <span class="detail-icon">💨</span>
              <span class="detail-text">${humidity ? `${humidity}%` : '--'}</span>
            </div>
            <div class="detail-item">
              <span class="detail-icon">🌬️</span>
              <span class="detail-text">${windSpeed ? `${Math.round(windSpeed)} mph ${windDirection}` : '--'}</span>
            </div>
          </div>
        </div>
      `;
    }

    // Standard mode (default)
    return html`
      <div class="forecast-day">
        <div class="day-name">${dayName}</div>
        <div class="day-icon">
          ${this.renderWeatherIcon(day.condition || 'clear', true)}
        </div>
        <div class="day-temp-range">
          <span class="temp-low">${lowTemp}°</span>
          <div class="temp-bar">
            <div class="temp-bar-low" style="width: ${lowPercent}%"></div>
            <div class="temp-bar-high" style="width: ${highPercent - lowPercent}%"></div>
          </div>
          <span class="temp-high">${highTemp}°</span>
        </div>
        ${precipProb > 0 ? html`
          <div class="precip-prob">${precipProb}%</div>
        ` : ''}
      </div>
    `;
  }

  private renderChartView(forecast: any[], _unit: string, forecastType: string): unknown {
    // Calculate min and max temps for scaling
    const temps = forecast.map(item => {
      if (forecastType === 'hourly') {
        return item.temperature || 0;
      } else {
        return [item.temperature || 0, item.templow || 0];
      }
    }).flat();

    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const tempRange = maxTemp - minTemp;
    const padding = tempRange * 0.3; // 30% padding for space above/below
    const chartMin = minTemp - padding;
    const chartMax = maxTemp + padding;

    // Calculate line points for SVG - use same values as dots for alignment
    const columnWidth = 100 / forecast.length;
    const highLinePoints: string[] = [];
    const lowLinePoints: string[] = [];

    forecast.forEach((item, index) => {
      const highTemp = Math.round(item.temperature || 0);
      const lowTemp = forecastType === 'daily' ? Math.round(item.templow || 0) : null;

      const x = (index * columnWidth) + (columnWidth / 2);
      // Use same calculation as dot positioning (bottom %)
      const highPercent = ((highTemp - chartMin) / (chartMax - chartMin)) * 100;
      const highY = 100 - highPercent; // Invert for SVG coordinates
      highLinePoints.push(`${x.toFixed(2)},${highY.toFixed(2)}`);

      if (lowTemp !== null && lowTemp > 0) {
        const lowPercent = ((lowTemp - chartMin) / (chartMax - chartMin)) * 100;
        const lowY = 100 - lowPercent; // Invert for SVG coordinates
        lowLinePoints.push(`${x.toFixed(2)},${lowY.toFixed(2)}`);
      }
    });

    return html`
      <div class="forecast-chart">
        <!-- Day names at top -->
        <div class="chart-labels">
          ${forecast.map(item => {
            const dayName = forecastType === 'hourly'
              ? new Date(item.datetime).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
              : getDayName(item.datetime);

            return html`
              <div class="chart-label">${dayName}</div>
            `;
          })}
        </div>

        <!-- Temperature chart with SVG lines -->
        <div class="chart-wrapper">
          <svg class="chart-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              points="${highLinePoints.join(' ')}"
              fill="none"
              stroke="rgba(255, 120, 80, 1)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <polyline
              points="${lowLinePoints.join(' ')}"
              fill="none"
              stroke="#4A9EFF"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <div class="chart-container">
            ${forecast.map(item => {
              const highTemp = Math.round(item.temperature || 0);
              const lowTemp = forecastType === 'daily' ? Math.round(item.templow || 0) : null;

              // Calculate positions (0-100%)
              const highPercent = ((highTemp - chartMin) / (chartMax - chartMin)) * 100;
              const lowPercent = lowTemp ? ((lowTemp - chartMin) / (chartMax - chartMin)) * 100 : null;

              return html`
                <div class="chart-column">
                  ${lowTemp ? html`
                    <div class="chart-temp chart-temp-high" style="bottom: calc(${highPercent}% - 4px)">${highTemp}°</div>
                    <div class="chart-point chart-point-high" style="bottom: calc(${highPercent}% - 4px)"></div>
                    <div class="chart-temp chart-temp-low" style="bottom: calc(${lowPercent}% - 4px)">${lowTemp}°</div>
                    <div class="chart-point chart-point-low" style="bottom: calc(${lowPercent}% - 4px)"></div>
                  ` : html`
                    <div class="chart-temp chart-temp-single" style="bottom: calc(${highPercent}% - 4px)">${highTemp}°</div>
                    <div class="chart-point chart-point-single" style="bottom: calc(${highPercent}% - 4px)"></div>
                  `}
                </div>
              `;
            })}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render rain timing notification banner (lower third style)
   */
  private renderRainTiming(): unknown {
    const rainInfo = this.getRainTiming();

    if (!rainInfo) {
      return '';
    }

    return html`
      <div class="rain-timing-banner">
        <div class="rain-timing-content">
          <span class="rain-icon">☔</span>
          <span class="rain-message">${rainInfo.message}</span>
          <span class="rain-time">(~${rainInfo.time})</span>
        </div>
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

    // Apply night mode only if the toggle is ON and it's actually nighttime
    const nightModeClass = (this.config.night_mode && this.isNightTime()) ? 'night-mode' : '';

    // Show weather info in header if compact layout, otherwise as separate section
    const layout = this.config?.weather_info_layout || 'standard';
    const showWeatherInfoInHeader = layout === 'compact';

    // Check for severe alerts to add glowing effect
    const hasExtremeSevereAlert = this.nwsAlerts.some(
      alert => alert.severity === 'Extreme' || alert.severity === 'Severe'
    );
    const alertGlowClass = hasExtremeSevereAlert ?
      (this.nwsAlerts.some(a => a.severity === 'Extreme') ? 'alert-glow-extreme' : 'alert-glow-severe') : '';

    // Check for extreme temperatures to add glowing effect
    const currentTemp = this.getCurrentTemp();
    let tempGlowClass = '';
    if (currentTemp >= 95) {
      tempGlowClass = 'temp-glow-hot';
    } else if (currentTemp <= 20) {
      tempGlowClass = 'temp-glow-freezing';
    }

    // Add theme class and custom colors
    const theme = this.config?.theme || 'default';
    const themeClass = theme !== 'default' ? `theme-${theme}` : '';

    // Inject custom theme colors as CSS variables
    let customStyles = '';
    if (theme === 'custom' && this.config?.custom_theme_colors) {
      const colors = this.config.custom_theme_colors;
      customStyles = `
        --custom-primary: ${colors.primary || '#667eea'};
        --custom-secondary: ${colors.secondary || '#764ba2'};
        --custom-background: ${colors.background || '#ffffff'};
        --custom-text: ${colors.text || '#333333'};
        --custom-border: ${colors.border || '#e0e0e0'};
        --custom-accent: ${colors.accent || '#f093fb'};
      `;
    }

    const viewMode = this.config.view_mode || 'standard';
    const cardContentClass = viewMode === 'compact' ? 'card-content card-content-compact' : 'card-content';

    return html`
      <ha-card class="${nightModeClass} ${alertGlowClass} ${tempGlowClass} ${themeClass}" style="${customStyles}">
        ${this.renderHolidayDecorations()}
        ${this.renderHeader()}
        ${this.renderRainTiming()}
        ${this.renderNWSAlerts()}
        ${!showWeatherInfoInHeader ? this.renderWeatherInfo() : ''}
        ${showForecast ? html`
          <div class="${cardContentClass}">
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
        position: relative;
      }

      /* Night Mode Styling */
      ha-card.night-mode {
        background: #0a0e27;
        position: relative;
      }

      ha-card.night-mode::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image:
          radial-gradient(2px 2px at 20px 30px, white, transparent),
          radial-gradient(2px 2px at 60px 70px, white, transparent),
          radial-gradient(1px 1px at 50px 50px, white, transparent),
          radial-gradient(1px 1px at 130px 80px, white, transparent),
          radial-gradient(2px 2px at 90px 10px, white, transparent),
          radial-gradient(1px 1px at 200px 60px, white, transparent),
          radial-gradient(2px 2px at 170px 120px, white, transparent),
          radial-gradient(1px 1px at 220px 90px, white, transparent),
          radial-gradient(1px 1px at 30px 100px, white, transparent),
          radial-gradient(2px 2px at 270px 40px, white, transparent),
          radial-gradient(1px 1px at 150px 15px, white, transparent),
          radial-gradient(1px 1px at 100px 130px, white, transparent),
          radial-gradient(2px 2px at 240px 100px, white, transparent),
          radial-gradient(1px 1px at 190px 70px, white, transparent),
          radial-gradient(1px 1px at 80px 95px, white, transparent);
        background-repeat: repeat;
        background-size: 300px 150px;
        opacity: 0.6;
        pointer-events: none;
        z-index: 0;
        animation: starsFloat 120s linear infinite;
      }

      @keyframes starsFloat {
        from {
          transform: translateY(0);
        }
        to {
          transform: translateY(-150px);
        }
      }

      ha-card.night-mode > * {
        position: relative;
        z-index: 1;
      }

      ha-card.night-mode .card-header {
        position: relative;
        color: white !important; /* Bright white text */
        filter: none !important; /* No filter - don't dim text */
      }

      ha-card.night-mode .card-header::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(10, 14, 27, 0.6) 0%, rgba(20, 25, 45, 0.6) 100%); /* Darker overlay */
        pointer-events: none;
        z-index: 0;
      }

      ha-card.night-mode .card-header > * {
        position: relative;
        z-index: 1;
      }

      ha-card.night-mode .graphical-overlay {
        background: linear-gradient(180deg, rgba(10,14,39,0.5) 0%, rgba(10,14,39,0.8) 100%);
      }

      ha-card.night-mode .card-content {
        background: transparent; /* Transparent to show stars through */
        color: #e8eaf6;
      }

      ha-card.night-mode .forecast-day,
      ha-card.night-mode .forecast-hour {
        background: transparent !important; /* Show stars through */
        border-bottom-color: rgba(232, 234, 246, 0.1);
      }

      ha-card.night-mode .temp-bar {
        background: rgba(232, 234, 246, 0.15);
      }

      ha-card.night-mode .forecast-day.forecast-compact,
      ha-card.night-mode .forecast-hour.forecast-compact {
        background: linear-gradient(180deg, #1a3a52 0%, #2c5270 100%) !important;
        position: relative !important;
        z-index: 1 !important; /* Above stars */
        overflow: hidden !important;
      }

      /* Add stars to night mode compact forecast boxes */
      ha-card.night-mode .forecast-day.forecast-compact::before,
      ha-card.night-mode .forecast-hour.forecast-compact::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image:
          radial-gradient(1px 1px at 10px 15px, white, transparent),
          radial-gradient(1px 1px at 30px 35px, white, transparent),
          radial-gradient(1px 1px at 25px 25px, white, transparent),
          radial-gradient(1px 1px at 65px 40px, white, transparent),
          radial-gradient(1px 1px at 45px 5px, white, transparent),
          radial-gradient(1px 1px at 15px 50px, white, transparent),
          radial-gradient(1px 1px at 55px 60px, white, transparent),
          radial-gradient(1px 1px at 40px 70px, white, transparent),
          radial-gradient(1px 1px at 70px 20px, white, transparent),
          radial-gradient(1px 1px at 20px 65px, white, transparent);
        background-repeat: repeat;
        background-size: 80px 80px;
        opacity: 0.4;
        pointer-events: none;
        z-index: 0;
        animation: starsTwinkle 3s ease-in-out infinite;
      }

      @keyframes starsTwinkle {
        0%, 100% {
          opacity: 0.3;
        }
        50% {
          opacity: 0.6;
        }
      }

      /* Ensure content is above stars */
      ha-card.night-mode .forecast-day.forecast-compact > *,
      ha-card.night-mode .forecast-hour.forecast-compact > * {
        position: relative;
        z-index: 1;
      }

      ha-card.night-mode .forecast-type-hourly.forecast-standard .forecast-hour {
        background: rgba(29, 33, 56, 0.6) !important; /* Keep some background */
        position: relative !important;
        z-index: 1 !important; /* Above stars */
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
        gap: 8px;
      }

      .greeting-header {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      /* Graphical header with seasonal background */
      .graphical-header {
        min-height: 280px;
        display: flex;
        align-items: center;
        position: relative;
        border-radius: 12px 12px 0 0;
        overflow: hidden;
      }

      .graphical-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%);
        backdrop-filter: blur(2px);
      }

      .graphical-content {
        position: relative;
        z-index: 1;
        padding: 32px 32px 32px 16px;
        width: 100%;
        color: white;
        text-shadow: 0 2px 8px rgba(0,0,0,0.5);
      }

      .graphical-main {
        display: flex;
        align-items: center;
        gap: 24px;
      }

      .graphical-right {
        flex: 1;
        padding-right: 16px;
      }

      .graphical-time {
        font-size: 72px;
        font-weight: 300;
        line-height: 1;
        margin-bottom: 8px;
        position: relative;
      }

      .graphical-time .time-period {
        font-size: 20px;
        position: absolute;
        top: 6px;
        margin-left: 6px;
      }

      .graphical-date {
        font-size: 24px;
        font-weight: 400;
        opacity: 0.95;
        margin-bottom: 8px;
      }

      .weather-icon-graphical {
        font-size: 160px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 180px;
      }

      .weather-icon-graphical .weather-icon-svg {
        width: 160px;
        height: 160px;
        filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4));
      }

      .weather-icon-graphical .icon-emoji {
        font-size: 160px;
        filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4));
      }

      .minimal-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
      }

      .weather-icon {
        font-size: 160px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 180px;
      }

      .icon-emoji {
        display: block;
        font-size: 160px;
        filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
      }

      .weather-icon-svg {
        width: 160px;
        height: 160px;
        filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
      }

      .day-icon .weather-icon-svg {
        width: 32px;
        height: 32px;
      }

      .day-icon .icon-emoji {
        font-size: 32px;
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
        margin-bottom: 2px;
        position: relative;
      }

      .time-period {
        font-size: 16px;
        font-weight: 400;
        position: absolute;
        top: 4px;
        margin-left: 4px;
        opacity: 0.9;
      }

      .time-medium {
        font-size: 48px;
        font-weight: 300;
        line-height: 1;
        margin-bottom: 8px;
        position: relative;
      }

      .time-period-medium {
        font-size: 14px;
        font-weight: 400;
        position: absolute;
        top: 4px;
        margin-left: 4px;
        opacity: 0.9;
      }

      .time-small {
        font-size: 24px;
        font-weight: 300;
        opacity: 0.9;
        position: relative;
      }

      .time-period-small {
        font-size: 12px;
        font-weight: 400;
        position: absolute;
        top: 2px;
        margin-left: 2px;
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
        text-align: center;
      }

      .condition-temp {
        font-size: 20px;
        font-weight: 400;
        opacity: 0.95;
        margin-bottom: 2px;
        text-align: center;
      }

      .actual-temp-display {
        font-size: 22px;
        font-weight: 500;
        margin-top: 2px;
        display: flex;
        align-items: baseline;
        gap: 8px;
      }

      .actual-temp-below {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 2px;
        margin-top: 4px;
      }

      .actual-temp-value {
        font-size: 24px;
        font-weight: 500;
        line-height: 1;
      }

      .actual-temp-label {
        font-size: 12px;
        font-weight: 400;
        opacity: 0.8;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .temp-display {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        margin-top: 8px;
      }

      .temp-main {
        font-size: 32px;
        font-weight: 500;
        line-height: 1;
      }

      .temp-label {
        font-size: 11px;
        font-weight: 400;
        opacity: 0.8;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .temp-display-wrapper {
        display: flex;
        gap: 24px;
        align-items: center;
        justify-content: center;
        margin-top: 12px;
      }

      .greeting-text {
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 4px;
        line-height: 1.3;
      }

      .suggestion-text {
        font-size: 16px;
        opacity: 0.9;
        margin-bottom: 4px;
        line-height: 1.2;
      }

      /* Weather Info Section */
      .weather-info-section {
        display: grid;
        gap: 12px;
        padding: 16px 20px;
        background: var(--card-background-color, rgba(0,0,0,0.02));
        border-top: 1px solid var(--divider-color, rgba(0,0,0,0.1));
      }

      /* Standard Layout (default) */
      .weather-info-layout-standard {
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      }

      /* Compact Layout - single line, more items per row */
      .weather-info-layout-compact {
        grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
        padding: 12px 20px;
        gap: 8px;
      }

      /* Detailed Layout - larger cards */
      .weather-info-layout-detailed {
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 16px;
      }

      .weather-info-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px;
        background: var(--secondary-background-color, rgba(0,0,0,0.05));
        border-radius: 8px;
      }

      /* Compact item styling */
      .weather-info-compact {
        padding: 6px 8px;
        gap: 6px;
        justify-content: center;
      }

      .weather-info-compact .weather-info-icon {
        font-size: 18px;
        min-width: 18px;
      }

      .weather-info-compact .weather-info-value {
        font-size: 13px;
        font-weight: 600;
      }

      /* Detailed item styling */
      .weather-info-detailed {
        padding: 12px;
        gap: 12px;
      }

      .weather-info-detailed .weather-info-icon {
        font-size: 28px;
        min-width: 28px;
      }

      .weather-info-detailed .weather-info-label {
        font-size: 12px;
        margin-bottom: 4px;
      }

      .weather-info-detailed .weather-info-value {
        font-size: 16px;
        font-weight: 600;
      }

      .weather-info-icon {
        font-size: 24px;
        min-width: 24px;
        text-align: center;
      }

      .weather-info-content {
        flex: 1;
        min-width: 0;
      }

      .weather-info-label {
        font-size: 11px;
        font-weight: 400;
        opacity: 0.7;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 2px;
      }

      .weather-info-value {
        font-size: 15px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      ha-card.night-mode .weather-info-section {
        background: transparent; /* No background - show stars */
        border-top-color: rgba(232, 234, 246, 0.1);
      }

      ha-card.night-mode .weather-info-item {
        background: transparent; /* No boxes - show stars */
      }

      /* Weather Info in Header (compact mode) */
      .weather-info-in-header {
        margin-top: 8px;
      }

      .weather-info-in-header .weather-info-section {
        background: transparent;
        border-top: none;
        padding: 0;
        gap: 0;
        grid-template-columns: 1fr 1fr 1fr;
        justify-content: space-evenly;
      }

      .weather-info-in-header .weather-info-item {
        background: transparent;
        padding: 4px;
        border-radius: 0;
        gap: 2px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .weather-info-in-header .weather-info-value {
        font-size: 12px;
        font-weight: 200;
        line-height: 1;
      }

      .weather-info-in-header .weather-info-label-compact {
        font-size: 10px;
        font-weight: 400;
        opacity: 0.8;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        line-height: 1;
      }

      /* For graphical mode (outside card-header) */
      .graphical-header + .weather-info-in-header {
        padding: 0 32px 20px 32px;
      }

      .graphical-header + .weather-info-in-header .weather-info-section {
        background: transparent;
        padding: 0;
        border: none;
      }

      .graphical-header + .weather-info-in-header .weather-info-item {
        background: transparent;
        color: white;
      }

      /* Rain Timing Banner (Lower Third Style) */
      .rain-timing-banner {
        background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
        padding: 12px 20px;
        border-bottom: 3px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        position: relative;
        overflow: hidden;
      }

      .rain-timing-banner::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        animation: shimmer 3s infinite;
      }

      @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
      }

      .rain-timing-content {
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 600;
        color: white;
        font-size: 15px;
        position: relative;
        z-index: 1;
      }

      .rain-icon {
        font-size: 24px;
        animation: rainBounce 2s ease-in-out infinite;
      }

      @keyframes rainBounce {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-4px); }
      }

      .rain-message {
        flex: 1;
        letter-spacing: 0.3px;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      }

      .rain-time {
        opacity: 0.9;
        font-size: 14px;
        font-weight: 500;
      }

      /* Night mode styling for rain banner */
      ha-card.night-mode .rain-timing-banner {
        background: linear-gradient(135deg, #2c5f8d 0%, #1a3a5c 100%);
        border-bottom-color: rgba(255, 255, 255, 0.2);
      }

      /* NWS Alerts Section */
      .nws-alerts-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px 20px;
        background: var(--card-background-color, rgba(0,0,0,0.02));
        border-top: 1px solid var(--divider-color, rgba(0,0,0,0.1));
      }

      .nws-alert {
        padding: 12px;
        border-radius: 8px;
        border-left: 4px solid;
        background: var(--secondary-background-color, rgba(0,0,0,0.05));
      }

      .nws-alert.alert-extreme {
        border-left-color: #d32f2f;
        background: rgba(211, 47, 47, 0.1);
      }

      .nws-alert.alert-severe {
        border-left-color: #f57c00;
        background: rgba(245, 124, 0, 0.1);
      }

      .nws-alert.alert-moderate {
        border-left-color: #fbc02d;
        background: rgba(251, 192, 45, 0.1);
      }

      .nws-alert.alert-minor {
        border-left-color: #1976d2;
        background: rgba(25, 118, 210, 0.1);
      }

      .nws-alert.alert-unknown {
        border-left-color: #757575;
        background: rgba(117, 117, 117, 0.1);
      }

      .alert-header {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        margin-bottom: 8px;
      }

      .alert-icon {
        font-size: 20px;
        line-height: 1;
        flex-shrink: 0;
      }

      .alert-title {
        flex: 1;
        min-width: 0;
      }

      .alert-event {
        font-size: 15px;
        font-weight: 600;
        line-height: 1.2;
        margin-bottom: 2px;
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }

      .urgency-badge {
        display: inline-block;
        font-size: 9px;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 3px;
        background: rgba(255, 255, 255, 0.3);
        color: #fff;
        letter-spacing: 0.5px;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      }

      .alert-area {
        font-size: 12px;
        opacity: 0.7;
        line-height: 1.2;
      }

      .alert-headline {
        font-size: 13px;
        line-height: 1.4;
        margin-bottom: 6px;
      }

      .alert-instruction {
        font-size: 13px;
        line-height: 1.4;
        margin-bottom: 6px;
        padding: 8px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
      }

      .alert-expires {
        font-size: 11px;
        opacity: 0.6;
        font-style: italic;
      }

      ha-card.night-mode .nws-alerts-section {
        background: rgba(10, 14, 39, 0.4);
        border-top-color: rgba(232, 234, 246, 0.1);
      }

      ha-card.night-mode .nws-alert {
        background: rgba(29, 33, 56, 0.6);
      }

      ha-card.night-mode .nws-alert.alert-extreme {
        background: rgba(211, 47, 47, 0.2);
      }

      ha-card.night-mode .nws-alert.alert-severe {
        background: rgba(245, 124, 0, 0.2);
      }

      ha-card.night-mode .nws-alert.alert-moderate {
        background: rgba(251, 192, 45, 0.2);
      }

      ha-card.night-mode .nws-alert.alert-minor {
        background: rgba(25, 118, 210, 0.2);
      }

      /* Alert Glow Effects for Extreme/Severe */
      ha-card.alert-glow-extreme {
        box-shadow: 0 0 20px rgba(211, 47, 47, 0.6),
                    0 0 40px rgba(211, 47, 47, 0.4),
                    0 0 60px rgba(211, 47, 47, 0.2);
        animation: pulse-extreme 2s ease-in-out infinite;
      }

      ha-card.alert-glow-severe {
        box-shadow: 0 0 15px rgba(245, 124, 0, 0.5),
                    0 0 30px rgba(245, 124, 0, 0.3),
                    0 0 45px rgba(245, 124, 0, 0.2);
        animation: pulse-severe 2s ease-in-out infinite;
      }

      @keyframes pulse-extreme {
        0%, 100% {
          box-shadow: 0 0 20px rgba(211, 47, 47, 0.6),
                      0 0 40px rgba(211, 47, 47, 0.4),
                      0 0 60px rgba(211, 47, 47, 0.2);
        }
        50% {
          box-shadow: 0 0 25px rgba(211, 47, 47, 0.8),
                      0 0 50px rgba(211, 47, 47, 0.6),
                      0 0 75px rgba(211, 47, 47, 0.4);
        }
      }

      @keyframes pulse-severe {
        0%, 100% {
          box-shadow: 0 0 15px rgba(245, 124, 0, 0.5),
                      0 0 30px rgba(245, 124, 0, 0.3),
                      0 0 45px rgba(245, 124, 0, 0.2);
        }
        50% {
          box-shadow: 0 0 20px rgba(245, 124, 0, 0.7),
                      0 0 40px rgba(245, 124, 0, 0.5),
                      0 0 60px rgba(245, 124, 0, 0.3);
        }
      }

      /* Extreme Temperature Glow Effects */
      ha-card.temp-glow-hot {
        box-shadow: 0 0 20px rgba(230, 74, 25, 0.6),
                    0 0 40px rgba(230, 74, 25, 0.4),
                    0 0 60px rgba(230, 74, 25, 0.2);
        animation: pulse-hot 3s ease-in-out infinite;
      }

      ha-card.temp-glow-freezing {
        box-shadow: 0 0 20px rgba(79, 195, 247, 0.6),
                    0 0 40px rgba(79, 195, 247, 0.4),
                    0 0 60px rgba(79, 195, 247, 0.2);
        animation: pulse-freezing 3s ease-in-out infinite;
      }

      @keyframes pulse-hot {
        0%, 100% {
          box-shadow: 0 0 20px rgba(230, 74, 25, 0.6),
                      0 0 40px rgba(230, 74, 25, 0.4),
                      0 0 60px rgba(230, 74, 25, 0.2);
        }
        50% {
          box-shadow: 0 0 25px rgba(230, 74, 25, 0.8),
                      0 0 50px rgba(230, 74, 25, 0.6),
                      0 0 75px rgba(230, 74, 25, 0.4);
        }
      }

      @keyframes pulse-freezing {
        0%, 100% {
          box-shadow: 0 0 20px rgba(79, 195, 247, 0.6),
                      0 0 40px rgba(79, 195, 247, 0.4),
                      0 0 60px rgba(79, 195, 247, 0.2);
        }
        50% {
          box-shadow: 0 0 25px rgba(79, 195, 247, 0.8),
                      0 0 50px rgba(79, 195, 247, 0.6),
                      0 0 75px rgba(79, 195, 247, 0.4);
        }
      }

      /* Holiday Decorations Overlay */
      .holiday-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 10;
        overflow: hidden;
      }

      .holiday-icon {
        position: absolute;
        font-size: 32px;
        opacity: 0.3;
        animation: holiday-float 4s ease-in-out infinite;
      }

      .holiday-icon-1 {
        top: 10px;
        right: 10px;
        animation-delay: 0s;
      }

      .holiday-icon-2 {
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        animation-delay: 1s;
      }

      .holiday-icon-3 {
        bottom: 10px;
        right: 50px;
        animation-delay: 2s;
      }

      .holiday-icon-4 {
        top: 100px;
        right: 50%;
        transform: translateX(50%);
        animation-delay: 3s;
      }

      @keyframes holiday-float {
        0%, 100% {
          transform: translateY(0px) rotate(0deg);
          opacity: 0.3;
        }
        50% {
          transform: translateY(-10px) rotate(5deg);
          opacity: 0.5;
        }
      }

      /* ========================================
         PRE-BUILT THEMES
         ======================================== */

      /* RETRO THEME - 1990s Weather Channel (WeatherStar 4000 inspired) */
      ha-card.theme-retro {
        background: linear-gradient(135deg, #001f3f 0%, #0074D9 50%, #FF851B 100%) !important;
        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        color: white !important;
      }

      ha-card.theme-retro .card-header {
        background: transparent !important;
        border-radius: 0 !important;
        border-bottom: none;
        color: white !important;
      }

      ha-card.theme-retro .graphical-header {
        background: linear-gradient(135deg, #001f3f 0%, #0074D9 50%, #FF851B 100%) !important;
        border-radius: 0 !important;
        border-bottom: none;
      }

      ha-card.theme-retro .graphical-header::after,
      ha-card.theme-retro .graphical-overlay {
        background: transparent !important;
        backdrop-filter: none !important;
      }

      ha-card.theme-retro .card-content {
        background: rgba(0, 31, 63, 0.3) !important;
      }

      ha-card.theme-retro .forecast-day,
      ha-card.theme-retro .forecast-hour {
        background: transparent !important;
        border: none !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        color: white !important;
      }

      ha-card.theme-retro .forecast-compact {
        background: rgba(0, 116, 217, 0.3) !important;
        border: none !important;
        border-radius: 0 !important;
      }

      ha-card.theme-retro .weather-info-item {
        background: rgba(0, 116, 217, 0.25) !important;
        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        color: white !important;
      }

      ha-card.theme-retro .weather-info-section {
        background: transparent !important;
        border-top: 1px solid rgba(255, 255, 255, 0.2) !important;
        padding-top: 12px !important;
        margin-top: 8px !important;
      }

      ha-card.theme-retro .nws-alert {
        background: rgba(0, 31, 63, 0.5) !important;
        border: none !important;
        border-left: 3px solid !important;
        border-radius: 0 !important;
        color: white !important;
      }

      ha-card.theme-retro .day-name,
      ha-card.theme-retro .hour-name,
      ha-card.theme-retro .temp-high,
      ha-card.theme-retro .temp-low,
      ha-card.theme-retro .weather-info-label,
      ha-card.theme-retro .weather-info-value {
        color: white !important;
      }

      ha-card.theme-retro .temp-bar {
        background: rgba(255, 255, 255, 0.2) !important;
      }

      /* RETRO THEME - Night Mode */
      ha-card.theme-retro.night-mode::before {
        opacity: 1 !important; /* Keep stars visible */
      }

      ha-card.theme-retro.night-mode .card-header {
        filter: brightness(0.7) !important; /* Less dimming than default */
        color: white !important;
      }

      ha-card.theme-retro.night-mode .card-header::after {
        display: none !important; /* No default night mode overlay */
      }

      ha-card.theme-retro.night-mode .card-content {
        background: rgba(0, 10, 30, 0.5) !important; /* Dim the bottom */
      }

      ha-card.theme-retro.night-mode .forecast-day,
      ha-card.theme-retro.night-mode .forecast-hour {
        border-bottom-color: rgba(255, 255, 255, 0.15) !important;
      }

      /* MIDNIGHT THEME - Sleek Modern Dark */
      ha-card.theme-midnight {
        background: #0d0d0d !important;
        border: 1px solid #1a1a1a !important;
        border-radius: 12px !important;
        box-shadow:
          0 8px 32px rgba(0, 0, 0, 0.8),
          0 2px 8px rgba(0, 0, 0, 0.6) !important;
        color: #c0c0c0 !important;
      }

      ha-card.theme-midnight .card-header {
        background: linear-gradient(135deg, #1a1a1a 0%, #252525 100%) !important;
        color: #d0d0d0 !important;
        border-bottom: 1px solid #1a1a1a;
        border-radius: 12px 12px 0 0 !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      }

      ha-card.theme-midnight .graphical-header::after {
        background: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8)) !important;
      }

      ha-card.theme-midnight .card-content {
        background: #0d0d0d !important;
        color: #c0c0c0 !important;
      }

      ha-card.theme-midnight .forecast-day,
      ha-card.theme-midnight .forecast-hour {
        background: #151515 !important;
        border: none !important;
        border-bottom: 1px solid #1a1a1a !important;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5) !important;
        color: #c0c0c0 !important;
        padding: 12px 16px !important;
      }

      ha-card.theme-midnight .forecast-day:hover,
      ha-card.theme-midnight .forecast-hour:hover {
        background: #1d1d1d !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7) !important;
      }

      ha-card.theme-midnight .forecast-day.forecast-compact,
      ha-card.theme-midnight .forecast-hour.forecast-compact {
        background: #151515 !important;
        border: 1px solid #1a1a1a !important;
        border-radius: 10px !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7) !important;
        color: #c0c0c0 !important;
      }

      ha-card.theme-midnight .forecast-day.forecast-compact:hover,
      ha-card.theme-midnight .forecast-hour.forecast-compact:hover {
        background: #1d1d1d !important;
        border-color: #333333 !important;
        box-shadow:
          0 4px 12px rgba(0, 0, 0, 0.7),
          0 0 0 1px #333333 !important;
      }

      ha-card.theme-midnight .weather-info-item {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        color: #c0c0c0 !important;
      }

      ha-card.theme-midnight .weather-info-section {
        background: transparent !important;
        border-top: none !important;
        padding-top: 12px !important;
        margin-top: 8px !important;
      }

      ha-card.theme-midnight .nws-alert {
        background: #151515 !important;
        border: 1px solid #1a1a1a !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7) !important;
      }

      /* MIDNIGHT THEME - Night Mode (Even Darker) */
      ha-card.theme-midnight.night-mode {
        background: #000000 !important;
        border-color: #0d0d0d !important;
      }

      ha-card.theme-midnight.night-mode .card-header {
        background: linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%) !important;
        color: #b0b0b0 !important;
      }

      ha-card.theme-midnight.night-mode .card-content {
        background: #000000 !important;
      }

      ha-card.theme-midnight.night-mode .forecast-day,
      ha-card.theme-midnight.night-mode .forecast-hour {
        background: #0a0a0a !important;
        border-bottom-color: #0d0d0d !important;
      }

      ha-card.theme-midnight.night-mode .forecast-day.forecast-compact,
      ha-card.theme-midnight.night-mode .forecast-hour.forecast-compact {
        background: #0a0a0a !important;
        border-color: #0d0d0d !important;
      }

      ha-card.theme-midnight.night-mode .weather-info-item {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
      }

      ha-card.theme-midnight.night-mode .weather-info-section {
        background: transparent !important;
        border-top: none !important;
      }

      /* MINIMAL THEME */
      ha-card.theme-minimal {
        background: #ffffff !important;
        border: 1px solid #e0e0e0 !important;
        box-shadow: none !important;
        color: #333 !important;
      }

      ha-card.theme-minimal .card-header {
        background: #f8f8f8 !important; /* Override gradient */
        color: #333 !important;
        border-bottom: 1px solid #e0e0e0;
      }

      ha-card.theme-minimal .graphical-header::after {
        background: linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.7)) !important;
      }

      ha-card.theme-minimal .card-content {
        background: #ffffff !important;
      }

      ha-card.theme-minimal .forecast-day,
      ha-card.theme-minimal .forecast-hour {
        background: transparent !important;
        border: none !important;
        border-bottom: 1px solid #f0f0f0 !important;
        box-shadow: none !important;
        color: #333 !important;
      }

      ha-card.theme-minimal .forecast-day.forecast-compact,
      ha-card.theme-minimal .forecast-hour.forecast-compact {
        background: #f8f8f8 !important;
        border: 1px solid #e0e0e0 !important;
      }

      ha-card.theme-minimal .weather-info-item {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        color: #333 !important;
      }

      ha-card.theme-minimal .weather-info-section {
        background: #ffffff !important;
        border-top: 1px solid #e0e0e0 !important;
        padding-top: 12px !important;
        margin-top: 8px !important;
      }

      ha-card.theme-minimal .nws-alert {
        background: #f8f8f8 !important;
        border: 1px solid #e0e0e0 !important;
        color: #333 !important;
      }

      ha-card.theme-minimal .day-name,
      ha-card.theme-minimal .hour-name,
      ha-card.theme-minimal .temp-high,
      ha-card.theme-minimal .temp-low,
      ha-card.theme-minimal .weather-info-label,
      ha-card.theme-minimal .weather-info-value {
        color: #333 !important;
      }

      ha-card.theme-minimal .temp-bar {
        background: #e0e0e0 !important;
      }

      ha-card.theme-minimal .weather-icon-svg {
        filter: grayscale(20%) !important;
      }

      /* MINIMAL THEME - Night Mode */
      ha-card.theme-minimal.night-mode {
        background: transparent !important; /* Transparent to show stars */
        border-color: rgba(232, 234, 246, 0.2) !important;
      }

      ha-card.theme-minimal.night-mode::before {
        opacity: 1 !important; /* Full stars visibility */
      }

      ha-card.theme-minimal.night-mode .card-header {
        background: rgba(20, 24, 35, 0.85) !important; /* Dark with transparency */
        filter: none !important;
        color: white !important;
        border-bottom-color: rgba(232, 234, 246, 0.15) !important;
      }

      ha-card.theme-minimal.night-mode .card-header::after {
        display: none !important;
      }

      ha-card.theme-minimal.night-mode .card-content {
        background: rgba(10, 14, 27, 0.7) !important; /* Dark semi-transparent */
        color: #e8eaf6 !important;
      }

      ha-card.theme-minimal.night-mode .forecast-day.forecast-compact,
      ha-card.theme-minimal.night-mode .forecast-hour.forecast-compact {
        background: rgba(29, 33, 56, 0.4) !important; /* More transparent - show stars */
        border-color: rgba(232, 234, 246, 0.1) !important;
      }

      ha-card.theme-minimal.night-mode .weather-info-section {
        background: transparent !important; /* Show stars */
        border-top-color: rgba(232, 234, 246, 0.15) !important;
      }

      ha-card.theme-minimal.night-mode .weather-info-item {
        background: transparent !important; /* Show stars */
      }

      ha-card.theme-minimal.night-mode .day-name,
      ha-card.theme-minimal.night-mode .hour-name,
      ha-card.theme-minimal.night-mode .temp-high,
      ha-card.theme-minimal.night-mode .temp-low,
      ha-card.theme-minimal.night-mode .weather-info-label,
      ha-card.theme-minimal.night-mode .weather-info-value {
        color: white !important; /* Bright white text */
      }

      ha-card.theme-minimal.night-mode .forecast-day,
      ha-card.theme-minimal.night-mode .forecast-hour {
        border-bottom-color: rgba(232, 234, 246, 0.1) !important;
        color: white !important;
      }

      /* VIBRANT THEME */
      ha-card.theme-vibrant {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        border: none !important;
        box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4) !important;
        color: white !important;
      }

      ha-card.theme-vibrant .card-header {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important;
        color: white !important;
        border-bottom: none;
      }

      ha-card.theme-vibrant .graphical-header::after {
        background: linear-gradient(to bottom, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.6)) !important;
      }

      ha-card.theme-vibrant .card-content {
        background: rgba(102, 126, 234, 0.2) !important;
      }

      ha-card.theme-vibrant .forecast-day,
      ha-card.theme-vibrant .forecast-hour {
        background: transparent !important;
        border: none !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
        color: white !important;
      }

      ha-card.theme-vibrant .forecast-day.forecast-compact,
      ha-card.theme-vibrant .forecast-hour.forecast-compact {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1)) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
      }

      ha-card.theme-vibrant .weather-info-item {
        background: transparent !important;
        border: none !important;
        color: white !important;
      }

      ha-card.theme-vibrant .weather-info-section {
        background: transparent !important;
        border-top: 1px solid rgba(255, 255, 255, 0.2) !important;
        padding-top: 12px !important;
        margin-top: 8px !important;
      }

      ha-card.theme-vibrant .nws-alert {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15)) !important;
        border: 1px solid rgba(255, 255, 255, 0.4) !important;
        color: white !important;
      }

      ha-card.theme-vibrant .day-name,
      ha-card.theme-vibrant .hour-name,
      ha-card.theme-vibrant .temp-high,
      ha-card.theme-vibrant .temp-low,
      ha-card.theme-vibrant .weather-info-label,
      ha-card.theme-vibrant .weather-info-value {
        color: white !important;
      }

      ha-card.theme-vibrant .temp-bar {
        background: rgba(255, 255, 255, 0.2) !important;
      }

      ha-card.theme-vibrant .weather-icon-svg {
        filter: brightness(1.2) saturate(1.3) !important;
      }

      /* VIBRANT THEME - Night Mode */
      ha-card.theme-vibrant.night-mode {
        background: linear-gradient(135deg, #2a3a6e 0%, #3a255e 100%) !important; /* Darker vibrant gradient */
        box-shadow: 0 10px 40px rgba(42, 58, 110, 0.6) !important;
      }

      ha-card.theme-vibrant.night-mode::before {
        opacity: 0.5 !important; /* Medium stars */
      }

      ha-card.theme-vibrant.night-mode .card-header {
        background: linear-gradient(135deg, #7a4ba2 0%, #a53a5c 100%) !important; /* Darker pink/purple */
        filter: none !important;
        color: white !important;
      }

      ha-card.theme-vibrant.night-mode .card-header::after {
        display: none !important;
      }

      ha-card.theme-vibrant.night-mode .card-content {
        background: rgba(42, 58, 110, 0.3) !important;
      }

      ha-card.theme-vibrant.night-mode .forecast-day.forecast-compact,
      ha-card.theme-vibrant.night-mode .forecast-hour.forecast-compact {
        background: rgba(122, 75, 162, 0.3) !important;
      }

      /* CUSTOM THEME - Uses CSS Variables */
      ha-card.theme-custom {
        --theme-primary: var(--custom-primary, #667eea);
        --theme-secondary: var(--custom-secondary, #764ba2);
        --theme-background: var(--custom-background, #ffffff);
        --theme-text: var(--custom-text, #333333);
        --theme-border: var(--custom-border, #e0e0e0);
        --theme-accent: var(--custom-accent, #f093fb);

        background: var(--theme-background) !important;
        border: 2px solid var(--theme-border) !important;
        color: var(--theme-text) !important;
      }

      ha-card.theme-custom .card-header {
        background: var(--theme-primary) !important;
        color: white !important;
      }

      ha-card.theme-custom .card-content {
        background: var(--theme-background) !important;
      }

      ha-card.theme-custom .forecast-day,
      ha-card.theme-custom .forecast-hour {
        background: transparent !important;
        border: none !important;
        border-bottom: 1px solid var(--theme-border) !important;
        color: var(--theme-text) !important;
      }

      ha-card.theme-custom .forecast-compact {
        background: var(--theme-secondary) !important;
        border: 1px solid var(--theme-border) !important;
        color: white !important;
      }

      ha-card.theme-custom .weather-info-item {
        background: transparent !important;
        border: none !important;
        color: var(--theme-text) !important;
      }

      ha-card.theme-custom .weather-info-section {
        background: transparent !important;
        border-top: 1px solid var(--theme-border) !important;
        padding-top: 12px !important;
        margin-top: 8px !important;
      }

      ha-card.theme-custom .nws-alert {
        background: var(--theme-accent) !important;
        border: 1px solid var(--theme-border) !important;
        color: var(--theme-text) !important;
      }

      ha-card.theme-custom .day-name,
      ha-card.theme-custom .hour-name,
      ha-card.theme-custom .temp-high,
      ha-card.theme-custom .temp-low,
      ha-card.theme-custom .weather-info-label,
      ha-card.theme-custom .weather-info-value {
        color: var(--theme-text) !important;
      }

      ha-card.theme-custom .temp-bar {
        background: var(--theme-border) !important;
      }

      /* CUSTOM THEME - Night Mode */
      ha-card.theme-custom.night-mode {
        background: #1a1d2e !important; /* Dark background override */
        border-color: #2a2d3e !important;
      }

      ha-card.theme-custom.night-mode::before {
        opacity: 0.4 !important; /* Medium-faint stars */
      }

      ha-card.theme-custom.night-mode .card-header {
        filter: brightness(0.6) !important; /* Dim the custom header color */
        color: #e8eaf6 !important;
      }

      ha-card.theme-custom.night-mode .card-header::after {
        display: none !important;
      }

      ha-card.theme-custom.night-mode .card-content {
        background: #1a1d2e !important;
        color: #e8eaf6 !important;
      }

      ha-card.theme-custom.night-mode .day-name,
      ha-card.theme-custom.night-mode .hour-name,
      ha-card.theme-custom.night-mode .temp-high,
      ha-card.theme-custom.night-mode .temp-low,
      ha-card.theme-custom.night-mode .weather-info-label,
      ha-card.theme-custom.night-mode .weather-info-value {
        color: #e8eaf6 !important;
      }

      ha-card.theme-custom.night-mode .forecast-day,
      ha-card.theme-custom.night-mode .forecast-hour {
        border-bottom-color: #2a2d3e !important;
      }

      .card-content {
        padding: 20px;
      }

      /* Make card-content transparent for compact view - show background through */
      .card-content-compact {
        background: transparent !important;
      }

      .forecast-container {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      /* Chart View Mode */
      .forecast-chart {
        padding: 16px 0;
      }

      .chart-labels {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        padding: 0 4px;
      }

      .chart-label {
        flex: 1;
        text-align: center;
        font-size: 14px;
        font-weight: 600;
      }

      .chart-wrapper {
        position: relative;
        height: 180px;
      }

      .chart-lines {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
      }

      .chart-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        height: 100%;
        position: relative;
        gap: 8px;
        z-index: 1;
      }

      .chart-column {
        flex: 1;
        position: relative;
        height: 100%;
      }

      .chart-point {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }

      .chart-point-high {
        background: rgba(255, 120, 80, 1);
        box-shadow: 0 0 4px rgba(255, 120, 80, 0.5);
      }

      .chart-point-low {
        background: #4A9EFF;
        box-shadow: 0 0 6px rgba(74, 158, 255, 0.6);
      }

      .chart-point-single {
        background: rgba(255, 150, 100, 1);
        box-shadow: 0 0 4px rgba(255, 150, 100, 0.5);
      }

      .chart-temp {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-weight: 700;
        font-size: 15px;
        white-space: nowrap;
      }

      .chart-temp-high {
        color: rgba(255, 120, 80, 1);
        transform: translateX(-50%) translateY(-26px);
      }

      .chart-temp-low {
        color: #4A9EFF;
        transform: translateX(-50%) translateY(26px);
      }

      .chart-temp-single {
        color: rgba(255, 150, 100, 1);
        margin-bottom: 18px;
      }

      /* Compact mode container - different for daily vs hourly */
      .forecast-container.forecast-compact.forecast-type-daily {
        display: flex !important;
        flex-direction: row !important;
        gap: 8px !important;
        justify-content: space-between !important;
        flex-wrap: wrap !important;
        background: transparent !important;
      }

      .forecast-container.forecast-compact.forecast-type-hourly {
        display: flex !important;
        flex-direction: row !important;
        gap: 8px !important;
        overflow-x: auto !important;
        flex-wrap: nowrap !important;
        padding-bottom: 8px;
        background: transparent !important;
      }

      .forecast-day {
        display: grid;
        grid-template-columns: 55px 45px 1fr auto;
        align-items: center;
        gap: 10px;
        padding: 5px 0;
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

      /* Compact view mode - vertical cards in horizontal row */
      .forecast-type-daily .forecast-compact {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        padding: 16px 12px;
        border-radius: 4px;
        flex: 1;
        min-width: 0;
        border: none;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        transition: transform 0.2s ease;
      }

      .forecast-type-daily .forecast-compact:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      .forecast-type-hourly .forecast-compact {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 14px 10px;
        background: linear-gradient(180deg, #2E5F8A 0%, #4A7FA8 100%);
        border-radius: 4px;
        flex: 0 0 auto;
        width: 80px;
        border: 2px solid transparent;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        transition: transform 0.2s ease;
      }

      .forecast-type-hourly .forecast-compact:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      .forecast-compact .day-name {
        font-weight: 700;
        font-size: 15px;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .day-icon-small {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .day-icon-small .weather-icon-svg {
        width: 40px;
        height: 40px;
      }

      .day-icon-small .icon-emoji {
        font-size: 36px;
      }

      .compact-temps {
        display: flex;
        flex-direction: column;
        gap: 2px;
        align-items: center;
        text-align: center;
      }

      .temp-high-compact {
        font-size: 32px;
        font-weight: 700;
        line-height: 1;
      }

      .temp-separator {
        display: none;
      }

      .temp-low-compact {
        font-size: 20px;
        font-weight: 500;
        opacity: 0.75;
        line-height: 1;
      }

      .precip-compact {
        font-size: 11px;
        opacity: 0.8;
        text-align: center;
        font-weight: 500;
      }

      /* Detailed view mode - individual forecast items */
      .forecast-day.forecast-detailed,
      .forecast-hour.forecast-detailed {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 16px;
        padding: 4px 0;
        border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.1));
        align-items: center;
      }

      .detailed-name-icon {
        display: flex;
        align-items: center;
        gap: 24px;
      }

      .detailed-name-icon .day-icon {
        font-size: 80px;
      }

      .detailed-name-icon .day-icon .weather-icon-svg {
        width: 80px;
        height: 80px;
      }

      .detailed-name-icon .day-icon .icon-emoji {
        font-size: 80px;
      }

      .detailed-name-icon .day-name {
        font-size: 18px;
        font-weight: 600;
        white-space: nowrap;
        min-width: 50px;
      }

      .detailed-temps {
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: center;
        justify-content: center;
      }

      .temp-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 20px;
        font-weight: 600;
        white-space: nowrap;
      }

      .temp-item .temp-icon {
        width: 32px;
        height: 32px;
        flex-shrink: 0;
      }

      .detailed-info {
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-size: 14px;
        justify-content: center;
        align-items: flex-end;
      }

      .detail-item {
        display: flex;
        align-items: center;
        gap: 6px;
        justify-content: flex-end;
        min-width: 100px;
      }

      .detail-icon {
        font-size: 16px;
        width: 18px;
        text-align: center;
      }

      .detail-text {
        font-size: 14px;
        font-weight: 500;
        text-align: right;
        min-width: 70px;
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
        font-size: 14px;
        font-weight: 400;
        opacity: 0.75;
      }

      /* Hourly forecast styles */
      .forecast-hour {
        display: grid;
        grid-template-columns: 55px 45px auto auto;
        align-items: center;
        gap: 10px;
        padding: 5px 0;
        border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.1));
      }

      .forecast-hour:last-child {
        border-bottom: none;
      }

      /* 2-column layout for hourly standard mode */
      .forecast-type-hourly.forecast-standard {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px 16px;
      }

      .forecast-type-hourly.forecast-standard .forecast-hour {
        border-bottom: none;
        padding: 8px;
        background: var(--card-background-color, rgba(0,0,0,0.05));
        border-radius: 8px;
      }

      .hour-name {
        font-weight: 500;
        font-size: 14px;
      }

      .hour-temp {
        font-size: 16px;
        font-weight: 500;
      }

      /* Hourly detailed mode */
      .forecast-hour.forecast-detailed {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 8px 0;
        border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.1));
      }

      .hour-info-row {
        display: grid;
        grid-template-columns: 55px 45px auto;
        align-items: center;
        gap: 10px;
      }

      .hour-temp-display {
        font-size: 18px;
        font-weight: 600;
      }

      .hour-details {
        display: flex;
        gap: 16px;
        font-size: 13px;
        opacity: 0.8;
        padding-left: 8px;
      }

      /* Compact mode hour name */
      .forecast-compact .hour-name {
        font-weight: 500;
        font-size: 12px;
        text-align: center;
      }

      .forecast-compact .hour-temp {
        font-size: 16px;
        font-weight: 600;
        text-align: center;
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
