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
import { getAnimatedWeatherIcon, getMoonPhaseIcon } from './icons';

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
    } catch (error) {
      // Fallback to legacy forecast from attributes
      const entity = this.hass.states[this.config.entity];
      if (entity?.attributes?.forecast) {
        this.forecastData = entity.attributes.forecast;
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
          // Compact: Label above value (like ACTUAL temp)
          items.push(html`
            <div class="weather-info-item weather-info-compact">
              <div class="weather-info-value">${value}</div>
              <div class="weather-info-label-compact">${label.toUpperCase()}</div>
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
        const conditionText = (weatherData.condition || 'clear')
          .split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

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
    const iconClass = useForecastIcon ? getForecastIcon(condition) : getWeatherIcon(condition);
    const animate = this.config.animate_icons !== false;

    // For night conditions, use moon phase icons if available
    if ((iconClass === 'clear-night' || iconClass === 'partlycloudy-night') && animate) {
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
      return html`
        <div class="forecast-day forecast-compact">
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

    // Detailed mode - standard layout with extra details below
    if (viewMode === 'detailed') {
      return html`
        <div class="forecast-day forecast-detailed">
          <div class="day-info-row">
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
          </div>
          ${precipProb > 0 || humidity || windSpeed ? html`
            <div class="day-details">
              ${precipProb > 0 ? html`<div class="detail-item"><span>💧</span> ${precipProb}%</div>` : ''}
              ${humidity ? html`<div class="detail-item"><span>💨</span> ${humidity}%</div>` : ''}
              ${windSpeed ? html`<div class="detail-item"><span>🌬️</span> ${Math.round(windSpeed)} mph</div>` : ''}
            </div>
          ` : ''}
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

    return html`
      <ha-card class="${nightModeClass} ${alertGlowClass}">
        ${this.renderHeader()}
        ${this.renderNWSAlerts()}
        ${!showWeatherInfoInHeader ? this.renderWeatherInfo() : ''}
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
        color: #e8eaf6 !important;
        filter: brightness(0.4) contrast(1.1);
      }

      ha-card.night-mode .card-header::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(26, 31, 58, 0.7) 0%, rgba(45, 53, 97, 0.7) 100%);
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
        background: rgba(10, 14, 39, 0.6);
        color: #e8eaf6;
      }

      ha-card.night-mode .forecast-day,
      ha-card.night-mode .forecast-hour {
        border-bottom-color: rgba(232, 234, 246, 0.1);
      }

      ha-card.night-mode .temp-bar {
        background: rgba(232, 234, 246, 0.15);
      }

      ha-card.night-mode .forecast-compact {
        background: rgba(29, 33, 56, 0.7) !important;
      }

      ha-card.night-mode .forecast-type-hourly.forecast-standard .forecast-hour {
        background: rgba(29, 33, 56, 0.7) !important;
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
        background: rgba(10, 14, 39, 0.4);
        border-top-color: rgba(232, 234, 246, 0.1);
      }

      ha-card.night-mode .weather-info-item {
        background: rgba(29, 33, 56, 0.6);
      }

      /* Weather Info in Header (compact mode) */
      .weather-info-in-header {
        margin-top: 12px;
      }

      .weather-info-in-header .weather-info-section {
        background: transparent;
        border-top: none;
        padding: 0;
        gap: 0;
        grid-template-columns: repeat(auto-fit, minmax(50px, max-content));
        justify-content: space-evenly;
      }

      .weather-info-in-header .weather-info-item {
        background: transparent;
        padding: 0;
        border-radius: 0;
        gap: 2px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .weather-info-in-header .weather-info-value {
        font-size: 18px;
        font-weight: 500;
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

      .card-content {
        padding: 20px;
      }

      .forecast-container {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      /* Compact mode container - different for daily vs hourly */
      .forecast-type-daily.forecast-compact,
      .forecast-container.forecast-compact.forecast-type-daily {
        display: flex !important;
        flex-direction: row !important;
        gap: 8px !important;
        justify-content: space-between !important;
        flex-wrap: wrap !important;
      }

      .forecast-type-hourly.forecast-compact,
      .forecast-container.forecast-compact.forecast-type-hourly {
        display: flex !important;
        flex-direction: row !important;
        gap: 8px !important;
        overflow-x: auto !important;
        flex-wrap: nowrap !important;
        padding-bottom: 8px;
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
        gap: 8px;
        padding: 12px 8px;
        background: var(--card-background-color, #1c1c1c);
        border-radius: 8px;
        flex: 1;
        min-width: 0;
      }

      .forecast-type-hourly .forecast-compact {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 12px 8px;
        background: var(--card-background-color, #1c1c1c);
        border-radius: 8px;
        flex: 0 0 auto;
        width: 70px;
      }

      .forecast-compact .day-name {
        font-weight: 500;
        font-size: 14px;
        text-align: center;
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
        gap: 4px;
        align-items: center;
        text-align: center;
      }

      .temp-high-compact {
        font-size: 18px;
        font-weight: 600;
      }

      .temp-separator {
        display: none;
      }

      .temp-low-compact {
        font-size: 14px;
        opacity: 0.7;
      }

      .precip-compact {
        font-size: 12px;
        opacity: 0.7;
        text-align: center;
      }

      /* Detailed view mode */
      .forecast-detailed {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 8px 0;
        border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.1));
      }

      .day-info-row {
        display: grid;
        grid-template-columns: 55px 45px 1fr auto;
        align-items: center;
        gap: 10px;
      }

      .day-details {
        display: flex;
        gap: 16px;
        font-size: 13px;
        opacity: 0.8;
        padding-left: 8px;
      }

      .detail-item {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .detail-item span {
        font-size: 14px;
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
