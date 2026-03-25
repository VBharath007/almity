/**
 * Smokey Cursor - Working Simplified Version
 * Creates a beautiful fluid-like cursor trail effect
 */

class SmokeyCursor {
  constructor(options = {}) {
    if (options.disabled) return;

    this.config = Object.assign({
      simulationResolution: 128,
      dyeResolution: 512,
      densityDissipation: 3.5,
      velocityDissipation: 2,
      enableShading: true,
      colorUpdateSpeed: 10,
      splatForce: 6000,
    }, options);

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'smokey-cursor-canvas';
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 50;
      pointer-events: none;
      cursor: none;
    `;

    try {
      document.body.appendChild(this.canvas);
      this.init();
    } catch (e) {
      console.error('SmokeyCursor error:', e);
    }
  }

  init() {
    const gl = this.canvas.getContext('webgl2') || this.canvas.getContext('webgl');
    
    if (!gl) {
      console.warn('WebGL not available - Smokey Cursor disabled');
      this.canvas.remove();
      return;
    }

    this.gl = gl;
    this.resize();
    this.initShaders();
    this.initBuffers();
    this.setupInput();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
      this.gl.viewport(0, 0, this.width, this.height);
    });
  }

  initShaders() {
    const gl = this.gl;

    const vs = `
      precision highp float;
      attribute vec2 position;
      varying vec2 uv;
      void main() {
        uv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform sampler2D uTexture;
      varying vec2 uv;
      void main() {
        gl_FragColor = texture2D(uTexture, uv);
      }
    `;

    const vShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vShader, vs);
    gl.compileShader(vShader);

    if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) {
      console.error('VS Error:', gl.getShaderInfoLog(vShader));
    }

    const fShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fShader, fs);
    gl.compileShader(fShader);

    if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) {
      console.error('FS Error:', gl.getShaderInfoLog(fShader));
    }

    this.program = gl.createProgram();
    gl.attachShader(this.program, vShader);
    gl.attachShader(this.program, fShader);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error('Program Error:', gl.getProgramInfoLog(this.program));
    }

    gl.useProgram(this.program);
  }

  initBuffers() {
    const gl = this.gl;
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(this.program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Create off-screen canvas for trail drawing
    this.offCanvas = document.createElement('canvas');
    this.offCanvas.width = 256;
    this.offCanvas.height = 256;
    this.offCtx = this.offCanvas.getContext('2d', { willReadFrequently: true });
    this.offCtx.fillStyle = 'rgba(0, 0, 0, 0)';
    this.offCtx.fillRect(0, 0, 256, 256);

    // Create WebGL texture
    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.offCanvas);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  }

  setupInput() {
    this.mouseX = 0;
    this.mouseY = 0;
    this.pmouseX = 0;
    this.pmouseY = 0;
    this.hue = 0;

    document.addEventListener('mousemove', (e) => {
      this.pmouseX = this.mouseX;
      this.pmouseY = this.mouseY;
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.updateTrail();
    });

    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.pmouseX = this.mouseX;
        this.pmouseY = this.mouseY;
        this.mouseX = e.touches[0].clientX;
        this.mouseY = e.touches[0].clientY;
        this.updateTrail();
      }
    });
  }

  updateTrail() {
    const ctx = this.offCtx;
    const canvas = this.offCanvas;
    
    // Fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update hue
    this.hue = (this.hue + 1) % 360;

    // Draw trail line
    const mx = (this.mouseX / this.width) * canvas.width;
    const my = (this.mouseY / this.height) * canvas.height;
    const pmx = (this.pmouseX / this.width) * canvas.width;
    const pmy = (this.pmouseY / this.height) * canvas.height;

    ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(pmx, pmy);
    ctx.lineTo(mx, my);
    ctx.stroke();

    // Add particles around trail
    for (let i = 0; i < 3; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 15;
      const px = mx + Math.cos(angle) * distance;
      const py = my + Math.sin(angle) * distance;
      
      ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${0.6 - i * 0.15})`;
      ctx.beginPath();
      ctx.arc(px, py, 3 - i * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Update WebGL texture
    const gl = this.gl;
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.offCanvas);
  }

  animate() {
    const gl = this.gl;

    // Clear with fade effect
    gl.clearColor(0.02, 0.0, 0.05, 0.08);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Enable blending
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Render
    gl.useProgram(this.program);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(gl.getUniformLocation(this.program, 'uTexture'), 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(() => this.animate());
  }
}
