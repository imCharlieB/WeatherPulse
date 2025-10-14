# WeatherPulse Card - Usage Guide

## Quick Start

### 1. Installation in Home Assistant

After installing via HACS or manually, add the card to your dashboard:

1. Edit your dashboard
2. Add a new card
3. Search for "WeatherPulse" or select "Custom: WeatherPulse Card"
4. Configure the card (see examples below)

### 2. Basic Configuration

The simplest configuration requires only a weather entity:

```yaml
type: custom:weatherpulse-card
entity: weather.home
```

This will give you:
- Time-focused header with current temperature
- Dynamic color gradient based on temperature
- 5-day forecast with temperature bars
- Precipitation probability

### 3. Finding Your Weather Entity

To find your weather entity:
1. Go to Developer Tools → States
2. Search for entities starting with `weather.`
3. Common examples:
   - `weather.home`
   - `weather.forecast_home`
   - `weather.openweathermap`
   - `weather.met_no`

### 4. Adding Your Outdoor Temperature Sensor

If you have an outdoor temperature sensor, you can display the actual temperature:

```yaml
type: custom:weatherpulse-card
entity: weather.home
outdoor_temp_sensor: sensor.outdoor_temperature
```

The header gradient will now use your actual sensor reading instead of the forecast temperature!

## Configuration Examples

### Example 1: Time-Focused Display

Perfect for bedroom or hallway displays:

```yaml
type: custom:weatherpulse-card
entity: weather.home
outdoor_temp_sensor: sensor.outdoor_temperature
header_mode: time-focused
show_date: true
show_time: true
forecast_days: 5
```

### Example 2: Greeting Mode

Personal and friendly, great for main dashboard:

```yaml
type: custom:weatherpulse-card
entity: weather.home
outdoor_temp_sensor: sensor.outdoor_temperature
header_mode: greeting
greeting_name: Sarah
show_date: true
show_time: true
forecast_days: 7
```

You'll see greetings like:
- "Good Morning, Sarah! Don't forget your umbrella!"
- "Good Evening, Sarah! Beautiful day ahead!"

### Example 3: Minimal Mode

Clean and compact:

```yaml
type: custom:weatherpulse-card
entity: weather.home
header_mode: minimal
forecast_days: 5
data_rows:
  - temperature
```

### Example 4: Detailed Weather Info

Show all available data:

```yaml
type: custom:weatherpulse-card
entity: weather.home
outdoor_temp_sensor: sensor.outdoor_temperature
header_mode: balanced
show_date: true
show_time: true
forecast_days: 7
view_mode: detailed
data_rows:
  - temperature
  - precipitation
  - wind
  - humidity
  - uv_index
```

## Header Modes Explained

### time-focused (default)
- **Large**: Current time (e.g., "5:48 pm")
- **Small**: Date (e.g., "Tuesday, 10.14.25")
- **Display**: Temperature with color gradient

### date-focused
- **Large**: Current date
- **Small**: Time
- **Display**: Temperature with color gradient

### balanced
- **Medium**: Both time and date with equal size
- **Display**: Temperature with color gradient

### minimal
- **Display**: Just weather icon and temperature
- No time or date shown

### greeting
- **Display**: Personalized greeting with name
- **Display**: Contextual weather suggestion
- **Display**: Temperature with color gradient
- Examples:
  - "Good Morning, Sarah! Bundle up, it's cold out there!"
  - "Good Afternoon! Perfect day for outdoor activities!"

## Temperature Gradient Colors

The header automatically changes color based on actual temperature:

| Temperature | Color Scheme | Example |
|-------------|-------------|---------|
| Below 32°F | Icy Blues/Purples | Winter freeze |
| 32-50°F | Cool Blues/Teals | Spring/fall chill |
| 50-70°F | Pleasant Greens/Yellows | Perfect weather |
| 70-85°F | Warm Oranges | Summer warmth |
| Above 85°F | Hot Reds/Oranges | Heat wave |

## Forecast Days

Choose how many days to display:

```yaml
forecast_days: 5  # Options: 5, 7, or 10
```

- **5 days**: Compact, fits well in smaller spaces
- **7 days**: Full week view (most common)
- **10 days**: Extended forecast for planning

## Data Rows

Customize what information appears in the forecast:

```yaml
data_rows:
  - temperature      # High/low temps (always recommended)
  - precipitation    # Chance of rain/snow
  - wind            # Wind speed and direction
  - humidity        # Humidity percentage
  - uv_index        # UV index level
  - pressure        # Atmospheric pressure
  - visibility      # Visibility distance
  - cloud_cover     # Cloud coverage
  - sunrise_sunset  # Sun times
  - dew_point       # Dew point temp
```

**Note**: Not all weather integrations provide all data types. The card will only show data that's available from your weather entity.

## Tips & Tricks

### 1. Testing Different Modes

Try different header modes to see which you prefer:

```yaml
# Try one at a time
header_mode: time-focused
header_mode: date-focused
header_mode: balanced
header_mode: minimal
header_mode: greeting
```

### 2. Multiple Cards

Create different cards for different purposes:

- **Bedroom**: Minimal mode, just temperature
- **Kitchen**: Time-focused with 5-day forecast
- **Living Room**: Greeting mode with 7-day detailed forecast

### 3. Temperature Units

The card automatically uses the temperature unit from your weather entity (°F or °C). The gradient colors adjust accordingly.

### 4. Performance

For best performance:
- Use fewer forecast days on mobile devices
- Limit data_rows to only what you need
- The card updates automatically when weather data changes

## Troubleshooting

### Card Doesn't Show

1. Make sure you've installed the card correctly
2. Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
3. Check that the entity name is correct

### "Entity not found" Error

1. Go to Developer Tools → States
2. Find your weather entity
3. Copy the exact entity ID (e.g., `weather.home`)
4. Use that in your configuration

### Temperature Sensor Not Working

1. Verify the sensor entity exists in Developer Tools → States
2. Make sure it's a temperature sensor (shows temperature value)
3. Check the entity ID is correct in your config

### No Forecast Data

1. Some weather integrations don't provide forecast data
2. Try a different weather integration (OpenWeatherMap, Met.no, etc.)
3. Check if your weather entity has a `forecast` attribute in Developer Tools → States

## Need Help?

- **GitHub Issues**: [Report a bug or request a feature](https://github.com/imCharlieB/WeatherPulse/issues)
- **Home Assistant Community**: Share your configurations and get help
- **Documentation**: Check [README.md](README.md) and [FEATURES.md](FEATURES.md)

## What's Next?

We're actively developing new features! Check out [FEATURES.md](FEATURES.md) to see what's coming:
- Animated weather icons
- Multiple themes
- Graphical seasonal headers
- Smart alerts
- And much more!
