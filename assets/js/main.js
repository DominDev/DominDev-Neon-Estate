// --- DATA SOURCE ---
const properties = [
  {
    title: "Glass Pavilion",
    price: "14 200 000 PLN",
    location: "Warszawa, Mokotów",
    beds: 4,
    sqm: 320,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Onyx Penthouse",
    price: "8 850 000 PLN",
    location: "Gdańsk, Śródmieście",
    beds: 3,
    sqm: 180,
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Forest Retreat",
    price: "22 500 000 PLN",
    location: "Zakopane, Premium Zone",
    beds: 6,
    sqm: 450,
    img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Azure Cliff Villa",
    price: "35 000 000 PLN",
    location: "Gdynia, Orłowo",
    beds: 5,
    sqm: 520,
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop",
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

    card.innerHTML = `
                <div class="card-image-wrapper">
                    <div class="card-price-tag">${prop.price}</div>
                    <img src="${prop.img}" alt="${prop.title}">
                </div>
                <div class="card-info">
                    <span class="card-location">${prop.location}</span>
                    <h3 class="card-title">${prop.title}</h3>
                    <div class="card-meta">
                        <span class="meta-item"><i class="fa-solid fa-bed"></i> ${prop.beds} Sypialnie</span>
                        <span class="meta-item"><i class="fa-solid fa-ruler-combined"></i> ${prop.sqm} m²</span>
                    </div>
                </div>
            `;
    container.appendChild(card);
  });
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

  window.addEventListener("scroll", () => {
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
  });
};

// 5. MOBILE MENU LOGIC
const initMobileMenu = () => {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const closeBtn = document.getElementById("menu-close");
  const icon = toggle.querySelector("i");
  let isOpen = false;

  const closeMenu = () => {
    isOpen = false;
    menu.classList.remove("active");
    document.body.classList.remove("menu-open");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  };

  const openMenu = () => {
    isOpen = true;
    menu.classList.add("active");
    document.body.classList.add("menu-open");
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
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

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
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

// 8. Initialization
window.addEventListener("load", () => {
  renderProperties();

  // Hide Loader with faster timing on mobile
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const loaderDelay = isMobile ? 800 : 1500;

  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";
    }

    // Init animations
    initCursor();
    initObserver();
    initParallax();
    initMobileMenu();
    initScrollTop();
    preventBodyScroll();
  }, loaderDelay);
});

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
