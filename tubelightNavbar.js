/**
 * Tubelight Navbar - Modern animated navigation with icon support
 * Vanilla JavaScript implementation
 */

class TubelightNavbar {
  constructor(options = {}) {
    this.items = options.items || [];
    this.containerSelector = options.container || 'body';
    this.position = options.position || 'bottom'; // 'top', 'bottom', 'floating'
    this.theme = options.theme || 'dark';
    this.animated = options.animated !== false;

    this.init();
  }

  init() {
    this.createStyles();
    this.createNavbar();
    this.attachEventListeners();
  }

  createStyles() {
    if (document.getElementById('tubelight-navbar-styles')) return;

    const style = document.createElement('style');
    style.id = 'tubelight-navbar-styles';
    style.textContent = `
      .tubelight-navbar {
        position: fixed;
        ${this.position === 'top' ? 'top: 0;' : this.position === 'bottom' ? 'bottom: 2rem;' : 'bottom: 2rem;'}
        left: 50%;
        transform: translateX(-50%);
        z-index: 40;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 1rem;
        background: rgba(15, 23, 42, 0.95);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 9999px;
        backdrop-filter: blur(20px);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        animation: slideIn 0.6s ease-out;
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }

      .tubelight-nav-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border-radius: 9999px;
        color: rgba(255, 255, 255, 0.6);
        text-decoration: none;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        white-space: nowrap;
      }

      .tubelight-nav-item:hover {
        color: rgba(255, 255, 255, 1);
      }

      .tubelight-nav-item.active {
        color: #E11D48;
        background: rgba(225, 29, 72, 0.2);
        box-shadow: 0 0 20px rgba(225, 29, 72, 0.4);
      }

      .tubelight-nav-item::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 9999px;
        background: linear-gradient(135deg, rgba(225, 29, 72, 0.5), rgba(0, 212, 255, 0.3));
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
      }

      .tubelight-nav-item:hover::before {
        opacity: 1;
      }

      .tubelight-nav-item.active::before {
        opacity: 1;
        box-shadow: inset 0 0 20px rgba(225, 29, 72, 0.3);
      }

      .tubelight-nav-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem;
        height: 1.25rem;
        font-size: 1.25rem;
      }

      .tubelight-nav-label {
        display: none;
      }

      @media (min-width: 640px) {
        .tubelight-nav-label {
          display: inline;
        }
      }

      /* Glow effect on active */
      @keyframes glow {
        0%, 100% {
          text-shadow: 0 0 10px rgba(225, 29, 72, 0.6);
        }
        50% {
          text-shadow: 0 0 20px rgba(225, 29, 72, 1);
        }
      }

      .tubelight-nav-item.active {
        animation: ${this.animated ? 'glow 2s ease-in-out infinite' : 'none'};
      }

      /* Responsive positioning */
      @media (max-width: 768px) {
        .tubelight-navbar {
          padding: 0.75rem;
          gap: 0.25rem;
        }

        .tubelight-nav-item {
          padding: 0.625rem 1rem;
        }
      }
    `;

    document.head.appendChild(style);
  }

  createNavbar() {
    const navbar = document.createElement('nav');
    navbar.className = 'tubelight-navbar';
    navbar.id = 'tubelight-navbar';

    this.items.forEach((item, index) => {
      const link = document.createElement('a');
      link.className = 'tubelight-nav-item';
      if (index === 0) link.classList.add('active');
      link.href = item.href || '#';
      link.setAttribute('data-index', index);

      // Icon
      if (item.icon) {
        const iconSpan = document.createElement('span');
        iconSpan.className = 'tubelight-nav-icon';
        iconSpan.innerHTML = this.renderIcon(item.icon);
        link.appendChild(iconSpan);
      }

      // Label
      if (item.label) {
        const labelSpan = document.createElement('span');
        labelSpan.className = 'tubelight-nav-label';
        labelSpan.textContent = item.label;
        link.appendChild(labelSpan);
      }

      link.addEventListener('click', (e) => {
        if (item.href === '#') e.preventDefault();
        this.setActive(index);
        if (item.onClick) item.onClick(e);
      });

      navbar.appendChild(link);
    });

    document.body.appendChild(navbar);
    this.navbar = navbar;
  }

  renderIcon(icon) {
    // Support for icon names (string) or SVG/HTML
    if (typeof icon === 'string') {
      // FontAwesome icon
      if (icon.startsWith('fa-')) {
        return `<i class="fas ${icon}"></i>`;
      }
      // Material icons
      if (icon.startsWith('material-')) {
        const name = icon.replace('material-', '');
        return `<span class="material-symbols-outlined">${name}</span>`;
      }
      // Fallback: render as HTML
      return icon;
    }
    return icon || '';
  }

  setActive(index) {
    const items = this.navbar.querySelectorAll('.tubelight-nav-item');
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }

  attachEventListeners() {
    // Smooth scroll for anchor links
    this.navbar.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.hash) {
        const target = document.querySelector(link.hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  addItem(item) {
    this.items.push(item);
    this.navbar.innerHTML = '';
    this.createNavbar();
  }

  removeItem(index) {
    this.items.splice(index, 1);
    this.navbar.innerHTML = '';
    this.createNavbar();
  }

  updatePosition(position) {
    this.position = position;
    this.createStyles();
  }
}

// Auto-init if data attribute present
document.addEventListener('DOMContentLoaded', () => {
  const navElement = document.querySelector('[data-tubelight-navbar]');
  if (navElement) {
    const config = JSON.parse(navElement.dataset.tubelightNavbar || '{}');
    new TubelightNavbar(config);
  }
});
