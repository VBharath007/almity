# Anti-Gravity Background Effect

## Overview
Your background now features an **anti-gravity particle system** that creates a stunning floating effect. Particles defy gravity, float upward, and react to your mouse movements.

## Features
✨ **Floating Particles** - 120+ particles that float upward  
🎨 **Dynamic Colors** - Brand primary colors (#E11D48), cyan, purple, pink, blue  
🖱️ **Mouse Interaction** - Particles react and repel from cursor  
🌀 **Smooth Connections** - Subtle lines connect nearby particles  
📱 **Fully Responsive** - Adapts to all screen sizes  
⚡ **High Performance** - GPU-accelerated canvas rendering  

## Current Configuration (Index Page)

```javascript
new AntiGravityBackground('galaxy-canvas', {
  particleCount: 120,      // Number of floating particles
  gravity: -0.08,          // Negative = anti-gravity (upward float)
  friction: 0.97,          // Air resistance/damping
  maxVelocity: 2,          // Maximum particle speed
  mouseInfluence: 80       // Radius of mouse repulsion effect
});
```

## Customization

### Adjust Particle Count
More particles = more visual density (higher CPU usage)
```javascript
antiGravityBg.setParticleCount(200);  // Increase particles
```

### Control Anti-Gravity Strength
- **Negative value** = particles float upward (current: -0.08)
- **Positive value** = particles fall downward
- Smaller absolute value = slower vertical movement

```javascript
antiGravityBg.setGravity(-0.15);  // Stronger upward float
antiGravityBg.setGravity(-0.03);  // Slower upward float
```

### Mouse Interaction
Larger radius = cursor affects particles from further away

```javascript
antiGravityBg.setMouseInfluence(150);  // Stronger mouse repulsion
```

### Add Particles Dynamically
```javascript
antiGravityBg.addParticles(50);  // Add 50 new particles to scene
```

### Clear All Particles
```javascript
antiGravityBg.clear();  // Remove all particles
```

## Color Palette

The effect uses your brand colors:
- **Primary Red**: `rgba(225, 29, 72, 0.3)` (#E11D48)
- **Cyan**: `rgba(0, 212, 255, 0.2)`
- **Purple**: `rgba(139, 92, 246, 0.25)`
- **Pink**: `rgba(236, 72, 153, 0.2)`
- **Blue**: `rgba(59, 130, 246, 0.2)`

Modify in JavaScript or CSS to change the color scheme.

## Integration Points

### HTML Structure Required
```html
<canvas id="galaxy-canvas" class="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"></canvas>
```

### Script Loading Order
1. `antiGravityBackground.js` - Initializes particle system
2. `tubelightNavbar.js` - Adds bottom navigation
3. `script.js` - Your other scripts

## Performance Tips

1. **Reduce particle count** for older devices:
   ```javascript
   particleCount: 60  // Lower for mobile
   ```

2. **Increase friction** for less movement:
   ```javascript
   friction: 0.98  // Slightly higher = more static
   ```

3. **Decrease mouse influence** to reduce interactions:
   ```javascript
   mouseInfluence: 40  // Smaller radius
   ```

## Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Advanced Usage

### Access Global Instance
```javascript
// Auto-initialized globally as window.antiGravityBg
window.antiGravityBg.setGravity(-0.12);
window.antiGravityBg.addParticles(30);
```

### Listen to Particle Updates
The animation loop runs continuously via `requestAnimationFrame` for 60 FPS performance.

### Combine with Other Effects
The background works alongside:
- **Smokey Cursor** - Cursor trail effect
- **Tubelight Navbar** - Bottom navigation
- **Three.js Background** - 3D particle systems

## Troubleshooting

**Particles not visible?**
- Check canvas z-index is set to negative
- Verify `pointer-events: none` is set
- Clear browser cache

**Performance issues?**
- Reduce `particleCount` (try 60-80)
- Increase `friction` value
- Decrease `mouseInfluence` radius

**Too slow/fast?**
- Adjust `gravity` value (more negative = faster up)
- Change `maxVelocity` to limit speed

---

**Version**: 1.0  
**Created**: March 2026  
**Status**: Active on all pages
