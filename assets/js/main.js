// --- DATA SOURCE ---
const properties = [
  {
    title: "Penthouse Skyline",
    price: "18 500 000 PLN",
    location: "Warszawa",
    beds: 4,
    sqm: 320,
    img: "assets/images/portfolio-penthouse.jpg",
    description: "Luksusowy penthouse z panoramicznym widokiem na centrum Warszawy. Minimalistyczna elegancja spotyka funkcjonalność."
  },
  {
    title: "Rezydencja Horizon",
    price: "28 900 000 PLN",
    location: "Gdynia",
    beds: 5,
    sqm: 520,
    img: "assets/images/portfolio-rezydencja.jpg",
    description: "Wyjątkowa rezydencja nad morzem z bezpośrednim dostępem do plaży i tarasem widokowym."
  },
  {
    title: "Apartament Aurora",
    price: "12 200 000 PLN",
    location: "Kraków",
    beds: 3,
    sqm: 180,
    img: "assets/images/portfolio-aurora.jpg",
    description: "Elegancki apartament w sercu Krakowa. Połączenie historycznego uroku z nowoczesnym designem."
  },
  {
    title: "Mountain Retreat",
    price: "35 000 000 PLN",
    location: "Zakopane",
    beds: 6,
    sqm: 450,
    img: "assets/images/portfolio-mountain.jpg",
    description: "Ekskluzywna rezydencja górska z widokiem na Tatry. Luksus w harmonii z naturą."
  },
];

// --- CORE FUNCTIONS ---

// 1. Render Properties
const container = document.getElementById("listings-container");

const renderProperties = () => {
  properties.forEach((prop, index) => {
    const card = document.createElement("div");
    card.className = "property-card reveal hover-target";
    card.style.transitionDelay = `${index * 150}ms`;

    // Use data-src for lazy loading with IntersectionObserver
    card.innerHTML = `
                <div class="card-image-wrapper">
                    <div class="card-price-tag">${prop.price}</div>
                    <img data-src="${prop.img}" alt="${prop.title} - ${prop.description}" decoding="async" width="420" height="560" style="aspect-ratio: 3/4; background: rgba(255,255,255,0.03);" class="lazy-image">
                </div>
                <div class="card-info">
                    <span class="card-location">${prop.location}</span>
                    <h3 class="card-title">${prop.title}</h3>
                    <div class="card-meta">
                        <span class="meta-item"><i class="fa-solid fa-bed" aria-hidden="true"></i> ${prop.beds} Sypialnie</span>
                        <span class="meta-item"><i class="fa-solid fa-ruler-combined" aria-hidden="true"></i> ${prop.sqm} m²</span>
                    </div>
                </div>
            `;
    container.appendChild(card);
  });

  // Initialize lazy loading for portfolio images
  initLazyLoading();
};

// 2. Custom Cursor Logic (Diamond) - Only on desktop
const initCursor = () => {
  // Only run on non-touch devices
  const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  if (isTouchDevice) {
    return; // Skip custom cursor on touch devices
  }

  const cursorDiamond = document.querySelector(".cursor-diamond");

  // Mouse Movement
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animateCursor = () => {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    if (cursorDiamond) {
      cursorDiamond.style.left = cursorX + "px";
      cursorDiamond.style.top = cursorY + "px";
    }

    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  // Hover interactions
  document.addEventListener("mouseover", (e) => {
    if (
      e.target.closest(".hover-target") ||
      e.target.closest("a") ||
      e.target.closest("button")
    ) {
      document.body.classList.add("hovering");
    } else {
      document.body.classList.remove("hovering");
    }
  });
};

// 3. Intersection Observer
const initObserver = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".reveal")
    .forEach((el) => observer.observe(el));
};

// 3.5 Lazy Loading for Images (Performance Optimization)
const initLazyLoading = () => {
  const lazyImages = document.querySelectorAll('.lazy-image');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');

          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.remove('lazy-image');
            img.classList.add('lazy-loaded');
          }

          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px', // Start loading 50px before entering viewport
      threshold: 0.01
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach((img) => {
      const src = img.getAttribute('data-src');
      if (src) {
        img.src = src;
        img.removeAttribute('data-src');
      }
    });
  }
};

// 4. Parallax Effect (disabled on mobile for performance)
const initParallax = () => {
  // Check if device is mobile/touch or prefers reduced motion
  const isMobile = window.matchMedia("(max-width: 1024px)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isMobile || prefersReducedMotion) {
    return; // Skip parallax on mobile and for users who prefer reduced motion
  }

  const bg = document.getElementById("parallax-bg");
  const aboutBg = document.getElementById("about-parallax");

  // Throttle scroll with requestAnimationFrame for better performance
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scroll = window.scrollY;
        const windowHeight = window.innerHeight;

        if (scroll < windowHeight && bg) {
          bg.style.transform = `scale(1.1) translateY(${scroll * 0.4}px)`;
        }

        if (aboutBg) {
          const aboutRect = document
            .querySelector(".about-section")
            .getBoundingClientRect();
          if (aboutRect.top < windowHeight && aboutRect.bottom > 0) {
            const offset = (windowHeight - aboutRect.top) * 0.1;
            aboutBg.style.transform = `translateY(${offset}px)`;
          }
        }

        ticking = false;
      });
      ticking = true;
    }
  });
};

// 5. MOBILE MENU LOGIC
const initMobileMenu = () => {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const closeBtn = document.getElementById("menu-close");
  const icon = toggle.querySelector("i");
  let isOpen = false;

  // Create middle line for hamburger diamond
  if (toggle && !toggle.querySelector('.hamburger-middle')) {
    const middleLine = document.createElement('span');
    middleLine.className = 'hamburger-middle';
    toggle.appendChild(middleLine);
  }

  const closeMenu = () => {
    isOpen = false;
    menu.classList.remove("active");
    document.body.classList.remove("menu-open");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
    // Update ARIA attributes for accessibility
    toggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  };

  const openMenu = () => {
    isOpen = true;
    menu.classList.add("active");
    document.body.classList.add("menu-open");
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
    // Update ARIA attributes for accessibility
    toggle.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
  };

  if (toggle && menu) {
    // Toggle button
    toggle.addEventListener("click", () => {
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close button in menu
    if (closeBtn) {
      closeBtn.addEventListener("click", closeMenu);
    }

    // Close menu when clicking links
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }
};

// 6. SCROLL TO TOP LOGIC
const initScrollTop = () => {
  const btn = document.getElementById("scrollTopBtn");

  // Throttle scroll with requestAnimationFrame for better performance
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 500) {
          btn.classList.add("visible");
        } else {
          btn.classList.remove("visible");
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

// 7. Prevent body scroll when mobile menu is open
const preventBodyScroll = () => {
  const menu = document.getElementById("mobile-menu");
  const observer = new MutationObserver(() => {
    if (menu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  if (menu) {
    observer.observe(menu, { attributes: true, attributeFilter: ["class"] });
  }
};

// 9. FAQ Accordion
const initFAQ = () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      // Toggle current item
      const isOpen = item.classList.contains('faq-open');

      // Close all items
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove('faq-open');
      });

      // Open clicked item if it wasn't open
      if (!isOpen) {
        item.classList.add('faq-open');
      }
    });
  });
};

// 10. Smooth Scroll for Navigation Links
const initSmoothScroll = () => {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Skip if href is just "#"
      if (href === '#') return;

      e.preventDefault();

      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          document.body.classList.remove('menu-open');
        }

        // Smooth scroll to section
        const navHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
};

// 8. Cursor Spotlight Effect (Subtle Golden Glow)
const initCursorTrail = () => {
  // Only run on non-touch devices
  const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  if (isTouchDevice) {
    return; // Skip spotlight on touch devices
  }

  const canvas = document.getElementById('cursor-trail');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // Set canvas size to window size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Mouse position with smooth following
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let targetX = mouseX;
  let targetY = mouseY;

  // Track mouse movement
  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  // Animation loop
  function animate() {
    // Clear canvas completely for clean spotlight
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Smooth follow with easing (laggy cursor effect)
    mouseX += (targetX - mouseX) * 0.15;
    mouseY += (targetY - mouseY) * 0.15;

    // Draw subtle spotlight glow
    const gradient = ctx.createRadialGradient(
      mouseX, mouseY, 0,
      mouseX, mouseY, 150
    );

    // Very subtle golden glow
    gradient.addColorStop(0, 'rgba(212, 175, 55, 0.15)'); // Center - subtle
    gradient.addColorStop(0.3, 'rgba(212, 175, 55, 0.08)'); // Mid
    gradient.addColorStop(0.6, 'rgba(212, 175, 55, 0.03)'); // Outer
    gradient.addColorStop(1, 'rgba(212, 175, 55, 0)'); // Fade to transparent

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 150, 0, Math.PI * 2);
    ctx.fill();

    requestAnimationFrame(animate);
  }

  animate();

  // Handle window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
};

// 9. Initialization
window.addEventListener("load", () => {
  try {
    renderProperties();
  } catch (error) {
    console.error('Error rendering properties:', error);
  }

  // Hide Loader with faster timing on mobile
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const loaderDelay = isMobile ? 800 : 1500;

  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";
    }

    // Init animations with error handling to prevent one failure from breaking others
    const safeInit = (fn, name) => {
      try {
        fn();
      } catch (error) {
        console.error(`Error initializing ${name}:`, error);
      }
    };

    safeInit(initCursor, 'cursor');
    safeInit(initCursorTrail, 'cursor trail');
    safeInit(initObserver, 'observer');
    safeInit(initParallax, 'parallax');
    safeInit(initMobileMenu, 'mobile menu');
    safeInit(initScrollTop, 'scroll to top');
    safeInit(preventBodyScroll, 'body scroll prevention');
    safeInit(initSmoothScroll, 'smooth scroll');
    safeInit(initFAQ, 'FAQ');
    safeInit(initContactForm, 'contact form');
  }, loaderDelay);
});

// --- GEMINI API INTEGRATION (Neon AI Atelier) ---

// Copy Concept to Clipboard
function copyConcept() {
  const resultText = document.getElementById('ai-text').innerText;
  const copyBtn = document.getElementById('copy-btn');

  navigator.clipboard.writeText(resultText).then(() => {
    // Visual feedback
    const originalHTML = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    copyBtn.style.background = 'rgba(212, 175, 55, 0.2)';

    setTimeout(() => {
      copyBtn.innerHTML = originalHTML;
      copyBtn.style.background = 'transparent';
    }, 2000);
  }).catch(err => {
    console.error('Copy failed:', err);
    alert('Nie udało się skopiować tekstu');
  });
}

/**
 * AI Concept Generation with Backend Integration
 *
 * CONFIGURATION:
 * Set API_BASE_URL to your deployed backend URL:
 * - Development: http://localhost:3000
 * - Production: https://your-backend-domain.com (e.g., Vercel, Heroku)
 *
 * IMPORTANT: Backend must be running for this to work!
 * See api/server.js for deployment instructions.
 */
const API_BASE_URL = 'http://localhost:3000'; // ⚠️ CHANGE THIS TO YOUR DEPLOYED BACKEND URL

async function generateConcept() {
  // Get form values
  const projectType = document.getElementById('project-type').value.trim();
  const location = document.getElementById('location').value.trim();
  const description = document.getElementById('vision-input').value.trim();
  const btn = document.getElementById('generate-btn');
  const resultBox = document.getElementById('ai-result');
  const resultText = document.getElementById('ai-text');

  // Validation
  if (!projectType) {
    alert("Proszę wpisać typ projektu.");
    return;
  }
  if (!location) {
    alert("Proszę wpisać lokalizację.");
    return;
  }
  if (!description || description.length < 10) {
    alert("Proszę wpisać szczegółowy opis wizji (minimum 10 znaków).");
    return;
  }

  // UI Loading State
  const originalBtnText = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Tworzenie konceptu';
  btn.disabled = true;
  resultBox.style.display = 'none';
  resultText.innerHTML = '';

  // AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000); // 45s timeout

  try {
    // Call backend API
    const response = await fetch(`${API_BASE_URL}/api/ai-atelier/generate-concept`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectType,
        location,
        description,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Nieznany błąd' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    // Parse successful response
    const data = await response.json();

    if (!data.success || !data.data?.concept) {
      throw new Error('Nieprawidłowa odpowiedź z serwera');
    }

    // Display sanitized concept (already sanitized by backend)
    resultText.innerHTML = data.data.concept;
    resultBox.style.display = 'block';

    // Smooth scroll to result
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  } catch (error) {
    clearTimeout(timeoutId);
    console.error('AI Generation Error:', error);

    let errorMessage = 'Przepraszamy, wystąpił błąd. Spróbuj ponownie za chwilę.';

    // Specific error messages
    if (error.name === 'AbortError') {
      errorMessage = 'Zapytanie przekroczyło limit czasu. Spróbuj ponownie.';
    } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      errorMessage = `
        <p style="color: #d4af37; font-weight: 600;">⚠️ Nie można połączyć z serwerem</p>
        <p>Upewnij się, że backend jest uruchomiony na: <code style="color: #d4af37;">${API_BASE_URL}</code></p>
        <p>Instrukcje uruchomienia znajdziesz w pliku: <code>api/server.js</code></p>
      `;
    } else if (error.message) {
      errorMessage = error.message;
    }

    resultText.innerHTML = errorMessage;
    resultBox.style.display = 'block';

  } finally {
    // Reset button state
    btn.innerHTML = originalBtnText;
    btn.disabled = false;
  }
}

// --- TOAST NOTIFICATION SYSTEM ---
function showToast(type, title, message, duration = 5000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  // Icon based on type
  let iconClass = '';
  switch(type) {
    case 'success':
      iconClass = 'fa-check';
      break;
    case 'error':
      iconClass = 'fa-exclamation-triangle';
      break;
    case 'warning':
      iconClass = 'fa-exclamation-circle';
      break;
    default:
      iconClass = 'fa-info-circle';
  }

  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fa-solid ${iconClass}"></i>
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" aria-label="Zamknij powiadomienie">
      <i class="fa-solid fa-times"></i>
    </button>
    <div class="toast-progress"></div>
  `;

  container.appendChild(toast);

  // Close button handler
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    dismissToast(toast);
  });

  // Auto dismiss after duration
  if (duration > 0) {
    setTimeout(() => {
      dismissToast(toast);
    }, duration);
  }

  return toast;
}

function dismissToast(toast) {
  toast.classList.add('toast-hide');
  setTimeout(() => {
    toast.remove();
  }, 400);
}

// --- CONTACT FORM HANDLING ---
const initContactForm = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Track all form inputs
  const inputs = form.querySelectorAll('input, select, textarea');
  const selectBudget = form.querySelector('#contact-budget');

  // Change select color when value is selected
  if (selectBudget) {
    selectBudget.addEventListener('change', () => {
      if (selectBudget.value !== '') {
        selectBudget.classList.add('has-value');
      } else {
        selectBudget.classList.remove('has-value');
      }
    });
  }

  // Add "touched" class after user interacts with field
  inputs.forEach(input => {
    // Mark as touched on blur (when user leaves the field)
    input.addEventListener('blur', () => {
      input.classList.add('touched');

      // Force revalidation for email
      if (input.type === 'email') {
        input.checkValidity();
      }
    });

    // Also mark as touched on input for immediate feedback
    input.addEventListener('input', () => {
      if (input.value.length > 0) {
        input.classList.add('touched');
      }

      // Revalidate email on every input
      if (input.type === 'email') {
        input.checkValidity();
      }
    });

    // Special handling for checkbox
    if (input.type === 'checkbox') {
      input.addEventListener('change', () => {
        input.classList.add('touched');
      });
    }
  });

  // Prevent default HTML5 validation bubbles
  inputs.forEach(input => {
    input.addEventListener('invalid', (e) => {
      e.preventDefault();
    });
  });

  // Form submit handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Mark all fields as touched on submit attempt
    inputs.forEach(input => input.classList.add('touched'));

    // Custom validation
    const requiredInputs = form.querySelectorAll('[required]');
    const invalidFields = [];

    requiredInputs.forEach(input => {
      if (input.type === 'checkbox') {
        // Checkbox validation
        if (!input.checked) {
          invalidFields.push('Zgoda na przetwarzanie danych osobowych');
        }
      } else if (!input.value.trim()) {
        // Text/Select/Textarea validation
        const label = form.querySelector(`label[for="${input.id}"]`);
        const fieldName = label ? label.textContent.replace(' *', '') : input.placeholder;
        invalidFields.push(fieldName);
      } else if (input.type === 'email' && !input.validity.valid) {
        invalidFields.push('E-mail (nieprawidłowy format)');
      }
    });

    // If there are validation errors, show ONE toast with all errors
    if (invalidFields.length > 0) {
      const errorMessage = invalidFields.length === 1
        ? `Wypełnij pole: ${invalidFields[0]}`
        : `Wypełnij wymagane pola:\n${invalidFields.map(f => `• ${f}`).join('\n')}`;

      showToast(
        'warning',
        'Uzupełnij formularz',
        errorMessage,
        5000
      );

      // Focus first invalid field
      const firstInvalid = form.querySelector('[required]:invalid, [required][value=""]');
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Wysyłanie...';
    submitBtn.disabled = true;

    try {
      // Simulate API call (replace with your actual endpoint)
      const response = await fetch('/submit-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Success
        showToast(
          'success',
          'Wiadomość wysłana!',
          'Skontaktujemy się z Tobą w ciągu 24 godzin.',
          6000
        );

        // Reset form and remove touched classes
        form.reset();
        inputs.forEach(input => input.classList.remove('touched'));
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      // Error - but show success for demo purposes
      // In production, this would show the actual error
      console.log('Form submission (demo mode):', data);

      showToast(
        'success',
        'Wiadomość wysłana!',
        'Skontaktujemy się z Tobą w ciągu 24 godzin.',
        6000
      );

      // Reset form and remove touched classes
      form.reset();
      inputs.forEach(input => input.classList.remove('touched'));

      // Uncomment this for actual error handling:
      // showToast(
      //   'error',
      //   'Błąd wysyłania',
      //   'Wystąpił problem podczas wysyłania wiadomości. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio.',
      //   7000
      // );
    } finally {
      // Restore button
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  });
};

// Performance optimization: Lazy load images
if ("loading" in HTMLImageElement.prototype) {
  // Browser supports lazy loading
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach((img) => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  document.body.appendChild(script);
}
