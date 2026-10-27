/**
 * WA-1 Portfolio Website - Core JavaScript Interactions
 * Pure Vanilla JavaScript (ES6+) with zero dependencies
 * 
 * Features:
 * - Theme Switcher (Dark/Light mode with localStorage persistence)
 * - Mobile Navigation Drawer Toggle & Escape handler
 * - Active Navigation Highlighting (IntersectionObserver Scrollspy)
 * - Project Category Filter System
 * - Interactive Project Architecture Inspector Modal
 * - One-Click Email Copy to Clipboard with Toast Notification
 * - Client-Side Contact Form Validation & Submission Emulation
 * - Header Scroll Elevation & Dynamic Year Stamp
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Data Store for Detailed Project Inspect Modals
  // -------------------------------------------------------------------------
  const projectDetails = [
    {
      title: "DevMetrics Pro — Telemetry & Analytics Dashboard",
      tag: "Full-Stack Platform",
      overview: "A developer-first monitoring system created to stream high-frequency system telemetry, error spikes, and API throughput metrics with sub-millisecond response latency.",
      architecture: [
        "Lightweight server ingestion daemon built with Node.js and Express.",
        "Real-time interactive SVG canvas plotting 1,000+ data points smoothly at 60 FPS.",
        "Client-side aggregation logic calculating P95 and P99 latency percentiles.",
        "Dark-mode optimized color palette tailored for command centers."
      ],
      tech: ["JavaScript ES6+", "Node.js", "Express", "RESTful API", "Chart.js", "CSS Grid"],
      repoLink: "https://github.com/Priyanshu-Mohite/Valentius-Kryptix-",
      demoLink: "#"
    },
    {
      title: "KryptixPay — Multi-Currency Payment Terminal",
      tag: "Fintech Interface",
      overview: "A sleek, responsive financial checkout application supporting real-time currency conversions, simulated card payment tokens, and cryptographic verification badges.",
      architecture: [
        "Dynamic currency exchange calculations with live rate caching.",
        "Credit card formatting and Luhn algorithm validation in pure JavaScript.",
        "Glassmorphism UI design with backdrop filters and zero CSS framework bloat.",
        "Accessible form controls complying with WCAG 2.1 AA standards."
      ],
      tech: ["HTML5 Semantics", "CSS Glassmorphism", "Vanilla JS", "Crypto API", "Flexbox"],
      repoLink: "https://github.com/Priyanshu-Mohite/Valentius-Kryptix-",
      demoLink: "#"
    },
    {
      title: "PromptFlow AI — Visual Agent Workspace",
      tag: "Developer Tool / AI",
      overview: "A browser-based visual node canvas designed for chaining LLM prompts, testing temperature variants, and evaluating tool dispatch payloads in real time.",
      architecture: [
        "Zero-dependency drag-and-connect node graphing with HTML5 Canvas & DOM overlays.",
        "Streaming JSON chunk renderer simulating real-time LLM token generation.",
        "Local schema validation guaranteeing structured JSON output adherence.",
        "Export and import functionality using native JSON serialization."
      ],
      tech: ["Vanilla JavaScript", "HTML5 Canvas", "Node.js", "WebSockets", "CSS Variables"],
      repoLink: "https://github.com/Priyanshu-Mohite/Valentius-Kryptix-",
      demoLink: "#"
    }
  ];

  // -------------------------------------------------------------------------
  // 2. DOM Elements Selection
  // -------------------------------------------------------------------------
  const root = document.documentElement;
  const header = document.getElementById('header');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavDrawer = document.getElementById('mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.main-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const inspectBtns = document.querySelectorAll('.project-inspect-btn');
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalContent = document.getElementById('modal-content');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const contactEmailText = document.getElementById('contact-email-text');
  const toastContainer = document.getElementById('toast-container');
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const currentYearSpan = document.getElementById('current-year');
  const liveDemoTriggers = document.querySelectorAll('.live-demo-trigger');

  // -------------------------------------------------------------------------
  // 3. Theme Initialization & Toggle
  // -------------------------------------------------------------------------
  function initTheme() {
    const savedTheme = localStorage.getItem('vk_portfolio_theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('vk_portfolio_theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(`Switched to ${newTheme} theme`);
    });
  }

  // -------------------------------------------------------------------------
  // 4. Mobile Navigation Drawer Controls
  // -------------------------------------------------------------------------
  function toggleMobileMenu(forceState) {
    const isOpen = typeof forceState === 'boolean' 
      ? forceState 
      : !mobileNavDrawer.classList.contains('open');

    mobileNavDrawer.classList.toggle('open', isOpen);
    mobileMenuBtn.classList.toggle('is-active', isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    mobileNavDrawer.setAttribute('aria-hidden', String(!isOpen));
  }

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Close when clicking any link in drawer
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMobileMenu(false);
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (mobileNavDrawer.classList.contains('open') && 
          !mobileNavDrawer.contains(e.target) && 
          !mobileMenuBtn.contains(e.target)) {
        toggleMobileMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNavDrawer.classList.contains('open')) {
        toggleMobileMenu(false);
      }
    });
  }

  // -------------------------------------------------------------------------
  // 5. Header Scroll Effect & Scrollspy Active Nav Highlighting
  // -------------------------------------------------------------------------
  window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // IntersectionObserver for Scrollspy
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            if (href === currentId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
  }

  // -------------------------------------------------------------------------
  // 6. Project Filter Tabs
  // -------------------------------------------------------------------------
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 7. Interactive Project Architecture Inspector Modal
  // -------------------------------------------------------------------------
  function openProjectModal(index) {
    const project = projectDetails[index];
    if (!project) return;

    modalContent.innerHTML = `
      <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-secondary); text-transform: uppercase; margin-bottom: 0.4rem;">
        ${project.tag}
      </div>
      <h3 style="font-size: 1.4rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem; line-height: 1.3;">
        ${project.title}
      </h3>
      <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
        ${project.overview}
      </p>

      <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem;">Key Engineering Highlights:</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.5rem; font-size: 0.9rem; color: var(--text-secondary);">
        ${project.architecture.map(item => `
          <li style="display: flex; gap: 0.5rem; line-height: 1.5;">
            <span style="color: var(--accent-emerald);">✔</span>
            <span>${item}</span>
          </li>
        `).join('')}
      </ul>

      <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem;">
        ${project.tech.map(t => `
          <span style="font-family: var(--font-mono); font-size: 0.75rem; background: var(--bg-secondary); border: 1px solid var(--border-subtle); padding: 0.25rem 0.6rem; border-radius: 4px; color: var(--text-secondary);">
            ${t}
          </span>
        `).join('')}
      </div>

      <div style="display: flex; gap: 0.75rem;">
        <a href="${project.repoLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="flex: 1;">
          Explore Code on GitHub
        </a>
        <button type="button" class="btn btn-secondary btn-sm close-modal-action" style="flex: 1;">
          Close
        </button>
      </div>
    `;

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Hook internal close action button
    const closeAction = modalContent.querySelector('.close-modal-action');
    if (closeAction) {
      closeAction.addEventListener('click', closeProjectModal);
    }
  }

  function closeProjectModal() {
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  inspectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.getAttribute('data-project-idx'), 10);
      openProjectModal(idx);
    });
  });

  if (modalCloseBtn && projectModal) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('open')) {
        closeProjectModal();
      }
    });
  }

  // Live Demo Preview Trigger
  liveDemoTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const demoInfo = btn.getAttribute('data-demo');
      showToast(demoInfo || 'Live interactive preview simulated successfully!');
    });
  });

  // -------------------------------------------------------------------------
  // 8. One-Click Copy Email to Clipboard
  // -------------------------------------------------------------------------
  if (copyEmailBtn && contactEmailText) {
    const copyIcon = copyEmailBtn.querySelector('.copy-icon');
    const checkIcon = copyEmailBtn.querySelector('.check-icon');

    copyEmailBtn.addEventListener('click', async () => {
      const email = contactEmailText.textContent.trim();
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback for older browsers
          const tempInput = document.createElement('textarea');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        // Toggle icons
        if (copyIcon && checkIcon) {
          copyIcon.style.display = 'none';
          checkIcon.style.display = 'block';
          setTimeout(() => {
            copyIcon.style.display = 'block';
            checkIcon.style.display = 'none';
          }, 2000);
        }

        showToast('Email address copied to clipboard!');
      } catch (err) {
        showToast('Press Ctrl+C to copy: ' + email);
      }
    });
  }

  // -------------------------------------------------------------------------
  // 9. Toast Notification Factory
  // -------------------------------------------------------------------------
  function showToast(message, duration = 3200) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode === toastContainer) {
          toastContainer.removeChild(toast);
        }
      }, 300);
    }, duration);
  }

  // -------------------------------------------------------------------------
  // 10. Contact Form Validation & Submission
  // -------------------------------------------------------------------------
  if (contactForm) {
    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');
    const messageInput = document.getElementById('user-message');
    const submitBtn = document.getElementById('submit-btn');

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function checkField(input, isValid) {
      const group = input.closest('.form-group');
      if (group) {
        if (isValid) {
          group.classList.remove('has-error');
        } else {
          group.classList.add('has-error');
        }
      }
      return isValid;
    }

    // Live validation on blur
    if (nameInput) {
      nameInput.addEventListener('blur', () => {
        checkField(nameInput, nameInput.value.trim().length > 0);
      });
    }

    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        checkField(emailInput, validateEmail(emailInput.value.trim()));
      });
    }

    if (messageInput) {
      messageInput.addEventListener('blur', () => {
        checkField(messageInput, messageInput.value.trim().length >= 10);
      });
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = checkField(nameInput, nameInput.value.trim().length > 0);
      const isEmailValid = checkField(emailInput, validateEmail(emailInput.value.trim()));
      const isMessageValid = checkField(messageInput, messageInput.value.trim().length >= 10);

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        formFeedback.className = 'form-feedback error';
        formFeedback.textContent = 'Please fill out all required fields correctly.';
        return;
      }

      // Emulate asynchronous submission state
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span>Sending Message...</span>
        <svg class="send-spinner" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        contactForm.reset();

        formFeedback.className = 'form-feedback success';
        formFeedback.textContent = 'Thank you! Your message has been sent successfully. I will get back to you shortly.';

        showToast('Message sent successfully!');

        setTimeout(() => {
          formFeedback.className = 'form-feedback';
          formFeedback.textContent = '';
        }, 6000);
      }, 1200);
    });
  }

  // -------------------------------------------------------------------------
  // 11. Dynamic Year Initialization
  // -------------------------------------------------------------------------
  if (currentYearSpan) {
    currentYearSpan.textContent = String(new Date().getFullYear());
  }

  // Run on initial load
  initTheme();

})();
