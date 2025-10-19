import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, fireEvent, LovelaceCardEditor } from 'custom-card-helpers';
import { WeatherPulseCardConfig } from './types';

@customElement('weatherpulse-card-editor')
export class WeatherPulseCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: WeatherPulseCardConfig;
  @state() private _expandedSections: Set<string> = new Set(['required', 'theme']); // Start with required and theme expanded

  public setConfig(config: WeatherPulseCardConfig): void {
    this._config = config;
  }

  private _toggleSection(section: string): void {
    const newExpanded = new Set(this._expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    this._expandedSections = newExpanded;
  }

  private _valueChanged(ev: CustomEvent): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target as any;
    const configValue = target.configValue;
    let value = target.value;

    // Convert numeric strings to numbers for certain fields
    if ((configValue === 'forecast_days' || configValue === 'hourly_count' || configValue === 'gradient_overlay_opacity') && value) {
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

  private _customColorChanged(ev: Event, colorKey: string): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target as any;
    const value = target.value;

    const newConfig = {
      ...this._config,
      custom_theme_colors: {
        ...this._config.custom_theme_colors,
        [colorKey]: value || undefined,
      },
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
          <h4 class="section-header" @click=${() => this._toggleSection('required')}>
            <span class="chevron ${this._expandedSections.has('required') ? 'expanded' : ''}">▶</span>
            Required Settings
          </h4>

          ${this._expandedSections.has('required') ? html`
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
          ` : ''}
        </div>

        <!-- Theme Settings -->
        <div class="section">
          <h4 class="section-header" @click=${() => this._toggleSection('theme')}>
            <span class="chevron ${this._expandedSections.has('theme') ? 'expanded' : ''}">▶</span>
            Theme Settings
          </h4>

          ${this._expandedSections.has('theme') ? html`
          <ha-select
            label="Visual Theme"
            .configValue=${'theme'}
            .value=${this._config.theme || 'default'}
            @selected=${this._valueChanged}
            @closed=${(ev: Event) => ev.stopPropagation()}
          >
            <mwc-list-item value="default">Default</mwc-list-item>
            <mwc-list-item value="retro">Retro/Neubrutalism (Bold & Boxy)</mwc-list-item>
            <mwc-list-item value="glass">Glassmorphism (Frosted Glass)</mwc-list-item>
            <mwc-list-item value="minimal">Minimal (Clean & Simple)</mwc-list-item>
            <mwc-list-item value="vibrant">Vibrant (Bright & Colorful)</mwc-list-item>
            <mwc-list-item value="custom">Custom (Use Custom Colors)</mwc-list-item>
          </ha-select>
          <p class="helper-text">
            Choose a pre-built visual theme or create your own custom theme.
          </p>

          ${this._config.theme === 'custom' ? html`
            <p class="helper-text" style="margin-top: 16px; font-weight: 600;">
              Custom Theme Colors (use CSS color values like #667eea or rgb(102, 126, 234)):
            </p>
            <ha-textfield
              label="Primary Color"
              .value=${this._config.custom_theme_colors?.primary || ''}
              @input=${(ev: Event) => this._customColorChanged(ev, 'primary')}
              placeholder="#667eea"
            ></ha-textfield>
            <ha-textfield
              label="Secondary Color"
              .value=${this._config.custom_theme_colors?.secondary || ''}
              @input=${(ev: Event) => this._customColorChanged(ev, 'secondary')}
              placeholder="#764ba2"
            ></ha-textfield>
            <ha-textfield
              label="Background Color"
              .value=${this._config.custom_theme_colors?.background || ''}
              @input=${(ev: Event) => this._customColorChanged(ev, 'background')}
              placeholder="#ffffff"
            ></ha-textfield>
            <ha-textfield
              label="Text Color"
              .value=${this._config.custom_theme_colors?.text || ''}
              @input=${(ev: Event) => this._customColorChanged(ev, 'text')}
              placeholder="#333333"
            ></ha-textfield>
            <ha-textfield
              label="Border Color"
              .value=${this._config.custom_theme_colors?.border || ''}
              @input=${(ev: Event) => this._customColorChanged(ev, 'border')}
              placeholder="#e0e0e0"
            ></ha-textfield>
            <ha-textfield
              label="Accent Color"
              .value=${this._config.custom_theme_colors?.accent || ''}
              @input=${(ev: Event) => this._customColorChanged(ev, 'accent')}
              placeholder="#f093fb"
            ></ha-textfield>
          ` : ''}
          ` : ''}
        </div>

        <!-- Temperature Settings -->
        <div class="section">
          <h4 class="section-header" @click=${() => this._toggleSection('temperature')}>
            <span class="chevron ${this._expandedSections.has('temperature') ? 'expanded' : ''}">▶</span>
            Temperature Settings
          </h4>

          ${this._expandedSections.has('temperature') ? html`
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
          ` : ''}
        </div>

        <!-- Header Settings -->
        <div class="section">
          <h4 class="section-header" @click=${() => this._toggleSection('header')}>
            <span class="chevron ${this._expandedSections.has('header') ? 'expanded' : ''}">▶</span>
            Header Settings
          </h4>

          ${this._expandedSections.has('header') ? html`
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
          ` : ''}
        </div>

        <!-- Forecast Settings -->
        <div class="section">
          <h4 class="section-header" @click=${() => this._toggleSection('forecast')}>
            <span class="chevron ${this._expandedSections.has('forecast') ? 'expanded' : ''}">▶</span>
            Forecast Settings
          </h4>

          ${this._expandedSections.has('forecast') ? html`
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
            <mwc-list-item value="chart">Chart (Temperature Trend Line)</mwc-list-item>
          </ha-select>
          <p class="helper-text">
            Chart view displays a temperature trend line with weather icons, similar to TV weather graphics.
          </p>
          ` : ''}
        </div>

        <!-- Weather Information -->
        <div class="section">
          <h4 class="section-header" @click=${() => this._toggleSection('weather_info')}>
            <span class="chevron ${this._expandedSections.has('weather_info') ? 'expanded' : ''}">▶</span>
            Weather Information Display
          </h4>

          ${this._expandedSections.has('weather_info') ? html`
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
            <mwc-list-item value="compact">Compact (displayed in header)</mwc-list-item>
            <mwc-list-item value="standard">Standard (separate cards)</mwc-list-item>
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
          ` : ''}
        </div>

        <!-- Display Options -->
        <div class="section">
          <h4 class="section-header" @click=${() => this._toggleSection('display')}>
            <span class="chevron ${this._expandedSections.has('display') ? 'expanded' : ''}">▶</span>
            Display Options
          </h4>

          ${this._expandedSections.has('display') ? html`
          <ha-formfield label="Animate Icons">
            <ha-switch
              .configValue=${'animate_icons'}
              .checked=${this._config.animate_icons !== false}
              @change=${this._toggleChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Enable Temperature Gradient Overlay">
            <ha-switch
              .configValue=${'enable_gradient_overlay'}
              .checked=${this._config.enable_gradient_overlay !== false}
              @change=${this._toggleChanged}
            ></ha-switch>
          </ha-formfield>
          <p class="helper-text">
            Show a faint overlay of the temperature gradient color on the card header. Works with all themes including default.
          </p>

          ${this._config.enable_gradient_overlay !== false ? html`
            <ha-textfield
              label="Gradient Overlay Opacity (%)"
              type="number"
              .configValue=${'gradient_overlay_opacity'}
              .value=${String(this._config.gradient_overlay_opacity !== undefined ? this._config.gradient_overlay_opacity : 10)}
              @input=${this._valueChanged}
              min="0"
              max="100"
            ></ha-textfield>
            <p class="helper-text">
              Adjust the opacity of the gradient overlay (0-100%). Default is 10%. Lower values are more subtle.
            </p>
          ` : ''}

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

          <ha-formfield label="Show Moon Phase Icons">
            <ha-switch
              .configValue=${'show_moon_phase'}
              .checked=${this._config.show_moon_phase !== false}
              @change=${this._toggleChanged}
            ></ha-switch>
          </ha-formfield>
          <p class="helper-text">
            On clear nights, replace the generic moon icon with the actual current moon phase (new moon, crescent, quarter, gibbous, full moon). Requires sensor.moon_phase entity.
          </p>

          <ha-formfield label="Enable Holiday Themes">
            <ha-switch
              .configValue=${'holiday_themes'}
              .checked=${this._config.holiday_themes === true}
              @change=${this._toggleChanged}
            ></ha-switch>
          </ha-formfield>
          <p class="helper-text">
            Automatically add festive decorative icons during holidays (Halloween, Christmas, New Year, Valentine's Day, St. Patrick's Day, Easter, 4th of July, Cinco de Mayo). Icons appear as subtle animated overlays.
          </p>

          <ha-formfield label="Show NWS Weather Alerts">
            <ha-switch
              .configValue=${'show_nws_alerts'}
              .checked=${this._config.show_nws_alerts === true}
              @change=${this._toggleChanged}
            ></ha-switch>
          </ha-formfield>
          <p class="helper-text">
            Display National Weather Service alerts for your location. Uses your Home Assistant location coordinates.
          </p>

          ${this._config.show_nws_alerts ? html`
            <ha-formfield label="Alert Test Mode (shows sample alerts from anywhere in US)">
              <ha-switch
                .configValue=${'nws_test_mode'}
                .checked=${this._config.nws_test_mode === true}
                @change=${this._toggleChanged}
              ></ha-switch>
            </ha-formfield>
            <p class="helper-text">
              Enable this to see real NWS alerts from across the US for testing the alert display. Turn off when done testing.
            </p>
          ` : ''}
          ` : ''}
        </div>

        <!-- Advanced Options -->
        <div class="section">
          <h4 class="section-header" @click=${() => this._toggleSection('advanced')}>
            <span class="chevron ${this._expandedSections.has('advanced') ? 'expanded' : ''}">▶</span>
            Advanced Options
          </h4>

          ${this._expandedSections.has('advanced') ? html`
          <p class="helper-text">
            Optional: Override default sun and moon entities. Leave empty to use defaults.
          </p>

          <ha-selector
            .hass=${this.hass}
            .selector=${{ entity: { domain: 'sun' } }}
            .value=${this._config.sun_entity || 'sun.sun'}
            .label=${'Sun Entity'}
            .configValue=${'sun_entity'}
            @value-changed=${this._valueChanged}
          ></ha-selector>
          <p class="helper-text">
            Used for sunrise/sunset times and day/night detection. Defaults to sun.sun.
          </p>

          <ha-selector
            .hass=${this.hass}
            .selector=${{ entity: { domain: 'sensor' } }}
            .value=${this._config.moon_entity || 'sensor.moon_phase'}
            .label=${'Moon Entity'}
            .configValue=${'moon_entity'}
            @value-changed=${this._valueChanged}
          ></ha-selector>
          <p class="helper-text">
            Used for displaying accurate moon phase icons on clear nights. Defaults to sensor.moon_phase.
          </p>
          ` : ''}
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

      .section-header {
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        margin: -8px;
        border-radius: 4px;
        transition: background-color 0.2s;
      }

      .section-header:hover {
        background-color: var(--secondary-background-color);
      }

      .chevron {
        display: inline-block;
        font-size: 0.8em;
        transition: transform 0.2s ease;
        transform: rotate(0deg);
      }

      .chevron.expanded {
        transform: rotate(90deg);
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
