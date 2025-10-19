import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, fireEvent, LovelaceCardEditor } from 'custom-card-helpers';
import { WeatherPulseCardConfig } from './types';

@customElement('weatherpulse-card-editor')
export class WeatherPulseCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: WeatherPulseCardConfig;

  public setConfig(config: WeatherPulseCardConfig): void {
    this._config = config;
  }

  private _valueChanged(ev: CustomEvent): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target as any;
    const configValue = target.configValue;
    let value = target.value;

    // Convert numeric strings to numbers for certain fields
    if ((configValue === 'forecast_days' || configValue === 'hourly_count') && value) {
      value = parseInt(value, 10);
    }

    if (this._config[configValue] === value) {
      return;
    }

    const newConfig = {
      ...this._config,
      [configValue]: value === '' ? undefined : value
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _toggleChanged(ev: CustomEvent): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target as any;
    const configValue = target.configValue;
    const checked = target.checked;

    const newConfig = {
      ...this._config,
      [configValue]: checked
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _seasonalImageChanged(ev: CustomEvent, season: 'spring' | 'summer' | 'fall' | 'winter'): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target as any;
    const value = target.value;

    // If "default" is selected, remove the custom image (undefined = use default)
    const imageValue = (value === 'default' || value === '') ? undefined : value;

    const newConfig = {
      ...this._config,
      seasonal_images: {
        ...(this._config.seasonal_images || {}),
        [season]: imageValue
      }
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _weatherInfoToggle(ev: CustomEvent, infoType: string): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target as any;
    const checked = target.checked;

    const currentInfo = this._config.show_weather_info || [];
    let newInfo;

    if (checked) {
      // Add the info type if not already present
      newInfo = currentInfo.includes(infoType) ? currentInfo : [...currentInfo, infoType];
    } else {
      // Remove the info type
      newInfo = currentInfo.filter(item => item !== infoType);
    }

    const newConfig = {
      ...this._config,
      show_weather_info: newInfo.length > 0 ? newInfo : undefined
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  protected render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    // Get list of weather entities
    const weatherEntities = Object.keys(this.hass.states).filter(
      (eid) => eid.startsWith('weather.')
    );

    // Get list of temperature sensor entities
    const tempSensors = Object.keys(this.hass.states).filter(
      (eid) => eid.startsWith('sensor.') &&
      (eid.includes('temp') || eid.includes('temperature'))
    );

    return html`
      <div class="card-config">
        <h3>WeatherPulse Card Configuration</h3>

        <!-- Required Settings -->
        <div class="section">
          <h4>Required Settings</h4>

          <ha-select
            label="Weather Entity (Required)"
            .configValue=${'entity'}
            .value=${this._config.entity || ''}
            @selected=${this._valueChanged}
            @closed=${(ev: Event) => ev.stopPropagation()}
          >
            ${weatherEntities.map(
              (entity) => html`
                <mwc-list-item .value=${entity}>
                  ${entity}
                </mwc-list-item>
              `
            )}
          </ha-select>
        </div>

        <!-- Temperature Settings -->
        <div class="section">
          <h4>Temperature Settings</h4>

          <ha-select
            label="Outdoor Temperature Sensor (Optional)"
            .configValue=${'outdoor_temp_sensor'}
            .value=${this._config.outdoor_temp_sensor || ''}
            @selected=${this._valueChanged}
            @closed=${(ev: Event) => ev.stopPropagation()}
          >
            <mwc-list-item value="">None</mwc-list-item>
            ${tempSensors.map(
              (entity) => html`
                <mwc-list-item .value=${entity}>
                  ${entity}
                </mwc-list-item>
              `
            )}
          </ha-select>
          <p class="helper-text">
            This sensor will be used for the header gradient and can be displayed in the forecast.
          </p>

          <ha-select
            label="Temperature Display Mode"
            .configValue=${'temp_display_mode'}
            .value=${this._config.temp_display_mode || 'forecast'}
            @selected=${this._valueChanged}
            @closed=${(ev: Event) => ev.stopPropagation()}
          >
            <mwc-list-item value="forecast">Forecast Only (High/Low)</mwc-list-item>
            <mwc-list-item value="actual">Actual Only (From Sensor)</mwc-list-item>
            <mwc-list-item value="both">Both (Forecast + Actual)</mwc-list-item>
          </ha-select>
          <p class="helper-text">
            Choose what temperature to display in forecast rows. "Actual" requires an outdoor temperature sensor.
          </p>
        </div>

        <!-- Header Settings -->
        <div class="section">
          <h4>Header Settings</h4>

          <ha-select
            label="Header Mode"
            .configValue=${'header_mode'}
            .value=${this._config.header_mode || 'time-focused'}
            @selected=${this._valueChanged}
            @closed=${(ev: Event) => ev.stopPropagation()}
          >
            <mwc-list-item value="time-focused">Time Focused (Large Clock)</mwc-list-item>
            <mwc-list-item value="date-focused">Date Focused (Large Date)</mwc-list-item>
            <mwc-list-item value="balanced">Balanced (Equal Time & Date)</mwc-list-item>
            <mwc-list-item value="minimal">Minimal (Icon & Temp Only)</mwc-list-item>
            <mwc-list-item value="greeting">Greeting (Personalized Message)</mwc-list-item>
            <mwc-list-item value="graphical">Graphical (Seasonal Background)</mwc-list-item>
          </ha-select>

          ${this._config.header_mode === 'greeting' ? html`
            <ha-textfield
              label="Greeting Name"
              .configValue=${'greeting_name'}
              .value=${this._config.greeting_name || ''}
              @input=${this._valueChanged}
            ></ha-textfield>
            <p class="helper-text">
              Your name will be used in the personalized greeting message.
            </p>
          ` : ''}

          ${this._config.header_mode === 'graphical' ? html`
            <div class="seasonal-images-section">
              <p class="helper-text">
                Select bundled seasonal images or leave as default. Upload custom images to <code>/config/www/</code> to see them here.
              </p>

              <ha-select
                label="Spring Image (Mar-May)"
                .value=${this._config.seasonal_images?.spring || 'default'}
                @selected=${(ev: CustomEvent) => this._seasonalImageChanged(ev, 'spring')}
                @closed=${(ev: Event) => ev.stopPropagation()}
              >
                <mwc-list-item value="default">Default - Cherry Blossoms & Tulips</mwc-list-item>
                <mwc-list-item value="/local/community/WeatherPulse/images/spring-alt1.jpg">Alt 1 - More Tulips & Flowers</mwc-list-item>
                <mwc-list-item value="/local/community/WeatherPulse/images/spring-alt2.jpg">Alt 2 - Vibrant Spring Garden</mwc-list-item>
              </ha-select>

              <ha-select
                label="Summer Image (Jun-Aug)"
                .value=${this._config.seasonal_images?.summer || 'default'}
                @selected=${(ev: CustomEvent) => this._seasonalImageChanged(ev, 'summer')}
                @closed=${(ev: Event) => ev.stopPropagation()}
              >
                <mwc-list-item value="default">Default - Tropical Beach Sunset</mwc-list-item>
                <mwc-list-item value="/local/community/WeatherPulse/images/summer-alt1.jpg">Alt 1 - Sunset Beach Painting</mwc-list-item>
              </ha-select>

              <ha-select
                label="Fall Image (Sep-Nov)"
                .value=${this._config.seasonal_images?.fall || 'default'}
                @selected=${(ev: CustomEvent) => this._seasonalImageChanged(ev, 'fall')}
                @closed=${(ev: Event) => ev.stopPropagation()}
              >
                <mwc-list-item value="default">Default - Pumpkin & Maple Leaves</mwc-list-item>
                <mwc-list-item value="/local/community/WeatherPulse/images/fall-alt1.jpg">Alt 1 - Autumn Forest Scene</mwc-list-item>
              </ha-select>

              <ha-select
                label="Winter Image (Dec-Feb)"
                .value=${this._config.seasonal_images?.winter || 'default'}
                @selected=${(ev: CustomEvent) => this._seasonalImageChanged(ev, 'winter')}
                @closed=${(ev: Event) => ev.stopPropagation()}
              >
                <mwc-list-item value="default">Default - Snowy Winter Beach</mwc-list-item>
                <mwc-list-item value="/local/community/WeatherPulse/images/winter-alt1.jpg">Alt 1 - Snowy Palm Tree Beach</mwc-list-item>
              </ha-select>

              <p class="helper-text">
                Using "Default" will load the bundled images automatically. Select alternates to use different bundled images.
              </p>
            </div>
          ` : ''}

          <ha-formfield label="Show Date">
            <ha-switch
              .configValue=${'show_date'}
              .checked=${this._config.show_date !== false}
              @change=${this._toggleChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Time">
            <ha-switch
              .configValue=${'show_time'}
              .checked=${this._config.show_time !== false}
              @change=${this._toggleChanged}
            ></ha-switch>
          </ha-formfield>
        </div>

        <!-- Forecast Settings -->
        <div class="section">
          <h4>Forecast Settings</h4>

          <ha-formfield label="Show Forecast">
            <ha-switch
              .configValue=${'show_forecast'}
              .checked=${this._config.show_forecast !== false}
              @change=${this._toggleChanged}
            ></ha-switch>
          </ha-formfield>
          <p class="helper-text">
            Toggle to show or hide the forecast section. Will hide automatically if no forecast data is available.
          </p>

          <ha-select
            label="Forecast Type"
            .configValue=${'forecast_type'}
            .value=${this._config.forecast_type || 'daily'}
            @selected=${this._valueChanged}
            @closed=${(ev: Event) => ev.stopPropagation()}
          >
            <mwc-list-item value="daily">Daily</mwc-list-item>
            <mwc-list-item value="hourly">Hourly</mwc-list-item>
          </ha-select>

          ${this._config.forecast_type === 'hourly' ? html`
            <ha-textfield
              label="Number of Hours"
              type="number"
              .configValue=${'hourly_count'}
              .value=${String(this._config.hourly_count || 12)}
              @input=${this._valueChanged}
              min="1"
              max="48"
            ></ha-textfield>
            <p class="helper-text">
              Show 1-48 hours of forecast data
            </p>
          ` : html`
            <ha-select
              label="Forecast Days"
              .configValue=${'forecast_days'}
              .value=${String(this._config.forecast_days || 5)}
              @selected=${this._valueChanged}
              @closed=${(ev: Event) => ev.stopPropagation()}
            >
              <mwc-list-item value="5">5 Days</mwc-list-item>
              <mwc-list-item value="7">7 Days</mwc-list-item>
            </ha-select>
          `}

          <ha-select
            label="View Mode"
            .configValue=${'view_mode'}
            .value=${this._config.view_mode || 'standard'}
            @selected=${this._valueChanged}
            @closed=${(ev: Event) => ev.stopPropagation()}
          >
            <mwc-list-item value="compact">Compact</mwc-list-item>
            <mwc-list-item value="standard">Standard</mwc-list-item>
            <mwc-list-item value="detailed">Detailed</mwc-list-item>
          </ha-select>
        </div>

        <!-- Weather Information -->
        <div class="section">
          <h4>Weather Information Display</h4>
          <p class="helper-text">
            Select which weather details to display below the header (when available from your weather provider).
          </p>

          <ha-select
            label="Weather Info Layout"
            .configValue=${'weather_info_layout'}
            .value=${this._config.weather_info_layout || 'standard'}
            @selected=${this._valueChanged}
            @closed=${(ev: Event) => ev.stopPropagation()}
          >
            <mwc-list-item value="compact">Compact (small, icon + value)</mwc-list-item>
            <mwc-list-item value="standard">Standard</mwc-list-item>
            <mwc-list-item value="detailed">Detailed (large cards)</mwc-list-item>
          </ha-select>

          <ha-formfield label="UV Index">
            <ha-switch
              .checked=${this._config.show_weather_info?.includes('uv_index')}
              @change=${(ev: CustomEvent) => this._weatherInfoToggle(ev, 'uv_index')}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Wind Speed">
            <ha-switch
              .checked=${this._config.show_weather_info?.includes('wind')}
              @change=${(ev: CustomEvent) => this._weatherInfoToggle(ev, 'wind')}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Feels Like Temperature">
            <ha-switch
              .checked=${this._config.show_weather_info?.includes('feels_like')}
              @change=${(ev: CustomEvent) => this._weatherInfoToggle(ev, 'feels_like')}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Precipitation">
            <ha-switch
              .checked=${this._config.show_weather_info?.includes('precipitation')}
              @change=${(ev: CustomEvent) => this._weatherInfoToggle(ev, 'precipitation')}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Humidity">
            <ha-switch
              .checked=${this._config.show_weather_info?.includes('humidity')}
              @change=${(ev: CustomEvent) => this._weatherInfoToggle(ev, 'humidity')}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Pressure">
            <ha-switch
              .checked=${this._config.show_weather_info?.includes('pressure')}
              @change=${(ev: CustomEvent) => this._weatherInfoToggle(ev, 'pressure')}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Visibility">
            <ha-switch
              .checked=${this._config.show_weather_info?.includes('visibility')}
              @change=${(ev: CustomEvent) => this._weatherInfoToggle(ev, 'visibility')}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Sunrise/Sunset">
            <ha-switch
              .checked=${this._config.show_weather_info?.includes('sunrise_sunset')}
              @change=${(ev: CustomEvent) => this._weatherInfoToggle(ev, 'sunrise_sunset')}
            ></ha-switch>
          </ha-formfield>
        </div>

        <!-- Display Options -->
        <div class="section">
          <h4>Display Options</h4>

          <ha-formfield label="Animate Icons">
            <ha-switch
              .configValue=${'animate_icons'}
              .checked=${this._config.animate_icons !== false}
              @change=${this._toggleChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Auto Day/Night Mode">
            <ha-switch
              .configValue=${'night_mode'}
              .checked=${this._config.night_mode === true}
              @change=${this._toggleChanged}
            ></ha-switch>
          </ha-formfield>
          <p class="helper-text">
            Automatically switch to a darker, starry theme at night based on sunrise/sunset times. Works with all header modes.
          </p>

        </div>

        <!-- Help Text -->
        <div class="section help">
          <p><strong>Tips:</strong></p>
          <ul>
            <li>The header gradient automatically changes color based on temperature</li>
            <li>Use greeting mode with your name for a personalized experience</li>
            <li>Add an outdoor temperature sensor for more accurate header colors</li>
            <li>All settings can also be configured via YAML</li>
          </ul>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .card-config {
        padding: 16px;
      }

      h3 {
        margin-top: 0;
        margin-bottom: 16px;
        font-size: 1.2em;
        font-weight: 500;
      }

      h4 {
        margin-top: 16px;
        margin-bottom: 8px;
        font-size: 1em;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .section {
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--divider-color);
      }

      .section:last-child {
        border-bottom: none;
      }

      ha-select,
      ha-textfield {
        width: 100%;
        margin-bottom: 12px;
      }

      ha-formfield {
        display: block;
        margin-bottom: 8px;
      }

      .helper-text {
        font-size: 0.85em;
        color: var(--secondary-text-color);
        margin: 4px 0 12px 0;
        font-style: italic;
      }

      .help {
        background: var(--secondary-background-color);
        padding: 12px;
        border-radius: 4px;
      }

      .help ul {
        margin: 8px 0 0 0;
        padding-left: 20px;
      }

      .help li {
        margin-bottom: 4px;
        font-size: 0.9em;
        color: var(--secondary-text-color);
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'weatherpulse-card-editor': WeatherPulseCardEditor;
  }
}
