# WeatherPulse Card - Troubleshooting Guide

## Forecast Not Showing

If your forecast section is not displaying, here's how to diagnose the issue:

### Step 1: Check Browser Console

1. Open your Home Assistant dashboard
2. Press `F12` to open Developer Tools
3. Go to the **Console** tab
4. Look for WeatherPulse logs that say:
   ```
   Weather entity: weather.your_entity
   Weather attributes: {...}
   Forecast data: [...]
   ```

### Step 2: Check Forecast Data

In the console logs, look at the "Forecast data" array:

**If you see an empty array `[]`:**
- Your weather integration doesn't provide forecast in the entity attributes
- This is common with newer Home Assistant weather integrations
- See "Modern Weather Integrations" section below

**If you see forecast data:**
- The card should display it
- If it's still not showing, report this as a bug

### Step 3: Check Your Weather Integration

Different weather integrations handle forecast differently:

#### Legacy Integrations (Forecast in Attributes)
Older integrations store forecast in the entity attributes:
- Some older custom integrations
- Deprecated weather platforms

These work automatically with WeatherPulse Card.

#### Modern Integrations (Forecast via Service Call)
Newer integrations (2023.9+) require a service call to get forecast:
- Met.no (Norwegian Meteorological Institute)
- OpenWeatherMap
- Most built-in HA weather integrations

**Solution for Modern Integrations:**

You need to use a template sensor or automation to store the forecast. Here's how:

1. **Create a template sensor** in your `configuration.yaml`:

```yaml
template:
  - trigger:
      - platform: time_pattern
        hours: "/1"  # Update every hour
      - platform: homeassistant
        event: start
    action:
      - service: weather.get_forecasts
        data:
          type: daily
        target:
          entity_id: weather.forecast_home
        response_variable: daily
    sensor:
      - name: "Weather Forecast Data"
        unique_id: weather_forecast_data
        state: "{{ now().isoformat() }}"
        attributes:
          forecast: "{{ daily['weather.forecast_home'].forecast }}"
```

2. **Use a custom weather entity wrapper** (Advanced):

You can create a custom weather entity that includes forecast in attributes:

```yaml
# In configuration.yaml
weather:
  - platform: template
    name: "Weather with Forecast"
    condition_template: "{{ states('weather.forecast_home') }}"
    temperature_template: "{{ state_attr('weather.forecast_home', 'temperature') }}"
    humidity_template: "{{ state_attr('weather.forecast_home', 'humidity') }}"
    forecast_template: "{{ state_attr('sensor.weather_forecast_data', 'forecast') }}"
```

3. **Then use the new entity** in WeatherPulse Card:
```yaml
type: custom:weatherpulse-card
entity: weather.weather_with_forecast
```

## Outdoor Temperature Not Showing

If you've selected an outdoor temperature sensor but it's not showing:

### Check Temperature Display Mode

1. **Edit the card**
2. **Go to Temperature Settings**
3. **Set "Temperature Display Mode" to:**
   - **"Both"** - Shows both forecast temps and actual temp
   - **"Actual Only"** - Shows only actual temperature from sensor

### Verify Sensor

1. **Go to Developer Tools → States**
2. **Search for your temperature sensor** (e.g., `sensor.outdoor_temperature`)
3. **Verify it has a numeric state** (e.g., `72`, not `unavailable`)

### Check Console Logs

The console will show if the sensor is being read:
```
Temperature sensor: sensor.outdoor_temperature
Sensor state: 72
```

## Animated Icons Not Working

If icons aren't animating:

1. **Check "Animate Icons" setting** in editor (should be ON)
2. **Clear browser cache** (Ctrl+F5 or Cmd+Shift+R)
3. **Check browser compatibility** (works in Chrome, Firefox, Safari, Edge)

## Card Not Loading

If the card doesn't appear at all:

1. **Verify installation:**
   - Check `config/www/weatherpulse-card/` has the JS file
   - OR HACS shows it as installed

2. **Check resources:**
   - Go to Settings → Dashboards → Resources
   - Verify `/local/weatherpulse-card/weatherpulse-card.js` is listed
   - Type should be "JavaScript Module"

3. **Clear cache:**
   - Press Ctrl+F5 (or Cmd+Shift+R on Mac)
   - Or clear browser cache completely

4. **Check console for errors:**
   - Press F12
   - Look for red error messages
   - Report any errors to GitHub Issues

## Visual Editor Not Showing

If "Visual editor not supported" appears:

1. **Update the card** to latest version
2. **Clear browser cache** (Ctrl+F5)
3. **Verify you're using** Home Assistant 2024.1.0 or newer

Visual editor was added in WeatherPulse v0.1.0+

## Common Weather Integration Issues

### Met.no (Norwegian Meteorological Institute)

Met.no uses service calls for forecast. Use the template sensor solution above.

**Entity:** Usually `weather.home` or `weather.forecast_home`

### OpenWeatherMap

OpenWeatherMap also requires service calls for forecast.

**Entity:** Usually `weather.openweathermap`

### AccuWeather

AccuWeather integration typically stores forecast in attributes (legacy style).

**Entity:** Usually `weather.home`

### Dark Sky (Deprecated)

Dark Sky is no longer available. Please switch to a different integration.

## Getting Help

If none of these solutions work:

1. **Check your Home Assistant version** (2024.1.0+ recommended)
2. **Note your weather integration** (Met.no, OpenWeatherMap, etc.)
3. **Copy console logs** from browser Developer Tools
4. **Open an issue** at: https://github.com/imCharlieB/WeatherPulse/issues

Include:
- Home Assistant version
- Weather integration name
- Browser console logs
- Card configuration (YAML)
- Screenshots if helpful

## FAQ

**Q: Why doesn't my forecast show?**
A: Most modern weather integrations (2023.9+) require a service call to get forecast. See "Modern Integrations" section above.

**Q: Can I use multiple temperature sensors?**
A: Currently only one outdoor temp sensor is supported. Future versions may support multiple sensors.

**Q: Why is the header color wrong?**
A: The header gradient is based on the outdoor temp sensor (if configured) or forecast temperature. Check that your sensor is reporting correctly.

**Q: Can I customize the colors?**
A: Custom color theming is planned for Phase 2. Currently uses the built-in temperature gradient system.

**Q: Does this work with weather integrations other than Met.no?**
A: Yes! Works with any Home Assistant weather entity. Some may require the template sensor workaround for forecast.

**Q: How do I report a bug?**
A: Open an issue at: https://github.com/imCharlieB/WeatherPulse/issues

---

**Still having issues?** Open a GitHub issue with details!
