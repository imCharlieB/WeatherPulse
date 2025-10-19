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
- 🎨 **Six Header Modes** - Time-Focused, Date-Focused, Balanced, Minimal, Greeting, and Graphical
- ⚙️ **Visual Configuration Editor** - Easy setup through Home Assistant UI
- 🚀 **Modern Tech Stack** - Built with TypeScript and Lit for performance
- 📦 **HACS Compatible** - Easy installation and updates

- 🖼️ **Graphical Seasonal Header** - Beautiful seasonal backgrounds that auto-switch with custom image support
- 🌙 **Night-Time Weather Icons** - Moon icons with animated glow effect (8PM-6AM)

### 🚧 Coming Soon
- 🎨 Pre-built themes (Glassmorphism, Minimal, Dark Mode)
- 📈 Advanced data visualizations (UV Index, Air Quality)
- 🔔 Smart weather alerts via NWS Alerts integration
- 🌙 Moon phases (actual lunar phase display)

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
header_mode: time-focused  # time-focused | date-focused | balanced | minimal | greeting | graphical
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

# Optional: Custom seasonal images for graphical header mode
seasonal_images:
  spring: /local/images/spring-garden.jpg
  summer: /local/images/beach-sunset.jpg
  fall: /local/images/autumn-leaves.jpg
  winter: /local/images/snowy-mountains.jpg
```

#### Graphical Header Mode

The graphical header mode displays a large, immersive header with seasonal backgrounds:
- **Auto-switching**: Backgrounds automatically change based on the current season
- **Default gradients**: Beautiful gradient backgrounds if no custom images are provided
  - Spring (Mar-May): Soft pastels - blooming flowers theme
  - Summer (Jun-Aug): Vibrant blues/yellows - beach/sunny theme
  - Fall (Sep-Nov): Warm oranges/purples - autumn leaves theme
  - Winter (Dec-Feb): Cool blues/whites - snowy landscape theme
- **Custom images**: Upload your own seasonal photos to `/config/www/images/` and reference them via `seasonal_images`
- **Overlay design**: Dark gradient overlay ensures text readability over any background
- **Large display**: 280px tall header with prominent time, date, weather icon, and temperature

**Tip**: For best results with custom images, use high-quality landscape photos (1920x1080 or larger) that represent each season in your location.

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **Required** | Your weather entity (e.g., `weather.home`) |
| `outdoor_temp_sensor` | string | Optional | Actual outdoor temperature sensor for more accurate header colors |
| `header_mode` | string | `time-focused` | Header layout: `time-focused`, `date-focused`, `balanced`, `minimal`, `greeting`, `graphical` |
| `greeting_name` | string | Optional | Your name for personalized greetings (used in greeting mode) |
| `seasonal_images` | object | Optional | Custom seasonal background images (spring, summer, fall, winter) - see example above |
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
