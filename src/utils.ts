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
 * Get seasonal background (SVG scene or custom image)
 */
export function getSeasonalBackground(season?: 'spring' | 'summer' | 'fall' | 'winter', customImage?: string): string {
  // If custom image provided, use it
  if (customImage) {
    return `url(${customImage})`;
  }

  // Use current season if not specified
  const currentSeason = season || getCurrentSeason();

  // Return SVG-based seasonal scenes as data URIs
  switch (currentSeason) {
    case 'spring':
      // Spring: Cherry blossoms, green hills, blue sky
      return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' style='stop-color:%2387CEEB'/%3E%3Cstop offset='100%25' style='stop-color:%23B4E7F8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23sky)' width='1200' height='800'/%3E%3Cellipse cx='600' cy='700' rx='800' ry='200' fill='%2390EE90'/%3E%3Cellipse cx='300' cy='720' rx='600' ry='150' fill='%2376D776'/%3E%3Cellipse cx='900' cy='720' rx='500' ry='130' fill='%2376D776'/%3E%3Ccircle cx='200' cy='150' r='35' fill='%23FFD700' opacity='0.9'/%3E%3Cg%3E%3Ccircle cx='150' cy='600' r='4' fill='%23FFB6C1'/%3E%3Ccircle cx='155' cy='595' r='4' fill='%23FFC0CB'/%3E%3Ccircle cx='145' cy='595' r='4' fill='%23FFB6C1'/%3E%3Ccircle cx='150' cy='590' r='4' fill='%23FFC0CB'/%3E%3Ccircle cx='160' cy='600' r='4' fill='%23FFB6C1'/%3E%3C/g%3E%3Cg%3E%3Ccircle cx='950' cy='580' r='4' fill='%23FFB6C1'/%3E%3Ccircle cx='955' cy='575' r='4' fill='%23FFC0CB'/%3E%3Ccircle cx='945' cy='575' r='4' fill='%23FFB6C1'/%3E%3Ccircle cx='950' cy='570' r='4' fill='%23FFC0CB'/%3E%3Ccircle cx='960' cy='580' r='4' fill='%23FFB6C1'/%3E%3C/g%3E%3Cg%3E%3Ccircle cx='500' cy='620' r='4' fill='%23FFB6C1'/%3E%3Ccircle cx='505' cy='615' r='4' fill='%23FFC0CB'/%3E%3Ccircle cx='495' cy='615' r='4' fill='%23FFB6C1'/%3E%3Ccircle cx='500' cy='610' r='4' fill='%23FFC0CB'/%3E%3C/g%3E%3C/svg%3E")`;

    case 'summer':
      // Summer: Beach, ocean, bright sun
      return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' style='stop-color:%2300BFFF'/%3E%3Cstop offset='100%25' style='stop-color:%2387CEEB'/%3E%3C/linearGradient%3E%3ClinearGradient id='ocean' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' style='stop-color:%231E90FF'/%3E%3Cstop offset='100%25' style='stop-color:%2300CED1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23sky)' width='1200' height='800'/%3E%3Ccircle cx='200' cy='120' r='45' fill='%23FFD700'/%3E%3Crect y='450' fill='url(%23ocean)' width='1200' height='350'/%3E%3Cellipse cx='600' cy='455' rx='800' ry='15' fill='%23FFF' opacity='0.6'/%3E%3Cellipse cx='300' cy='470' rx='600' ry='12' fill='%23FFF' opacity='0.5'/%3E%3Cellipse cx='900' cy='465' rx='500' ry='10' fill='%23FFF' opacity='0.5'/%3E%3Cellipse cx='600' cy='700' rx='800' ry='150' fill='%23F4A460'/%3E%3Cellipse cx='300' cy='720' rx='600' ry='120' fill='%23DEB887'/%3E%3Cellipse cx='900' cy='720' rx='500' ry='110' fill='%23D2B48C'/%3E%3Ccircle cx='850' cy='650' r='8' fill='%23FFF'/%3E%3Ccircle cx='870' cy='655' r='6' fill='%23FFF'/%3E%3Ccircle cx='890' cy='648' r='7' fill='%23FFF'/%3E%3C/svg%3E")`;

    case 'fall':
      // Fall: Autumn trees, falling leaves, orange/red tones
      return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' style='stop-color:%23FF8C42'/%3E%3Cstop offset='100%25' style='stop-color:%23FFB84D'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23sky)' width='1200' height='800'/%3E%3Cellipse cx='600' cy='700' rx='800' ry='200' fill='%238B4513'/%3E%3Cellipse cx='300' cy='720' rx='600' ry='150' fill='%23A0522D'/%3E%3Cellipse cx='900' cy='720' rx='500' ry='130' fill='%23A0522D'/%3E%3Ccircle cx='250' cy='550' r='40' fill='%23D2691E'/%3E%3Crect x='245' y='590' width='10' height='120' fill='%238B4513'/%3E%3Ccircle cx='800' cy='520' r='50' fill='%23CD5C5C'/%3E%3Crect x='795' y='570' width='10' height='140' fill='%238B4513'/%3E%3Cg opacity='0.8'%3E%3Cellipse cx='150' cy='400' rx='8' ry='12' fill='%23FF6347' transform='rotate(45 150 400)'/%3E%3Cellipse cx='650' cy='420' rx='8' ry='12' fill='%23FF8C00' transform='rotate(-30 650 420)'/%3E%3Cellipse cx='950' cy='380' rx='8' ry='12' fill='%23DC143C' transform='rotate(20 950 380)'/%3E%3Cellipse cx='400' cy='350' rx='8' ry='12' fill='%23FF4500' transform='rotate(60 400 350)'/%3E%3Cellipse cx='500' cy='450' rx='8' ry='12' fill='%23FF6347' transform='rotate(-45 500 450)'/%3E%3C/g%3E%3C/svg%3E")`;

    case 'winter':
      // Winter: Snowy landscape, pine trees, cold blue sky
      return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' style='stop-color:%234A5F7F'/%3E%3Cstop offset='100%25' style='stop-color:%237B9CB5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23sky)' width='1200' height='800'/%3E%3Cellipse cx='600' cy='700' rx='800' ry='200' fill='%23F0F8FF'/%3E%3Cellipse cx='300' cy='720' rx='600' ry='150' fill='%23E6F3FF'/%3E%3Cellipse cx='900' cy='720' rx='500' ry='130' fill='%23E6F3FF'/%3E%3Cpolygon points='200,620 180,680 220,680' fill='%23228B22'/%3E%3Cpolygon points='200,600 175,660 225,660' fill='%232E8B57'/%3E%3Cpolygon points='200,580 170,640 230,640' fill='%23228B22'/%3E%3Crect x='195' y='680' width='10' height='30' fill='%238B4513'/%3E%3Cpolygon points='850,600 830,660 870,660' fill='%23228B22'/%3E%3Cpolygon points='850,580 825,640 875,640' fill='%232E8B57'/%3E%3Cpolygon points='850,560 820,620 880,620' fill='%23228B22'/%3E%3Crect x='845' y='660' width='10' height='50' fill='%238B4513'/%3E%3Cg opacity='0.9'%3E%3Ccircle cx='150' cy='250' r='3' fill='%23FFF'/%3E%3Ccircle cx='450' cy='300' r='3' fill='%23FFF'/%3E%3Ccircle cx='750' cy='280' r='3' fill='%23FFF'/%3E%3Ccircle cx='950' cy='320' r='3' fill='%23FFF'/%3E%3Ccircle cx='300' cy='200' r='3' fill='%23FFF'/%3E%3Ccircle cx='600' cy='240' r='3' fill='%23FFF'/%3E%3Ccircle cx='900' cy='220' r='3' fill='%23FFF'/%3E%3C/g%3E%3C/svg%3E")`;

    default:
      return 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)';
  }
}
