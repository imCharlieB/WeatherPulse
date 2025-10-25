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
- [x] **Graphical Header**: Beautiful seasonal imagery ✅
  - Spring: Cherry blossoms & tulips (bundled) ✅
  - Summer: Tropical beach sunset (bundled) ✅
  - Fall: Autumn pumpkin & maple leaves (bundled) ✅
  - Winter: Snowy winter beach (bundled) ✅
  - Multiple bundled images per season (9 total included) ✅
  - Custom image support via seasonal_images config ✅
  - Auto-switching based on season (Mar-May, Jun-Aug, Sep-Nov, Dec-Feb) ✅
  - Dark gradient overlay for text readability ✅
  - Weather icon positioned on left (consistent with all other header modes) ✅
  - Dropdown selector in visual editor for easy image selection ✅

### 2. Temperature-Based Header Highlighting (Signature Feature)
- [x] Dynamic gradient background based on actual outdoor temp ✅
  - `< 32°F`: Icy blues/purples ✅
  - `32-50°F`: Cool blues/teals ✅
  - `50-70°F`: Pleasant greens/yellows ✅
  - `70-85°F`: Warm oranges ✅
  - `> 85°F`: Hot reds/deep oranges ✅
- [x] Seasonal theme variants (done via Graphical Header seasonal images) ✅
- [x] Pulsing glow effect for extreme temperatures (>=95°F hot, <=20°F freezing) ✅
- [x] Heat warnings and freeze alerts visual indicators (glowing card border) ✅

### 3. Dual Temperature Display
- [x] Show both **forecast temp** AND **actual outdoor sensor temp** ✅
- [ ] Visual indicator when temps differ significantly (PLANNED)
- [x] "Feels like" temperature display (calculated or from provider) ✅
- [x] Configurable sensor selection for actual temp ✅

### 4. Weather Information Display
- [x] **UV Index** display ✅
- [x] **Wind** speed and gusts ✅
- [x] **Feels Like** temperature ✅
- [x] **Precipitation** (when active) ✅
- [x] **Humidity** percentage ✅
- [x] **Atmospheric Pressure** ✅
- [x] **Visibility** distance ✅
- [x] **Sunrise/Sunset** times with auto-switching ✅
- [x] Three layout modes: Compact (in header), Standard (cards), Detailed (large cards) ✅

### 5. View Modes
- [x] **Compact**: Current + minimal forecast (horizontal scroll for hourly) ✅
- [x] **Standard**: Current + detailed daily (2-column for hourly) ✅
- [x] **Detailed**: Current + daily with extra info (humidity, wind for hourly) ✅
- [x] **Chart**: TV-style temperature trend line visualization ✅
  - Day names displayed at top ✅
  - Temperature values positioned on trend lines ✅
  - Orange line for high temperatures ✅
  - Blue line for low temperatures (daily forecast) ✅
  - Single line for hourly forecast ✅
  - Colored dots at each data point ✅
  - Professional TV weather broadcast appearance ✅

### 6. Forecast Periods (User Selectable)
- [x] **Daily forecasts**: 5 or 7 days ✅
- [x] **Hourly forecasts**: 1-48 hours (configurable) ✅
- [x] Switchable forecast type (daily/hourly) ✅

### 7. Animated Weather Icons (Meteocons by Bas Milius)
- [x] **Professional Icons**: Using Meteocons library - 236+ hand-crafted SVG weather icons ✅
- [x] **Built-in Animations**: Smooth, professional animations designed by illustrator ✅
- [x] **Comprehensive Coverage**: Sun, clouds, rain, snow, storms, fog, wind, and more ✅
- [x] **Weather Conditions**: Clear day/night, partly cloudy, cloudy, rain, drizzle, snow, sleet, hail, thunderstorms, fog, wind ✅
- [x] **Moon phases**: 8 accurate phase icons (new_moon, waxing_crescent, first_quarter, waxing_gibbous, full_moon, waning_gibbous, last_quarter, waning_crescent) ✅
- [x] **Dynamic moon display**: Clear night icons automatically show current moon phase ✅
- [x] **MIT Licensed**: Free to use, professionally maintained ✅

### 8. Day/Night Theme Features
- [x] **Auto Day/Night Mode**: Automatically switches to darker starry theme at night ✅
- [x] **Starry background**: Animated floating stars effect ✅
- [x] **Dimmed colors**: Temperature gradients still visible but darker (40% brightness) ✅
- [x] **Sunrise/sunset detection**: Uses sun.sun entity for accurate day/night timing ✅
- [x] **Toggle control**: Enable/disable in editor ✅
- [x] **Holiday Themes**: Automatic festive decorations during holidays ✅
  - 🎃 Halloween (Oct 25-31): Pumpkins, ghosts, bats, spiders
  - 🎄 Christmas (Dec 18-25): Trees, snowmen, Santa, snowflakes
  - 🎆 New Year (Dec 31 - Jan 1): Fireworks, confetti, celebration
  - ❤️ Valentine's Day (Feb 13-14): Hearts, roses, love
  - 🍀 St. Patrick's Day (Mar 17): Shamrocks, rainbows, green
  - 🐰 Easter (Late Mar - Early Apr): Bunnies, eggs, flowers, chicks
  - 🇺🇸 4th of July (Jul 4): American flag, fireworks, stars
  - 🇲🇽 Cinco de Mayo (May 5): Mexican flag, tacos, cacti, celebration
  - Subtle animated icon overlays (4 icons per holiday)
  - Floating animation effect
  - Semi-transparent (30-50% opacity)
  - Toggle on/off in Display Options
- [x] **Pre-built Themes**: 5 professional visual themes + custom ✅
  - Retro/Neubrutalism: Bold colors, thick 4px borders, sharp corners, hard shadows
  - Midnight: Pure dark theme with near-black backgrounds (#0d0d0d), grayscale palette, no boxes on weather info, perfect for OLED displays and dark mode
  - Minimal: Clean white, simple monochrome, thin borders, subtle grayscale
  - Vibrant: Bright gradient backgrounds, saturated colors, high energy
  - Custom: User-defined colors (primary, secondary, background, text, border, accent)

### 9. Smart Alerts & Contextual Notifications
- [x] **NWS Alerts Integration**: Real-time weather warnings from National Weather Service ✅
  - Direct API integration (no plugin required) ✅
  - All alert types: hurricanes, tornadoes, thunderstorms, heat advisories, flood warnings, etc. ✅
  - Severity color coding: Red (Extreme), Orange (Severe), Yellow (Moderate), Blue (Minor) ✅
  - Location-based using Home Assistant coordinates ✅
  - Auto-updates every 5 minutes with caching ✅
  - Auto-hide when no active alerts ✅
  - Shows event name, affected area, headline, and expiration time ✅
- [x] **Rain Timing Notifications**: Smart precipitation alerts ✅
  - Monitors next 4 hours of hourly forecast ✅
  - Detects rain via precipitation probability (>50%) or rainy conditions ✅
  - Broadcast-style lower third banner design ✅
  - Shows time until rain and expected arrival time ✅
  - Auto-hides when no rain expected ✅
  - Works regardless of daily/hourly display mode (fetches hourly data separately) ✅
  - Shimmer animation effect for professional look ✅
  - Night mode support with darker gradient ✅
  - Example: "☔ Rain expected in 2 hours (~4:15 PM)" ✅
- [ ] Air Quality integration (requires AQI sensor - future enhancement)
- [ ] "Best time to go outside today" suggestions (future enhancement)
- [ ] Pollen count alerts (future enhancement)

### 10. Sun & Moon Entity Integration
- [x] **Sun entity support**: Uses sun.sun for day/night detection and sunrise/sunset times ✅
- [x] **Moon phase sensor**: Integrates sensor.moon_phase for accurate lunar phase display ✅
- [x] **Auto-detection**: Automatically finds standard entities ✅
- [x] **Custom overrides**: Optional sun_entity and moon_entity config for custom entities ✅
- [x] **Graceful fallbacks**: Works without entities (falls back to time-based detection) ✅

### 11. Configuration & Compatibility
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

### Phase 3: Advanced Features ✅ COMPLETE
- [x] Weather information display system (UV, Wind, Feels Like, Humidity, Pressure, Visibility, Sunrise/Sunset) ✅
- [x] Three weather info layout modes (compact, standard, detailed) ✅
- [x] Moon phase display with 8 accurate phases ✅
- [x] Auto day/night mode with starry theme ✅
- [x] Sunrise/sunset times with auto-switching ✅
- [x] NWS weather alerts integration ✅
- [x] Professional Meteocons weather icons (236+ icons) ✅
- [x] Rain timing notifications with broadcast-style banner ✅
- [x] All 5 pre-built themes + custom theme support ✅
- [x] Chart view mode (TV-style temperature trend lines) ✅
- [x] Holiday decorations (8 holidays) ✅

### Phase 4: Polish & Release
- Performance optimization
  - **Reduce unnecessary renders:** In `shouldUpdate`, compare only relevant state/attribute changes to avoid re-rendering the card when not needed. Use `@state()` only for properties that affect rendering.
  - **Debounce/throttle data fetches:** For methods like `fetchForecast` and `fetchNWSAlerts`, ensure you don’t fetch more often than needed. Use debouncing or throttling if user interaction can trigger fetches.
  - **Memoize expensive calculations:** Cache results of functions like `getWeatherData()` if the underlying entity hasn’t changed, to avoid recalculating on every render.
  - **Minimize inline styles:** Move as much styling as possible to the static `styles` block for better performance and easier theming. Avoid inline `style` attributes in templates.
  - **Split large methods:** Break up large methods (like `renderHeader` and `renderWeatherInfo`) into smaller, focused helper methods for readability and maintainability.
  - **Use optional chaining and nullish coalescing:** Ensure these are used everywhere to avoid runtime errors when accessing deeply nested properties.
  - **Remove legacy fallbacks:** If only supporting new Home Assistant models, remove any legacy attribute fallbacks for clarity and maintainability.
  - **Avoid unnecessary state:** Only use `@state()` for properties that must trigger a re-render. Use regular class properties for others.
  - **Optimize CSS:** Use CSS variables for theme colors, avoid deeply nested selectors, and prefer flat, efficient selectors for better performance.
  - **Improve accessibility:** Add `aria-labels` and roles to important elements, and ensure keyboard navigation is supported for better accessibility.
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
theme: midnight
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
