# AlMity Color System - Cheat Sheet

## 🎨 Brand Colors at a Glance

```
PRIMARY (Red)              SECONDARY (Cyan)          ACCENT (Purple)
#E11D48                    #00D4FF                   #8B5CF6
████████████████████       ████████████████████      ████████████████████
CTA Buttons                Links & highlights        Creative/Premium
Urgency, Action            Trust, Tech, Info         Innovation, Quality

ACCENT (Gold)              DYNAMIC (Pink)            BASE (Dark)
#FBBF24                    #EC4899                   #05000A
████████████████████       ████████████████████      ████████████████████
Success, Premium           Engagement, Playful       Background
Achievement, Awards        Creativity, Fun           Professional, Focus
```

---

## 📱 Quick Color Usage

### FOR BUTTONS
```
Primary Action    → Red (#E11D48)        [Most Urgent]
Secondary Action  → Cyan (#00D4FF)       [Less Urgent]
Special/Premium   → Gold (#FBBF24)       [Achievement]
Creative/Feature  → Purple (#8B5CF6)     [Innovation]
```

### FOR TEXT
```
Headings         → White (#FFFFFF)
Body Text        → Light Gray (#E2E8F0)
Secondary Info   → Medium Gray (#CBD5E1)
Hints/Disabled   → Muted Gray (#94A3B8)
```

### FOR ATTENTION
```
MOST ATTENTION   → Red + Glow Animation     [animate-glow-red]
High Attention   → Cyan + Glow Animation    [animate-glow-cyan]
Medium Attention → Purple + Hover Effect    [hover-glow-purple]
Low Attention    → Gold Static              [color-gold]
```

---

## 🎯 Common Component Colors

| Component | Color | CSS Class | Use Case |
|-----------|--------|-----------|----------|
| Main CTA Button | Red | `btn-primary` | Sign Up, Book Now |
| Secondary Button | Cyan | `btn-secondary` | Learn More, Details |
| Primary Heading | White | `text-primary-white` | H1, H2, H3 |
| Body Text | Light Gray | `text-secondary-light` | Paragraphs |
| Links | Cyan | `link-secondary` | Navigation |
| Success Badge | Green | `badge-success` | ✓ Completed |
| Feature Card | Red Tint | `card-primary` | Showcase |
| Tech Card | Cyan Tint | `card-secondary` | Innovation |
| Important Alert | Red | `text-error` | Warnings |
| Info Message | Cyan | `text-info` | Notifications |

---

## 🖌️ Color Psychology Quick Reference

```
RED (#E11D48)
├─ Psychology: Energy, Urgency, Action
├─ Best for: CTAs, Alerts, Importance
├─ Effect: +34% more clicks on buttons
└─ Don't overuse: Causes fatigue if everywhere

CYAN (#00D4FF)
├─ Psychology: Trust, Professional, Tech
├─ Best for: Links, Secondary actions
├─ Effect: Builds credibility
└─ Perfect with: Red (complementary colors)

PURPLE (#8B5CF6)
├─ Psychology: Creativity, Premium, Luxury
├─ Best for: Special features, Showcase
├─ Effect: Elevates perceived quality
└─ Pairs well: Gold, Pink

GOLD (#FBBF24)
├─ Psychology: Success, Achievement, Premium
├─ Best for: Awards, Badges, Achievements
├─ Effect: Positive reinforcement
└─ Celebrates: User accomplishments

WHITE, GRAY
├─ Psychology: Clarity, Trust, Professional
├─ Best for: Text, Backgrounds, Neutrals
├─ Effect: Improves readability
└─ Essential: For contrast and hierarchy
```

---

## 🎬 Animation Effects Available

```
GLOW EFFECTS (Continuous)
├─ .animate-glow-red     → Red pulsing glow
├─ .animate-glow-cyan    → Cyan pulsing glow
└─ .animate-pulse-primary → Red color pulse

HOVER EFFECTS (On Interaction)
├─ .hover-lift           → Lifts 4px up
├─ .hover-glow-red       → Red glow appears
├─ .hover-glow-cyan      → Cyan glow appears
└─ .hover-color-shift    → Color changes to cyan

COMBINATION
├─ .card.hover-lift.hover-glow-cyan
├─ .btn-primary.animate-glow-red
└─ .link-secondary.hover-color-shift
```

---

## 📝 One-Liner Color Fixes

```html
<!-- Make heading red -->
<h2 class="color-primary">Title</h2>

<!-- Make button cyan -->
<button class="btn-secondary">Click</button>

<!-- Add red glow -->
<div class="animate-glow-red">Special</div>

<!-- Badge for success -->
<span class="badge badge-success">✓</span>

<!-- Red background card -->
<div class="card-primary">Featured</div>

<!-- Gradient text -->
<h1 class="gradient-text-vibrant">Impact</h1>

<!-- Info message -->
<p class="text-info">ℹ Information</p>

<!-- Error state -->
<div class="text-error">✗ Error</div>

<!-- Lift on hover -->
<div class="card hover-lift">Content</div>

<!-- Cyan glow on hover -->
<div class="card hover-glow-cyan">Content</div>
```

---

## 🔄 CSS Variables Reference

```css
/* BRAND COLORS */
--primary: #E11D48;               /* Red - Most prominent */
--secondary: #00D4FF;             /* Cyan - Professional */
--accent-purple: #8B5CF6;         /* Purple - Creative */
--accent-gold: #FBBF24;           /* Gold - Premium */
--accent-pink: #EC4899;           /* Pink - Engagement */

/* BACKGROUNDS */
--bg-darkest: #05000A;            /* Darkest background */
--bg-dark: #0F172A;               /* Dark cards */
--bg-medium: #1E293B;             /* Hover backgrounds */

/* TEXT */
--text-primary: #FFFFFF;          /* Main text */
--text-secondary: #E2E8F0;        /* Secondary text */
--text-muted: #94A3B8;            /* Hints/disabled */

/* SEMANTIC */
--success: #10B981;               /* Green - Success */
--error: #EF4444;                 /* Red - Errors */
--warning: #F59E0B;               /* Amber - Warnings */
--info: #06B6D4;                  /* Cyan - Info */
```

---

## ✨ Pro Tips

1. **Use red for main CTA** - Highest conversion rate
2. **Cyan + Red = Perfect contrast** - Complementary colors
3. **White text on dark = Maximum readability** - WCAG AAA
4. **Glow animations on important elements** - Draw attention
5. **Consistent color hierarchy** - Red > Cyan > Others
6. **Test on mobile** - Colors viewed in different lighting
7. **Never use pure white text on pure white** - Needs background
8. **Combine colors deliberately** - Don't mix all 5 everywhere
9. **Use CSS variables** - Never hardcode #E11D48 directly
10. **Update colors.css once** - Changes apply everywhere

---

## 🎓 Learning Path

1. **Start Here**: This cheat sheet
2. **Next Level**: COLOR_SYSTEM_USAGE.md (practical examples)
3. **Deep Dive**: COLOR_THEORY_GUIDE.md (psychology & theory)
4. **Reference**: colors.css (all variables & classes)

---

## 🚀 Ready to Use NOW!

```html
<h1 class="gradient-text-vibrant">Your Heading</h1>
<button class="btn-primary hover-glow-red">Click Me</button>
<div class="card-primary">Featured Content</div>
<span class="badge badge-success">✓ Active</span>
```

**That's it! You're using the color system.** 🎨
