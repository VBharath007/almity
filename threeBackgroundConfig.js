/**
 * Three.js Background Configuration
 * Customize animation parameters, colors, and behavior
 */

const VirtualBGConfig = {
    // Canvas Settings
    canvas: {
        id: 'virtual-bg-canvas',
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
    },

    // Scene Settings
    scene: {
        backgroundColor: 0x05000a,
        fogColor: 0x05000a,
        fogNear: 100,
        fogFar: 1000
    },

    // Camera Settings
    camera: {
        fov: 75,
        near: 0.1,
        far: 2000,
        positionZ: 50
    },

    // Lighting Configuration
    lights: {
        ambient: {
            color: 0xffffff,
            intensity: 0.5
        },
        pointLight1: {
            color: 0xE11D48,      // Primary red/pink
            intensity: 1,
            distance: 150,
            position: { x: 30, y: 30, z: 30 }
        },
        pointLight2: {
            color: 0x00d4ff,      // Cyan
            intensity: 0.8,
            distance: 100,
            position: { x: -30, y: -30, z: 30 }
        },
        directionalLight: {
            color: 0xffffff,
            intensity: 0.3,
            position: { x: 50, y: 50, z: 50 }
        }
    },

    // Particle System Configuration
    particles: {
        count: 300,
        size: 0.5,
        colors: [0xE11D48, 0x00d4ff],
        spreadRadius: 200,
        velocityRange: 0.5,
        transparent: true,
        vertexColors: true
    },

    // Geometry Objects Configuration
    geometries: [
        {
            type: 'icosahedron',
            size: 5,
            position: [-30, 30, 0],
            color: 0xE11D48,
            speed: 0.005,
            metalness: 0.7,
            roughness: 0.2,
            emissiveIntensity: 0.2
        },
        {
            type: 'octahedron',
            size: 4,
            position: [30, -25, 0],
            color: 0x00d4ff,
            speed: 0.007,
            metalness: 0.7,
            roughness: 0.2,
            emissiveIntensity: 0.2
        },
        {
            type: 'tetrahedron',
            size: 3,
            position: [0, 0, -30],
            color: 0x7c3aed,
            speed: 0.003,
            metalness: 0.7,
            roughness: 0.2,
            emissiveIntensity: 0.2
        },
        {
            type: 'box',
            size: 3,
            position: [-25, -30, 20],
            color: 0x06b6d4,
            speed: 0.004,
            metalness: 0.7,
            roughness: 0.2,
            emissiveIntensity: 0.2
        },
        {
            type: 'sphere',
            size: 4,
            position: [35, 20, -20],
            color: 0xf43f5e,
            speed: 0.006,
            metalness: 0.7,
            roughness: 0.2,
            emissiveIntensity: 0.2
        }
    ],

    // Interaction Settings
    interaction: {
        enableMouse: true,
        mouseInfluence: 10,      // How much mouse movement affects objects
        enableTouch: true
    },

    // Performance Settings
    performance: {
        pixelRatioMax: 2,        // Max pixel ratio for high DPI screens
        enableShadows: true,
        shadowMapSize: 2048,
        shadowType: 'PCFShadow'  // PCFShadow or PCFSoftShadow
    },

    // Animation Settings
    animation: {
        particleBounceRadius: 100,
        geometryMovementSmoothing: 0.1,
        enableAutoRotation: true
    }
};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VirtualBGConfig;
}
