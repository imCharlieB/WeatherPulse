# WeatherPulse

[![GitHub Release][releases-shield]][releases]
[![GitHub Activity][commits-shield]][commits]
[![License][license-shield]](LICENSE)
[![hacs][hacsbadge]][hacs]
[![Project Maintenance][maintenance-shield]][user_profile]

![Project Stage][project-stage-shield]

A modern, highly configurable weather card for Home Assistant with dynamic theming, animated icons, and intelligent contextual information.

[releases-shield]: https://img.shields.io/github/release/imCharlieB/WeatherPulse.svg?style=for-the-badge
[releases]: https://github.com/imCharlieB/WeatherPulse/releases
[commits-shield]: https://img.shields.io/github/commit-activity/y/imCharlieB/WeatherPulse.svg?style=for-the-badge
[commits]: https://github.com/imCharlieB/WeatherPulse/commits/main
[hacs]: https://hacs.xyz
[hacsbadge]: https://img.shields.io/badge/HACS-Default-41BDF5.svg?style=for-the-badge
[license-shield]: https://img.shields.io/github/license/imCharlieB/WeatherPulse.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/badge/maintainer-%40imCharlieB-blue.svg?style=for-the-badge
[user_profile]: https://github.com/imCharlieB
[project-stage-shield]: https://img.shields.io/badge/Project%20Stage-Beta-yellow?style=for-the-badge

## ✨ Features

- 🌡️ **Temperature-Based Gradients** - Header colors change dynamically based on temperature (5 ranges)
- 🎨 **5 Professional Themes** - Default, Retro, Midnight (dark), Minimal, Vibrant + Custom
- 🎬 **Animated Weather Icons** - Professional Meteocons SVG icons with smooth animations
- 📅 **Flexible Forecasts** - Daily (5/7 days) or Hourly (1-48 hours) with multiple view modes
- 🎯 **Four View Modes** - Compact, Standard, Detailed, Chart (TV-style temperature lines)
- 🌙 **Auto Day/Night Mode** - Darker theme at night with animated starry background
- 🔔 **NWS Weather Alerts** - Real-time severe weather alerts (US only, no plugins required)
- ☔ **Rain Timing Notifications** - Broadcast-style banner when rain is coming in 4 hours
- 🌕 **Moon Phase Icons** - Accurate 8-phase moon icons on clear nights
- 🎉 **Holiday Decorations** - Festive overlays for 8 holidays (optional)
- 🖼️ **Graphical Header Mode** - Seasonal background images with 9 bundled options
- 👋 **Smart Greeting Mode** - Personalized, weather-aware messages
- 📊 **Weather Info Display** - UV index, wind, humidity, pressure, visibility, feels like
- ⚙️ **Visual Configuration Editor** - Easy setup through Home Assistant UI

See [FEATURES.md](FEATURES.md) for complete details and roadmap.

## 📦 Installation

### HACS (Recommended)

1. Install [HACS](https://hacs.xyz/) if you haven't already
2. Go to HACS → Frontend
3. Click the 3 dots menu → Custom repositories
4. Add: `https://github.com/imCharlieB/WeatherPulse`
5. Category: Lovelace
6. Find "WeatherPulse Card" and click Install
7. Restart Home Assistant

### Manual Installation

1. Download `weatherpulse-card.js` from the [dist folder](dist/)
2. Copy to your `config/www/` directory
3. Add the resource in Settings → Dashboards → Resources
   - URL: `/local/weatherpulse-card.js`
   - Type: JavaScript Module
4. Restart Home Assistant

## ⚙️ Configuration

### Quick Start

Use the visual editor:
1. Edit dashboard → Add Card → Search "WeatherPulse"
2. Select your weather entity
3. Customize settings as desired

### Basic YAML Example

```yaml
type: custom:weatherpulse-card
entity: weather.home
theme: midnight
view_mode: detailed
forecast_days: 7
night_mode: true
show_nws_alerts: true
```

### Full Configuration Example

```yaml
type: custom:weatherpulse-card
entity: weather.home
outdoor_temp_sensor: sensor.outdoor_temperature
header_mode: time-focused
theme: midnight
view_mode: detailed
forecast_type: daily
forecast_days: 7
night_mode: true
animate_icons: true
show_nws_alerts: true
holiday_themes: true

# Weather info display
show_weather_info:
  - uv_index
  - wind
  - feels_like
  - humidity
weather_info_layout: compact

# Optional customizations
greeting_name: Your Name
seasonal_images:
  spring: /local/images/spring.jpg
  summer: /local/images/summer.jpg
  fall: /local/images/fall.jpg
  winter: /local/images/winter.jpg
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **Required** | Weather entity (e.g., `weather.home`) |
| `outdoor_temp_sensor` | string | Optional | Sensor for actual outdoor temperature |
| `theme` | string | `default` | Theme: `default`, `retro`, `midnight`, `minimal`, `vibrant`, `custom` |
| `view_mode` | string | `standard` | Layout: `compact`, `standard`, `detailed`, `chart` |
| `header_mode` | string | `time-focused` | Header: `time-focused`, `date-focused`, `balanced`, `minimal`, `greeting`, `graphical` |
| `forecast_type` | string | `daily` | Type: `daily` or `hourly` |
| `forecast_days` | number | `5` | Days to show: `5` or `7` |
| `hourly_count` | number | `12` | Hours to show: `1-48` |
| `night_mode` | boolean | `false` | Auto day/night theme switching |
| `show_nws_alerts` | boolean | `false` | Enable NWS weather alerts (US only) |
| `holiday_themes` | boolean | `false` | Show holiday decorations |
| `show_moon_phase` | boolean | `true` | Show moon phases on clear nights |
| `animate_icons` | boolean | `true` | Enable icon animations |
| `show_weather_info` | array | `[]` | Info to show: `uv_index`, `wind`, `feels_like`, `humidity`, `pressure`, `visibility`, `sunrise_sunset` |
| `weather_info_layout` | string | `standard` | Layout: `compact`, `standard`, `detailed` |
| `greeting_name` | string | Optional | Name for greeting mode |
| `seasonal_images` | object | Optional | Custom seasonal images (spring/summer/fall/winter) |
| `custom_theme_colors` | object | Optional | Custom theme colors (6 colors) |

## 🎨 Themes

**Available Themes:**

| Theme | Description |
|-------|-------------|
| **Default** | Modern with temperature gradients |
| **Retro** | Bold black borders, sharp corners, hard shadows |
| **Midnight** | Pure dark theme for OLED displays and nighttime use |
| **Minimal** | Clean white, monochrome, professional |
| **Vibrant** | Bright gradients and saturated colors |
| **Custom** | Define your own 6-color palette |

**Midnight Theme** (Pure Dark):
- Near-black backgrounds (#0d0d0d, #151515)
- Dark gray header (#1a1a1a to #252525)
- Light gray text (#c0c0c0)
- No boxes on weather info - clean look
- Even darker night mode (pure black #000000)
- Perfect for dark mode and OLED screens

**Custom Theme Example:**
```yaml
theme: custom
custom_theme_colors:
  primary: "#1e88e5"
  secondary: "#43a047"
  background: "#fafafa"
  text: "#212121"
  border: "#bdbdbd"
  accent: "#ff6f00"
```

## 📚 Feature Details

### Graphical Header Mode

Displays seasonal background images with weather info overlay.

**Bundled Images:** 9 seasonal images included by default - just set `header_mode: graphical`

**Custom Images:**
```yaml
seasonal_images:
  spring: /local/images/spring.jpg
  summer: /local/images/summer.jpg
  fall: /local/images/fall.jpg
  winter: /local/images/winter.jpg
```

Recommended size: 800x280px, under 300KB each

### NWS Weather Alerts

Real-time severe weather alerts from National Weather Service (US only).

**Features:**
- Automatically uses your HA location coordinates
- Updates every 5 minutes
- Color-coded by severity (Red/Orange/Yellow/Blue)
- Auto-hides when no active alerts
- All alert types: hurricanes, tornadoes, storms, heat, floods, etc.

**Enable:**
```yaml
show_nws_alerts: true
```

### Rain Timing Notifications

Broadcast-style banner when rain is expected in next 4 hours.

**Features:**
- Monitors hourly forecast automatically
- Shows time until rain and arrival time
- Professional TV weather appearance with shimmer effect
- Works in both daily and hourly mode

### Moon Phase Display

Shows accurate moon phase icons on clear nights (8 phases: new, crescent, quarter, gibbous, full).

**Requirements:**
- `sensor.moon_phase` entity (auto-created by HA)
- Clear night weather condition
- Animated icons enabled

**Disable:**
```yaml
show_moon_phase: false
```

### Holiday Decorations

Festive animated overlays during 8 holidays (Halloween, Christmas, New Year, Valentine's, St. Patrick's, Easter, 4th of July, Cinco de Mayo).

**Enable:**
```yaml
holiday_themes: true
```

## 🤝 Contributing

Contributions, ideas, and feedback are welcome!

## 📄 License

_To be determined_

## 🙏 Acknowledgments

- **Weather Icons**: [Meteocons](https://github.com/basmilius/weather-icons) by [Bas Milius](https://bas.dev) - Beautiful animated SVG weather icons (MIT License)
- Inspired by modern weather UI designs and the Home Assistant community
