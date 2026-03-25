/**
 * Three.js Interactive Background Animation
 * Creates an immersive virtual environment with particles, geometries, and lighting
 */

class VirtualBackground {
    constructor(canvasId = 'virtual-bg-canvas') {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error(`Canvas with id "${canvasId}" not found`);
            return;
        }

        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x05000a);
        this.scene.fog = new THREE.Fog(0x05000a, 100, 1000);

        // Camera setup with proper aspect ratio
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.width / this.height,
            0.1,
            2000
        );
        this.camera.position.z = 50;

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowShadowMap;

        // Initialize components
        this.initLights();
        this.createParticles();
        this.createGeometries();
        this.setupInteraction();
        this.setupResize();
        this.animate();
    }

    initLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // Point lights with colors
        const pointLight1 = new THREE.PointLight(0xE11D48, 1, 150);
        pointLight1.position.set(30, 30, 30);
        pointLight1.castShadow = true;
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x00d4ff, 0.8, 100);
        pointLight2.position.set(-30, -30, 30);
        pointLight2.castShadow = true;
        this.scene.add(pointLight2);

        // Directional light
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.3);
        dirLight.position.set(50, 50, 50);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        this.scene.add(dirLight);
    }

    createParticles() {
        const particleCount = 300;
        const geometry = new THREE.BufferGeometry();

        // Create positions and colors
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        const primaryColor = new THREE.Color(0xE11D48);
        const secondaryColor = new THREE.Color(0x00d4ff);

        for (let i = 0; i < particleCount * 3; i += 3) {
            // Position
            positions[i] = (Math.random() - 0.5) * 200;
            positions[i + 1] = (Math.random() - 0.5) * 200;
            positions[i + 2] = (Math.random() - 0.5) * 200;

            // Velocity
            velocities[i] = (Math.random() - 0.5) * 0.5;
            velocities[i + 1] = (Math.random() - 0.5) * 0.5;
            velocities[i + 2] = (Math.random() - 0.5) * 0.5;

            // Color
            const color = Math.random() > 0.5 ? primaryColor : secondaryColor;
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Material
        const material = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            transparent: true,
            sizeAttenuation: true,
            fog: false
        });

        this.particles = new THREE.Points(geometry, material);
        this.particleVelocities = velocities;
        this.scene.add(this.particles);
    }

    createGeometries() {
        const geometries = [
            {
                type: 'icosahedron',
                size: 5,
                position: [-30, 30, 0],
                color: 0xE11D48,
                speed: 0.005
            },
            {
                type: 'octahedron',
                size: 4,
                position: [30, -25, 0],
                color: 0x00d4ff,
                speed: 0.007
            },
            {
                type: 'tetrahedron',
                size: 3,
                position: [0, 0, -30],
                color: 0x7c3aed,
                speed: 0.003
            },
            {
                type: 'box',
                size: 3,
                position: [-25, -30, 20],
                color: 0x06b6d4,
                speed: 0.004
            },
            {
                type: 'sphere',
                size: 4,
                position: [35, 20, -20],
                color: 0xf43f5e,
                speed: 0.006
            }
        ];

        this.meshes = [];
        geometries.forEach(config => {
            let geometry;
            switch (config.type) {
                case 'icosahedron':
                    geometry = new THREE.IcosahedronGeometry(config.size, 4);
                    break;
                case 'octahedron':
                    geometry = new THREE.OctahedronGeometry(config.size, 2);
                    break;
                case 'tetrahedron':
                    geometry = new THREE.TetrahedronGeometry(config.size, 0);
                    break;
                case 'box':
                    geometry = new THREE.BoxGeometry(config.size, config.size, config.size);
                    break;
                case 'sphere':
                    geometry = new THREE.SphereGeometry(config.size, 32, 32);
                    break;
            }

            const material = new THREE.MeshStandardMaterial({
                color: config.color,
                metalness: 0.7,
                roughness: 0.2,
                emissive: config.color,
                emissiveIntensity: 0.2
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(...config.position);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.userData = {
                rotationSpeed: config.speed,
                originalPosition: [...config.position]
            };

            this.scene.add(mesh);
            this.meshes.push(mesh);
        });
    }

    setupInteraction() {
        this.mouse = new THREE.Vector2(0, 0);
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / this.width) * 2 - 1;
            this.mouse.y = -(e.clientY / this.height) * 2 + 1;
        });

        // Touch support
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.mouse.x = (e.touches[0].clientX / this.width) * 2 - 1;
                this.mouse.y = -(e.touches[0].clientY / this.height) * 2 + 1;
            }
        });
    }

    setupResize() {
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.width, this.height);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Update particles
        if (this.particles) {
            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += this.particleVelocities[i];
                positions[i + 1] += this.particleVelocities[i + 1];
                positions[i + 2] += this.particleVelocities[i + 2];

                // Bounce particles
                if (Math.abs(positions[i]) > 100) this.particleVelocities[i] *= -1;
                if (Math.abs(positions[i + 1]) > 100) this.particleVelocities[i + 1] *= -1;
                if (Math.abs(positions[i + 2]) > 100) this.particleVelocities[i + 2] *= -1;
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }

        // Update geometries
        this.meshes.forEach(mesh => {
            mesh.rotation.x += mesh.userData.rotationSpeed;
            mesh.rotation.y += mesh.userData.rotationSpeed * 0.7;
            mesh.rotation.z += mesh.userData.rotationSpeed * 0.5;

            // Subtle movement based on mouse
            mesh.position.x = mesh.userData.originalPosition[0] + this.mouse.x * 10;
            mesh.position.y = mesh.userData.originalPosition[1] + this.mouse.y * 10;
        });

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new VirtualBackground('virtual-bg-canvas');
    });
} else {
    new VirtualBackground('virtual-bg-canvas');
}
