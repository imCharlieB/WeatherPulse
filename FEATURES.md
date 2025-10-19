# WeatherPulse - Feature Specification

## Project Overview
A modern, highly configurable weather card for Home Assistant with dynamic theming, animated icons, and intelligent contextual information.

---

## Core Features

### 1. Dynamic Header Modes
- [x] **Time-Focused**: Large time, small date ✅
- [x] **Date-Focused**: Large date, small time ✅
- [x] **Balanced**: Equal prominence time/date ✅
- [x] **Minimal**: Just weather icon + temp ✅
- [x] **Greeting Mode**: Personalized contextual greetings ✅
  - Time-based (Morning/Afternoon/Evening/Night) ✅
  - Weather-aware suggestions ("Grab an umbrella!") ✅
  - Temperature-aware ("Bundle up!") ✅
  - Configurable user name ✅
- [ ] **Graphical Header**: Beautiful seasonal imagery (PLANNED)
  - Spring: Blooming flowers, fresh greenery
  - Summer: Beach scenes, bright sunny skies
  - Fall: Autumn leaves, harvest themes
  - Winter: Snow scenes, cozy winter landscapes
  - User-uploadable custom images
  - Auto-switching based on season/date
  - Overlay options (text over image with blur/gradient)

### 2. Temperature-Based Header Highlighting (Signature Feature)
- [x] Dynamic gradient background based on actual outdoor temp ✅
  - `< 32°F`: Icy blues/purples ✅
  - `32-50°F`: Cool blues/teals ✅
  - `50-70°F`: Pleasant greens/yellows ✅
  - `70-85°F`: Warm oranges ✅
  - `> 85°F`: Hot reds/deep oranges ✅
- [ ] Seasonal theme variants (PLANNED)
- [ ] Pulsing glow effect for extreme temperatures (PLANNED)
- [ ] Heat warnings and freeze alerts visual indicators (PLANNED)

### 3. Dual Temperature Display
- [x] Show both **forecast temp** AND **actual outdoor sensor temp** ✅
- [ ] Visual indicator when temps differ significantly (PLANNED)
- [ ] "Feels like" vs "Actual" comparison (PLANNED)
- [x] Configurable sensor selection for actual temp ✅

### 4. Smart Data Visualization
- [x] **Temperature bars** with day/night split ✅
- [x] **Precipitation probability** display ✅
- [ ] **UV Index** with color-coded warnings (PLANNED)
- [ ] **Wind** with animated directional arrows (PLANNED)
- [x] **Humidity** display ✅
- [ ] **Air Quality** integration (if available) (PLANNED)

### 5. View Modes
- [x] **Compact**: Current + minimal forecast (horizontal scroll for hourly) ✅
- [x] **Standard**: Current + detailed daily (2-column for hourly) ✅
- [x] **Detailed**: Current + daily with extra info (humidity, wind for hourly) ✅

### 6. Forecast Periods (User Selectable)
- [x] **Daily forecasts**: 5 or 7 days ✅
- [x] **Hourly forecasts**: 1-48 hours (configurable) ✅
- [x] Switchable forecast type (daily/hourly) ✅

### 7. Animated Weather Icons
- [x] **Sun**: Rotating rays, pulsing glow ✅
- [x] **Clouds**: Drifting movement ✅
- [x] **Rain**: Falling droplets ✅
- [x] **Snow**: Falling flakes ✅
- [x] **Thunderstorm**: Lightning flashes ✅
- [x] **Wind**: Swirling particles ✅
- [x] **Fog/Mist**: Floating wisps ✅
- [ ] **Moon phases**: Actual phase displayed for night (PLANNED)
- [ ] Smooth transitions between states (PLANNED)

### 8. Pre-built Themes
- [ ] **Retro/Neubrutalism**: Bold colors, thick borders
- [ ] **Glassmorphism**: Frosted glass, blur effects
- [ ] **Minimal**: Clean, simple, monochrome
- [ ] **Vibrant**: Bright, saturated colors
- [ ] **Dark Mode**: OLED-friendly blacks
- [ ] **Auto**: Follows HA theme or time of day
- [ ] Custom theme builder (user-defined colors)

### 9. Smart Alerts & Contextual Badges
- [ ] **NWS Alerts Integration**: Weather warnings via plugin (PLANNED)
  - Special card styling for active alerts
  - Rain/wind animations based on alert type
  - Visual prominence for severe weather
- [ ] "Best time to go outside today" suggestions (PLANNED)
- [ ] Rain timing notifications ("Rain starting in 2 hours") (PLANNED)
- [ ] Pollen count alerts (PLANNED)
- [ ] Contextual suggestions ("Perfect beach weather!") (PLANNED)
- [ ] Customizable alert thresholds (PLANNED)

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
- [x] Compatible with new Home Assistant dashboards ✅
- [x] Visual editor for easy configuration ✅
- [x] YAML configuration support ✅
- [x] HACS installation support ✅
- [x] Responsive design (mobile/tablet/desktop) ✅
- [x] Performance optimized (efficient updates) ✅

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

### Phase 1: Foundation (MVP) ✅ COMPLETE
- [x] Project structure setup ✅
- [x] Basic card rendering ✅
- [x] Weather entity integration ✅
- [x] Simple current weather display ✅
- [x] Basic 5-day forecast with horizontal bars ✅
- [x] Temperature-based header highlighting ✅
- [x] HACS configuration ✅

### Phase 2: Core Features ✅ COMPLETE
- [x] All view modes (compact/standard/detailed) ✅
- [x] All header modes (including greeting mode) ✅
- [x] Dual temperature display ✅
- [x] Daily forecast (5/7 days) ✅
- [x] Hourly forecast (1-48 hours) ✅
- [x] Animated weather icons ✅
- [x] Visual configuration editor ✅
- [x] Small AM/PM styling on all header modes ✅

### Phase 3: Advanced Features (IN PROGRESS)
- [ ] All pre-built themes
- [ ] Advanced animations
- [ ] Smart alerts & badges
- [ ] Additional data visualization options (UV, Air Quality)
- [ ] Layout variants
- [ ] Graphical seasonal header

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
