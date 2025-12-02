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

// 2. Custom Cursor Logic (Diamond)
const initCursor = () => {
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

// 4. Parallax Effect
const initParallax = () => {
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
  const icon = toggle.querySelector("i");
  let isOpen = false;

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      isOpen = !isOpen;
      if (isOpen) {
        menu.classList.add("active");
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        menu.classList.remove("active");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });

    // Close menu when clicking links
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        isOpen = false;
        menu.classList.remove("active");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      });
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

// 7. Initialization
window.addEventListener("load", () => {
  renderProperties();

  // Hide Loader
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
  }, 1500);
});
