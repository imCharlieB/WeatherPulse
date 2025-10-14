# WeatherPulse Card - Release Guide

## Creating Your First Release (v0.1.0)

### Step 1: Create a Release on GitHub

1. **Go to your repository**: https://github.com/imCharlieB/WeatherPulse

2. **Click "Releases"** in the right sidebar

3. **Click "Create a new release"**

4. **Fill in the details:**
   - **Tag**: `v0.1.0` (create new tag on publish)
   - **Target**: `main`
   - **Release title**: `WeatherPulse v0.1.0 - Initial Release`

5. **Release notes** (copy this):

```markdown
# WeatherPulse v0.1.0 - Initial Release

A modern, highly configurable weather card for Home Assistant with dynamic temperature-based theming.

## 🎉 Features

### Dynamic Temperature-Based Header
Beautiful gradient colors that change based on actual outdoor temperature:
- **Below 32°F**: Icy blues and purples
- **32-50°F**: Cool blues and teals
- **50-70°F**: Pleasant greens and yellows
- **70-85°F**: Warm oranges
- **Above 85°F**: Hot reds and oranges

### Multiple Header Modes
- ⏰ **Time-Focused**: Large clock with small date
- 📅 **Date-Focused**: Large date with small time
- ⚖️ **Balanced**: Equal time and date
- 🎯 **Minimal**: Just icon and temperature
- 👋 **Greeting**: Personalized messages ("Good Morning, Sarah!")

### Smart Features
- 📊 Configurable 5, 7, or 10-day forecasts
- 🌡️ Dual temperature display (forecast + actual sensor)
- 💧 Precipitation probability
- 🎨 Beautiful horizontal temperature bars
- ⏱️ Live updating clock
- 🌤️ Weather-aware suggestions

## 📦 Installation

### Via HACS (Custom Repository)

1. Open HACS → Frontend
2. Click ⋮ menu → Custom repositories
3. Add: `https://github.com/imCharlieB/WeatherPulse`
4. Category: Lovelace
5. Click "WeatherPulse Card" → Install
6. Refresh browser

### Manual Installation

1. Download `weatherpulse-card.js` from this release
2. Copy to `config/www/weatherpulse-card/weatherpulse-card.js`
3. Add resource in Settings → Dashboards → Resources:
   - URL: `/local/weatherpulse-card/weatherpulse-card.js`
   - Type: JavaScript Module
4. Add card to your dashboard

## 🎨 Quick Start

```yaml
type: custom:weatherpulse-card
entity: weather.home
outdoor_temp_sensor: sensor.outdoor_temperature
header_mode: greeting
greeting_name: Sarah
forecast_days: 7
```

## 📖 Documentation

- [Quick Start Guide](QUICK_START.md)
- [Complete Usage Guide](USAGE.md)
- [Feature Roadmap](FEATURES.md)
- [Development Guide](DEVELOPMENT.md)

## 🔮 Coming Soon

- Animated weather icons
- Multiple themes (Glassmorphism, Dark, Vibrant)
- Hourly forecast views
- Smart weather alerts
- Seasonal background images
- Visual configuration editor

## 🐛 Known Issues

- Icons are currently emoji placeholders (animations coming in Phase 2)
- Only temperature-based gradient theme available (more themes in Phase 2)

## 📝 Changelog

### Added
- Temperature-based dynamic header highlighting
- 5 header display modes
- Live clock with real-time updates
- Configurable forecast periods (5/7/10 days)
- Dual temperature support (forecast + sensor)
- Horizontal temperature bars with day/night visualization
- Precipitation probability display
- Personalized greeting mode
- Weather-aware contextual suggestions
- HACS compatibility

### Technical
- Built with TypeScript + Lit web components
- 29KB bundle size
- Efficient rendering with minimal re-renders
- Respects Home Assistant themes
- Works with any weather entity

## 🙏 Credits

Built with ❤️ for the Home Assistant community using Lit, TypeScript, and Rollup.

---

**Full Changelog**: https://github.com/imCharlieB/WeatherPulse/commits/v0.1.0
```

6. **Attach `dist/weatherpulse-card.js`** as a binary file

7. **Click "Publish release"**

### Step 2: Test Installation via HACS

After creating the release:

1. In Home Assistant, go to HACS → Frontend
2. Click ⋮ menu → Custom repositories
3. Add your repo: `https://github.com/imCharlieB/WeatherPulse`
4. Category: Lovelace
5. Click Add
6. Search for "WeatherPulse Card"
7. Install and test!

### Step 3: (Optional) Submit to HACS Default

To get your card into HACS by default (so users don't need to add custom repo):

1. **Wait for feedback** from users testing via custom repo
2. **Fix any issues** that come up
3. **Create a PR** to https://github.com/hacs/default

Requirements for HACS default:
- ✅ Repository is public
- ✅ Has a release
- ✅ Has `hacs.json` file
- ✅ Has `info.md` file
- ✅ Works with latest Home Assistant
- ⏳ Has been tested by users
- ⏳ Has documentation

You're almost there! Just need user testing before submitting to HACS default.

## Updating HACS Metadata

Your `hacs.json` is already configured correctly:

```json
{
  "name": "WeatherPulse Card",
  "filename": "weatherpulse-card.js",
  "render_readme": true,
  "content_in_root": false,
  "homeassistant": "2024.1.0"
}
```

This tells HACS:
- The card is in `dist/weatherpulse-card.js`
- It works with HA 2024.1.0+
- README should be rendered on the HACS page

## Version Numbering

We're using semantic versioning:

- **v0.1.0** - Initial MVP release (current)
- **v0.2.0** - Next minor version (new features)
- **v0.1.1** - Patch release (bug fixes)
- **v1.0.0** - First stable release

## Future Releases

When you add new features:

1. Update version in `package.json`
2. Update version in console.info in `weatherpulse-card.ts`
3. Rebuild: `npm run build`
4. Commit changes
5. Create new release on GitHub
6. HACS will auto-detect the new version!

## Quick Release Checklist

- [ ] All features working
- [ ] Tests passing (manual for now)
- [ ] Documentation updated
- [ ] Version numbers updated
- [ ] Build is clean (`npm run build`)
- [ ] Commit and push to GitHub
- [ ] Create GitHub release
- [ ] Attach built file to release
- [ ] Test installation via HACS custom repo
- [ ] Announce to community!

---

**Your repository is ready!** 🎉

Next step: Create the v0.1.0 release on GitHub!
