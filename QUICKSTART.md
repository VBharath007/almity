# Quick Start Guide - Three.js Virtual Background

## 🚀 Installation Complete!

Your Three.js virtual animation background is now configured and ready to use.

## Files Created

✅ **threeBackground.js** - Main animation engine
✅ **threeBackgroundConfig.js** - Configuration settings  
✅ **threeBackgroundStyles.css** - Styling and visual effects
✅ **threeBackgroundAdvanced.js** - Advanced customization examples
✅ **THREE_BG_README.md** - Full documentation

## What's Been Updated

✅ index.html - Canvas element & script includes
✅ portfolio.html - Canvas element & script includes (if applicable)
✅ Three.js library loaded from CDN
✅ Tailwind CSS integration ready

## 🎨 What You Get

- 300+ animated particles
- 5 rotating 3D geometric objects
- Interactive mouse/touch controls
- Dual-color lighting system (Red/Cyan)
- Responsive design for all devices
- Performance optimized

## 🔧 Basic Customization

### Change Primary Color

Open `threeBackgroundConfig.js` and find this section:

```javascript
pointLight1: {
    color: 0xE11D48,      // ← Change this hex value
    intensity: 1,
    distance: 150,
    position: { x: 30, y: 30, z: 30 }
}
```

Common colors:
- Red: `0xFF0000`
- Blue: `0x0000FF`
- Green: `0x00FF00`
- Purple: `0x800080`
- Orange: `0xFFA500`

### Adjust Speed

Find the geometries array and change `speed` values:

```javascript
geometries: [
    {
        type: 'icosahedron',
        speed: 0.005,  // ← Lower = slower, Higher = faster
    }
]
```

### Reduce for Mobile Performance

In `threeBackgroundConfig.js`:

```javascript
particles: {
    count: 150,  // Reduced from 300
}
performance: {
    pixelRatioMax: 1,  // Reduced from 2
    enableShadows: false  // Disable shadows
}
```

## 📝 Next Steps

1. **View the animation**: Open `index.html` in your browser
2. **Try customization**: Edit `threeBackgroundConfig.js`
3. **Add more effects**: Reference `threeBackgroundAdvanced.js`
4. **Full documentation**: Read `THREE_BG_README.md`

## ⚡ Performance Tips

- Desktop: Keep default settings (300 particles, shadows on)
- Tablet: Use 200 particles, shadows on
- Mobile: Use 100-150 particles, shadows off
- Old devices: Use 50 particles, minimal effects

## 🎯 Common Customizations

### Create a Tech-Inspired Look

In `threeBackgroundConfig.js`, replace the geometries array `colors` with:

```javascript
colors: [0x00A8E8, 0x6A4C93, 0x00D4FF]
```

Update point lights:

```javascript
pointLight1: { color: 0x00A8E8 },
pointLight2: { color: 0x6A4C93 }
```

### Create a Warm/Sunset Look

```javascript
colors: [0xFF7F50, 0xFF6347, 0xFFD700]

pointLight1: { color: 0xFF7F50 },
pointLight2: { color: 0xFF6347 }
```

### Make it More Static (Less Motion)

Change all speed values to smaller numbers:

```javascript
speed: 0.001,  // Even slower
```

### Make it More Dynamic (More Motion)

Change all speed values to larger numbers:

```javascript
speed: 0.02,  // Much faster
```

## 🐛 Troubleshooting

**Canvas not showing?**
- Check browser console (F12) for errors
- Ensure Three.js library is loading
- Verify canvas id is `virtual-bg-canvas`

**Performance issues?**
- Reduce particle count
- Disable shadows: `enableShadows: false`
- Reduce pixel ratio: `pixelRatioMax: 1`

**Colors not updating?**
- Reload the page after changes
- Remember to use hex format: `0xRRGGBB`
- Check for typos in color codes

## 📚 Documentation Structure

```
├── index.html                    (Updated with canvas & scripts)
├── portfolio.html                (Updated with canvas & scripts)
├── threeBackground.js            (Main engine)
├── threeBackgroundConfig.js      (Settings)
├── threeBackgroundStyles.css     (Styling)
├── threeBackgroundAdvanced.js    (Advanced examples)
├── THREE_BG_README.md            (Full documentation)
└── QUICKSTART.md                 (This file)
```

## 🎨 Advanced Features

For more advanced customization, see `threeBackgroundAdvanced.js`:

- Custom color schemes (Tech, Warm, Cool)
- Performance profiles (Quality levels)
- Time-based lighting (Day/Evening/Night)
- Interactive effects (Click to intensify)
- Custom geometry types (Torus, Cone, etc.)
- Animation speed profiles

## ✨ Pro Tips

1. **Gradual Transitions**: Save multiple color themes in config files
2. **Page-Specific**: Use different configs for different pages
3. **Seasonal Themes**: Use time-based configs to change with seasons
4. **Brand Matching**: Align colors with your brand palette
5. **Performance Monitoring**: Check FPS with browser DevTools

## 🔗 External Resources

- Three.js Documentation: https://threejs.org/docs/
- Three.js Examples: https://threejs.org/examples/
- Tailwind CSS: https://tailwindcss.com/

## 📞 Need Help?

1. Check `THREE_BG_README.md` for detailed documentation
2. Review `threeBackgroundAdvanced.js` for code examples
3. Inspect configuration comments in `threeBackgroundConfig.js`
4. Use browser DevTools to debug

---

**Happy customizing!** 🎉

Your Three.js background is ready to impress visitors with immersive 3D animations.
