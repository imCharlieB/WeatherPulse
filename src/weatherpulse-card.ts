import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { WeatherPulseCardConfig, WeatherData, NWSAlert } from './types';
import {
  getTemperatureGradient,
  getGreeting,
  getWeatherSuggestion, // eslint-disable-line @typescript-eslint/no-unused-vars
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

// Move decorations object outside the class
const decorations: {
  [key: string]: {
    foreground: string[];
    background: string[];
    lights?: {
      colors: string[];
      style: 'round' | 'long';
    };
  }
} = {
  halloween: {
    foreground: ['🪦', '🎃', '🍬'],
    background: ['🦇', '🧛', '🕷️', '👻', '🕸️', '🕷️', '🦹‍♂️', '🧟'],
    lights: {
      colors: ['#ff6b00', '#9c27b0', '#ff9800', '#7b1fa2'],
      style: 'round'
    }
  },
  christmas: {
    foreground: ['🎄', '🎁', '🕯️'],
    background: ['❄️', '🔔', '🦌', '🎅', '⛄', '🌟', '🧑‍🎄'],
    lights: {
      colors: ['#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff69b4'],
      style: 'long'
    }
  },
  newyear: {
    foreground: ['🎊', 'YEAR', '🍾'],  // YEAR will be replaced with dynamic year text (left: confetti, center: 2026, right: champagne)
    background: ['🍾', '🥳', '✨', '🎉'],  // Floating: champagne, party face, sparkles, party popper
    lights: {
      colors: ['#FFD700', '#C0C0C0', '#4169E1', '#FFD700', '#C0C0C0', '#4169E1'],
      style: 'round'
    }
  },
  valentine: {
    foreground: ['💝', '🌹', '💌'],
    background: ['❤️', '💕', '💘', '💖']
  },
  stpatrick: {
    foreground: ['🍀', '☘️', '🍻'],
    background: ['🌈', '💚', '🎩', '🪙']
  },
  july4th: {
    foreground: ['🇺🇸', '🗽', '🎆'],
    background: ['🎇', '⭐', '🎉', '🎊'],
    lights: {
      colors: ['#ff0000', '#ffffff', '#0000ff', '#ff0000', '#ffffff', '#0000ff'],
      style: 'round'
    }
  },
  easter: {
    foreground: ['🐰', '🥚', '🐇'],
    background: ['🌷', '🐣', '💐', '🌸']
  },
  cincodemayo: {
    foreground: ['🇲🇽', '🌮', '🍹'],
    background: ['🌵', '🎉', '🎊', '🎺'],
    lights: {
      colors: ['#ff0000', '#ffffff', '#00ff00', '#ff0000', '#ffffff', '#00ff00'],
      style: 'round'
    }
  },
};

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
  private forecastDebounceTimer?: number;
  private lastForecastFetch: number = 0;

  // Memoization for expensive calculations
  private cachedWeatherData?: WeatherData;
  private lastWeatherEntityState?: string;

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
    if (this.forecastDebounceTimer) {
      clearTimeout(this.forecastDebounceTimer);
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

    // Only trigger re-render if time or date is actually being displayed
    if (this.config.show_time || this.config.show_date) {
      this.requestUpdate();
    }
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    // Config changes always trigger update
    if (changedProps.has('config')) {
      return true;
    }

    // Allow time/date driven updates (clock)
    if (changedProps.has('currentTime') || changedProps.has('currentDate')) {
      return true;
    }

    // Check if hass changed
    if (changedProps.has('hass')) {
      const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
      if (!oldHass) {
        return true;
      }

      // Check main weather entity
      if (oldHass.states[this.config.entity] !== this.hass.states[this.config.entity]) {
        return true;
      }

      // Check outdoor temp sensor if configured
      if (this.config.outdoor_temp_sensor &&
          oldHass.states[this.config.outdoor_temp_sensor] !== this.hass.states[this.config.outdoor_temp_sensor]) {
        return true;
      }

      // Check forecast sensor if configured
      if (this.config.forecast_sensor &&
          oldHass.states[this.config.forecast_sensor] !== this.hass.states[this.config.forecast_sensor]) {
        return true;
      }

      // Check sun entity if showing sunrise/sunset
      const sunEntity = this.config.sun_entity || 'sun.sun';
      if (this.config.show_weather_info?.includes('sunrise_sunset') &&
          oldHass.states[sunEntity] !== this.hass.states[sunEntity]) {
        return true;
      }

      // Check moon entity if showing moon phase
      const moonEntity = this.config.moon_entity || 'sensor.moon_phase';
      if (this.config.show_moon_phase !== false &&
          oldHass.states[moonEntity] !== this.hass.states[moonEntity]) {
        return true;
      }

      // No relevant entities changed
      return false;
    }

    // Check if state properties changed (forecastData, hourlyForecastData, nwsAlerts)
    if (changedProps.has('forecastData') ||
        changedProps.has('hourlyForecastData') ||
        changedProps.has('nwsAlerts')) {
      return true;
    }

    return false;
  }

  private async fetchForecast(): Promise<void> {
    // Clear any pending debounce timer
    if (this.forecastDebounceTimer) {
      clearTimeout(this.forecastDebounceTimer);
    }

    // Debounce: wait 1 second before actually fetching
    this.forecastDebounceTimer = window.setTimeout(async () => {
      // Check if we fetched recently (within last 5 seconds)
      const now = Date.now();
      if (now - this.lastForecastFetch < 5000) {
        return;
      }
      this.lastForecastFetch = now;

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
        console.error('Failed to fetch forecast data:', error);
        this.forecastData = [];
      }
    }, 1000);
  }

  /**
   * Fetch hourly forecast data for rain timing detection
   * Reads from sensor attributes (new HA method for hourly forecasts)
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
    } else {
      this.hourlyForecastData = [];
    }
  }

  private getWeatherData(): WeatherData {
    const entity = this.hass.states[this.config.entity];
    if (!entity) {
      return {};
    }

    // Create a cache key from the entity's last_changed and forecastData length
    // This ensures we recalculate when the entity updates or forecast data changes
    const cacheKey = `${entity.last_changed}_${this.forecastData.length}`;

    // Return cached data if entity hasn't changed
    if (this.cachedWeatherData && this.lastWeatherEntityState === cacheKey) {
      return this.cachedWeatherData;
    }

    // Use fetched forecast data (modern HA only - no legacy fallback)
    const forecast = this.forecastData;

    // Calculate and cache the result
    this.cachedWeatherData = {
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
    this.lastWeatherEntityState = cacheKey;

    return this.cachedWeatherData;
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
    if (!holiday) return '';

    const { background = [] } = decorations[holiday] || {};

    // Custom placement per holiday
    let selectedIcons: string[] = [];
    let iconPlacements: {icon: string, top: number, left: number, size: number}[] = [];

    if (holiday === 'halloween') {
      // Rotate through witch/vampire/zombie (show one of three every 10 seconds)
      const rotatingIndex = Math.floor(Date.now() / 10000) % 3;
      const rotatingIcons = ['🧙‍♀️', '🧛', '🧟'];
      const rotatingIcon = rotatingIcons[rotatingIndex];

      iconPlacements = [
        { icon: '🦇', top: 8, left: 8, size: 2.8 },         // Bat #1 top-left
        { icon: '🦇', top: 35, left: 50, size: 2.6 },       // Bat #2 center
        { icon: rotatingIcon, top: 48, left: 88, size: 2.5 }, // Rotating: witch/vampire/zombie
        { icon: '🕷️', top: 55, left: 48, size: 2.2 },      // Spider center-lower
        { icon: '🕷️', top: 18, left: 88, size: 2 },        // Spider top-right
        { icon: '👻', top: 72, left: 10, size: 2.4 },       // Ghost bottom-left
        { icon: '🕸️', top: 10, left: 88, size: 1.8 }       // Web top-right corner
      ];
    } else if (holiday === 'christmas') {
      // Rotate between Santa and elf
      const rotatingIndex = Math.floor(Date.now() / 10000) % 2;
      const rotatingIcons = ['🎅', '🧑‍🎄'];
      const rotatingIcon = rotatingIcons[rotatingIndex];

      iconPlacements = [
        { icon: '❄️', top: 8, left: 8, size: 2.8 },         // Snowflake #1 top-left
        { icon: '❄️', top: 10, left: 90, size: 2.6 },       // Snowflake #2 top-right
        { icon: '🦌', top: 40, left: 50, size: 2.5 },       // Reindeer center
        { icon: rotatingIcon, top: 50, left: 88, size: 2.4 }, // Rotating: Santa/Elf
        { icon: '⛄', top: 72, left: 10, size: 2.2 },       // Snowman bottom-left
        { icon: '🌟', top: 5, left: 50, size: 2.3 },        // Star #1 top-center
        { icon: '🌟', top: 75, left: 88, size: 2 }          // Star #2 bottom-right
      ];
    } else if (holiday === 'newyear') {
      
      iconPlacements = [
        { icon: '🍾', top: 8, left: 8, size: 2.8 },         // Clock top-left
        { icon: '🎊', top: 10, left: 88, size: 2.6 },       // Confetti ball top-right
        { icon: '🥳', top: 40, left: 50, size: 2.5 },       // Partying face center
        { icon: '🍾', top: 72, left: 88, size: 2.2 },       // Champagne bottom-right
        { icon: '✨', top: 55, left: 48, size: 2.2 },       // Sparkles center-lower
        { icon: '🎉', top: 72, left: 10, size: 2.2 }        // Party popper bottom-left
      ];
    } else if (holiday === 'valentine') {
      iconPlacements = [
        { icon: '❤️', top: 8, left: 10, size: 2.8 },        // Red heart #1 top-left
        { icon: '❤️', top: 10, left: 88, size: 2.6 },       // Red heart #2 top-right
        { icon: '💕', top: 40, left: 50, size: 2.4 },       // Two hearts center
        { icon: '💘', top: 72, left: 88, size: 2.2 },       // Heart with arrow bottom-right
        { icon: '💖', top: 72, left: 10, size: 2.2 }        // Sparkling heart bottom-left
      ];
    } else if (holiday === 'july4th') {
      iconPlacements = [
        { icon: '🎇', top: 8, left: 10, size: 2.8 },        // Firework #1 top-left
        { icon: '🎇', top: 10, left: 88, size: 2.6 },       // Firework #2 top-right
        { icon: '⭐', top: 40, left: 50, size: 2.4 },       // Star #1 center
        { icon: '⭐', top: 72, left: 88, size: 2.2 },       // Star #2 bottom-right
        { icon: '🎉', top: 72, left: 10, size: 2.2 },       // Party popper bottom-left
        { icon: '🎊', top: 55, left: 48, size: 2 }          // Confetti ball center-lower
      ];
    } else if (holiday === 'stpatrick') {
      iconPlacements = [
        { icon: '🌈', top: 8, left: 10, size: 2.8 },        // Rainbow top-left
        { icon: '🌈', top: 10, left: 88, size: 2.6 },       // Rainbow top-right
        { icon: '💚', top: 40, left: 50, size: 2.4 },       // Green heart center
        { icon: '🎩', top: 55, left: 88, size: 2.2 },       // Leprechaun hat right
        { icon: '🪙', top: 72, left: 10, size: 2.2 }        // Gold coin bottom-left
      ];
    } else if (holiday === 'easter') {
      iconPlacements = [
        { icon: '🌷', top: 8, left: 10, size: 2.8 },        // Tulip #1 top-left
        { icon: '🌷', top: 10, left: 88, size: 2.6 },       // Tulip #2 top-right
        { icon: '🐣', top: 40, left: 50, size: 2.4 },       // Hatching chick center
        { icon: '💐', top: 72, left: 88, size: 2.2 },       // Bouquet bottom-right
        { icon: '🌸', top: 72, left: 10, size: 2.2 }        // Cherry blossom bottom-left
      ];
    } else if (holiday === 'cincodemayo') {
      iconPlacements = [
        { icon: '🌵', top: 8, left: 10, size: 2.8 },        // Cactus #1 top-left
        { icon: '🌵', top: 10, left: 88, size: 2.6 },       // Cactus #2 top-right
        { icon: '🎺', top: 40, left: 50, size: 2.4 },       // Trumpet center
        { icon: '🎉', top: 72, left: 10, size: 2.2 },       // Party popper bottom-left
        { icon: '🎊', top: 55, left: 88, size: 2 }          // Confetti ball right
      ];
    } else {
      // Default: use first 5 icons with generic zones
      const maxIcons = Math.min(5, background.length);
      selectedIcons = background.slice(0, maxIcons);
      const zones = [
        { top: 5, left: 5 },
        { top: 5, left: 85 },
        { top: 45, left: 5 },
        { top: 45, left: 85 },
        { top: 80, left: 50 }
      ];

      iconPlacements = selectedIcons.map((icon, i) => {
        const zone = zones[i % zones.length];
        return {
          icon,
          top: zone.top + (Math.random() * 10 - 5),
          left: zone.left + (Math.random() * 10 - 5),
          size: 1.5 + Math.random() * 1
        };
      });
    }

    const rotatableIcons = ['🎆', '🎇', '⭐', '✨'];
    const backgroundIcons = iconPlacements.map((placement, i) => {
      const rotation = rotatableIcons.includes(placement.icon) ? (-20 + Math.random() * 40).toFixed(1) : '0';
      const delay = (i * 0.8).toFixed(2);

      return html`
        <span
          class="holiday-icon holiday-background"
          style="
            font-size: ${placement.size.toFixed(2)}em;
            transform: rotate(${rotation}deg);
            animation-delay: ${delay}s;
            top: ${placement.top}%;
            left: ${placement.left}%;
          "
        >${placement.icon}</span>
      `;
    });

    return html`
      <div class="holiday-overlay">
        ${backgroundIcons}
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

      // Deduplicate alerts by ID (NWS can return same alert for multiple zones)
      const uniqueAlerts = alerts.filter((alert, index, self) =>
        index === self.findIndex((a) => a.id === alert.id || (a.event === alert.event && a.headline === alert.headline))
      );

      this.nwsAlerts = uniqueAlerts;
      this.lastAlertFetch = now;

      if (this.config?.nws_test_mode && uniqueAlerts.length > 0) {
        console.log(`NWS Test Mode: Displaying ${uniqueAlerts.length} sample alert(s)`, uniqueAlerts);
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
              <details class="alert-main-details">
                <summary class="alert-main-summary">
                  <span class="alert-icon">${severityIcon}</span>
                  <span class="alert-event-compact">
                    ${alert.event}
                    ${urgencyBadge ? html`<span class="urgency-badge">${urgencyBadge}</span>` : ''}
                  </span>
                  <span class="expand-icon-main">▼</span>
                </summary>

                <div class="alert-expanded-content">
                  <div class="alert-headline">${alert.headline}</div>

                  ${alert.areaDesc ? html`
                    <details class="alert-area-details">
                      <summary class="alert-area-summary">
                        <span class="expand-icon">▶</span>
                        Affected areas
                      </summary>
                      <div class="alert-area-content">${alert.areaDesc}</div>
                    </details>
                  ` : ''}

                  ${alert.description ? html`
                    <details class="alert-description-details">
                      <summary class="alert-description-summary">
                        <span class="expand-icon">▶</span>
                        Full details
                      </summary>
                      <div class="alert-description-content">${alert.description}</div>
                    </details>
                  ` : ''}

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
              </details>
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
        case 'uv_index': {
          if (weatherData.uv_index !== undefined) {
            icon = '☀️';
            label = 'UV Index';
            value = String(Math.round(weatherData.uv_index));
          }
          break;
        }

        case 'wind': {
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
        }

        case 'feels_like': {
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
        }

        case 'precipitation': {
          // Only show if we have actual precipitation data
          if (weatherData.precipitation !== undefined && weatherData.precipitation > 0) {
            icon = '💧';
            label = 'Precipitation';
            const unit = weatherData.precipitation_unit || 'in';
            value = `${weatherData.precipitation} ${unit}`;
          }
          break;
        }

        case 'humidity': {
          if (weatherData.humidity !== undefined) {
            icon = '💧';
            label = 'Humidity';
            value = `${Math.round(weatherData.humidity)}%`;
          }
          break;
        }

        case 'pressure': {
          if (weatherData.pressure !== undefined) {
            icon = '🔽';
            label = 'Pressure';
            const unit = weatherData.pressure_unit || 'hPa';
            value = `${Math.round(weatherData.pressure)} ${unit}`;
          }
          break;
        }

        case 'visibility': {
          // Only show if we have actual visibility data
          if (weatherData.visibility !== undefined) {
            icon = '👁️';
            label = 'Visibility';
            const unit = weatherData.visibility_unit || 'mi';
            value = `${weatherData.visibility} ${unit}`;
          }
          break;
        }

        case 'sunrise_sunset': {
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

      case 'graphical': {
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
      }

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

      default: { // time-focused
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
                 ${this.config.show_date ? html`<div class="date-small">${this.currentDate}</div>` : ''}
                </div>
             
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
    }

    // Render foreground holiday icons inside the header
    const holiday = this.getCurrentHoliday();
    let holidayForegroundIcons: unknown = '';
    let holidayLights: unknown = '';
    if (holiday) {
      const { foreground = [], lights } = decorations[holiday] || {};
      holidayForegroundIcons = html`
        <div class="holiday-foreground-cluster">
          ${foreground.map((icon, i) => {
            // Replace YEAR with next year for New Year's (show 2026 on Dec 31, 2025)
            let displayIcon = icon;
            if (icon === 'YEAR') {
              const now = new Date();
              const year = now.getMonth() === 11 && now.getDate() === 31 
                ? now.getFullYear() + 1  // Show next year on Dec 31
                : now.getFullYear();      // Show current year on Jan 1
              displayIcon = year.toString();
            }
            const isYear = icon === 'YEAR';
            return html`<span class="holiday-icon holiday-foreground holiday-foreground-${i} ${isYear ? 'year-text' : ''}">${displayIcon}</span>`;
          })}
        </div>
      `;

      // Render holiday lights if configured
      if (lights) {
        const lightCount = 12; // Number of lights across header
        holidayLights = html`
          <div class="holiday-lights">
            ${Array(lightCount).fill(0).map((_, i) => {
              const color = lights.colors[i % lights.colors.length];
              const delay = (i * 0.15).toFixed(2);
              return html`
                <div class="light-bulb ${lights.style === 'long' ? 'light-long' : 'light-round'}" style="--bulb-color: ${color}; animation-delay: ${delay}s;"></div>
              `;
            })}
          </div>
        `;
      }
    }

    // Check if we should show weather info in header (compact layout)
    const layout = this.config?.weather_info_layout || 'standard';
    const showWeatherInfoInHeader = layout === 'compact';
    const weatherInfoInHeader = showWeatherInfoInHeader ? this.renderWeatherInfo('compact') : '';

    // Graphical mode doesn't use card-header wrapper (it has its own background)
    if (headerMode === 'graphical') {
      return html`
        ${holidayLights}
        ${headerContent}
        ${holidayForegroundIcons}
        ${showWeatherInfoInHeader ? html`
          <div class="weather-info-in-header">
            ${weatherInfoInHeader}
          </div>
        ` : ''}
      `;
    }

    return html`
      <div class="card-header" style="background: ${gradient.color}; color: ${gradient.textColor}; position: relative;">
        ${holidayLights}
        ${headerContent}
        ${holidayForegroundIcons}
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
      const gradient = getTemperatureGradient(temp, unit);
      // Convert diagonal gradient to vertical for compact boxes
      const verticalGradient = gradient.color.replace('135deg', '180deg');
      return html`
        <div class="forecast-hour forecast-compact" style="background: ${verticalGradient}; color: ${gradient.textColor}; background-clip: padding-box;">
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

    // Detailed mode - with extra weather details
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
        ${this.getCurrentHoliday() === 'newyear' ? html`
          <div class="firework"></div>
          <div class="firework"></div>
          <div class="firework"></div>
        ` : ''}
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
        overflow-x: clip; /* Prevent horizontal scrollbar while allowing content to extend */

        /* Color Variables - Night Mode */
        --night-bg: #0a0e27;
        --night-bg-overlay-light: rgba(10, 14, 27, 0.6);
        --night-bg-overlay-medium: rgba(10, 14, 27, 0.7);
        --night-bg-alt-light: rgba(10, 14, 39, 0.5);
        --night-bg-alt-medium: rgba(10, 14, 39, 0.8);
        --night-gradient-secondary: rgba(20, 25, 45, 0.6);
        --night-surface: rgba(29, 33, 56, 0.6);
        --night-surface-light: rgba(29, 33, 56, 0.4);
        --night-text: white;
        --night-text-secondary: #e8eaf6;
        --night-border: rgba(232, 234, 246, 0.1);
        --night-border-medium: rgba(232, 234, 246, 0.15);

        /* Color Variables - Dark/Midnight Theme */
        --dark-bg: #0d0d0d;
        --dark-bg-alt: #1a1a1a;
        --dark-surface: #151515;
        --dark-minimal: #000000;
        --dark-minimal-alt: #0a0a0a;
        --dark-text: #c0c0c0;
        --dark-text-alt: #d0d0d0;
        --dark-text-dim: #b0b0b0;

        /* Color Variables - Light/Minimal Theme */
        --light-bg: #ffffff;
        --light-surface: #f8f8f8;
        --light-border: #e0e0e0;
        --light-border-alt: #f0f0f0;
        --light-text: #333;
        --light-text-alt: #333333;

        /* Color Variables - Overlays */
        --overlay-dark-subtle: rgba(0, 0, 0, 0.1);
        --overlay-dark-light: rgba(0, 0, 0, 0.15);
        --overlay-dark-normal: rgba(0, 0, 0, 0.2);
        --overlay-dark-medium: rgba(0, 0, 0, 0.3);
        --overlay-dark-strong: rgba(0, 0, 0, 0.5);
        --overlay-dark-very-strong: rgba(0, 0, 0, 0.7);
        --overlay-light-subtle: rgba(255, 255, 255, 0.1);
        --overlay-light-light: rgba(255, 255, 255, 0.15);
        --overlay-light-normal: rgba(255, 255, 255, 0.2);
        --overlay-light-medium: rgba(255, 255, 255, 0.3);

        /* Color Variables - Alerts */
        --alert-extreme: #d32f2f;
        --alert-extreme-glow-strong: rgba(211, 47, 47, 0.6);
        --alert-extreme-glow-medium: rgba(211, 47, 47, 0.4);
        --alert-extreme-glow-light: rgba(211, 47, 47, 0.2);
        --alert-severe: #f57c00;
        --alert-severe-glow-strong: rgba(245, 124, 0, 0.5);
        --alert-severe-glow-medium: rgba(245, 124, 0, 0.3);
        --alert-severe-glow-light: rgba(245, 124, 0, 0.2);
        --alert-moderate: #fbc02d;
        --alert-minor: #1976d2;
        --alert-unknown: #757575;

        /* Color Variables - Temperature */
        --temp-cold: #4A9EFF;
        --temp-cold-alt: rgba(74, 158, 255, 0.6);
        --temp-freezing-glow-strong: rgba(79, 195, 247, 0.6);
        --temp-freezing-glow-medium: rgba(79, 195, 247, 0.4);
        --temp-freezing-glow-light: rgba(79, 195, 247, 0.2);
        --temp-hot: #e67e22;
        --temp-hot-alt: rgba(230, 74, 25, 0.6);
        --temp-hot-glow-medium: rgba(230, 74, 25, 0.4);
        --temp-hot-glow-light: rgba(230, 74, 25, 0.2);

        /* Color Variables - Chart/Gradients */
        --chart-temp-high-start: rgba(255, 120, 80, 1);
        --chart-temp-high-end: #f1c40f;
        --chart-temp-low-start: #a8dadc;
        --chart-temp-low-end: #457b9d;
        --chart-temp-single: rgba(255, 150, 100, 1);

        /* Color Variables - Theme Variants */
        --vibrant-primary: #667eea;
        --vibrant-secondary: #764ba2;
        --vibrant-accent: #f093fb;
        --vibrant-gradient: #f5576c;
        --retro-primary: #0074D9;
        --retro-secondary: #001f3f;

        /* Night Mode Optimization Variables */
        --night-stars-bg-size: 300px 150px;
        --night-stars-opacity: 0.6;
        --night-stars-animation-duration: 120s;
        --night-stars-animation-distance: -150px;
        --night-compact-stars-bg-size: 80px 80px;
        --night-compact-stars-opacity: 0.4;
        --night-twinkle-duration: 3s;
        --night-twinkle-opacity-min: 0.3;
        --night-twinkle-opacity-max: 0.6;
        --night-z-stars: 0;
        --night-z-content: 1;
        --night-compact-gradient-start: #1a3a52;
        --night-compact-gradient-end: #2c5270;
      }

      ha-card {
        overflow: visible;
        border-radius: 12px;
        position: relative;
      }

      /* ========================================
         UTILITY CLASSES - Reusable CSS Patterns
         ======================================== */

      /* Background Utilities */
      .bg-transparent { background: transparent; }
      .bg-transparent-important { background: transparent !important; }

      /* Opacity Utilities */
      .opacity-90 { opacity: 0.9; }
      .opacity-80 { opacity: 0.8; }
      .opacity-75 { opacity: 0.75; }
      .opacity-70 { opacity: 0.7; }

      /* Shadow Utilities */
      .shadow-light { box-shadow: 0 2px 4px var(--overlay-dark-light); }
      .shadow-medium { box-shadow: 0 4px 8px var(--overlay-dark-normal); }
      .drop-shadow-subtle { filter: drop-shadow(0 2px 4px var(--overlay-dark-medium)); }
      .drop-shadow-normal { filter: drop-shadow(0 2px 8px var(--overlay-dark-normal)); }
      .drop-shadow-strong { filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4)); }

      /* Text Utilities */
      .text-lg-medium { font-size: 16px; font-weight: 500; }
      .text-base-regular { font-size: 14px; font-weight: 400; }
      .text-sm-regular { font-size: 12px; font-weight: 400; }
      .label-uppercase { text-transform: uppercase; letter-spacing: 0.5px; }

      /* Pointer Events */
      .pointer-events-none { pointer-events: none; }

      /* Position + Z-Index Utilities */
      .relative-z-content { position: relative; z-index: var(--night-z-content); }
      .relative-z-1 { position: relative; z-index: 1; }
      .relative-z-2 { position: relative; z-index: 2; }
      .relative-z-3 { position: relative; z-index: 3; }

      /* Border Radius Utilities */
      .rounded-sm { border-radius: 4px; }
      .rounded { border-radius: 8px; }
      .rounded-lg { border-radius: 12px; }

      /* Transition Utilities */
      .transition-transform { transition: transform 0.2s ease; }
      .transition-background { transition: background 0.5s ease; }

      /* ========================================
         CONSOLIDATED SELECTORS - Apply Utilities
         ======================================== */

      /* Pointer Events: None - Consolidation */
      ha-card.night-mode::before,
      ha-card.night-mode .forecast-day.forecast-compact::before,
      ha-card.night-mode .forecast-hour.forecast-compact::before,
      .holiday-overlay,
      .holiday-icon,
      .holiday-lights,
      .holiday-foreground-cluster,
      .chart-lines {
        pointer-events: none;
      }

      /* Opacity 0.9 - Consolidation */
      .time-period,
      .time-small,
      .suggestion-text,
      .weather-info-label,
      .rain-time {
        opacity: 0.9;
      }

      /* Opacity 0.8 - Consolidation */
      .time-period-medium {
        opacity: 0.8;
      }

      /* Opacity 0.7 - Consolidation */
      .date-large,
      .time-large {
        opacity: 0.7;
      }

      /* Box Shadow: Light - Consolidation */
      .forecast-type-daily .forecast-compact,
      .forecast-type-hourly .forecast-compact {
        box-shadow: 0 2px 4px var(--overlay-dark-light);
      }

      /* Box Shadow: Medium (on hover) - Consolidation */
      .forecast-type-daily .forecast-compact:hover,
      .forecast-type-hourly .forecast-compact:hover {
        box-shadow: 0 4px 8px var(--overlay-dark-normal);
      }

      /* Border Radius: 4px - Consolidation */
      .temp-bar,
      .temp-bar-low,
      .temp-bar-high,
      .forecast-type-daily .forecast-compact,
      .forecast-type-hourly .forecast-compact {
        border-radius: 4px;
      }

      /* Border Radius: 8px - Consolidation */
      .weather-info-item,
      .nws-alert {
        border-radius: 8px;
      }

      /* Background Transparent - Consolidation (without !important) */
      ha-card.night-mode .card-content,
      .weather-info-in-header .weather-info-section,
      .weather-info-in-header .weather-info-item {
        background: transparent;
      }

      /* Background Transparent - Consolidation (with !important for theme overrides) */
      ha-card.night-mode .forecast-day,
      ha-card.night-mode .forecast-hour,
      ha-card.night-mode .weather-info-section,
      ha-card.night-mode .weather-info-item,
      ha-card.theme-midnight .forecast-day,
      ha-card.theme-midnight .forecast-hour,
      ha-card.theme-midnight .weather-info-section,
      ha-card.theme-midnight .weather-info-item,
      ha-card.theme-retro .forecast-day,
      ha-card.theme-retro .forecast-hour,
      ha-card.theme-retro .weather-info-section,
      ha-card.theme-retro .weather-info-item,
      ha-card.theme-minimal .forecast-day,
      ha-card.theme-minimal .forecast-hour,
      ha-card.theme-minimal .weather-info-section,
      ha-card.theme-minimal .weather-info-item,
      ha-card.theme-vibrant .forecast-day,
      ha-card.theme-vibrant .forecast-hour,
      ha-card.theme-vibrant .weather-info-section,
      ha-card.theme-vibrant .weather-info-item {
        background: transparent !important;
      }

      /* Text: 16px / 500 - Consolidation */
      .temp-low,
      .temp-high,
      .temp-actual,
      .hour-temp {
        font-size: 16px;
        font-weight: 500;
      }

      /* Label Uppercase - Consolidation */
      .actual-temp-label,
      .temp-label,
      .weather-info-label,
      .weather-info-in-header .weather-info-label-compact,
      .urgency-badge {
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      /* Transition: Transform 0.2s - Consolidation */
      .forecast-type-daily .forecast-compact,
      .forecast-type-hourly .forecast-compact {
        transition: transform 0.2s ease;
      }

      /* Transition: Background 0.5s - Consolidation */
      .card-header {
        transition: background 0.5s ease;
      }

      /* ======================================== */

      /* Night Mode Styling */
      ha-card.night-mode {
        background: var(--night-bg);
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
          radial-gradient(2px 2px at 20px 30px, var(--night-text), transparent),
          radial-gradient(2px 2px at 60px 70px, var(--night-text), transparent),
          radial-gradient(1px 1px at 50px 50px, var(--night-text), transparent),
          radial-gradient(1px 1px at 130px 80px, var(--night-text), transparent),
          radial-gradient(2px 2px at 90px 10px, var(--night-text), transparent),
          radial-gradient(1px 1px at 200px 60px, var(--night-text), transparent),
          radial-gradient(2px 2px at 170px 120px, var(--night-text), transparent),
          radial-gradient(1px 1px at 220px 90px, var(--night-text), transparent),
          radial-gradient(1px 1px at 30px 100px, var(--night-text), transparent),
          radial-gradient(2px 2px at 270px 40px, var(--night-text), transparent),
          radial-gradient(1px 1px at 150px 15px, var(--night-text), transparent),
          radial-gradient(1px 1px at 100px 130px, var(--night-text), transparent),
          radial-gradient(2px 2px at 240px 100px, var(--night-text), transparent),
          radial-gradient(1px 1px at 190px 70px, var(--night-text), transparent),
          radial-gradient(1px 1px at 80px 95px, var(--night-text), transparent);
        background-repeat: repeat;
        background-size: var(--night-stars-bg-size);
        opacity: var(--night-stars-opacity);
        z-index: var(--night-z-stars);
        animation: starsFloat var(--night-stars-animation-duration) linear infinite;
        will-change: transform;
      }

      @keyframes starsFloat {
        from {
          transform: translateY(0);
        }
        to {
          transform: translateY(var(--night-stars-animation-distance));
        }
      }

      ha-card.night-mode > * {
        position: relative;
        z-index: var(--night-z-content);
      }

      ha-card.night-mode .card-header {
        position: relative;
        color: var(--night-text) !important; /* Bright white text */
        filter: none !important; /* No filter - don't dim text */
      }

      ha-card.night-mode .card-header::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, var(--night-bg-overlay-light) 0%, var(--night-gradient-secondary) 100%); /* Darker overlay */
        pointer-events: none;
        z-index: var(--night-z-stars);
      }

      ha-card.night-mode .card-header > * {
        position: relative;
        z-index: var(--night-z-content);
      }

      /* Keep holiday cluster absolutely positioned even in night mode */
      ha-card.night-mode .holiday-foreground-cluster {
        position: absolute !important;
        z-index: var(--night-z-stars) !important;
      }

      ha-card.night-mode .graphical-overlay {
        background: linear-gradient(180deg, var(--night-bg-alt-light) 0%, var(--night-bg-alt-medium) 100%);
      }

      ha-card.night-mode .card-content {
        color: var(--night-text-secondary);
      }

      ha-card.night-mode .forecast-day,
      ha-card.night-mode .forecast-hour {
        border-bottom-color: var(--night-border);
      }

      ha-card.night-mode .temp-bar {
        background: var(--night-border-medium);
      }

      ha-card.night-mode .forecast-day.forecast-compact,
      ha-card.night-mode .forecast-hour.forecast-compact {
        background: linear-gradient(180deg, var(--night-compact-gradient-start) 0%, var(--night-compact-gradient-end) 100%) !important;
        position: relative !important;
        z-index: var(--night-z-content) !important; /* Above stars */
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
          radial-gradient(1px 1px at 10px 15px, var(--night-text), transparent),
          radial-gradient(1px 1px at 30px 35px, var(--night-text), transparent),
          radial-gradient(1px 1px at 25px 25px, var(--night-text), transparent),
          radial-gradient(1px 1px at 65px 40px, var(--night-text), transparent),
          radial-gradient(1px 1px at 45px 5px, var(--night-text), transparent),
          radial-gradient(1px 1px at 15px 50px, var(--night-text), transparent),
          radial-gradient(1px 1px at 55px 60px, var(--night-text), transparent),
          radial-gradient(1px 1px at 40px 70px, var(--night-text), transparent),
          radial-gradient(1px 1px at 70px 20px, var(--night-text), transparent),
          radial-gradient(1px 1px at 20px 65px, var(--night-text), transparent);
        background-repeat: repeat;
        background-size: var(--night-compact-stars-bg-size);
        opacity: var(--night-compact-stars-opacity);
        z-index: var(--night-z-stars);
        animation: starsTwinkle var(--night-twinkle-duration) ease-in-out infinite;
        will-change: opacity;
      }

      @keyframes starsTwinkle {
        0%, 100% {
          opacity: var(--night-twinkle-opacity-min);
        }
        50% {
          opacity: var(--night-twinkle-opacity-max);
        }
      }

      /* Respect user's motion preferences for accessibility */
      @media (prefers-reduced-motion: reduce) {
        ha-card.night-mode::before {
          animation: none;
        }
        ha-card.night-mode .forecast-day.forecast-compact::before,
        ha-card.night-mode .forecast-hour.forecast-compact::before {
          animation: none;
          opacity: var(--night-twinkle-opacity-min);
        }
      }

      /* Ensure content is above stars */
      ha-card.night-mode .forecast-day.forecast-compact > *,
      ha-card.night-mode .forecast-hour.forecast-compact > * {
        position: relative;
        z-index: var(--night-z-content);
      }

      ha-card.night-mode .forecast-type-hourly.forecast-standard .forecast-hour {
        background: var(--night-surface) !important; /* Keep some background */
        position: relative !important;
        z-index: var(--night-z-content) !important; /* Above stars */
      }

      .error {
        padding: 20px;
        color: var(--error-color, #ff0000);
        text-align: center;
      }

      .card-header {
        padding: 24px;
        border-radius: 12px 12px 0 0;
        position: relative; /* Required for holiday-foreground-cluster absolute positioning */
        overflow: visible; /* Allow lights to extend beyond header */
        z-index: 1; /* Above fireworks */
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
        background: linear-gradient(180deg, var(--overlay-dark-medium) 0%, rgba(0,0,0,0.6) 100%);
        backdrop-filter: blur(2px);
      }

      .graphical-content {
        position: relative;
        z-index: 1;
        padding: 32px 32px 32px 16px;
        width: 100%;
        color: white;
        text-shadow: 0 2px 8px var(--overlay-dark-strong);
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
        position: relative;
        z-index: 3;
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
        position: relative;
      }

      .time-period {
        font-size: 16px;
        font-weight: 400;
        position: absolute;
        top: 4px;
        margin-left: 4px;
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
        font-size: 16px;
        font-weight: 400;
        opacity: 0.9;
        text-align: left;
      }

      .condition-temp {
        font-size: 20px;
        font-weight: 400;
        opacity: 0.95;
        margin-bottom: 2px;
        text-align: left;
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
        margin-bottom: 4px;
        line-height: 1.2;
      }

      /* Weather Info Section */
      .weather-info-section {
        display: grid;
        gap: 12px;
        padding: 16px 20px;
        background: var(--card-background-color, rgba(0,0,0,0.02));
        border-top: 1px solid var(--divider-color, var(--overlay-dark-subtle));
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
        position: relative;
        z-index: 2;
      }

      /* Compact item styling */
      .weather-info-compact {
        padding: 6px 8px;
        gap: 6px;
        justify-content: center;
      }

      .weather-info-compact .weather-info-icon {
        font-size: 14px;
        min-width: 14px;
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
        font-size: 15px;
        font-weight: 500;
        line-height: 1;
      }

      .weather-info-in-header .weather-info-label-compact {
        font-size: 10px;
        font-weight: 400;
        opacity: 0.8;
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
        box-shadow: 0 2px 8px var(--overlay-dark-light);
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
        background: linear-gradient(90deg, transparent, var(--overlay-light-subtle), transparent);
        animation: shimmer 3s infinite;
      }

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

      @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
      }

      .rain-message {
        flex: 1;
        letter-spacing: 0.3px;
        text-shadow: 0 1px 2px var(--overlay-dark-normal);
      }

      .rain-time {
        font-size: 14px;
        font-weight: 500;
      }

      /* Night mode styling for rain banner */
      ha-card.night-mode .rain-timing-banner {
        background: linear-gradient(135deg, #2c5f8d 0%, #1a3a5c 100%);
      }

      /* NWS Alerts Section */
      .nws-alerts-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px 20px;
        background: var(--card-background-color, rgba(0,0,0,0.02));
        border-top: 1px solid var(--divider-color, var(--overlay-dark-subtle));
      }

      .nws-alert {
        border-radius: 8px;
        border-left: 4px solid;
        background: var(--secondary-background-color, rgba(0,0,0,0.05));
        overflow: hidden;
      }

      .nws-alert.alert-extreme {
        border-left-color: var(--alert-extreme);
        background: rgba(211, 47, 47, 0.1);
      }

      .nws-alert.alert-severe {
        border-left-color: var(--alert-severe);
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
        background: var(--overlay-light-medium);
        color: #fff;
        text-shadow: 0 1px 2px var(--overlay-dark-medium);
      }

      .alert-area {
        font-size: 12px;
        opacity: 0.7;
        line-height: 1.2;
      }

      /* Main alert collapsible */
      .alert-main-details {
        width: 100%;
      }

      .alert-main-summary {
        cursor: pointer;
        padding: 12px;
        list-style: none;
        display: flex;
        align-items: center;
        gap: 10px;
        user-select: none;
      }

      .alert-main-summary:hover {
        opacity: 0.9;
      }

      .alert-main-summary::-webkit-details-marker {
        display: none;
      }

      .alert-event-compact {
        flex: 1;
        font-size: 15px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }

      .expand-icon-main {
        font-size: 12px;
        transition: transform 0.2s ease;
        flex-shrink: 0;
      }

      .alert-main-details[open] .expand-icon-main {
        transform: rotate(180deg);
      }

      .alert-expanded-content {
        padding: 0 12px 12px 12px;
      }

      /* Collapsible alert sections */
      .alert-area-details,
      .alert-description-details {
        margin-top: 6px;
      }

      .alert-area-summary,
      .alert-description-summary {
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        opacity: 0.8;
        padding: 4px 0;
        list-style: none;
        display: flex;
        align-items: center;
        gap: 6px;
        user-select: none;
      }

      .alert-area-summary:hover,
      .alert-description-summary:hover {
        opacity: 1;
      }

      .alert-area-summary::-webkit-details-marker,
      .alert-description-summary::-webkit-details-marker {
        display: none;
      }

      .expand-icon {
        display: inline-block;
        transition: transform 0.2s ease;
        font-size: 10px;
      }

      details[open] .expand-icon {
        transform: rotate(90deg);
      }

      .alert-area-content,
      .alert-description-content {
        font-size: 12px;
        line-height: 1.4;
        margin-top: 6px;
        padding: 8px;
        background: var(--overlay-dark-subtle);
        border-radius: 4px;
        opacity: 0.9;
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
        background: var(--overlay-dark-subtle);
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
        background: var(--alert-extreme-glow-light);
      }

      ha-card.night-mode .nws-alert.alert-severe {
        background: var(--alert-severe-glow-light);
      }

      ha-card.night-mode .nws-alert.alert-moderate {
        background: rgba(251, 192, 45, 0.2);
      }

      ha-card.night-mode .nws-alert.alert-minor {
        background: rgba(25, 118, 210, 0.2);
      }

      /* Alert Glow Effects for Extreme/Severe */
      ha-card.alert-glow-extreme {
        box-shadow: 0 0 20px var(--alert-extreme-glow-strong),
                    0 0 40px var(--alert-extreme-glow-medium),
                    0 0 60px var(--alert-extreme-glow-light) !important;
        animation: pulse-extreme 2s ease-in-out infinite;
      }

      ha-card.alert-glow-severe {
        box-shadow: 0 0 15px var(--alert-severe-glow-strong),
                    0 0 30px var(--alert-severe-glow-medium),
                    0 0 45px var(--alert-severe-glow-light) !important;
        animation: pulse-severe 2s ease-in-out infinite;
      }

      @keyframes pulse-extreme {
        0%, 100% {
          box-shadow: 0 0 20px var(--alert-extreme-glow-strong),
                      0 0 40px var(--alert-extreme-glow-medium),
                      0 0 60px var(--alert-extreme-glow-light) !important;
        }
        50% {
          box-shadow: 0 0 25px rgba(211, 47, 47, 0.8),
                      0 0 50px var(--alert-extreme-glow-strong),
                      0 0 75px var(--alert-extreme-glow-medium) !important;
        }
      }

      @keyframes pulse-severe {
        0%, 100% {
          box-shadow: 0 0 15px var(--alert-severe-glow-strong),
                      0 0 30px var(--alert-severe-glow-medium),
                      0 0 45px var(--alert-severe-glow-light) !important;
        }
        50% {
          box-shadow: 0 0 20px rgba(245, 124, 0, 0.7),
                      0 0 40px var(--alert-severe-glow-strong),
                      0 0 60px var(--alert-severe-glow-medium) !important;
        }
      }

      /* Extreme Temperature Glow Effects */
      ha-card.temp-glow-hot {
        box-shadow: 0 0 20px var(--temp-hot-alt),
                    0 0 40px var(--temp-hot-glow-medium),
                    0 0 60px var(--temp-hot-glow-light);
        animation: pulse-hot 3s ease-in-out infinite;
      }

      ha-card.temp-glow-freezing {
        box-shadow: 0 0 20px var(--temp-freezing-glow-strong),
                    0 0 40px var(--temp-freezing-glow-medium),
                    0 0 60px var(--temp-freezing-glow-light);
        animation: pulse-freezing 3s ease-in-out infinite;
      }

      @keyframes pulse-hot {
        0%, 100% {
          box-shadow: 0 0 20px var(--temp-hot-alt),
                      0 0 40px var(--temp-hot-glow-medium),
                      0 0 60px var(--temp-hot-glow-light);
        }
        50% {
          box-shadow: 0 0 25px rgba(230, 74, 25, 0.8),
                      0 0 50px var(--temp-hot-alt),
                      0 0 75px var(--temp-hot-glow-medium);
        }
      }

      @keyframes pulse-freezing {
        0%, 100% {
          box-shadow: 0 0 20px var(--temp-freezing-glow-strong),
                      0 0 40px var(--temp-freezing-glow-medium),
                      0 0 60px var(--temp-freezing-glow-light);
        }
        50% {
          box-shadow: 0 0 25px rgba(79, 195, 247, 0.8),
                      0 0 50px var(--temp-freezing-glow-strong),
                      0 0 75px var(--temp-freezing-glow-medium);
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

      /* Fireworks canvas for New Year's */
      /* Year text styling for New Year's foreground cluster */
      .year-text {
        font-size: 2.2rem !important;
        font-weight: bold;
        color: #FFD700;
        text-shadow: 0 0 10px #FFD700, 0 0 20px #FFD700;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        animation: year-glow 2s ease-in-out infinite;
        line-height: 1 !important;
        display: inline-block;
        vertical-align: middle;
      }

      @keyframes year-glow {
        0%, 100% {
          text-shadow: 0 0 10px #FFD700, 0 0 20px #FFD700;
        }
        50% {
          text-shadow: 0 0 15px #FFD700, 0 0 30px #FFD700;
        }
      }

      /* CSS Fireworks */
      @keyframes firework {
        0% { transform: translate(var(--x), var(--initialY)); width: var(--initialSize); opacity: 1; }
        50% { width: 0.5vmin; opacity: 1; }
        100% { width: var(--finalSize); opacity: 0; }
      }

      .firework,
      .firework::before,
      .firework::after {
        --initialSize: 0.5vmin;
        --finalSize: 45vmin;
        --particleSize: 0.2vmin;
        --color1: yellow;
        --color2: khaki;
        --color3: white;
        --color4: lime;
        --color5: gold;
        --color6: mediumseagreen;
        --y: -30vmin;
        --x: -50%;
        --initialY: 100%;
        content: "";
        animation: firework 2s infinite;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
        width: var(--initialSize);
        aspect-ratio: 1;
        background: 
          radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 50% 0%,
          radial-gradient(circle, var(--color2) var(--particleSize), #0000 0) 100% 50%,
          radial-gradient(circle, var(--color3) var(--particleSize), #0000 0) 50% 100%,
          radial-gradient(circle, var(--color4) var(--particleSize), #0000 0) 0% 50%,
          
          /* bottom right */
          radial-gradient(circle, var(--color5) var(--particleSize), #0000 0) 80% 90%,
          radial-gradient(circle, var(--color6) var(--particleSize), #0000 0) 95% 90%,
          radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 90% 70%,
          radial-gradient(circle, var(--color2) var(--particleSize), #0000 0) 100% 60%,
          radial-gradient(circle, var(--color3) var(--particleSize), #0000 0) 55% 80%,
          radial-gradient(circle, var(--color4) var(--particleSize), #0000 0) 70% 77%,
          
          /* bottom left */
          radial-gradient(circle, var(--color5) var(--particleSize), #0000 0) 22% 90%,
          radial-gradient(circle, var(--color6) var(--particleSize), #0000 0) 45% 90%,
          radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 33% 70%,
          radial-gradient(circle, var(--color2) var(--particleSize), #0000 0) 10% 60%,
          radial-gradient(circle, var(--color3) var(--particleSize), #0000 0) 31% 80%,
          radial-gradient(circle, var(--color4) var(--particleSize), #0000 0) 28% 77%,
          radial-gradient(circle, var(--color5) var(--particleSize), #0000 0) 13% 72%,
          
          /* top left */
          radial-gradient(circle, var(--color6) var(--particleSize), #0000 0) 80% 10%,
          radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 95% 14%,
          radial-gradient(circle, var(--color2) var(--particleSize), #0000 0) 90% 23%,
          radial-gradient(circle, var(--color3) var(--particleSize), #0000 0) 100% 43%,
          radial-gradient(circle, var(--color4) var(--particleSize), #0000 0) 85% 27%,
          radial-gradient(circle, var(--color5) var(--particleSize), #0000 0) 77% 37%,
          radial-gradient(circle, var(--color6) var(--particleSize), #0000 0) 60% 7%,
          
          /* top right */
          radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 22% 14%,
          radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 45% 20%,
          radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 33% 34%,
          radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 10% 29%,
          radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 31% 37%,
          radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 28% 7%,
          radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 13% 42%;
        background-size: var(--initialSize) var(--initialSize);
        background-repeat: no-repeat;
        pointer-events: none;
        z-index: 10;
      }

      .firework::before {
        --x: -50%;
        --y: -50%;
        --initialY: -50%;
        transform: translate(-50%, -50%) rotate(40deg) scale(1.3) rotateY(40deg);
      }

      .firework::after {
        --x: -50%;
        --y: -50%;
        --initialY: -50%;
        transform: translate(-50%, -50%) rotate(170deg) scale(1.15) rotateY(-30deg);
      }

      .firework:nth-child(2) {
        --x: 30vmin;
      }

      .firework:nth-child(2),
      .firework:nth-child(2)::before,
      .firework:nth-child(2)::after {
        --color1: pink;
        --color2: violet;
        --color3: fuchsia;
        --color4: orchid;
        --color5: plum;
        --color6: lavender;  
        --finalSize: 40vmin;
        left: 30%;
        animation-delay: -0.25s;
      }

      .firework:nth-child(3) {
        --x: -30vmin;
        --y: -50vmin;
      }

      .firework:nth-child(3),
      .firework:nth-child(3)::before,
      .firework:nth-child(3)::after {
        --color1: cyan;
        --color2: lightcyan;
        --color3: lightblue;
        --color4: PaleTurquoise;
        --color5: SkyBlue;
        --color6: lavender;
        --finalSize: 35vmin;
        left: 70%;
        animation-delay: -0.4s;
      }

      /* Background holiday icons (floating/animated) */
      .holiday-icon {
        position: absolute;
        filter: drop-shadow(0 2px 4px var(--overlay-dark-medium));
        pointer-events: none;
        animation: holiday-float 4s ease-in-out infinite;
        z-index: -1;
      }

      @keyframes holiday-float {
        0%, 100% {
          transform: translateY(0px) rotate(0deg);
          opacity: 0.7;
        }
        50% {
          transform: translateY(-10px) rotate(5deg);
          opacity: 1;
        }
      }

      .holiday-foreground-cluster {
        position: absolute;
        bottom: 8px; /* 8px from bottom edge */
        left: 8px; /* 8px from left edge */
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-start;
        z-index: 1; /* Behind weather info cards but above background */
        gap: 0px;
        pointer-events: none; /* Don't block clicks */
      }
      .holiday-foreground-0 {
        font-size: 2em; /* Left side icon */
        order: 1; /* Left position */
        margin-right: -0.8em; /* More overlap with center */
        line-height: 1;
        z-index: 1;
      }
      .holiday-foreground-1 {
        font-size: 2.2em; /* Main/center icon - YEAR text */
        order: 2; /* Center position */
        line-height: 1;
        z-index: 2; /* Above other icons */
      }
      .holiday-foreground-2 {
        font-size: 2em; /* Right side icon */
        order: 3; /* Right position */
        margin-left: -0.8em; /* More overlap with center */
        line-height: 1;
        z-index: 1;
      }

      .holiday-icon.holiday-foreground {
        position: static;
        animation: none !important;
        transform: none !important;
        opacity: 1 !important;
        filter: drop-shadow(0 2px 4px var(--overlay-dark-medium));
        pointer-events: none;
      }

      /* Holiday string lights */
      .holiday-lights {
        position: absolute;
        top: 4px;
        left: 0;
        right: 0;
        height: 32px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 0;
        pointer-events: none;
        z-index: 2;
      }

      /* Ensure lights stretch properly in night mode */
      ha-card.night-mode .holiday-lights {
        position: absolute !important;
        width: 100%;
      }

      /* Wire connecting all bulbs */
      .holiday-lights::before {
        content: '';
        position: absolute;
        top: 4px;
        left: 0;
        right: 0;
        height: 2px;
        background: rgba(0, 0, 0, 0.35);
        border-radius: 1px;
      }

      .light-bulb {
        position: relative;
        animation: light-glow 1.5s ease-in-out infinite;
        flex-shrink: 0;
      }

      /* Round bulbs (most holidays) */
      .light-round {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--bulb-color);
        box-shadow:
          0 0 8px var(--bulb-color),
          0 0 16px var(--bulb-color);
        margin-top: 8px;
      }

      .light-round::before {
        content: '';
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 8px;
        background: rgba(50, 50, 50, 0.5);
      }

      /* Long Christmas-style bulbs */
      .light-long {
        width: 10px;
        height: 18px;
        border-radius: 4px 4px 40% 40%;
        background: linear-gradient(180deg,
          rgba(255, 255, 255, 0.4) 0%,
          var(--bulb-color) 50%,
          var(--bulb-color) 100%);
        box-shadow:
          0 0 10px var(--bulb-color),
          0 0 20px var(--bulb-color);
        margin-top: 8px;
      }

      .light-long::before {
        content: '';
        position: absolute;
        top: -6px;
        left: 50%;
        transform: translateX(-50%);
        width: 6px;
        height: 6px;
        background: rgba(80, 80, 80, 0.7);
        border-radius: 3px 3px 0 0;
      }

      .light-long::after {
        content: '';
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 8px;
        background: rgba(50, 50, 50, 0.5);
      }

      @keyframes light-glow {
        0%, 100% {
          opacity: 0.8;
          filter: brightness(1);
        }
        50% {
          opacity: 1;
          filter: brightness(1.3);
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
      }

      ha-card.theme-retro .card-content {
        background: rgba(0, 31, 63, 0.3) !important;
      }

      ha-card.theme-retro .forecast-day,
      ha-card.theme-retro .forecast-hour {
        border: none !important;
        border-bottom: 1px solid var(--overlay-light-normal) !important;
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
        border-top: 1px solid var(--overlay-light-normal) !important;
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
        background: var(--overlay-light-normal) !important;
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
        border-bottom-color: var(--overlay-light-light) !important;
      }

      /* MIDNIGHT THEME - Sleek Modern Dark */
      ha-card.theme-midnight {
        background: var(--dark-bg) !important;
        border: 1px solid var(--dark-bg-alt) !important;
        border-radius: 12px !important;
        box-shadow:
          0 8px 32px rgba(0, 0, 0, 0.8),
          0 2px 8px rgba(0, 0, 0, 0.6) !important;
        color: var(--dark-text) !important;
      }

      ha-card.theme-midnight .card-header {
        background: linear-gradient(135deg, #1a1a1a 0%, #252525 100%) !important;
        color: #d0d0d0 !important;
        border-bottom: 1px solid var(--dark-bg-alt);
        border-radius: 12px 12px 0 0 !important;
        box-shadow: 0 2px 8px var(--overlay-dark-strong);
      }

      ha-card.theme-midnight .graphical-header::after {
        background: linear-gradient(to bottom, var(--overlay-dark-strong), rgba(0,0,0,0.8)) !important;
      }

      ha-card.theme-midnight .card-content {
        background: var(--dark-bg) !important;
        color: var(--dark-text) !important;
      }

      ha-card.theme-midnight .forecast-day,
      ha-card.theme-midnight .forecast-hour {
        background: var(--dark-surface) !important;
        border: none !important;
        border-bottom: 1px solid var(--dark-bg-alt) !important;
        box-shadow: 0 2px 6px var(--overlay-dark-strong) !important;
        color: var(--dark-text) !important;
        padding: 12px 16px !important;
      }

      ha-card.theme-midnight .forecast-day:hover,
      ha-card.theme-midnight .forecast-hour:hover {
        background: #1d1d1d !important;
        box-shadow: 0 4px 12px var(--overlay-dark-very-strong) !important;
      }

      ha-card.theme-midnight .forecast-day.forecast-compact,
      ha-card.theme-midnight .forecast-hour.forecast-compact {
        background: var(--dark-surface) !important;
        border: 1px solid var(--dark-bg-alt) !important;
        border-radius: 10px !important;
        box-shadow: 0 4px 12px var(--overlay-dark-very-strong) !important;
        color: var(--dark-text) !important;
      }

      ha-card.theme-midnight .forecast-day.forecast-compact:hover,
      ha-card.theme-midnight .forecast-hour.forecast-compact:hover {
        background: #1d1d1d !important;
        border-color: #333333 !important;
        box-shadow:
          0 4px 12px var(--overlay-dark-very-strong),
          0 0 0 1px #333333 !important;
      }

      ha-card.theme-midnight .weather-info-item {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        color: var(--dark-text) !important;
      }

      ha-card.theme-midnight .weather-info-section {
        background: transparent !important;
        border-top: none !important;
        padding-top: 12px !important;
        margin-top: 8px !important;
      }

      ha-card.theme-midnight .nws-alert {
        background: var(--dark-surface) !important;
        border: 1px solid var(--dark-bg-alt) !important;
        box-shadow: 0 4px 12px var(--overlay-dark-very-strong) !important;
      }

      /* MIDNIGHT THEME - Night Mode (Even Darker) */
      ha-card.theme-midnight.night-mode {
        background: #000000 !important;
        border-color: var(--dark-bg) !important;
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
        border-bottom-color: var(--dark-bg) !important;
      }

      ha-card.theme-midnight.night-mode .forecast-day.forecast-compact,
      ha-card.theme-midnight.night-mode .forecast-hour.forecast-compact {
        background: #0a0a0a !important;
        border-color: var(--dark-bg) !important;
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
        border: 1px solid var(--light-border) !important;
        box-shadow: none !important;
        color: #333 !important;
      }

      ha-card.theme-minimal .card-header {
        background: #f8f8f8 !important; /* Override gradient */
        color: #333 !important;
        border-bottom: 1px solid var(--light-border);
      }

      ha-card.theme-minimal .graphical-header::after {
        background: linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.7)) !important;
      }

      ha-card.theme-minimal .card-content {
        background: #ffffff !important;
      }

      ha-card.theme-minimal .forecast-day,
      ha-card.theme-minimal .forecast-hour {
        border: none !important;
        border-bottom: 1px solid #f0f0f0 !important;
        box-shadow: none !important;
        color: #333 !important;
      }

      ha-card.theme-minimal .forecast-day.forecast-compact,
      ha-card.theme-minimal .forecast-hour.forecast-compact {
        background: #f8f8f8 !important;
        border: 1px solid var(--light-border) !important;
      }

      ha-card.theme-minimal .weather-info-item {
        border: none !important;
        box-shadow: none !important;
        color: #333 !important;
      }

      ha-card.theme-minimal .weather-info-section {
        background: #ffffff !important;
        border-top: 1px solid var(--light-border) !important;
        padding-top: 12px !important;
        margin-top: 8px !important;
      }

      ha-card.theme-minimal .nws-alert {
        background: #f8f8f8 !important;
        border: 1px solid var(--light-border) !important;
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
        background: var(--light-border) !important;
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
        border: none !important;
        border-bottom: 1px solid var(--overlay-light-normal) !important;
        color: white !important;
      }

      ha-card.theme-vibrant .forecast-day.forecast-compact,
      ha-card.theme-vibrant .forecast-hour.forecast-compact {
        background: linear-gradient(135deg, var(--overlay-light-normal), var(--overlay-light-subtle)) !important;
        border: 1px solid var(--overlay-light-medium) !important;
      }

      ha-card.theme-vibrant .weather-info-item {
        border: none !important;
        color: white !important;
      }

      ha-card.theme-vibrant .weather-info-section {
        border-top: 1px solid var(--overlay-light-normal) !important;
        padding-top: 12px !important;
        margin-top: 8px !important;
      }

      ha-card.theme-vibrant .nws-alert {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), var(--overlay-light-light)) !important;
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
        background: var(--overlay-light-normal) !important;
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
        position: relative;
        z-index: 1; /* Above fireworks */
      }
      
      .card-content-compact {
        padding: 20px 5px;
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
        gap: 2px !important;
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
        border-bottom: 1px solid var(--divider-color, var(--overlay-dark-subtle));
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
        min-width: 35px;
      }

      .temp-low {
        opacity: 0.7;
        text-align: right;
      }

      .temp-bar {
        flex: 1;
        height: 8px;
        background: var(--divider-color, var(--overlay-dark-subtle));
        display: flex;
        overflow: hidden;
      }

      .temp-bar-low {
        background: linear-gradient(90deg, #a8dadc 0%, #457b9d 100%);
      }

      .temp-bar-high {
        background: linear-gradient(90deg, #f1c40f 0%, #e67e22 100%);
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
      }

      .forecast-type-daily .forecast-compact:hover {
        transform: translateY(-2px);
      }

      .forecast-type-hourly .forecast-compact {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 6px 4px;
        background: linear-gradient(180deg, #2E5F8A 0%, #4A7FA8 100%);
        border-radius: 4px;
        flex: 0 0 auto;
        width: 55px;
        border: 2px solid transparent;
      }

      .forecast-type-hourly .forecast-compact:hover {
        transform: translateY(-2px);
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
        border-bottom: 1px solid var(--divider-color, var(--overlay-dark-subtle));
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
        border-bottom: 1px solid var(--divider-color, var(--overlay-dark-subtle));
      }

      .forecast-hour:last-child {
        border-bottom: none;
      }

      /* 2-column layout for hourly standard mode */
      .forecast-type-hourly.forecast-standard {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0 16px;
      }

      .forecast-type-hourly.forecast-standard .forecast-hour {
        border-bottom: 1px solid var(--divider-color, var(--overlay-dark-subtle));
        padding: 5px 0;
        background: transparent;
        border-radius: 0;
      }

      .forecast-type-hourly.forecast-standard .forecast-hour:last-child,
      .forecast-type-hourly.forecast-standard .forecast-hour:nth-last-child(2):nth-child(odd) {
        border-bottom: none;
      }

      .hour-name {
        font-weight: 500;
        font-size: 14px;
      }

      /* Hourly detailed mode */
      .forecast-hour.forecast-detailed {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 4px 0;
        border-bottom: 1px solid var(--divider-color, var(--overlay-dark-subtle));
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
