# WeatherPulse

A modern, highly configurable weather card for Home Assistant with dynamic theming, animated icons, and intelligent contextual information.

## ✨ Key Features

### ✅ Currently Available
- 🌡️ **Temperature-Based Header Highlighting** - Dynamic gradients that change based on actual outdoor temperature (5 temperature ranges)
- 👋 **Smart Greeting Mode** - Personalized, context-aware messages based on time and weather
- 📊 **Dual Temperature Display** - Show both forecast and actual sensor readings side-by-side
- 🎬 **Animated Weather Icons** - Beautiful SVG animations for sun, clouds, rain, snow, storms, fog, and wind
- 📅 **Flexible Forecast Views** - Choose between daily (5 or 7 days) or hourly forecasts
- 🎯 **Three View Modes** - Compact, Standard, and Detailed layouts
- ⏰ **Hourly Forecasts** - View upcoming weather by hour with customizable count
- 🎨 **Five Header Modes** - Time-Focused, Date-Focused, Balanced, Minimal, and Greeting
- ⚙️ **Visual Configuration Editor** - Easy setup through Home Assistant UI
- 🚀 **Modern Tech Stack** - Built with TypeScript and Lit for performance
- 📦 **HACS Compatible** - Easy installation and updates

### 🚧 Coming Soon
- 🎨 Pre-built themes (Glassmorphism, Minimal, Dark Mode)
- 📈 Advanced data visualizations (UV Index, Air Quality)
- 🖼️ Graphical seasonal header with custom images
- 🔔 Smart weather alerts via NWS Alerts integration
- 🌙 Night-time weather icons (moon phases)

## 🚧 Development Status

**Phase 1 & 2 Complete!** Core functionality is working and ready for testing. The card includes all basic features, animated icons, multiple view modes, and a visual configuration editor.

See [FEATURES.md](FEATURES.md) for complete feature list and roadmap.

## 📦 Installation

### HACS (Recommended)

1. Make sure you have [HACS](https://hacs.xyz/) installed
2. Go to HACS → Frontend
3. Click the 3 dots menu → Custom repositories
4. Add this repository URL: `https://github.com/imCharlieB/WeatherPulse`
5. Category: Lovelace
6. Click "Add"
7. Find "WeatherPulse Card" and click Install
8. Restart Home Assistant

### Manual Installation

1. Download the latest `weatherpulse-card.js` from the [dist folder](dist/)
2. Copy it to your `config/www/` directory
3. Add the resource in Home Assistant:
   - Go to Settings → Dashboards → Resources
   - Click "Add Resource"
   - URL: `/local/weatherpulse-card.js`
   - Resource type: JavaScript Module
4. Restart Home Assistant

## ⚙️ Configuration

### Quick Start

Add the card through the visual editor:
1. Edit your dashboard
2. Click "Add Card"
3. Search for "WeatherPulse"
4. Select your weather entity
5. Customize settings as desired

### YAML Configuration

```yaml
type: custom:weatherpulse-card
entity: weather.home
outdoor_temp_sensor: sensor.outdoor_temperature  # Optional
header_mode: time-focused  # time-focused | date-focused | balanced | minimal | greeting
greeting_name: Your Name  # For greeting mode
show_date: true
show_time: true
forecast_type: daily  # daily | hourly
forecast_days: 5  # 5 | 7 (for daily)
hourly_count: 12  # 1-48 (for hourly)
view_mode: standard  # compact | standard | detailed
temp_display_mode: both  # forecast | actual | both
animate_icons: true
show_forecast: true
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **Required** | Your weather entity (e.g., `weather.home`) |
| `outdoor_temp_sensor` | string | Optional | Actual outdoor temperature sensor for more accurate header colors |
| `header_mode` | string | `time-focused` | Header layout: `time-focused`, `date-focused`, `balanced`, `minimal`, `greeting` |
| `greeting_name` | string | Optional | Your name for personalized greetings (used in greeting mode) |
| `show_date` | boolean | `true` | Show date in header |
| `show_time` | boolean | `true` | Show time in header |
| `forecast_type` | string | `daily` | Forecast type: `daily` or `hourly` |
| `forecast_days` | number | `5` | Number of forecast days: `5` or `7` (when forecast_type is daily) |
| `hourly_count` | number | `12` | Number of hours to show: `1-48` (when forecast_type is hourly) |
| `view_mode` | string | `standard` | Forecast layout: `compact`, `standard`, `detailed` |
| `temp_display_mode` | string | `forecast` | Temperature display: `forecast`, `actual`, `both` |
| `animate_icons` | boolean | `true` | Enable animated weather icons |
| `show_forecast` | boolean | `true` | Show forecast section |

## 🎯 Roadmap

See [FEATURES.md](FEATURES.md) for detailed feature specifications and development phases.

## 🤝 Contributing

This project is in early development. Contributions, ideas, and feedback are welcome!

## 📄 License

_To be determined_

## 🙏 Acknowledgments

Inspired by modern weather UI designs and the Home Assistant community.
