# WeatherPulse Card

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![HACS](https://img.shields.io/badge/HACS-Default-orange.svg)

A modern, highly configurable weather card for Home Assistant with dynamic theming, animated icons, and intelligent contextual information.

## ✨ Features

### Dynamic Temperature-Based Header
The card's header automatically changes color based on the actual outdoor temperature, creating a beautiful visual representation of current conditions:
- **Freezing (< 32°F)**: Icy blues and purples
- **Cold (32-50°F)**: Cool blues and teals
- **Moderate (50-70°F)**: Pleasant greens and yellows
- **Warm (70-85°F)**: Warm oranges
- **Hot (> 85°F)**: Hot reds and deep oranges

### Multiple Header Modes
Choose from various header display styles:
- **Time-Focused**: Large time display with small date
- **Date-Focused**: Large date with small time
- **Balanced**: Equal prominence for time and date
- **Minimal**: Just weather icon and temperature
- **Greeting Mode**: Personalized greetings with weather suggestions

### Dual Temperature Display
Display both weather forecast temperature AND your actual outdoor sensor reading for accurate local conditions.

### Flexible Forecast Views
- Configure 5, 7, or 10-day forecasts
- Hourly view options
- Beautiful horizontal temperature bars with day/night visualization
- Precipitation probability overlay

### Customizable Data Display
Choose which data to show:
- Temperature (high/low)
- Precipitation probability
- Wind speed and direction
- Humidity
- UV Index
- And more...

## 📦 Installation

### HACS (Recommended)

1. Make sure [HACS](https://hacs.xyz/) is installed
2. Go to HACS → Frontend
3. Click the "+" button
4. Search for "WeatherPulse Card"
5. Click Install
6. Refresh your browser

### Manual Installation

1. Download `weatherpulse-card.js` from the [latest release](https://github.com/imCharlieB/WeatherPulse/releases)
2. Copy it to `config/www/weatherpulse-card/weatherpulse-card.js`
3. Add the resource in Configuration → Lovelace Dashboards → Resources:
   ```
   /local/weatherpulse-card/weatherpulse-card.js
   ```
   Type: JavaScript Module

## 🎨 Configuration

### Basic Example

```yaml
type: custom:weatherpulse-card
entity: weather.home
header_mode: time-focused
show_date: true
show_time: true
forecast_days: 5
```

### Advanced Example

```yaml
type: custom:weatherpulse-card
entity: weather.home
outdoor_temp_sensor: sensor.outdoor_temperature
header_mode: greeting
greeting_name: Sarah
show_date: true
show_time: true
forecast_days: 7
view_mode: standard
animate_icons: true
data_rows:
  - temperature
  - precipitation
  - wind
  - uv_index
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **Required** | Weather entity (e.g., `weather.home`) |
| `outdoor_temp_sensor` | string | Optional | Outdoor temperature sensor for actual temp display |
| `header_mode` | string | `time-focused` | Header display mode: `time-focused`, `date-focused`, `balanced`, `minimal`, `greeting` |
| `greeting_name` | string | Optional | Name to use in greeting mode |
| `show_date` | boolean | `true` | Show date in header |
| `show_time` | boolean | `true` | Show time in header |
| `forecast_days` | number | `5` | Number of forecast days to display (5, 7, or 10) |
| `view_mode` | string | `standard` | View mode: `compact`, `standard`, `detailed`, `hourly`, `weekly` |
| `animate_icons` | boolean | `true` | Enable icon animations |
| `data_rows` | array | `['temperature', 'precipitation']` | Which data to display in forecast |

### Data Row Options

Available options for `data_rows`:
- `temperature` - High/low temperatures
- `precipitation` - Precipitation probability
- `wind` - Wind speed and direction
- `humidity` - Humidity percentage
- `uv_index` - UV index
- `pressure` - Atmospheric pressure
- `visibility` - Visibility distance
- `cloud_cover` - Cloud cover percentage
- `sunrise_sunset` - Sunrise and sunset times
- `dew_point` - Dew point temperature

## 🎯 Current Development Status

**Version 0.1.0 - MVP Release**

This is the initial release with core functionality. We're actively developing additional features including:
- Advanced icon animations
- Multiple theme options
- Smart alerts and suggestions
- Graphical seasonal headers
- And much more!

See our [FEATURES.md](https://github.com/imCharlieB/WeatherPulse/blob/main/FEATURES.md) for the complete feature roadmap.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

Built with ❤️ for the Home Assistant community
