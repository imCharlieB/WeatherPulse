import { TemperatureGradient } from './types';

/**
 * Get temperature-based gradient colors
 */
export function getTemperatureGradient(temp: number, unit: string = '°F'): TemperatureGradient {
  // Convert to Fahrenheit if needed
  const fahrenheit = unit === '°C' ? (temp * 9/5) + 32 : temp;

  if (fahrenheit < 32) {
    // Freezing - Icy blues/purples
    return {
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundColor: '#667eea',
      textColor: '#ffffff'
    };
  } else if (fahrenheit < 50) {
    // Cold - Cool blues/teals
    return {
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      backgroundColor: '#4facfe',
      textColor: '#ffffff'
    };
  } else if (fahrenheit < 70) {
    // Moderate - Pleasant greens/yellows
    return {
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      backgroundColor: '#43e97b',
      textColor: '#1a1a1a'
    };
  } else if (fahrenheit < 85) {
    // Warm - Warm oranges
    return {
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      backgroundColor: '#fa709a',
      textColor: '#1a1a1a'
    };
  } else {
    // Hot - Hot reds/deep oranges
    return {
      color: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
      backgroundColor: '#ff6b6b',
      textColor: '#ffffff'
    };
  }
}

/**
 * Get greeting message based on time and weather
 */
export function getGreeting(name?: string, condition?: string, temp?: number): string {
  const now = new Date();
  const hour = now.getHours();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'short' });
  const dateStr = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }).replace(/\//g, '-');
  const userName = name ? `, ${name}` : '';

  let timeGreeting = 'Hello';
  if (hour < 12) {
    timeGreeting = 'Good Morning';
  } else if (hour < 17) {
    timeGreeting = 'Good Afternoon';
  } else if (hour < 22) {
    timeGreeting = 'Good Evening';
  } else {
    timeGreeting = 'Good Night';
  }

  // Get weather suggestion inline
  let weatherPhrase = '';
  if (condition) {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('rain')) {
      weatherPhrase = "it's rainy, don't forget your umbrella";
    } else if (conditionLower.includes('snow')) {
      weatherPhrase = "it's snowy, bundle up";
    } else if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      if (temp && temp > 75) {
        weatherPhrase = "it's sunny and warm";
      } else {
        weatherPhrase = "it's a beautiful clear day";
      }
    } else if (conditionLower.includes('cloud')) {
      weatherPhrase = "it's overcast but pleasant";
    } else if (conditionLower.includes('storm')) {
      weatherPhrase = "it's stormy, stay safe indoors";
    }
  }

  if (weatherPhrase) {
    return `${timeGreeting}${userName}, ${weatherPhrase}. ${dayName} ${dateStr}`;
  }

  return `${timeGreeting}${userName}! ${dayName} ${dateStr}`;
}

/**
 * Get contextual weather suggestion
 */
export function getWeatherSuggestion(condition?: string, temp?: number): string {
  if (!condition) return '';

  const conditionLower = condition.toLowerCase();

  if (conditionLower.includes('rain')) {
    return "Don't forget your umbrella!";
  } else if (conditionLower.includes('snow')) {
    return 'Bundle up, winter is here!';
  } else if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
    if (temp && temp > 75) {
      return 'Perfect day for outdoor activities!';
    }
    return 'Beautiful day ahead!';
  } else if (conditionLower.includes('cloud')) {
    return 'Overcast but pleasant.';
  } else if (conditionLower.includes('storm')) {
    return 'Stay safe indoors!';
  }

  return '';
}

/**
 * Format time
 */
export function formatTime(date: Date = new Date()): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Format date
 */
export function formatDate(date: Date = new Date()): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: '2-digit',
    day: '2-digit',
    year: '2-digit'
  });
}

/**
 * Get current season
 */
export function getCurrentSeason(): 'spring' | 'summer' | 'fall' | 'winter' {
  const month = new Date().getMonth();

  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
}

/**
 * Get day name from datetime string
 */
export function getDayName(datetime: string): string {
  const date = new Date(datetime);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

/**
 * Check if it's currently night time
 */
export function isNightTime(): boolean {
  const hour = new Date().getHours();
  return hour < 6 || hour >= 20; // Night is 8PM to 6AM
}

/**
 * Get weather icon class based on condition (for header - uses night icons)
 */
export function getWeatherIcon(condition: string): string {
  const conditionLower = condition.toLowerCase();
  const isNight = isNightTime();

  if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
    return isNight ? 'clear-night' : 'clear-day';
  } else if (conditionLower.includes('partlycloudy') || conditionLower.includes('partly') || conditionLower.includes('partial')) {
    return isNight ? 'partlycloudy-night' : 'partlycloudy';
  } else if (conditionLower.includes('cloud')) {
    return 'cloudy';
  } else if (conditionLower.includes('rain')) {
    return 'rainy';
  } else if (conditionLower.includes('snow')) {
    return 'snowy';
  } else if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
    return 'lightning';
  } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
    return 'fog';
  } else if (conditionLower.includes('wind')) {
    return 'windy';
  }

  return isNight ? 'clear-night' : 'clear-day';
}

/**
 * Get weather icon class for forecast (always uses day icons, no moon)
 */
export function getForecastIcon(condition: string): string {
  const conditionLower = condition.toLowerCase();

  if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
    return 'clear-day';
  } else if (conditionLower.includes('partlycloudy') || conditionLower.includes('partly') || conditionLower.includes('partial')) {
    return 'partlycloudy';
  } else if (conditionLower.includes('cloud')) {
    return 'cloudy';
  } else if (conditionLower.includes('rain')) {
    return 'rainy';
  } else if (conditionLower.includes('snow')) {
    return 'snowy';
  } else if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
    return 'lightning';
  } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
    return 'fog';
  } else if (conditionLower.includes('wind')) {
    return 'windy';
  }

  return 'clear-day';
}

/**
 * Get seasonal background image
 */
export function getSeasonalBackground(season?: 'spring' | 'summer' | 'fall' | 'winter', customImage?: string): string {
  // Custom image takes priority
  if (customImage) {
    return `url(${customImage})`;
  }

  // Use current season if not specified
  const currentSeason = season || getCurrentSeason();

  // Use bundled default seasonal images
  // HACS installs to /local/community/WeatherPulse/ (matches GitHub repo name)
  const basePath = '/local/community/WeatherPulse/images';

  switch (currentSeason) {
    case 'spring':
      return `url(${basePath}/spring-default.jpg)`;
    case 'summer':
      return `url(${basePath}/summer-default.jpg)`;
    case 'fall':
      return `url(${basePath}/fall-default.jpg)`;
    case 'winter':
      return `url(${basePath}/winter-default.jpg)`;
    default:
      return `url(${basePath}/spring-default.jpg)`;
  }
}
