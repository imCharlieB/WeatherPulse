# WeatherPulse Card - Development Guide

## Prerequisites

- Node.js 18+ and npm
- Git
- A Home Assistant instance for testing
- Basic knowledge of TypeScript and Web Components

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/imCharlieB/WeatherPulse.git
cd WeatherPulse
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Development Workflow

#### Build Once

```bash
npm run build
```

This compiles TypeScript and bundles everything into `dist/weatherpulse-card.js`.

#### Watch Mode (Auto-rebuild)

```bash
npm start
```

This starts a development server on `http://localhost:5000` and automatically rebuilds when you save changes.

### 4. Testing in Home Assistant

#### Option A: Development Server (Recommended)

1. Start the dev server: `npm start`
2. In Home Assistant, add this resource:
   ```
   http://YOUR_COMPUTER_IP:5000/weatherpulse-card.js
   ```
   Type: JavaScript Module
3. Add the card to your dashboard
4. Changes will reload automatically!

#### Option B: Manual Copy

1. Build the project: `npm run build`
2. Copy `dist/weatherpulse-card.js` to your HA `config/www/` folder
3. Add the card to your dashboard
4. Repeat after each change

## Project Structure

```
WeatherPulse/
├── src/
│   ├── weatherpulse-card.ts  # Main card component
│   ├── types.ts              # TypeScript type definitions
│   └── utils.ts              # Utility functions
├── dist/                     # Built files (generated)
├── node_modules/            # Dependencies (generated)
├── .eslintrc.json           # ESLint configuration
├── .gitignore               # Git ignore rules
├── hacs.json                # HACS configuration
├── LICENSE                  # MIT license
├── package.json             # Node.js package config
├── README.md                # Main readme
├── FEATURES.md              # Feature roadmap
├── USAGE.md                 # User guide
├── DEVELOPMENT.md           # This file
├── rollup.config.mjs        # Build configuration
└── tsconfig.json            # TypeScript configuration
```

## Code Overview

### Main Component: `src/weatherpulse-card.ts`

This is the main Lit web component that defines the card.

**Key methods:**
- `setConfig()`: Validates and stores card configuration
- `render()`: Renders the card HTML
- `renderHeader()`: Renders the dynamic header based on mode
- `renderForecast()`: Renders the forecast display
- `getWeatherData()`: Extracts data from HA weather entity

**Key properties:**
- `@property() hass`: Home Assistant object (provided by HA)
- `@state() config`: Card configuration
- `@state() currentTime/Date`: Current time/date for display

### Type Definitions: `src/types.ts`

Defines all TypeScript interfaces and types:
- `WeatherPulseCardConfig`: Card configuration options
- `WeatherData`: Weather entity data structure
- `ForecastDay`: Individual forecast day data
- `TemperatureGradient`: Color gradient configuration

### Utilities: `src/utils.ts`

Helper functions:
- `getTemperatureGradient()`: Returns colors based on temperature
- `getGreeting()`: Generates personalized greetings
- `getWeatherSuggestion()`: Creates contextual weather messages
- `formatTime()` / `formatDate()`: Date/time formatting
- `getDayName()`: Gets day name from datetime
- `getWeatherIcon()`: Maps condition to icon class

## Adding New Features

### Example: Adding a New Header Mode

1. **Update types** in `src/types.ts`:
   ```typescript
   header_mode?: 'time-focused' | 'date-focused' | 'balanced' | 'minimal' | 'greeting' | 'graphical' | 'YOUR_NEW_MODE';
   ```

2. **Add case in renderHeader()** in `src/weatherpulse-card.ts`:
   ```typescript
   case 'YOUR_NEW_MODE':
     headerContent = html`
       <div class="your-new-header">
         // Your HTML template here
       </div>
     `;
     break;
   ```

3. **Add styles** in the `styles` getter:
   ```typescript
   .your-new-header {
     // Your styles here
   }
   ```

4. **Test** by setting `header_mode: YOUR_NEW_MODE` in your card config

### Example: Adding a New Data Row

1. **Update type** in `src/types.ts`:
   ```typescript
   export type DataRow =
     | 'temperature'
     | 'precipitation'
     // ... existing options
     | 'your_new_data';
   ```

2. **Update renderForecastDay()** to display the new data
3. **Extract data** from weather entity in `getWeatherData()`
4. **Test** by adding to `data_rows` config

## Styling Guidelines

### Using CSS Variables

The card respects Home Assistant's theme variables:

```css
color: var(--primary-text-color);
background: var(--card-background-color);
border-color: var(--divider-color);
```

### Responsive Design

Use flexible layouts that work on all screen sizes:

```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
```

### Animations

Use CSS transitions for smooth changes:

```css
.header {
  transition: background 0.5s ease;
}
```

## Debugging

### Browser DevTools

1. Open your dashboard in Chrome/Firefox
2. Press F12 to open DevTools
3. Check Console for errors
4. Use Elements tab to inspect the card's DOM

### Console Logging

Add debug logs in the code:

```typescript
console.log('Current config:', this.config);
console.log('Weather data:', weatherData);
```

### Common Issues

**Card doesn't update:**
- Check that you're modifying `@state()` properties
- Verify `shouldUpdate()` logic

**Styles not applying:**
- Make sure styles are in the static `styles` getter
- Check CSS specificity

**Data not showing:**
- Verify the weather entity has that data
- Check in Developer Tools → States

## Building for Production

```bash
npm run build
```

This creates an optimized, minified version in `dist/weatherpulse-card.js`.

## Testing

Currently, we rely on manual testing in Home Assistant. Automated testing is planned.

**Manual test checklist:**
- [ ] All header modes render correctly
- [ ] Temperature gradient changes with temperature
- [ ] Forecast displays for 5, 7, and 10 days
- [ ] Time/date updates every minute
- [ ] Card works with different weather integrations
- [ ] Responsive on mobile devices
- [ ] No console errors

## Code Style

### TypeScript

- Use strict typing (avoid `any`)
- Define interfaces for all data structures
- Use descriptive variable names

### Formatting

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons at end of statements

### Comments

- Add JSDoc comments for functions
- Explain complex logic
- Keep comments up to date

Example:
```typescript
/**
 * Get temperature-based gradient colors
 * @param temp - Temperature value
 * @param unit - Temperature unit (°F or °C)
 * @returns TemperatureGradient object with colors
 */
export function getTemperatureGradient(temp: number, unit: string): TemperatureGradient {
  // Implementation
}
```

## Contributing

### Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m "Add amazing feature"`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Pull Request Guidelines

- Describe what your PR does
- Include screenshots for UI changes
- Test on multiple browsers if possible
- Update documentation if needed
- Reference any related issues

## Roadmap

See [FEATURES.md](FEATURES.md) for the complete feature roadmap.

**Current Priority:**
- Phase 1: Foundation (MVP) ✅ **COMPLETE**
- Phase 2: Core Features (Next)
  - Animated icons
  - Theme system
  - View modes

## Resources

- [Lit Documentation](https://lit.dev/)
- [Home Assistant Developer Docs](https://developers.home-assistant.io/)
- [Custom Card Helpers](https://github.com/custom-cards/custom-card-helpers)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Questions?

Open an issue on GitHub or start a discussion!
