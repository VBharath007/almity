/**
 * Three.js Virtual Background - Advanced Usage Guide
 * 
 * This file contains examples and patterns for advanced customization
 */

// ============================================================================
// EXAMPLE 1: Custom Color Scheme
// ============================================================================

const CustomColorScheme = {
    // Tech-inspired: Blue and Purple
    tech: {
        lights: {
            pointLight1: { color: 0x00A8E8 },  // Electric Blue
            pointLight2: { color: 0x6A4C93 }   // Purple
        },
        geometries: [
            { color: 0x00A8E8 },
            { color: 0x6A4C93 },
            { color: 0x00D4FF },
            { color: 0x7B68EE },
            { color: 0x4169E1 }
        ]
    },
    
    // Warm: Orange and Red
    warm: {
        lights: {
            pointLight1: { color: 0xFF7F50 },  // Coral
            pointLight2: { color: 0xFF6347 }   // Tomato
        },
        geometries: [
            { color: 0xFF7F50 },
            { color: 0xFF6347 },
            { color: 0xFFD700 },
            { color: 0xFF8C00 },
            { color: 0xDC143C }
        ]
    },
    
    // Cool: Cyan and Green
    cool: {
        lights: {
            pointLight1: { color: 0x00CED1 },  // Dark Turquoise
            pointLight2: { color: 0x32CD32 }   // Lime Green
        },
        geometries: [
            { color: 0x00CED1 },
            { color: 0x32CD32 },
            { color: 0x00FF00 },
            { color: 0x00FA9A },
            { color: 0x40E0D0 }
        ]
    }
};

// Usage in config:
// Copy your preferred color scheme and paste into threeBackgroundConfig.js


// ============================================================================
// EXAMPLE 2: Performance Profiles
// ============================================================================

const PerformanceProfiles = {
    // Maximum Quality (Desktop High-end)
    maxQuality: {
        particles: { count: 500 },
        performance: {
            pixelRatioMax: 3,
            enableShadows: true,
            shadowMapSize: 4096
        }
    },
    
    // High Quality (Desktop)
    high: {
        particles: { count: 300 },
        performance: {
            pixelRatioMax: 2,
            enableShadows: true,
            shadowMapSize: 2048
        }
    },
    
    // Medium Quality (Mobile Pro / Tablets)
    medium: {
        particles: { count: 200 },
        performance: {
            pixelRatioMax: 1.5,
            enableShadows: true,
            shadowMapSize: 1024
        }
    },
    
    // Low Quality (Mobile / Budget devices)
    low: {
        particles: { count: 100 },
        performance: {
            pixelRatioMax: 1,
            enableShadows: false,
            shadowMapSize: 512
        }
    },
    
    // Ultra Low (Very old devices)
    ultraLow: {
        particles: { count: 50 },
        performance: {
            pixelRatioMax: 1,
            enableShadows: false,
            shadowMapSize: 256
        }
    }
};


// ============================================================================
// EXAMPLE 3: Dynamic Configuration Switcher
// ============================================================================

class VirtualBGConfigSwitcher {
    constructor() {
        this.profiles = PerformanceProfiles;
        this.colorSchemes = CustomColorScheme;
        this.detectDevice();
    }
    
    detectDevice() {
        const isTouch = () => {
            return (('ontouchstart' in window) ||
                    (navigator.maxTouchPoints > 0) ||
                    (navigator.msMaxTouchPoints > 0));
        };
        
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );
        
        const isHighEnd = navigator.deviceMemory >= 8 || 
                         navigator.hardwareConcurrency >= 8;
        
        if (isMobile) {
            this.selectedProfile = isHighEnd ? 'medium' : 'low';
        } else {
            this.selectedProfile = isHighEnd ? 'high' : 'medium';
        }
        
        return {
            isMobile,
            isTouch,
            isHighEnd,
            selectedProfile: this.selectedProfile
        };
    }
    
    getOptimizedConfig() {
        return this.profiles[this.selectedProfile];
    }
    
    setColorScheme(schemeName) {
        return this.colorSchemes[schemeName];
    }
}


// ============================================================================
// EXAMPLE 4: Extended Geometry Types
// ============================================================================

const ExtendedGeometries = {
    // Torus - Doughnut shape
    torus: {
        create: function(material) {
            return new THREE.Mesh(
                new THREE.TorusGeometry(3, 1, 16, 32),
                material
            );
        },
        size: 3
    },
    
    // Torusknot - Complex knot
    torusknot: {
        create: function(material) {
            return new THREE.Mesh(
                new THREE.TorusKnotGeometry(2, 0.6, 100, 16),
                material
            );
        },
        size: 2
    },
    
    // Cone
    cone: {
        create: function(material) {
            return new THREE.Mesh(
                new THREE.ConeGeometry(3, 6, 32),
                material
            );
        },
        size: 3
    },
    
    // Cylinder
    cylinder: {
        create: function(material) {
            return new THREE.Mesh(
                new THREE.CylinderGeometry(2, 2, 4, 32),
                material
            );
        },
        size: 2
    },
    
    // Dodecahedron
    dodecahedron: {
        create: function(material) {
            return new THREE.Mesh(
                new THREE.DodecahedronGeometry(3, 0),
                material
            );
        },
        size: 3
    },
    
    // Lights & Soft Shadows effect
    pointsGeometry: {
        create: function(material) {
            const geometry = new THREE.BufferGeometry();
            const vertices = [];
            for (let i = 0; i < 100; i++) {
                vertices.push(
                    (Math.random() - 0.5) * 6,
                    (Math.random() - 0.5) * 6,
                    (Math.random() - 0.5) * 6
                );
            }
            geometry.setAttribute('position', 
                new THREE.BufferAttribute(new Float32Array(vertices), 3)
            );
            return new THREE.Points(geometry, material);
        }
    }
};


// ============================================================================
// EXAMPLE 5: Animation Profiles
// ============================================================================

const AnimationProfiles = {
    // Static - Minimal movement
    static: {
        geometries: [
            { speed: 0.001 },
            { speed: 0.0005 },
            { speed: 0.0008 },
            { speed: 0.0006 },
            { speed: 0.0007 }
        ],
        particles: { velocityRange: 0.1 }
    },
    
    // Slow - Subtle movement
    slow: {
        geometries: [
            { speed: 0.002 },
            { speed: 0.003 },
            { speed: 0.0025 },
            { speed: 0.002 },
            { speed: 0.0035 }
        ],
        particles: { velocityRange: 0.2 }
    },
    
    // Normal - Default motion (current)
    normal: {
        geometries: [
            { speed: 0.005 },
            { speed: 0.007 },
            { speed: 0.003 },
            { speed: 0.004 },
            { speed: 0.006 }
        ],
        particles: { velocityRange: 0.5 }
    },
    
    // Fast - Active movement
    fast: {
        geometries: [
            { speed: 0.015 },
            { speed: 0.020 },
            { speed: 0.010 },
            { speed: 0.012 },
            { speed: 0.018 }
        ],
        particles: { velocityRange: 1.0 }
    },
    
    // Chaotic - Maximum chaos
    chaotic: {
        geometries: [
            { speed: 0.04 },
            { speed: 0.05 },
            { speed: 0.03 },
            { speed: 0.035 },
            { speed: 0.045 }
        ],
        particles: { velocityRange: 2.0 }
    }
};


// ============================================================================
// EXAMPLE 6: Time-based Scene Transitions
// ============================================================================

class TimeBasedBackground {
    constructor(canvas = 'virtual-bg-canvas') {
        this.canvas = canvas;
        this.timeOfDay = 'day'; // 'day', 'evening', 'night'
        this.setupTimeBasedLighting();
    }
    
    timeBasedSchemes = {
        day: {
            backgroundColor: 0x05000a,
            lights: {
                ambientIntensity: 0.7,
                pointLight1Color: 0xE11D48,
                pointLight1Intensity: 1.2
            }
        },
        
        evening: {
            backgroundColor: 0x1a0014,
            lights: {
                ambientIntensity: 0.5,
                pointLight1Color: 0xFF6B35,
                pointLight1Intensity: 1.0
            }
        },
        
        night: {
            backgroundColor: 0x0a0010,
            lights: {
                ambientIntensity: 0.3,
                pointLight1Color: 0x00d4ff,
                pointLight1Intensity: 0.8
            }
        }
    };
    
    setupTimeBasedLighting() {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 12) {
            this.timeOfDay = 'day';
        } else if (hour >= 12 && hour < 18) {
            this.timeOfDay = 'day';
        } else if (hour >= 18 && hour < 21) {
            this.timeOfDay = 'evening';
        } else {
            this.timeOfDay = 'night';
        }
    }
    
    getTimeBasedConfig() {
        return this.timeBasedSchemes[this.timeOfDay];
    }
    
    getTimeOfDay() {
        return this.timeOfDay;
    }
}


// ============================================================================
// EXAMPLE 7: Event-driven Background Effects
// ============================================================================

class InteractiveBackgroundEffects {
    constructor(backgroundInstance) {
        this.bg = backgroundInstance;
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Click to intensify
        document.addEventListener('click', () => {
            this.intensifyLights();
        });
        
        // Scroll to adjust colors
        window.addEventListener('scroll', () => {
            this.adjustByScroll();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }
    
    intensifyLights() {
        // Temporarily increase light intensity
        if (this.bg.scene) {
            this.bg.scene.children.forEach(child => {
                if (child.isLight) {
                    const original = child.intensity;
                    child.intensity *= 1.5;
                    setTimeout(() => {
                        child.intensity = original;
                    }, 500);
                }
            });
        }
    }
    
    adjustByScroll() {
        const scrollPercent = window.scrollY / 
            (document.documentElement.scrollHeight - window.innerHeight);
        
        // Adjust particle opacity based on scroll
        if (this.bg.particles) {
            this.bg.particles.material.opacity = 0.5 + scrollPercent * 0.5;
        }
    }
    
    handleKeyboardShortcuts(e) {
        // 'P' - Toggle particles
        if (e.key === 'p' || e.key === 'P') {
            this.toggleParticles();
        }
        
        // 'G' - Toggle geometries
        if (e.key === 'g' || e.key === 'G') {
            this.toggleGeometries();
        }
        
        // 'L' - Toggle lights
        if (e.key === 'l' || e.key === 'L') {
            this.toggleLights();
        }
    }
    
    toggleParticles() {
        if (this.bg.particles) {
            this.bg.particles.visible = !this.bg.particles.visible;
        }
    }
    
    toggleGeometries() {
        this.bg.meshes?.forEach(mesh => {
            mesh.visible = !mesh.visible;
        });
    }
    
    toggleLights() {
        this.bg.scene?.children.forEach(child => {
            if (child.isLight) {
                child.visible = !child.visible;
            }
        });
    }
}


// ============================================================================
// EXAMPLE 8: Responsive Layout Helper
// ============================================================================

class ResponsiveBackgroundHelper {
    constructor() {
        this.setupMediaQueryListeners();
    }
    
    setupMediaQueryListeners() {
        // Mobile breakpoint
        const mobileQuery = window.matchMedia('(max-width: 768px)');
        mobileQuery.addListener((e) => {
            this.handleMobileChange(e.matches);
        });
        
        // Dark mode preference
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeQuery.addListener((e) => {
            this.handleDarkModeChange(e.matches);
        });
        
        // Reduced motion preference
        const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        reduceMotionQuery.addListener((e) => {
            this.handleReduceMotionChange(e.matches);
        });
    }
    
    handleMobileChange(isMobile) {
        console.log('Mobile view:', isMobile);
        // Adjust particle count or quality
    }
    
    handleDarkModeChange(isDarkMode) {
        console.log('Dark mode:', isDarkMode);
        // Adjust colors if needed
    }
    
    handleReduceMotionChange(reduceMotion) {
        console.log('Reduce motion preference:', reduceMotion);
        // Disable animations if user prefers reduced motion
    }
}


// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*

// EXAMPLE 1: Use color scheme
const config = CustomColorScheme.tech;
// Add to your threeBackgroundConfig.js

// EXAMPLE 2: Auto-detect and apply performance profile
const switcher = new VirtualBGConfigSwitcher();
const optimized = switcher.getOptimizedConfig();
// Merge with your config

// EXAMPLE 3: Time-based backgrounds
const timeBackground = new TimeBasedBackground();
console.log('Current lighting scheme:', timeBackground.getTimeOfDay());

// EXAMPLE 4: Add interactive effects
// Create background instance first, then add effects
// const effects = new InteractiveBackgroundEffects(backgroundInstance);

// EXAMPLE 5: Setup responsive layouts
const responsive = new ResponsiveBackgroundHelper();

*/

// ============================================================================
