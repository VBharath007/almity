# Tubelight Navbar - Implementation Guide

## Overview
The **Tubelight Navbar** is a modern, animated bottom navigation component with icon support. It features:
- ✨ Smooth animations with glow effects
- 🎨 Glass-morphism design
- 📱 Fully responsive (icons only on mobile, icons + labels on desktop)
- 🎯 Active state highlighting
- 🌐 Material Icons support
- ⚡ Vanilla JavaScript (no dependencies)

## Usage

### 1. Include the Script
```html
<script src="tubelightNavbar.js"></script>
```

### 2. Initialize with Configuration
```javascript
const navItems = [
    { label: 'Home', href: '#home', icon: 'material-home' },
    { label: 'About', href: '#about', icon: 'material-info' },
    { label: 'Services', href: '#services', icon: 'material-design_services' },
    { label: 'Portfolio', href: '#portfolio', icon: 'material-work' },
    { label: 'Contact', href: '#contact', icon: 'material-mail' }
];

new TubelightNavbar({
    items: navItems,
    position: 'bottom',      // 'top', 'bottom', or 'floating'
    theme: 'dark',           // 'dark' or 'light'
    animated: true           // Enable glow animation
});
```

## Configuration Options

### Items Array
```javascript
{
    label: 'Home',              // Text label (hidden on mobile)
    href: '#home',              // URL or anchor
    icon: 'material-home',      // Icon name or HTML
    onClick: function(e) {}     // Optional callback
}
```

### Navbar Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `items` | Array | `[]` | Navigation items |
| `position` | String | `'bottom'` | `'top'` or `'bottom'` |
| `theme` | String | `'dark'` | `'dark'` or `'light'` |
| `animated` | Boolean | `true` | Enable glow animation |
| `container` | String | `'body'` | Container selector |

## Icon Support

### Material Icons
Use `material-` prefix with Material Symbols name:
- `material-home`
- `material-work`
- `material-mail`
- `material-settings`
- [Full list](https://fonts.google.com/icons)

### FontAwesome Icons
Use `fa-` prefix:
- `fa-home`
- `fa-briefcase`
- `fa-envelope`

### Custom HTML
Pass raw HTML strings:
```javascript
{ label: 'Custom', href: '#', icon: '<svg>...</svg>' }
```

## Methods

### Set Active Item
```javascript
navbar.setActive(index);  // Set nav item at specific index
```

### Add Item
```javascript
navbar.addItem({
    label: 'New Page',
    href: '#new',
    icon: 'material-new_item'
});
```

### Remove Item
```javascript
navbar.removeItem(2);  // Remove item at index 2
```

### Update Position
```javascript
navbar.updatePosition('top');
```

## Styling

The navbar uses CSS custom properties for easy customization:

```css
:root {
    --tubelight-primary: #E11D48;
    --tubelight-bg: rgba(15, 23, 42, 0.95);
    --tubelight-text: rgba(255, 255, 255, 0.6);
    --tubelight-glow: rgba(225, 29, 72, 0.4);
}
```

Override in your stylesheet:
```css
.tubelight-navbar {
    padding: 1.5rem !important;
    gap: 1rem !important;
}

.tubelight-nav-item.active {
    background: #E11D48 !important;
}
```

## Responsive Behavior

- **Desktop (640px+)**: Icon + Label displayed
- **Mobile (< 640px)**: Icon only displayed
- **Automatic**: Position adjusts for keyboard visibility on mobile

## Examples

### Anchor Link Navigation
```javascript
const items = [
    { label: 'Section 1', href: '#section1', icon: 'material-article' },
    { label: 'Section 2', href: '#section2', icon: 'material-description' }
];
```

### Page Links
```javascript
const items = [
    { label: 'Home', href: 'index.html', icon: 'material-home' },
    { label: 'About', href: 'about.html', icon: 'material-info' }
];
```

### With Callbacks
```javascript
const items = [
    {
        label: 'Contact',
        href: '#',
        icon: 'material-mail',
        onClick: (e) => {
            e.preventDefault();
            openContactModal();
        }
    }
];
```

## Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Navbar not visible
- Check if `display: none` applied by other CSS
- Verify z-index is high enough (`z-index: 40`)
- Ensure `tubelightNavbar.js` is loaded before initialization

### Icons not showing
- Verify Material Symbols font is loaded
- Check FontAwesome CDN if using FontAwesome icons
- Test icon name in browser console

### Animation not smooth
- Check if animations are disabled in system preferences
- Verify GPU acceleration is enabled
- Clear browser cache

## Integration with Existing Code
The navbar works alongside your existing navigation. You can:
1. Keep the top navbar for branding
2. Use Tubelight Navbar as supplementary navigation
3. Hide top navbar on scroll and show Tubelight Navbar
4. Use both on different pages

---

**Created:** March 2026  
**Version:** 1.0  
**License:** MIT
