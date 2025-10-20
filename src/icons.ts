import { html, svg, SVGTemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

/**
 * Weather icons using Meteocons by Bas Milius
 * https://github.com/basmilius/weather-icons
 * License: MIT
 */

// Import SVG files as strings (handled by rollup-plugin-string)
import clearDaySvg from '../node_modules/@bybas/weather-icons/production/fill/all/clear-day.svg';
import clearNightSvg from '../node_modules/@bybas/weather-icons/production/fill/all/clear-night.svg';
import partlyCloudyDaySvg from '../node_modules/@bybas/weather-icons/production/fill/all/partly-cloudy-day.svg';
import partlyCloudyNightSvg from '../node_modules/@bybas/weather-icons/production/fill/all/partly-cloudy-night.svg';
import cloudySvg from '../node_modules/@bybas/weather-icons/production/fill/all/cloudy.svg';
import rainSvg from '../node_modules/@bybas/weather-icons/production/fill/all/rain.svg';
import drizzleSvg from '../node_modules/@bybas/weather-icons/production/fill/all/drizzle.svg';
import snowSvg from '../node_modules/@bybas/weather-icons/production/fill/all/snow.svg';
import sleetSvg from '../node_modules/@bybas/weather-icons/production/fill/all/sleet.svg';
import thunderstormsRainSvg from '../node_modules/@bybas/weather-icons/production/fill/all/thunderstorms-rain.svg';
import fogSvg from '../node_modules/@bybas/weather-icons/production/fill/all/fog.svg';
import windSvg from '../node_modules/@bybas/weather-icons/production/fill/all/wind.svg';
import hailSvg from '../node_modules/@bybas/weather-icons/production/fill/all/hail.svg';

// Moon phases
import moonNewSvg from '../node_modules/@bybas/weather-icons/production/fill/all/moon-new.svg';
import moonWaxingCrescentSvg from '../node_modules/@bybas/weather-icons/production/fill/all/moon-waxing-crescent.svg';
import moonFirstQuarterSvg from '../node_modules/@bybas/weather-icons/production/fill/all/moon-first-quarter.svg';
import moonWaxingGibbousSvg from '../node_modules/@bybas/weather-icons/production/fill/all/moon-waxing-gibbous.svg';
import moonFullSvg from '../node_modules/@bybas/weather-icons/production/fill/all/moon-full.svg';
import moonWaningGibbousSvg from '../node_modules/@bybas/weather-icons/production/fill/all/moon-waning-gibbous.svg';
import moonLastQuarterSvg from '../node_modules/@bybas/weather-icons/production/fill/all/moon-last-quarter.svg';
import moonWaningCrescentSvg from '../node_modules/@bybas/weather-icons/production/fill/all/moon-waning-crescent.svg';

/**
 * Get animated weather icon from Meteocons library
 */
export function getAnimatedWeatherIcon(condition: string, animate: boolean = true): SVGTemplateResult {
  let svgContent = '';

  switch (condition.toLowerCase()) {
    case 'clear-day':
    case 'sunny':
      svgContent = clearDaySvg;
      break;

    case 'clear-night':
      svgContent = clearNightSvg;
      break;

    case 'partlycloudy':
    case 'partly-cloudy-day':
      svgContent = partlyCloudyDaySvg;
      break;

    case 'partlycloudy-night':
    case 'partly-cloudy-night':
      svgContent = partlyCloudyNightSvg;
      break;

    case 'cloudy':
    case 'overcast':
      svgContent = cloudySvg;
      break;

    case 'rainy':
    case 'rain':
      svgContent = rainSvg;
      break;

    case 'pouring':
    case 'heavy-rain':
      // Use rain icon for heavy rain (could use extreme-rain if available)
      svgContent = rainSvg;
      break;

    case 'drizzle':
    case 'light-rain':
      svgContent = drizzleSvg;
      break;

    case 'snowy':
    case 'snow':
      svgContent = snowSvg;
      break;

    case 'snowy-rainy':
    case 'sleet':
    case 'mix':
      svgContent = sleetSvg;
      break;

    case 'hail':
      svgContent = hailSvg;
      break;

    case 'lightning':
    case 'thunderstorm':
    case 'lightning-rainy':
    case 'thunderstorms':
      svgContent = thunderstormsRainSvg;
      break;

    case 'fog':
    case 'mist':
    case 'foggy':
    case 'haze':
      svgContent = fogSvg;
      break;

    case 'windy':
    case 'wind':
    case 'exceptional':
      svgContent = windSvg;
      break;

    default:
      // Default to clear-day
      svgContent = clearDaySvg;
  }

  // If animations are disabled, remove animate elements from the SVG
  if (!animate) {
    svgContent = svgContent.replace(/<animate[^>]*>/g, '').replace(/<\/animate>/g, '');
    svgContent = svgContent.replace(/<animateTransform[^>]*\/>/g, '');
  }

  // Wrap the SVG content in a container div with our weather-icon-svg class
  return svg`${unsafeHTML(svgContent)}`;
}

/**
 * Moon phase icons from Meteocons
 */
export function getMoonPhaseIcon(phase: string, animate: boolean = true): SVGTemplateResult {
  let svgContent = '';

  switch (phase.toLowerCase()) {
    case 'new_moon':
    case 'new-moon':
      svgContent = moonNewSvg;
      break;

    case 'waxing_crescent':
    case 'waxing-crescent':
      svgContent = moonWaxingCrescentSvg;
      break;

    case 'first_quarter':
    case 'first-quarter':
      svgContent = moonFirstQuarterSvg;
      break;

    case 'waxing_gibbous':
    case 'waxing-gibbous':
      svgContent = moonWaxingGibbousSvg;
      break;

    case 'full_moon':
    case 'full-moon':
      svgContent = moonFullSvg;
      break;

    case 'waning_gibbous':
    case 'waning-gibbous':
      svgContent = moonWaningGibbousSvg;
      break;

    case 'last_quarter':
    case 'third_quarter':
    case 'last-quarter':
    case 'third-quarter':
      svgContent = moonLastQuarterSvg;
      break;

    case 'waning_crescent':
    case 'waning-crescent':
      svgContent = moonWaningCrescentSvg;
      break;

    default:
      // Default to waxing crescent
      svgContent = moonWaxingCrescentSvg;
  }

  // If animations are disabled, remove animate elements from the SVG
  if (!animate) {
    svgContent = svgContent.replace(/<animate[^>]*>/g, '').replace(/<\/animate>/g, '');
    svgContent = svgContent.replace(/<animateTransform[^>]*\/>/g, '');
  }

  return svg`${unsafeHTML(svgContent)}`;
}
