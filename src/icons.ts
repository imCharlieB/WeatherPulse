import { html, svg, SVGTemplateResult } from 'lit';
import { unsafeCSS } from 'lit';

/**
 * Animated weather icons using SVG and CSS animations
 */

export function getAnimatedWeatherIcon(condition: string, animate: boolean = true): SVGTemplateResult {
  const animClass = animate ? 'animated' : '';

  switch (condition) {
    case 'clear-day':
    case 'sunny':
      return svg`
        <svg class="weather-icon-svg ${animClass}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <style>
            .sun-rays {
              animation: ${animate ? 'rotate 20s linear infinite' : 'none'};
              transform-origin: 50px 50px;
            }
            .sun-core {
              animation: ${animate ? 'pulse 4s ease-in-out infinite' : 'none'};
              transform-origin: 50px 50px;
            }
            @keyframes rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.05); opacity: 0.9; }
            }
          </style>
          <!-- Sun rays -->
          <g class="sun-rays">
            <line x1="50" y1="10" x2="50" y2="20" stroke="#FDB813" stroke-width="3" stroke-linecap="round"/>
            <line x1="50" y1="80" x2="50" y2="90" stroke="#FDB813" stroke-width="3" stroke-linecap="round"/>
            <line x1="10" y1="50" x2="20" y2="50" stroke="#FDB813" stroke-width="3" stroke-linecap="round"/>
            <line x1="80" y1="50" x2="90" y2="50" stroke="#FDB813" stroke-width="3" stroke-linecap="round"/>
            <line x1="21" y1="21" x2="28" y2="28" stroke="#FDB813" stroke-width="3" stroke-linecap="round"/>
            <line x1="72" y1="72" x2="79" y2="79" stroke="#FDB813" stroke-width="3" stroke-linecap="round"/>
            <line x1="79" y1="21" x2="72" y2="28" stroke="#FDB813" stroke-width="3" stroke-linecap="round"/>
            <line x1="28" y1="72" x2="21" y2="79" stroke="#FDB813" stroke-width="3" stroke-linecap="round"/>
          </g>
          <!-- Sun core -->
          <circle class="sun-core" cx="50" cy="50" r="20" fill="#FDB813"/>
        </svg>
      `;

    case 'clear-night':
      return svg`
        <svg class="weather-icon-svg ${animClass}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <style>
            .moon-glow {
              animation: ${animate ? 'moonPulse 4s ease-in-out infinite' : 'none'};
              transform-origin: 50px 50px;
            }
            @keyframes moonPulse {
              0%, 100% {
                opacity: 0.1;
              }
              50% {
                opacity: 0.2;
              }
            }
            .moon-body {
              animation: ${animate ? 'moonGlowBody 4s ease-in-out infinite' : 'none'};
              transform-origin: 50px 50px;
            }
            @keyframes moonGlowBody {
              0%, 100% {
                opacity: 1;
              }
              50% {
                opacity: 0.95;
              }
            }
          </style>
          <!-- Very subtle glow effect -->
          <circle class="moon-glow" cx="50" cy="50" r="26" fill="#FFF9C4" opacity="0.15"/>
          <!-- Main moon body -->
          <circle class="moon-body" cx="50" cy="50" r="20" fill="#FFF9C4"/>
          <!-- Moon crater details -->
          <circle cx="45" cy="45" r="3" fill="#F0E68C" opacity="0.3"/>
          <circle cx="58" cy="48" r="4" fill="#F0E68C" opacity="0.2"/>
          <circle cx="48" cy="56" r="2.5" fill="#F0E68C" opacity="0.25"/>
        </svg>
      `;

    case 'partlycloudy-night':
      return svg`
        <svg class="weather-icon-svg ${animClass}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <style>
            .moon-glow-small {
              animation: ${animate ? 'moonPulseSmall 4s ease-in-out infinite' : 'none'};
              transform-origin: 30px 30px;
            }
            @keyframes moonPulseSmall {
              0%, 100% {
                opacity: 0.1;
              }
              50% {
                opacity: 0.2;
              }
            }
            .cloud {
              animation: ${animate ? 'float 6s ease-in-out infinite' : 'none'};
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3px); }
            }
          </style>
          <!-- Very subtle moon glow -->
          <circle class="moon-glow-small" cx="30" cy="30" r="15" fill="#FFF9C4" opacity="0.15"/>
          <!-- Moon body -->
          <circle cx="30" cy="30" r="12" fill="#FFF9C4"/>
          <circle cx="28" cy="28" r="2" fill="#F0E68C" opacity="0.3"/>
          <circle cx="34" cy="32" r="1.5" fill="#F0E68C" opacity="0.2"/>
          <!-- Cloud in foreground -->
          <g class="cloud">
            <ellipse cx="50" cy="60" rx="18" ry="14" fill="#E8E8E8"/>
            <ellipse cx="65" cy="55" rx="22" ry="18" fill="#F0F0F0"/>
            <ellipse cx="80" cy="60" rx="18" ry="14" fill="#E8E8E8"/>
            <rect x="32" y="60" width="66" height="18" rx="3" fill="#ECECEC"/>
          </g>
        </svg>
      `;

    case 'cloudy':
      return svg`
        <svg class="weather-icon-svg ${animClass}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <style>
            .cloud {
              animation: ${animate ? 'float 6s ease-in-out infinite' : 'none'};
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-5px); }
            }
          </style>
          <g class="cloud">
            <ellipse cx="35" cy="50" rx="18" ry="14" fill="#C8C8C8"/>
            <ellipse cx="50" cy="45" rx="22" ry="18" fill="#D8D8D8"/>
            <ellipse cx="65" cy="50" rx="18" ry="14" fill="#C8C8C8"/>
            <rect x="17" y="50" width="66" height="18" rx="3" fill="#D0D0D0"/>
          </g>
        </svg>
      `;

    case 'partlycloudy':
    case 'partly-cloudy-day':
    case 'partly-cloudy-night':
      return svg`
        <svg class="weather-icon-svg ${animClass}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <style>
            .sun-group {
              animation: ${animate ? 'rotate 20s linear infinite' : 'none'};
              transform-origin: 30px 30px;
            }
            .cloud {
              animation: ${animate ? 'float 6s ease-in-out infinite' : 'none'};
            }
            @keyframes rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3px); }
            }
          </style>
          <!-- Sun in background (entire sun group rotates together) -->
          <g class="sun-group">
            <line x1="30" y1="12" x2="30" y2="18" stroke="#FDB813" stroke-width="2" stroke-linecap="round"/>
            <line x1="30" y1="42" x2="30" y2="48" stroke="#FDB813" stroke-width="2" stroke-linecap="round"/>
            <line x1="12" y1="30" x2="18" y2="30" stroke="#FDB813" stroke-width="2" stroke-linecap="round"/>
            <line x1="42" y1="30" x2="48" y2="30" stroke="#FDB813" stroke-width="2" stroke-linecap="round"/>
            <line x1="17" y1="17" x2="21" y2="21" stroke="#FDB813" stroke-width="2" stroke-linecap="round"/>
            <line x1="39" y1="39" x2="43" y2="43" stroke="#FDB813" stroke-width="2" stroke-linecap="round"/>
            <line x1="43" y1="17" x2="39" y2="21" stroke="#FDB813" stroke-width="2" stroke-linecap="round"/>
            <line x1="21" y1="39" x2="17" y2="43" stroke="#FDB813" stroke-width="2" stroke-linecap="round"/>
            <circle cx="30" cy="30" r="12" fill="#FDB813"/>
          </g>
          <!-- Cloud in foreground -->
          <g class="cloud">
            <ellipse cx="50" cy="60" rx="18" ry="14" fill="#E8E8E8"/>
            <ellipse cx="65" cy="55" rx="22" ry="18" fill="#F0F0F0"/>
            <ellipse cx="80" cy="60" rx="18" ry="14" fill="#E8E8E8"/>
            <rect x="32" y="60" width="66" height="18" rx="3" fill="#ECECEC"/>
          </g>
        </svg>
      `;

    case 'rainy':
    case 'pouring':
    case 'rain':
      return svg`
        <svg class="weather-icon-svg ${animClass}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <style>
            .cloud {
              animation: ${animate ? 'float 6s ease-in-out infinite' : 'none'};
            }
            .rain-drop {
              animation: ${animate ? 'rain 0.8s linear infinite' : 'none'};
            }
            .rain-drop:nth-child(2) { animation-delay: 0.2s; }
            .rain-drop:nth-child(3) { animation-delay: 0.4s; }
            .rain-drop:nth-child(4) { animation-delay: 0.6s; }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3px); }
            }
            @keyframes rain {
              0% { transform: translateY(0px); opacity: 1; }
              100% { transform: translateY(20px); opacity: 0; }
            }
          </style>
          <g class="cloud">
            <ellipse cx="35" cy="35" rx="12" ry="10" fill="#B0B0B0"/>
            <ellipse cx="50" cy="30" rx="15" ry="12" fill="#C0C0C0"/>
            <ellipse cx="65" cy="35" rx="12" ry="10" fill="#B0B0B0"/>
            <rect x="23" y="35" width="54" height="12" rx="2" fill="#B8B8B8"/>
          </g>
          <g opacity="0.8">
            <line class="rain-drop" x1="30" y1="55" x2="30" y2="70" stroke="#4A90E2" stroke-width="2" stroke-linecap="round"/>
            <line class="rain-drop" x1="45" y1="55" x2="45" y2="70" stroke="#4A90E2" stroke-width="2" stroke-linecap="round"/>
            <line class="rain-drop" x1="60" y1="55" x2="60" y2="70" stroke="#4A90E2" stroke-width="2" stroke-linecap="round"/>
            <line class="rain-drop" x1="37" y1="60" x2="37" y2="75" stroke="#4A90E2" stroke-width="2" stroke-linecap="round"/>
            <line class="rain-drop" x1="52" y1="60" x2="52" y2="75" stroke="#4A90E2" stroke-width="2" stroke-linecap="round"/>
          </g>
        </svg>
      `;

    case 'snowy':
    case 'snow':
    case 'snowy-rainy':
      return svg`
        <svg class="weather-icon-svg ${animClass}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <style>
            .cloud {
              animation: ${animate ? 'float 6s ease-in-out infinite' : 'none'};
            }
            .snowflake {
              animation: ${animate ? 'snow 3s linear infinite' : 'none'};
            }
            .snowflake:nth-child(2) { animation-delay: 0.5s; }
            .snowflake:nth-child(3) { animation-delay: 1s; }
            .snowflake:nth-child(4) { animation-delay: 1.5s; }
            .snowflake:nth-child(5) { animation-delay: 2s; }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3px); }
            }
            @keyframes snow {
              0% { transform: translateY(0px) translateX(0px); opacity: 1; }
              100% { transform: translateY(25px) translateX(3px); opacity: 0; }
            }
          </style>
          <g class="cloud">
            <ellipse cx="35" cy="35" rx="12" ry="10" fill="#B8B8B8"/>
            <ellipse cx="50" cy="30" rx="15" ry="12" fill="#C8C8C8"/>
            <ellipse cx="65" cy="35" rx="12" ry="10" fill="#B8B8B8"/>
            <rect x="23" y="35" width="54" height="12" rx="2" fill="#C0C0C0"/>
          </g>
          <g fill="#E3F2FD" opacity="0.9">
            <circle class="snowflake" cx="30" cy="55" r="3"/>
            <circle class="snowflake" cx="45" cy="60" r="3"/>
            <circle class="snowflake" cx="60" cy="55" r="3"/>
            <circle class="snowflake" cx="37" cy="65" r="2.5"/>
            <circle class="snowflake" cx="52" cy="68" r="2.5"/>
          </g>
        </svg>
      `;

    case 'lightning':
    case 'thunderstorm':
    case 'lightning-rainy':
      return svg`
        <svg class="weather-icon-svg ${animClass}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <style>
            .storm-cloud {
              animation: ${animate ? 'shake 4s ease-in-out infinite' : 'none'};
            }
            .lightning {
              animation: ${animate ? 'flash 2s ease-in-out infinite' : 'none'};
            }
            @keyframes shake {
              0%, 100% { transform: translateX(0px); }
              25% { transform: translateX(-2px); }
              75% { transform: translateX(2px); }
            }
            @keyframes flash {
              0%, 50%, 100% { opacity: 0; }
              55%, 65% { opacity: 1; }
            }
          </style>
          <g class="storm-cloud">
            <ellipse cx="35" cy="35" rx="14" ry="11" fill="#606060"/>
            <ellipse cx="50" cy="28" rx="17" ry="14" fill="#707070"/>
            <ellipse cx="65" cy="35" rx="14" ry="11" fill="#606060"/>
            <rect x="21" y="35" width="58" height="14" rx="2" fill="#686868"/>
          </g>
          <path class="lightning" d="M 50 50 L 42 65 L 48 65 L 43 80 L 55 62 L 50 62 Z"
                fill="#FFD700" stroke="#FFA500" stroke-width="1"/>
        </svg>
      `;

    case 'fog':
    case 'mist':
    case 'foggy':
      return svg`
        <svg class="weather-icon-svg ${animClass}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <style>
            .fog-line {
              animation: ${animate ? 'drift 8s ease-in-out infinite' : 'none'};
            }
            .fog-line:nth-child(2) { animation-delay: 1s; }
            .fog-line:nth-child(3) { animation-delay: 2s; }
            .fog-line:nth-child(4) { animation-delay: 3s; }
            @keyframes drift {
              0%, 100% { transform: translateX(0px); opacity: 0.6; }
              50% { transform: translateX(5px); opacity: 0.3; }
            }
          </style>
          <g fill="none" stroke="#A0A0A0" stroke-width="4" stroke-linecap="round" opacity="0.7">
            <line class="fog-line" x1="20" y1="35" x2="80" y2="35"/>
            <line class="fog-line" x1="15" y1="50" x2="75" y2="50"/>
            <line class="fog-line" x1="25" y1="65" x2="85" y2="65"/>
            <line class="fog-line" x1="20" y1="80" x2="80" y2="80"/>
          </g>
        </svg>
      `;

    case 'windy':
    case 'wind':
    case 'exceptional':
      return svg`
        <svg class="weather-icon-svg ${animClass}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <style>
            .wind-line {
              animation: ${animate ? 'wind 3s ease-in-out infinite' : 'none'};
            }
            .wind-line:nth-child(2) { animation-delay: 0.5s; }
            .wind-line:nth-child(3) { animation-delay: 1s; }
            @keyframes wind {
              0% { transform: translateX(-10px); opacity: 0; }
              50% { opacity: 1; }
              100% { transform: translateX(10px); opacity: 0; }
            }
          </style>
          <g fill="none" stroke="#90CAF9" stroke-width="3" stroke-linecap="round">
            <path class="wind-line" d="M 15 30 Q 40 25 65 30 T 95 30"/>
            <path class="wind-line" d="M 10 50 Q 35 45 60 50 T 90 50"/>
            <path class="wind-line" d="M 15 70 Q 40 65 65 70 T 95 70"/>
          </g>
        </svg>
      `;

    default:
      // Default to sunny icon
      return svg`
        <svg class="weather-icon-svg ${animClass}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="20" fill="#FDB813"/>
        </svg>
      `;
  }
}
