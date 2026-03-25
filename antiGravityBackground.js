/**
 * Anti-Gravity Background Effect
 * Creates floating particles that defy gravity with smooth animations
 */

class AntiGravityBackground {
  constructor(canvasId = 'galaxy-canvas', options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.warn('AntiGravityBackground: Canvas not found');
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;

    // Configuration
    this.particleCount = options.particleCount || 80;
    this.gravity = options.gravity || -0.1; // Negative = anti-gravity (upward)
    this.friction = options.friction || 0.98;
    this.maxVelocity = options.maxVelocity || 2;
    this.colors = options.colors || [
      'rgba(225, 29, 72, 0.3)',    // Primary red
      'rgba(0, 212, 255, 0.2)',     // Cyan
      'rgba(139, 92, 246, 0.25)',   // Purple
      'rgba(236, 72, 153, 0.2)',    // Pink
      'rgba(59, 130, 246, 0.2)'     // Blue
    ];

    this.particles = [];
    this.mousePos = { x: 0, y: 0 };
    this.mouseInfluence = options.mouseInfluence || 50;

    this.init();
  }

  init() {
    this.createParticles();
    this.attachEventListeners();
    this.animate();
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        mass: Math.random() * 1 + 0.5
      });
    }
  }

  attachEventListeners() {
    document.addEventListener('mousemove', (e) => {
      this.mousePos.x = e.clientX;
      this.mousePos.y = e.clientY;
    });

    window.addEventListener('resize', () => {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    });
  }

  updateParticle(particle) {
    // Anti-gravity force (upward)
    particle.vy += this.gravity;

    // Mouse repulsion
    const dx = particle.x - this.mousePos.x;
    const dy = particle.y - this.mousePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.mouseInfluence) {
      const angle = Math.atan2(dy, dx);
      const force = (this.mouseInfluence - distance) / this.mouseInfluence;
      particle.vx += Math.cos(angle) * force * 0.5;
      particle.vy += Math.sin(angle) * force * 0.5;
    }

    // Friction/damping
    particle.vx *= this.friction;
    particle.vy *= this.friction;

    // Limit velocity
    const speed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2);
    if (speed > this.maxVelocity) {
      particle.vx = (particle.vx / speed) * this.maxVelocity;
      particle.vy = (particle.vy / speed) * this.maxVelocity;
    }

    // Update position
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Wrap around screen
    if (particle.x < -10) particle.x = this.width + 10;
    if (particle.x > this.width + 10) particle.x = -10;
    if (particle.y < -10) particle.y = this.height + 10;
    if (particle.y > this.height + 10) particle.y = -10;
  }

  drawParticle(particle) {
    this.ctx.fillStyle = particle.color;
    this.ctx.globalAlpha = particle.opacity;
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    this.ctx.fill();

    // Glow effect
    this.ctx.strokeStyle = particle.color;
    this.ctx.lineWidth = 0.5;
    this.ctx.globalAlpha = particle.opacity * 0.5;
    this.ctx.stroke();
  }

  drawConnections() {
    this.ctx.globalAlpha = 0.1;
    this.ctx.strokeStyle = 'rgba(225, 29, 72, 0.5)';
    this.ctx.lineWidth = 1;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    // Clear with fade effect
    this.ctx.fillStyle = 'rgba(5, 0, 10, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Update and draw particles
    this.ctx.globalAlpha = 1;
    for (let particle of this.particles) {
      this.updateParticle(particle);
      this.drawParticle(particle);
    }

    // Draw connections
    this.drawConnections();

    requestAnimationFrame(() => this.animate());
  }

  // Public methods
  setParticleCount(count) {
    this.particles = [];
    this.particleCount = count;
    this.createParticles();
  }

  setGravity(value) {
    this.gravity = value;
  }

  setMouseInfluence(value) {
    this.mouseInfluence = value;
  }

  addParticles(count) {
    for (let i = 0; i < count; i++) {
      const newParticle = {
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        mass: Math.random() * 1 + 0.5
      };
      this.particles.push(newParticle);
    }
  }

  clear() {
    this.particles = [];
  }
}

// Auto-init if canvas exists
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('galaxy-canvas');
  if (canvas) {
    window.antiGravityBg = new AntiGravityBackground('galaxy-canvas', {
      particleCount: 120,
      gravity: -0.08,
      friction: 0.97,
      maxVelocity: 2,
      mouseInfluence: 80
    });
  }
});
