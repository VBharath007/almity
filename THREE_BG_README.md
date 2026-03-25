# Three.js Virtual Background Animation

A sophisticated, interactive 3D background animation system built with Three.js, designed to provide an immersive visual experience for your portfolio website.

## Features

✨ **Interactive 3D Environment**
- Rotating geometric objects (icosahedron, octahedron, tetrahedron, box, sphere)
- Dynamic particle system with 300+ particles
- Real-time mouse/touch interaction
- Smooth animations and transitions

🎨 **Visual Effects**
- Multi-colored point lights (primary red/pink #E11D48 and cyan #00d4ff)
- PBR materials with metalness and roughness
- Fog effects for depth perception
- Shadow mapping for realism
- Emission effects on geometries

📱 **Responsive & Performant**
- Automatic responsive resizing
- Pixel ratio optimization for high DPI screens
- Performance settings for mobile devices
- WebGL renderer with anti-aliasing
- Fallback support for older browsers

🎛️ **Highly Customizable**
- Centralized configuration file (threeBackgroundConfig.js)
- Easy color customization
- Adjustable particle counts and speeds
- Configurable lighting and materials
- Tailwind CSS integration

## File Structure

```
index.html                         # Main page using the animation
portfolio.html                     # Portfolio page with animation
threeBackground.js                 # Main animation class
threeBackgroundConfig.js           # Configuration file
threeBackgroundStyles.css          # Styling and effects
```

## Installation & Setup

### 1. Include Three.js Library
The HTML files include Three.js from CDN:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

### 2. Add Canvas Element
In your HTML body (added after opening `<body>` tag):
```html
<canvas id="virtual-bg-canvas" class="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"></canvas>
```

### 3. Include CSS
In the `<head>` section:
```html
<link rel="stylesheet" href="threeBackgroundStyles.css">
```

### 4. Include Scripts
Before closing `</body>`:
```html
<script src="threeBackgroundConfig.js"></script>
<script src="threeBackground.js"></script>
```

## Configuration

All animation parameters can be customized in `threeBackgroundConfig.js`:

### Scene Configuration
```javascript
scene: {
    backgroundColor: 0x05000a,      // Dark background color
    fogColor: 0x05000a,
    fogNear: 100,
    fogFar: 1000
}
```

### Lighting
```javascript
lights: {
    pointLight1: {
        color: 0xE11D48,            // Primary color (red/pink)
        intensity: 1,
        distance: 150,
        position: { x: 30, y: 30, z: 30 }
    },
    pointLight2: {
        color: 0x00d4ff,            // Secondary color (cyan)
        intensity: 0.8,
        distance: 100,
        position: { x: -30, y: -30, z: 30 }
    }
}
```

### Particles
```javascript
particles: {
    count: 300,                      // Number of particles
    size: 0.5,                       // Particle size
    colors: [0xE11D48, 0x00d4ff],   // Particle colors
    spreadRadius: 200,               // Spread area
    velocityRange: 0.5               // Movement speed
}
```

### Geometries
```javascript
geometries: [
    {
        type: 'icosahedron',         // Type: icosahedron, octahedron, tetrahedron, box, sphere
        size: 5,                     // Size of the geometry
        position: [-30, 30, 0],      // X, Y, Z position
        color: 0xE11D48,             // Color in hex
        speed: 0.005,                // Rotation speed
        metalness: 0.7,
        roughness: 0.2,
        emissiveIntensity: 0.2
    }
]
```

### Interaction
```javascript
interaction: {
    enableMouse: true,
    mouseInfluence: 10,              // How much mouse affects objects
    enableTouch: true
}
```

### Performance
```javascript
performance: {
    pixelRatioMax: 2,
    enableShadows: true,
    shadowMapSize: 2048,
    shadowType: 'PCFShadow'
}
```

## Customization Examples

### Change Primary Color
Update the hex color values in `threeBackgroundConfig.js`:
```javascript
pointLight1: {
    color: 0xFF6B6B,  // Change to custom red
}
```

### Add More Particles
```javascript
particles: {
    count: 500,       // Increase from 300 to 500
}
```

### Adjust Rotation Speeds
```javascript
geometries: [
    {
        type: 'icosahedron',
        speed: 0.01,  // Faster rotation (was 0.005)
    }
]
```

### Disable Mouse Interaction
```javascript
interaction: {
    enableMouse: false,
}
```

### Reduce Motion for Accessibility
The CSS file includes media query support:
```css
@media (prefers-reduced-motion: reduce) {
    #virtual-bg-canvas {
        animation: none;
    }
}
```

## Styling Integration

The `threeBackgroundStyles.css` file includes:

- Canvas positioning and sizing
- Glass morphism effects for overlaid elements
- Fade-in animations for content
- Hover effects for cards
- Mobile optimization
- Accessibility features

### Adding Overlay Effects
To add a semi-transparent overlay over the background:
```html
<div class="virtual-bg-overlay"></div>
```

The CSS class is predefined and provides a subtle gradient overlay.

## Browser Compatibility

✅ **Supported:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

⚠️ **Performance Notes:**
- Desktop: Full quality recommended
- Mobile: Consider reducing particle count to 150-200 for better performance
- Older devices: Reduce shadow quality or disable shadows entirely

## Performance Optimization

### For Mobile Devices
Modify `threeBackgroundConfig.js`:
```javascript
particles: {
    count: 150,  // Reduce from 300
},
performance: {
    pixelRatioMax: 1,  // Reduce from 2 for mobile
    enableShadows: false  // Disable shadows on mobile
}
```

### For High-Performance Systems
```javascript
particles: {
    count: 500,
},
performance: {
    pixelRatioMax: 3,
    enableShadows: true,
    shadowMapSize: 4096
}
```

## API & Methods

### Initialize Custom Background
```javascript
const bg = new VirtualBackground('custom-canvas-id');
```

### Access Scene Elements
```javascript
const bg = new VirtualBackground();
bg.scene;        // Three.js scene
bg.camera;       // Three.js camera
bg.renderer;     // Three.js renderer
bg.particles;    // Particle system
bg.meshes;       // Array of geometric meshes
```

## Troubleshooting

### Canvas not rendering?
- Check that Three.js library is loaded
- Verify canvas element has correct id: `virtual-bg-canvas`
- Check browser console for errors
- Ensure CSS z-index values are correct

### Performance issues?
- Reduce particle count
- Disable shadows
- Reduce pixel ratio
- Lower shadow map size

### Colors not changing?
- Ensure you're using hex format (0xRRGGBB)
- Reload page to see changes
- Check console for errors

### Touch/mouse interaction not working?
- Set `enableMouse: true` in config
- Check that `pointer-events: none` is on canvas
- Verify interaction settings aren't disabled

## Integration with Existing CSS

The animation integrates seamlessly with:
- Tailwind CSS utility classes
- Existing dark theme (#05000a background)
- Glass morphism effects
- Responsive breakpoints
- Accessibility preferences

## Advanced Usage

### Custom Color Schemes
Create a modified config variant:
```javascript
// In HTML
<script src="threeBackgroundConfigCustom.js"></script>
<script src="threeBackground.js"></script>
```

### Multiple Backgrounds
You can create multiple instances on different pages:
```javascript
// Page 1
new VirtualBackground('canvas-page1');

// Page 2
new VirtualBackground('canvas-page2');
```

## Performance Metrics

Expected performance on modern devices:
- Desktop: 60 FPS sustained
- Mobile (high-end): 30-60 FPS
- Mobile (mid-range): 24-30 FPS
- Memory usage: 30-50 MB

## License

This implementation uses Three.js (MIT License)

## Support & Customization

For specific customization needs:
1. Modify `threeBackgroundConfig.js` for parameter changes
2. Update `threeBackground.js` for functionality changes
3. Edit `threeBackgroundStyles.css` for appearance changes
4. Add custom CSS classes to overlay elements

## Version Info

- Three.js: r128
- Tailwind CSS: 4.2.1
- Created: March 2026
