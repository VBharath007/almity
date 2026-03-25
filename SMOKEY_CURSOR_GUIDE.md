# Smokey Cursor - Integration Guide

## ✅ Installation Complete

The Smokey Cursor effect has been successfully added to all 5 pages:
- ✓ index.html
- ✓ about.html  
- ✓ portfolio.html
- ✓ contact.html
- ✓ service.html

## 🎨 What It Does

The Smokey Cursor creates an interactive fluid simulation that follows your mouse cursor or touch, leaving behind a colorful, smoke-like trail effect. It uses WebGL for smooth, performant rendering.

**Features:**
- 🎯 Interactive mouse tracking
- 📱 Touch support for mobile
- 🎨 Dynamic color generation
- 🔧 Highly customizable
- ⚡ GPU-accelerated WebGL rendering
- 💪 Performance optimized

## 📂 Files Created

- **smokeyCursor.js** - Main Smokey Cursor component (standalone vanilla JavaScript)
  - No dependencies required
  - Works with pure HTML/CSS/JavaScript
  - ~800 lines of optimized WebGL code

## 🚀 How It Works

Each page now includes this initialization code before the closing `</body>` tag:

```html
<script src="smokeyCursor.js"></script>
<script>
  new SmokeyCursor({
    simulationResolution: 128,
    dyeResolution: 1440,
    densityDissipation: 3.5,
    velocityDissipation: 2,
    enableShading: true
  });
</script>
```

The cursor automatically initializes on first mouse movement or touch interaction.

## ⚙️ Configuration Options

You can customize the effect by passing options to the `SmokeyCursor` constructor:

```javascript
new SmokeyCursor({
  // Simulation quality (higher = better but slower)
  simulationResolution: 128,        // Default: 128 (64-256)
  
  // Dye/color quality (higher = better detail)
  dyeResolution: 1440,              // Default: 1440 (512-2048)
  
  // How fast smoke dissipates
  densityDissipation: 3.5,           // Default: 3.5 (higher = dissipates faster)
  
  // How fast velocity decays
  velocityDissipation: 2,            // Default: 2 (higher = dissipates faster)
  
  // Pressure simulation strength
  pressure: 0.1,                     // Default: 0.1
  pressureIterations: 20,            // Default: 20 (more = smoother but slower)
  
  // Curl/vorticity effect strength
  curl: 3,                           // Default: 3 (0 = no vortices, 10 = very turbulent)
  
  // Splat/brush size
  splatRadius: 0.2,                  // Default: 0.2
  
  // Splat force/intensity
  splatForce: 6000,                  // Default: 6000 (higher = more intense)
  
  // Visual effects
  enableShading: true,               // Default: true (adds lighting effects)
  colorUpdateSpeed: 10,              // Default: 10 (how often colors change)
  backgroundColor: { r: 0.5, g: 0, b: 0 },  // RGB in 0-1 range
  transparent: true,                 // Default: true
  
  // Behavior
  disabled: false,                   // Default: false
  intensity: 1,                      // Default: 1
  followMouse: true,                 // Default: true
  autoColors: true                   // Default: true
});
```

## 🎯 Common Customizations

### High Performance (Mobile)
```javascript
new SmokeyCursor({
  simulationResolution: 64,
  dyeResolution: 512,
  densityDissipation: 5,
  velocityDissipation: 3,
  enableShading: false,
  pressureIterations: 10
});
```

### Max Quality (Desktop)
```javascript
new SmokeyCursor({
  simulationResolution: 256,
  dyeResolution: 2048,
  densityDissipation: 2,
  curl: 5,
  splatForce: 8000,
  enableShading: true,
  pressureIterations: 30
});
```

### Fire/Intense Effect
```javascript
new SmokeyCursor({
  curl: 10,
  splatForce: 12000,
  densityDissipation: 1.5,
  colorUpdateSpeed: 20,
  backgroundColor: { r: 0.8, g: 0.1, b: 0 }
});
```

### Subtle/Ambient
```javascript
new SmokeyCursor({
  splatRadius: 0.1,
  splatForce: 3000,
  densityDissipation: 8,
  velocityDissipation: 5,
  colorUpdateSpeed: 5
});
```

### Cool Blue Theme
```javascript
new SmokeyCursor({
  backgroundColor: { r: 0, g: 0.2, b: 0.8 },
  curl: 4,
  splatForce: 7000
});
```

### Purple/Pink Theme
```javascript
new SmokeyCursor({
  backgroundColor: { r: 0.7, g: 0, b: 0.7 },
  curl: 3,
  splatForce: 6000
});
```

## 🔧 Applying Custom Settings

To use custom settings, edit the script block in each HTML file:

**index.html (line ~706):**
```html
<script>
  new SmokeyCursor({
    // Your custom settings here
    simulationResolution: 256,  // Example: increase for better quality
    curl: 5                      // Example: increase swirl effect
  });
</script>
```

Repeat for other pages (about.html, portfolio.html, contact.html, service.html)

## 🎨 Color Format

Colors are specified as RGB objects with values from 0 to 1:

```javascript
// Red
{ r: 1.0, g: 0, b: 0 }

// Green
{ r: 0, g: 1.0, b: 0 }

// Blue
{ r: 0, g: 0, b: 1.0 }

// White
{ r: 1.0, g: 1.0, b: 1.0 }

// Gray
{ r: 0.5, g: 0.5, b: 0.5 }

// Purple
{ r: 0.8, g: 0, b: 0.8 }

// Orange
{ r: 1.0, g: 0.5, b: 0 }
```

## 📊 Performance Tips

1. **Desktop (High-end)**: Use higher resolutions and more pressure iterations
2. **Desktop (Standard)**: Keep default settings (current setup)
3. **Tablet**: Reduce dyeResolution to 1024, simulationResolution to 96
4. **Mobile**: Use performance profile
5. **Low-end devices**: Disable shading, reduce resolutions by 50%

Check browser DevTools (F12 → Performance tab) to monitor FPS.

## 🐛 Troubleshooting

**Canvas not showing?**
- Verify `smokeyCursor.js` is in the root directory
- Check browser console (F12) for WebGL errors
- Some browsers may have WebGL disabled

**Effects too subtle?**
- Increase `splatForce` (e.g., 8000-10000)
- Decrease `densityDissipation` (e.g., 2-3)
- Increase `curl` (e.g., 5-7)

**Performance issues?**
- Reduce `simulationResolution` and `dyeResolution`
- Set `enableShading: false`
- Reduce `pressureIterations` to 10

**Wrong colors?**
- Adjust `backgroundColor` values
- Increase `colorUpdateSpeed` for more frequent color changes

## 🎮 User Interaction

- **Mouse movement**: Leaves smoke trail where cursor moves
- **Mouse press/click**: Creates burst of color
- **Touch/drag**: Same as mouse (mobile support)
- **Touch tap**: Same as click

The effect automatically starts on first interaction and runs smoothly at 60+ FPS on modern devices.

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

Requires WebGL support (all modern browsers have this enabled).

## 🎓 Advanced Usage

### Disable on Specific Pages

If you want to disable it on a page, either:

1. Remove the script tags, or
2. Set `disabled: true`:

```javascript
new SmokeyCursor({
  disabled: true
});
```

### Update Settings Dynamically

Since each page initializes independently, you can modify the script for each page separately:

```javascript
// Different settings for each page:

// index.html - Intense/Portfolio style
new SmokeyCursor({ curl: 5, splatForce: 7000 });

// about.html - Subtle/Professional
new SmokeyCursor({ curl: 2, splatForce: 5000 });

// contact.html - Fun/Interactive
new SmokeyCursor({ curl: 8, splatForce: 9000 });
```

## 📝 Integration Summary

| Page | Script Added | Location |
|------|-------------|----------|
| index.html | ✓ | Line ~704 |
| about.html | ✓ | Line ~930 |
| portfolio.html | ✓ | Line ~800 |
| contact.html | ✓ | Line ~1057 |
| service.html | ✓ | Line ~350 |

---

**Enjoy your new Smokey Cursor effect!** 🎉

For questions or issues, check the configuration options above or refer to the browser console for WebGL errors.
