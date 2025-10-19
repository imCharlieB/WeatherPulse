# WeatherPulse

A modern, highly configurable weather card for Home Assistant with dynamic theming, animated icons, and intelligent contextual information.

## ✨ Key Features

### ✅ Currently Available

#### Core Features
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

#### Display Features
- 🖼️ **Graphical Seasonal Header** - Beautiful seasonal backgrounds that auto-switch with custom image support
- 🌙 **Auto Day/Night Mode** - Automatically switches to darker starry theme at night based on sunrise/sunset
- 🌕 **Moon Phase Icons** - Shows accurate moon phase (8 phases) on clear nights
- ☀️ **Sunrise/Sunset Times** - Display next sunrise or sunset with auto-switching

#### Weather Information Display
- 🌡️ **Feels Like Temperature** - Shows apparent temperature (calculated or from weather provider)
- ☀️ **UV Index** - Monitor UV levels for sun safety
- 💨 **Wind Speed & Gusts** - Current wind conditions with gust information
- 💧 **Humidity** - Relative humidity percentage
- 🔽 **Atmospheric Pressure** - Barometric pressure reading
- 👁️ **Visibility** - Current visibility distance
- 🌅 **Sunrise/Sunset** - Next sunrise or sunset time
- 📐 **Three Layout Modes** - Compact (in header), Standard (separate cards), Detailed (large cards)

### 🚧 Coming Soon
- 🎨 Pre-built themes (Glassmorphism, Minimal, Dark Mode)
- 🔔 Smart weather alerts via NWS Alerts integration
- 📈 Additional data rows (Dew Point, Cloud Coverage)

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
night_mode: true  # Auto day/night theme switching

# Weather Information Display
show_weather_info:
  - uv_index
  - wind
  - feels_like
  - humidity
  - pressure
  - visibility
  - sunrise_sunset
weather_info_layout: compact  # compact (in header) | standard | detailed

# Optional: Custom sun/moon entities
sun_entity: sun.sun  # Default: sun.sun
moon_entity: sensor.moon_phase  # Default: sensor.moon_phase

# Optional: Custom seasonal images for graphical header mode
seasonal_images:
  spring: /local/images/spring-garden.jpg
  summer: /local/images/beach-sunset.jpg
  fall: /local/images/autumn-leaves.jpg
  winter: /local/images/snowy-mountains.jpg
```

#### Graphical Header Mode

The graphical header mode displays a large, immersive header with seasonal background images.

**✨ Bundled Images Included**: The card comes with beautiful default seasonal images! Just set `header_mode: graphical` and it works out of the box.

**Default Images**:
- 🌸 **Spring** - Cherry blossoms and tulips
- 🏖️ **Summer** - Tropical beach sunset
- 🍂 **Fall** - Autumn pumpkin and maple leaves
- ❄️ **Winter** - Snowy winter beach scene

**🎨 Use Alternate Bundled Images**:
The card includes multiple images per season. Switch to alternates in the visual editor or via YAML:
```yaml
seasonal_images:
  spring: /hacsfiles/weatherpulse/images/spring-alt1.jpg  # More tulips & flowers
  summer: /hacsfiles/weatherpulse/images/summer-alt1.jpg  # Sunset beach painting
  fall: /hacsfiles/weatherpulse/images/fall-alt1.jpg      # Autumn forest scene
  winter: /hacsfiles/weatherpulse/images/winter-alt1.jpg  # Snowy palm tree beach
```

**📁 Using Your Own Custom Images**:
1. Upload your images to `/config/www/images/` in Home Assistant
2. Reference them in the visual editor or YAML:
```yaml
seasonal_images:
  spring: /local/images/my-spring.jpg
  summer: /local/images/my-summer.jpg
  fall: /local/images/my-fall.jpg
  winter: /local/images/my-winter.jpg
```

**Image Specifications** (for custom images):
- **Recommended size**: 800x280 pixels or larger
- **Format**: JPG (smaller) or PNG
- **File size**: Keep under 300KB each for fast loading

**Features**:
- **Auto-switching**: Backgrounds automatically change based on current season (Mar-May Spring, Jun-Aug Summer, Sep-Nov Fall, Dec-Feb Winter)
- **Dark overlay**: Gradient overlay ensures white text is always readable over any image
- **Large display**: 280px tall header with prominent time, date, weather icon, and temperature
- **No setup required**: Works immediately with bundled images, customize only if desired

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
| `night_mode` | boolean | `false` | Enable automatic day/night theme switching based on sun position |
| `show_weather_info` | array | `[]` | Weather info to display: `uv_index`, `wind`, `feels_like`, `precipitation`, `humidity`, `pressure`, `visibility`, `sunrise_sunset` |
| `weather_info_layout` | string | `standard` | Weather info layout: `compact` (in header), `standard` (cards), `detailed` (large cards) |
| `sun_entity` | string | `sun.sun` | Sun entity for sunrise/sunset and day/night detection |
| `moon_entity` | string | `sensor.moon_phase` | Moon phase sensor for accurate moon phase icons |

## 🎯 Roadmap

See [FEATURES.md](FEATURES.md) for detailed feature specifications and development phases.

## 🤝 Contributing

This project is in early development. Contributions, ideas, and feedback are welcome!

## 📄 License

_To be determined_

## 🙏 Acknowledgments

Inspired by modern weather UI designs and the Home Assistant community.
