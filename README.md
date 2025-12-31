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

## ✨ Key Features

### ✅ Currently Available

#### Core Features
- 🌡️ **Temperature-Based Header Highlighting** - Dynamic gradients that change based on actual outdoor temperature (5 temperature ranges)
- 👋 **Smart Greeting Mode** - Personalized, context-aware messages based on time and weather
- 📊 **Dual Temperature Display** - Show both forecast and actual sensor readings side-by-side
- 🎬 **Animated Weather Icons** - Beautiful SVG animations for sun, clouds, rain, snow, storms, fog, and wind
- 📅 **Flexible Forecast Views** - Choose between daily (5 or 7 days) or hourly forecasts
- 🎯 **Four View Modes** - Compact, Standard, Detailed, and Chart
- ⏰ **Hourly Forecasts** - View upcoming weather by hour with customizable count
- 🎨 **Six Header Modes** - Time-Focused, Date-Focused, Balanced, Minimal, Greeting, and Graphical
- ⚙️ **Visual Configuration Editor** - Easy setup through Home Assistant UI
- 🚀 **Modern Tech Stack** - Built with TypeScript and Lit for performance
- 📦 **HACS Compatible** - Easy installation and updates

#### Display Features

---

**Linux/Chromium Dashboard Users:**
If you are viewing your Home Assistant dashboard on a Linux device using Chromium (including kiosk mode or the HA app), you may need to install emoji fonts for holiday and weather icons to display correctly. Otherwise, some icons may show as an "X" or blank box.

Install emoji support with:

```sh
sudo apt-get update && sudo apt-get install fonts-noto-color-emoji
```

Restart Chromium after installing. This ensures all emoji-based icons render properly in WeatherPulse.
---
- 🖼️ **Graphical Seasonal Header** - Beautiful seasonal backgrounds that auto-switch with custom image support
- 🌙 **Auto Day/Night Mode** - Automatically switches to darker starry theme at night based on sunrise/sunset
- 🌕 **Moon Phase Icons** - On clear nights, weather icon shows actual current moon phase (new moon, crescent, quarter, gibbous, full moon) instead of generic moon icon
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

#### Weather Alerts & Notifications
- 🔔 **NWS Weather Alerts** - Real-time severe weather alerts from National Weather Service
- 🌪️ **All Alert Types** - Hurricanes, tornadoes, thunderstorms, heat advisories, flood warnings, and more
- 🎨 **Severity Color Coding** - Red (Extreme), Orange (Severe), Yellow (Moderate), Blue (Minor)
- 📍 **Location-Based** - Uses your Home Assistant location coordinates automatically
- 🔄 **Auto-Updates** - Fetches latest alerts every 5 minutes
- 🙈 **Auto-Hide** - Alert section disappears when no active alerts
- ☔ **Rain Timing Notifications** - Broadcast-style banner when rain is coming in next 4 hours
- ⏰ **Smart Detection** - Monitors hourly forecast for precipitation probability or rainy conditions
- 📺 **Lower Third Style** - Professional TV weather broadcast appearance with shimmer effect
- 🎯 **Works Everywhere** - Fetches hourly data separately, works in daily or hourly forecast mode

#### National Weather Service (NWS) Alerts

WeatherPulse integrates directly with the National Weather Service API to display real-time severe weather alerts for your location. **No custom components or plugins required!**

**How It Works:**
- Automatically uses your Home Assistant location coordinates (Settings → System → General → Location)
- Fetches alerts directly from `api.weather.gov` every 5 minutes
- Only displays alerts that are active for your specific location
- Alert section auto-hides when no active alerts exist

**Supported Alert Types:**
- 🌀 Hurricanes & Tropical Storms
- 🌪️ Tornado Warnings & Watches
- ⛈️ Severe Thunderstorm Warnings
- 🌨️ Winter Storm Warnings & Advisories
- 🔥 Heat Advisories & Excessive Heat Warnings
- 🌊 Flood Warnings & Flash Flood Warnings
- 🌬️ High Wind Warnings
- And many more NWS alert types

**Severity Color Coding:**
- 🔴 **Extreme** (Red) - Life-threatening situations (hurricanes, major tornadoes)
- 🟠 **Severe** (Orange) - Severe weather threats (thunderstorms, winter storms)
- 🟡 **Moderate** (Yellow) - Moderate warnings (winter weather advisories)
- 🔵 **Minor** (Blue) - Minor advisories (frost, wind, heat)

**Alert Information Displayed:**
- Event name (e.g., "Tornado Warning", "Heat Advisory")
- Affected area/counties
- Headline summary
- Expiration time

Toggle "Show NWS Weather Alerts" in the visual editor's Display Options section.

**Note:** NWS alerts are only available for locations within the United States and its territories. The feature will gracefully fail for international locations without showing errors.

## ⚡️ Forecast Sensor Setup (Home Assistant 2024.2+)

With the latest Home Assistant weather model, forecast data (hourly/daily) is no longer available directly from weather entities.  
**WeatherPulse now uses a dedicated sensor to provide forecast data.**

### How It Works

- You create a [template sensor or automation](https://www.home-assistant.io/integrations/template/#sensor) that calls the `weather.get_forecasts` service.
- This sensor stores the forecast data in its attributes.
- WeatherPulse reads the forecast from your selected sensor, enabling hourly weather alerts.

### Example Automation

```yaml
- trigger:
    - platform: time_pattern
      minutes: "/30"
  action:
    - service: weather.get_forecasts
      data:
        type: hourly
      target:
        entity_id: weather.pirateweather
      response_variable: hourly
  sensor:
    - name: Pirate Weather Hourly
      unique_id: pirateweather_hourly
      state: "{{ hourly['weather.pirateweather'].forecast[0].condition }}"
      attributes:
        forecast: "{{ hourly['weather.pirateweather'].forecast[:24] }}"
```

### How to Use in WeatherPulse

1. **Create your forecast sensor** using the automation/template above.
2. **Select your sensor** in the WeatherPulse card editor under "Forecast Sensor".
3. **The card will use this sensor** for all forecast features (hourly/rain timing).

**Note:**  
- You must have a forecast sensor set up for hourly forecast features to work.
- The card will automatically detect available sensors with forecast data.

For more details, see [Home Assistant Weather Forecasts](https://www.home-assistant.io/integrations/weather/) and [Template Sensor](https://www.home-assistant.io/integrations/template/#sensor).

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
2. Reference them in the visual editor or YAML see config section below.

**Image Specifications** (for custom images):
- **Recommended size**: 800x280 pixels or larger
- **Format**: JPG (smaller) or PNG
- **File size**: Keep under 300KB each for fast loading

**Features**:
- **Auto-switching**: Backgrounds automatically change based on current season (Mar-May Spring, Jun-Aug Summer, Sep-Nov Fall, Dec-Feb Winter)
- **Dark overlay**: Gradient overlay ensures white text is always readable over any image
- **Large display**: 280px tall header with prominent time, date, weather icon, and temperature
- **No setup required**: Works immediately with bundled images, customize only if desired

#### View Modes

WeatherPulse offers four distinct forecast view modes to match your dashboard style and information density preferences:

**Compact Mode:**
- Minimal space usage with small forecast cards
- Perfect for smaller dashboards or when space is limited
- Shows essential info: day/time, icon, high/low temps
- Cards are tightly spaced for maximum density
- Temperature gradient backgrounds for quick visual reference

**Standard Mode:**
- Balanced information display with moderate sizing
- Clean row-based layout with border dividers
- Shows day/time, icon, conditions, and temperatures
- Comfortable spacing for easy reading
- Default mode - works well for most use cases

**Detailed Mode:**
- Maximum information display with larger cards
- Additional weather details per forecast item
- More padding and spacing for comfortable viewing
- Best for large dashboards or TV displays
- Shows extended forecast information

**Chart Mode:**
- Visual temperature trend display
- Line graph showing temperature changes over time
- TV weather broadcast style
- Perfect for quickly seeing temperature patterns
- Works with both daily and hourly forecasts

Select your preferred view mode in the visual editor under "View Mode" or via YAML with `view_mode: compact | standard | detailed | chart`.

#### Moon Phase Display

When enabled (on by default), the weather icon on clear nights will display the **actual current moon phase** instead of a generic moon icon.

**How It Works:**
- Reads the `sensor.moon_phase` entity from your Home Assistant installation
- Detects when weather condition is `clear-night`
- Replaces the generic moon icon with one of 8 accurate moon phase icons
- Updates automatically as the moon phase changes throughout the month

**Moon Phases Supported:**
- 🌑 **New Moon** - Moon is not visible
- 🌒 **Waxing Crescent** - Thin crescent growing
- 🌓 **First Quarter** - Half moon, right side lit
- 🌔 **Waxing Gibbous** - More than half lit, growing
- 🌕 **Full Moon** - Fully illuminated
- 🌖 **Waning Gibbous** - More than half lit, shrinking
- 🌗 **Last Quarter** - Half moon, left side lit
- 🌘 **Waning Crescent** - Thin crescent shrinking

**Requirements:**
- Home Assistant `sensor.moon_phase` entity (usually auto-created)
- Weather condition must be `clear-night` (clear skies at nighttime)
- Animated icons must be enabled (default)

#### Holiday Themes

Automatically add festive decorative icons to your weather card during holidays! When enabled, the card displays a sophisticated multi-layer holiday decoration system with custom layouts for each holiday.

**How It Works:**
- Automatically detects the current date and displays decorations during holiday periods
- **Two-Layer System**: Background floating icons + foreground static cluster
- **String Lights**: 12 animated bulbs with visible wire across the top (holiday-specific colors)
- **Custom Positioned Layouts**: Each holiday has strategically placed icons (no random positioning)
- **Icon Rotation**: Some holidays feature rotating characters (e.g., witch → vampire → zombie)
- Gentle floating animation on background icons for festive movement
- Completely optional - toggle on/off in settings

**Decoration System:**

Each holiday features up to 3 decoration layers:

1. **String Lights** (Top Edge)
   - 12 bulbs with connecting wire across header
   - Holiday-specific colors and bulb styles
   - Staggered glow animation
   - Christmas uses long traditional bulbs, others use round bulbs

2. **Background Floating Icons** (Strategic Positions)
   - 5-6 themed icons positioned in specific zones
   - Gentle floating animation with staggered delays
   - Semi-transparent to not obstruct weather data
   - Custom layouts avoid center area (weather icon/text)

3. **Foreground Static Cluster** (Bottom-Left Corner)
   - 3 main holiday icons in compact arrangement
   - Larger center icon flanked by smaller icons
   - Static position for consistent branding
   - Example: Halloween shows pumpkin, gravestone, and candy

**Supported Holidays:**

| Holiday | Dates | String Lights | Foreground Cluster | Background Icons | Special Features |
|---------|-------|---------------|-------------------|------------------|------------------|
| 🎃 **Halloween** | Oct 25-31 | Orange & Purple | Pumpkin, Grave, Candy | Bats (2), Spiders (2), Ghost, Web | Rotating character: Witch → Vampire → Zombie |
| 🎄 **Christmas** | Dec 18-25 | Red, Green, Yellow (long bulbs) | Tree, Snowman, Gift | Snowflakes (2), Stars (2), Reindeer | Rotating character: Santa → Elf |
| 🎆 **New Year** | Dec 31 - Jan 1 | Gold, Silver, Blue | Firework, Champagne, Party Hat | Fireworks (2), Sparkles (2), Party Poppers (2) | - |
| ❤️ **Valentine's Day** | Feb 13-14 | Pink, Red, White | Heart, Rose, Cupid | Red Hearts (2), Two Hearts, Heart w/ Arrow, Sparkling Heart | - |
| 🍀 **St. Patrick's Day** | Mar 17 | Green, Gold, White | Shamrock, Pot of Gold, Clover | Rainbows (2), Green Heart, Leprechaun Hat, Gold Coin | - |
| 🐰 **Easter** | Mar 25 - Apr 10* | Pastel (Pink, Yellow, Blue, Lavender) | Bunny, Egg, Chick | Tulips (2), Hatching Chick, Bouquet, Cherry Blossom | - |
| 🇺🇸 **4th of July** | Jul 4 | Red, White, Blue | Flag, Firework, Star | Fireworks (2), Stars (2), Party Popper, Confetti Ball | - |
| 🇲🇽 **Cinco de Mayo** | May 5 | Red, White, Green | Mexican Flag, Taco, Cactus | Cacti (2), Trumpet, Party Popper, Confetti Ball | - |

*Easter dates vary yearly; decorations shown as approximation.

**Features:**
- **Automatic Detection** - No configuration needed, just enable the feature
- **Multi-Layer Design** - String lights, floating icons, and static cluster work together
- **Custom Layouts** - Each holiday has hand-crafted icon placement
- **Icon Rotation** - Dynamic character changes every 10 seconds (Halloween, Christmas)
- **Z-Index Layering** - Decorations never obstruct weather icon or important information
- **Animated Elements** - Floating, glowing, and rotation animations
- **Respects Dark Mode** - Works seamlessly in both day and night themes

Toggle "Enable Holiday Themes" in the visual editor's Display Options section.

**Example:**
During Halloween week (Oct 25-31), you'll see orange and purple string lights across the top, a pumpkin/grave/candy cluster in the bottom-left, and floating bats, spiders, ghosts, and a rotating witch/vampire/zombie character throughout the header!

#### Pre-built Visual Themes

Transform the look and feel of your weather card with 5 professional pre-built themes, or create your own custom theme!

**Available Themes:**

| Theme | Description | Best For |
|-------|-------------|----------|
| **Default** | Clean modern design with temperature gradients | General use, all dashboards |
| **Retro/Neubrutalism** | Bold 4px black borders, sharp corners, hard shadows, no border-radius | Bold, statement dashboards, retro aesthetics |
| **Midnight** | Sleek dark theme with dark gray backgrounds and blue accents | Dark mode lovers, nighttime use, professional dark dashboards |
| **Minimal** | Clean white, monochrome, thin borders, subtle grayscale filter | Professional, clean dashboards |
| **Vibrant** | Bright gradient backgrounds, saturated colors, white text | Colorful, energetic dashboards |
| **Custom** | Define your own colors for complete customization | Matching your specific color scheme |

**How Themes Work:**
- Themes apply visual styling to the entire card
- Each theme has its own border style, shadows, colors, and effects
- Temperature gradients still work with all themes (adjusted for visibility)
- Forecast cards, weather info, alerts all match the theme
- Easy one-click switching in the visual editor

**Theme Details:**

**Retro/Neubrutalism:**
- 4px solid black borders on everything
- Sharp 90-degree corners (no rounding)
- Hard drop shadows (8px x 8px)
- High contrast, bold appearance
- Perfect for brutalist or retro-inspired dashboards

**Midnight:**
- Dark gray backgrounds (#1a1a1a, #212121)
- Blue gradient header (#1e3a5f to #2d5a8c)
- Subtle shadows for depth (no harsh contrast)
- Light gray text (#e0e0e0) for comfortable reading
- Blue accents on hover interactions
- Even darker in night mode (#0f0f0f)
- Perfect for dark mode enthusiasts and nighttime viewing

**Minimal:**
- Pure white backgrounds
- Light gray borders (#e0e0e0)
- No shadows
- 30% grayscale filter on icons/temps
- Clean, professional, simple

**Vibrant:**
- Purple-to-pink gradient backgrounds
- Bright saturated colors everywhere
- White text for contrast
- Colorful weather info cards (pink-to-yellow gradients)
- High energy, eye-catching

**Custom Theme:**
Define your own color palette with 6 customizable colors:
- **Primary**: Main header background
- **Secondary**: Forecast cards, weather info background
- **Background**: Card background
- **Text**: Text color
- **Border**: Border color
- **Accent**: Accent highlights

### 🚧 Future Enhancements
- 📊 Air Quality integration (requires AQI sensor)
- 🌤️ "Best time to go outside today" suggestions
- 🌾 Pollen count alerts (requires pollen sensor)

## 🚧 Development Status

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
holiday_themes: true # This will enable Holiday Themes
show_nws_alerts: true # Enables NWS weather alerts


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

# Weather Alerts
show_nws_alerts: true  # Enable NWS weather alerts (uses your HA location)

# Optional: Custom sun/moon entities
sun_entity: sun.sun  # Default: sun.sun
moon_entity: sensor.moon_phase  # Default: sensor.moon_phase

# Optional: Custom seasonal images for graphical header mode
seasonal_images:
  spring: /local/images/spring-garden.jpg
  summer: /local/images/beach-sunset.jpg
  fall: /local/images/autumn-leaves.jpg
  winter: /local/images/snowy-mountains.jpg

# Use a pre-built theme
theme: retro  # or: midnight, minimal, vibrant

# Or use custom theme
theme: custom
custom_theme_colors:
  primary: "#667eea"
  secondary: "#764ba2"
  background: "#ffffff"
  text: "#333333"
  border: "#e0e0e0"
  accent: "#f093fb"  
```

**To Use Theme's:**

**Via Visual Editor:**
1. Open card configuration
2. Find "Theme Settings" section
3. Select your desired theme from dropdown
4. For custom theme, enter your color values in the fields that appear
5. Save

**Tips:**
- Midnight theme is perfect for dark mode dashboards and reduces eye strain at night
- Minimal theme is great for professional/work dashboards
- Vibrant theme stands out and draws attention
- Custom theme lets you match your Home Assistant theme perfectly

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
| `view_mode` | string | `standard` | Forecast layout: `compact`, `standard`, `detailed`, `chart` |
| `temp_display_mode` | string | `forecast` | Temperature display: `forecast`, `actual`, `both` |
| `theme` | string | `default` | Visual theme: `default`, `retro`, `midnight`, `minimal`, `vibrant`, `custom` |
| `custom_theme_colors` | object | Optional | Custom theme colors (only used when theme is `custom`) - see Custom Theme section |
| `animate_icons` | boolean | `true` | Enable animated weather icons |
| `show_forecast` | boolean | `true` | Show forecast section |
| `night_mode` | boolean | `false` | Enable automatic day/night theme switching based on sun position |
| `show_moon_phase` | boolean | `true` | Show accurate moon phase icons on clear nights (requires sensor.moon_phase entity) |
| `holiday_themes` | boolean | `false` | Enable festive decorative icon overlays during holidays (8 holidays supported) |
| `show_weather_info` | array | `[]` | Weather info to display: `uv_index`, `wind`, `feels_like`, `precipitation`, `humidity`, `pressure`, `visibility`, `sunrise_sunset` |
| `weather_info_layout` | string | `standard` | Weather info layout: `compact` (in header), `standard` (cards), `detailed` (large cards) |
| `show_nws_alerts` | boolean | `false` | Enable National Weather Service weather alerts for your location |
| `sun_entity` | string | `sun.sun` | Sun entity for sunrise/sunset and day/night detection |
| `moon_entity` | string | `sensor.moon_phase` | Moon phase sensor for accurate moon phase icons |

## 🎯 Roadmap

See [FEATURES.md](FEATURES.md) for detailed feature specifications and development phases.

## 🤝 Contributing

This project is in early development. Contributions, ideas, and feedback are welcome!

## 📄 License

_To be determined_

## 🙏 Acknowledgments

- **Weather Icons**: [Meteocons](https://github.com/basmilius/weather-icons) by [Bas Milius](https://bas.dev) - Beautiful animated SVG weather icons (MIT License)
- Inspired by modern weather UI designs and the Home Assistant community
