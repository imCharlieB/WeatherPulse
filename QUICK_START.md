# WeatherPulse Card - Quick Start Guide

## 5-Minute Setup

### Step 1: Install the Card

**Via HACS** (when available):
1. Open HACS → Frontend
2. Search for "WeatherPulse Card"
3. Click Install
4. Refresh browser

**Manual Install**:
1. Download `weatherpulse-card.js`
2. Copy to `config/www/weatherpulse-card/`
3. Add resource in Settings → Dashboards → Resources:
   - URL: `/local/weatherpulse-card/weatherpulse-card.js`
   - Type: JavaScript Module

### Step 2: Add to Dashboard

1. Edit your dashboard
2. Add new card
3. Use this config:

```yaml
type: custom:weatherpulse-card
entity: weather.home
```

**That's it!** You'll see a time-focused card with temperature-based colors and a 5-day forecast.

---

## Common Configurations

### 🕐 Time Focus (Default)

Large clock display, perfect for bedroom or hallway:

```yaml
type: custom:weatherpulse-card
entity: weather.home
outdoor_temp_sensor: sensor.outdoor_temperature
header_mode: time-focused
forecast_days: 5
```

### 👋 Greeting Mode

Personal and friendly:

```yaml
type: custom:weatherpulse-card
entity: weather.home
outdoor_temp_sensor: sensor.outdoor_temperature
header_mode: greeting
greeting_name: Sarah
forecast_days: 7
```

### 📅 Date Focus

Great for planning the week:

```yaml
type: custom:weatherpulse-card
entity: weather.home
header_mode: date-focused
forecast_days: 7
```

### ⚖️ Balanced

Equal time and date:

```yaml
type: custom:weatherpulse-card
entity: weather.home
header_mode: balanced
forecast_days: 5
```

### 🎯 Minimal

Clean and simple:

```yaml
type: custom:weatherpulse-card
entity: weather.home
header_mode: minimal
forecast_days: 5
```

---

## Finding Your Weather Entity

**Quick Method:**
1. Go to Developer Tools → States
2. Search for `weather.`
3. Common entities:
   - `weather.home`
   - `weather.forecast_home`
   - `weather.openweathermap`
   - `weather.met_no`

**Copy the entity ID** and use it in your config!

---

## Adding Your Temperature Sensor

If you have an outdoor temperature sensor:

1. Find it in Developer Tools → States (usually starts with `sensor.`)
2. Add to your config:

```yaml
type: custom:weatherpulse-card
entity: weather.home
outdoor_temp_sensor: sensor.outdoor_temperature
```

Now the header gradient uses YOUR actual outdoor temperature! 🎨

---

## Configuration Cheat Sheet

| Option | Values | Default | What It Does |
|--------|--------|---------|--------------|
| `entity` | Entity ID | **Required** | Your weather entity |
| `outdoor_temp_sensor` | Sensor ID | Optional | Use real outdoor temp |
| `header_mode` | See modes below | `time-focused` | Header display style |
| `greeting_name` | Text | None | Name for greetings |
| `show_date` | `true`/`false` | `true` | Show date |
| `show_time` | `true`/`false` | `true` | Show time |
| `forecast_days` | `5`, `7`, or `10` | `5` | Days to show |

### Header Modes

- `time-focused` - Big clock, small date ⏰
- `date-focused` - Big date, small clock 📅
- `balanced` - Equal time & date ⚖️
- `minimal` - Just icon & temp 🎯
- `greeting` - Personal message 👋

---

## Temperature Colors

The header automatically changes based on temperature:

| Temp | Color | When You'll See It |
|------|-------|-------------------|
| < 32°F | 💜 Blue/Purple | Freezing winter |
| 32-50°F | 💙 Cool Blue/Teal | Chilly spring/fall |
| 50-70°F | 💚 Green/Yellow | Perfect weather! |
| 70-85°F | 🧡 Warm Orange | Nice summer day |
| > 85°F | ❤️ Hot Red/Orange | Heat wave |

---

## Troubleshooting

### "Entity not found"
- Check entity ID in Developer Tools → States
- Make sure it starts with `weather.`

### Card doesn't appear
- Clear browser cache (Ctrl+F5)
- Check resource was added correctly
- Verify file is in `config/www/`

### No forecast showing
- Some weather integrations don't provide forecast
- Try OpenWeatherMap or Met.no integration

### Temperature sensor not working
- Verify sensor exists and shows temperature
- Check entity ID is correct

---

## What's Included (v0.1.0)

✅ Temperature-based color gradients
✅ 5 different header modes
✅ Live clock (updates every second)
✅ 5/7/10 day forecasts
✅ Beautiful temperature bars
✅ Precipitation display
✅ Dual temperature support
✅ Personalized greetings

---

## Coming Soon

🚀 Animated weather icons
🚀 Multiple themes (Glass, Dark, Vibrant)
🚀 Hourly forecasts
🚀 Weather alerts
🚀 Seasonal background images
🚀 Visual configuration editor

See [FEATURES.md](FEATURES.md) for the complete roadmap!

---

## Need More Help?

📖 **Full User Guide**: [USAGE.md](USAGE.md)
🔧 **Development**: [DEVELOPMENT.md](DEVELOPMENT.md)
🗺️ **Features**: [FEATURES.md](FEATURES.md)
🐛 **Issues**: [GitHub Issues](https://github.com/imCharlieB/WeatherPulse/issues)

---

## Example Layouts

### Living Room Dashboard
```yaml
type: custom:weatherpulse-card
entity: weather.home
outdoor_temp_sensor: sensor.outdoor_temp
header_mode: greeting
greeting_name: Family
forecast_days: 7
```

### Bedroom Display
```yaml
type: custom:weatherpulse-card
entity: weather.home
header_mode: time-focused
forecast_days: 5
```

### Kitchen Tablet
```yaml
type: custom:weatherpulse-card
entity: weather.home
outdoor_temp_sensor: sensor.outdoor_temp
header_mode: balanced
forecast_days: 7
```

---

**Enjoy your WeatherPulse Card!** 🌤️
