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

    const newConfig = {
      ...this._config,
      seasonal_images: {
        ...(this._config.seasonal_images || {}),
        [season]: value === '' ? undefined : value
      }
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
                Upload seasonal background images (800x280px recommended). Leave blank to use solid color placeholders.
              </p>

              <ha-textfield
                label="Spring Image URL (Mar-May)"
                placeholder="/local/images/spring.jpg"
                .value=${this._config.seasonal_images?.spring || ''}
                @input=${(ev: CustomEvent) => this._seasonalImageChanged(ev, 'spring')}
              ></ha-textfield>

              <ha-textfield
                label="Summer Image URL (Jun-Aug)"
                placeholder="/local/images/summer.jpg"
                .value=${this._config.seasonal_images?.summer || ''}
                @input=${(ev: CustomEvent) => this._seasonalImageChanged(ev, 'summer')}
              ></ha-textfield>

              <ha-textfield
                label="Fall Image URL (Sep-Nov)"
                placeholder="/local/images/fall.jpg"
                .value=${this._config.seasonal_images?.fall || ''}
                @input=${(ev: CustomEvent) => this._seasonalImageChanged(ev, 'fall')}
              ></ha-textfield>

              <ha-textfield
                label="Winter Image URL (Dec-Feb)"
                placeholder="/local/images/winter.jpg"
                .value=${this._config.seasonal_images?.winter || ''}
                @input=${(ev: CustomEvent) => this._seasonalImageChanged(ev, 'winter')}
              ></ha-textfield>

              <p class="helper-text">
                Upload images to <code>/config/www/images/</code> folder, then reference as <code>/local/images/filename.jpg</code>
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
