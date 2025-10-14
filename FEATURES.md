# WeatherPulse - Feature Specification

## Project Overview
A modern, highly configurable weather card for Home Assistant with dynamic theming, animated icons, and intelligent contextual information.

---

## Core Features

### 1. Dynamic Header Modes
- [ ] **Time-Focused**: Large time, small date
- [ ] **Date-Focused**: Large date, small time
- [ ] **Balanced**: Equal prominence time/date
- [ ] **Minimal**: Just weather icon + temp
- [ ] **Greeting Mode**: Personalized contextual greetings
  - Time-based (Morning/Afternoon/Evening/Night)
  - Weather-aware suggestions ("Grab an umbrella!")
  - Temperature-aware ("Bundle up!")
  - Configurable user name
- [ ] **Graphical Header**: Beautiful seasonal imagery
  - Spring: Blooming flowers, fresh greenery
  - Summer: Beach scenes, bright sunny skies
  - Fall: Autumn leaves, harvest themes
  - Winter: Snow scenes, cozy winter landscapes
  - User-uploadable custom images
  - Auto-switching based on season/date
  - Overlay options (text over image with blur/gradient)

### 2. Temperature-Based Header Highlighting (Signature Feature)
- [ ] Dynamic gradient background based on actual outdoor temp
  - `< 32°F`: Icy blues/purples
  - `32-50°F`: Cool blues/teals
  - `50-70°F`: Pleasant greens/yellows
  - `70-85°F`: Warm oranges
  - `> 85°F`: Hot reds/deep oranges
- [ ] Seasonal theme variants
- [ ] Pulsing glow effect for extreme temperatures
- [ ] Heat warnings and freeze alerts visual indicators

### 3. Dual Temperature Display
- [ ] Show both **forecast temp** AND **actual outdoor sensor temp**
- [ ] Visual indicator when temps differ significantly
- [ ] "Feels like" vs "Actual" comparison
- [ ] Configurable sensor selection for actual temp

### 4. Smart Data Visualization
- [ ] **Temperature bars** with day/night split
- [ ] **Precipitation probability** overlay on bars
- [ ] **UV Index** with color-coded warnings
- [ ] **Wind** with animated directional arrows
- [ ] **Humidity** with droplet animations
- [ ] **Air Quality** integration (if available)

### 5. View Modes
- [ ] **Compact**: Current + 5-day glance
- [ ] **Standard**: Current + detailed daily
- [ ] **Detailed**: Current + daily + hourly
- [ ] **Hourly Focus**: 24-48 hour detailed hourly view
- [ ] **Weekly**: 7-10 day overview

### 6. Forecast Periods (User Selectable)
- [ ] 5-day forecast
- [ ] 7-day forecast
- [ ] 10-day forecast
- [ ] Hourly format (12/24/48 hours)

### 7. Animated Weather Icons
- [ ] **Sun**: Rotating rays, pulsing glow
- [ ] **Clouds**: Drifting movement
- [ ] **Rain**: Falling droplets
- [ ] **Snow**: Falling flakes
- [ ] **Thunderstorm**: Lightning flashes
- [ ] **Wind**: Swirling leaves/particles
- [ ] **Fog/Mist**: Floating wisps
- [ ] **Moon phases**: Actual phase displayed for night
- [ ] Smooth transitions between states

### 8. Pre-built Themes
- [ ] **Retro/Neubrutalism**: Bold colors, thick borders
- [ ] **Glassmorphism**: Frosted glass, blur effects
- [ ] **Minimal**: Clean, simple, monochrome
- [ ] **Vibrant**: Bright, saturated colors
- [ ] **Dark Mode**: OLED-friendly blacks
- [ ] **Auto**: Follows HA theme or time of day
- [ ] Custom theme builder (user-defined colors)

### 9. Smart Alerts & Contextual Badges
- [ ] Weather warnings (configurable)
- [ ] "Best time to go outside today" suggestions
- [ ] Rain timing notifications ("Rain starting in 2 hours")
- [ ] Pollen count alerts
- [ ] Contextual suggestions ("Perfect beach weather!")
- [ ] Customizable alert thresholds

### 10. Configurable Data Rows
Users can choose what to display in forecast:
- [ ] Temperature (high/low)
- [ ] Precipitation (% and amount)
- [ ] Wind (speed + direction)
- [ ] Humidity
- [ ] UV Index
- [ ] Pressure
- [ ] Visibility
- [ ] Cloud cover
- [ ] Sunrise/Sunset times
- [ ] Dew point

### 11. Layout Options
- [ ] **Horizontal bars** (gradient style like reference image)
- [ ] **Vertical cards** (traditional card layout)
- [ ] **Timeline view** (horizontal scrolling)
- [ ] **Graph mode** (line charts for trends)

### 12. Configuration & Compatibility
- [ ] Compatible with new Home Assistant dashboards
- [ ] Visual editor for easy configuration
- [ ] YAML configuration support
- [ ] HACS installation support
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] Performance optimized (lazy loading, efficient updates)

---

## Technical Stack

### Core Technologies
- **TypeScript**: Type-safe development
- **Lit**: Modern web components framework
- **CSS3**: Animations and theming
- **Home Assistant Frontend**: Card framework integration

### Build & Distribution
- **Rollup/Webpack**: Bundling
- **NPM**: Package management
- **GitHub**: Version control
- **HACS**: Distribution platform

---

## Project Phases

### Phase 1: Foundation (MVP)
- Project structure setup
- Basic card rendering
- Weather entity integration
- Simple current weather display
- Basic 5-day forecast with horizontal bars
- Temperature-based header highlighting
- HACS configuration

### Phase 2: Core Features
- All view modes
- All header modes (including greeting mode)
- Dual temperature display
- Configurable forecast periods
- Basic icon animations
- Theme system foundation

### Phase 3: Advanced Features
- All pre-built themes
- Advanced animations
- Smart alerts & badges
- All data visualization options
- Layout variants
- Visual configuration editor

### Phase 4: Polish & Release
- Performance optimization
- Comprehensive documentation
- Example configurations
- Testing across HA versions
- Community feedback integration
- GitHub release & HACS submission

---

## Configuration Example (Target)

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
theme: glassmorphism
animate_icons: true
data_rows:
  - temperature
  - precipitation
  - wind
  - uv_index
alerts:
  - weather_warnings
  - rain_timing
  - best_time_outside
custom_colors:
  cold: "#4A90E2"
  warm: "#F5A623"
  hot: "#E24A4A"
```

---

## Notes
- All features should be opt-in/configurable
- Performance is critical - card should load quickly
- Accessibility considerations for all visual elements
- Mobile-first responsive design
- Follow Home Assistant design guidelines
