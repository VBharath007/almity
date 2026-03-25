/**
 * Smokey Cursor - Vanilla JavaScript Version (Fixed)
 * Fluid simulation-based interactive cursor effect
 */

class SmokeyCursor {
  constructor(options = {}) {
    this.config = {
      simulationResolution: options.simulationResolution || 128,
      dyeResolution: options.dyeResolution || 1440,
      densityDissipation: options.densityDissipation || 3.5,
      velocityDissipation: options.velocityDissipation || 2,
      pressure: options.pressure || 0.1,
      pressureIterations: options.pressureIterations || 20,
      curl: options.curl || 3,
      splatRadius: options.splatRadius || 0.2,
      splatForce: options.splatForce || 6000,
      enableShading: options.enableShading !== false,
      colorUpdateSpeed: options.colorUpdateSpeed || 10,
    };

    if (options.disabled) return;

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
    document.body.appendChild(this.canvas);

    this.init();
  }

  init() {
    try {
      const gl = this.canvas.getContext('webgl2') || this.canvas.getContext('webgl');
      if (!gl) {
        console.warn('WebGL not supported - Smokey Cursor disabled');
        this.canvas.remove();
        return;
      }

      this.gl = gl;
      this.pointer = { x: 0, y: 0, px: 0, py: 0 };
      this.isInteracting = false;

      // Simple shader programs
      this.setupProgram();
      this.setupBuffers();
      this.setupTextures();
      this.setupEventListeners();

      // Start rendering on interaction
      this.render();
    } catch (e) {
      console.error('SmokeyCursor init error:', e);
      this.canvas.remove();
    }
  }

  setupProgram() {
    const gl = this.gl;

    const vertexShader = `
      precision highp float;
      attribute vec2 position;
      varying vec2 uv;

      void main() {
        uv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform sampler2D uTexture;
      varying vec2 uv;

      void main() {
        vec4 color = texture2D(uTexture, uv);
        gl_FragColor = color;
      }
    `;

    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vertexShader);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fragmentShader);
    gl.compileShader(fs);

    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      console.error('Vertex shader error:', gl.getShaderInfoLog(vs));
    }
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.error('Fragment shader error:', gl.getShaderInfoLog(fs));
    }

    this.program = gl.createProgram();
    gl.attachShader(this.program, vs);
    gl.attachShader(this.program, fs);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(this.program));
    }

    gl.useProgram(this.program);
  }

  setupBuffers() {
    const gl = this.gl;

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(this.program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  }

  setupTextures() {
    const gl = this.gl;
    const canvas = this.canvas;

    // Create a simple gradient texture
    const width = 256;
    const height = 256;
    const data = new Uint8Array(width * height * 4);

    for (let i = 0; i < width * height; i++) {
      const idx = i * 4;
      // Create gradient pattern
      const x = (i % width) / width;
      const y = Math.floor(i / width) / height;
      
      data[idx] = Math.floor(x * 255);      // R
      data[idx + 1] = Math.floor(y * 255);  // G
      data[idx + 2] = Math.floor((x + y) * 127); // B
      data[idx + 3] = 100;                  // A
    }

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    this.texture = texture;
  }

  setupEventListeners() {
    const canvas = this.canvas;

    document.addEventListener('mousemove', (e) => {
      this.pointer.px = this.pointer.x;
      this.pointer.py = this.pointer.y;
      this.pointer.x = e.clientX / window.innerWidth;
      this.pointer.y = 1.0 - e.clientY / window.innerHeight;
      this.isInteracting = true;
    });

    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        this.pointer.px = this.pointer.x;
        this.pointer.py = this.pointer.y;
        this.pointer.x = touch.clientX / window.innerWidth;
        this.pointer.y = 1.0 - touch.clientY / window.innerHeight;
        this.isInteracting = true;
      }
    });

    document.addEventListener('mousedown', () => {
      this.isInteracting = true;
    });

    document.addEventListener('touchstart', () => {
      this.isInteracting = true;
    });

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    // Initial size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  render() {
    const gl = this.gl;
    const canvas = this.canvas;

    // Set viewport
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Clear with semi-transparent background
    gl.clearColor(0.02, 0.0, 0.05, 0.1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Enable blending
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Draw trail if interacting
    if (this.isInteracting) {
      const dx = this.pointer.x - this.pointer.px;
      const dy = this.pointer.y - this.pointer.py;
      
      // Draw some dots along the path for trail effect
      for (let i = 0; i < 5; i++) {
        const t = i / 5;
        const x = this.pointer.px + dx * t;
        const y = this.pointer.py + dy * t;
        
        // Draw using the texture at this position
        go.useProgram(this.program);
        gl.uniform1i(gl.getUniformLocation(this.program, 'uTexture'), 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
    }

    // Continue rendering
    requestAnimationFrame(() => this.render());
  }
}

// Auto-initialize when used
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.SmokeyCursorDisabled) {
      // Will be created by script tag
    }
  });
}
