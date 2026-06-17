// MOBILE MENU
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// ACTIVE NAV LINK
const setActiveLink = () => {
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (
      window.scrollY >= sectionTop - 150 &&
      window.scrollY < sectionTop + sectionHeight - 150
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("href") === `#${currentSection}`) {
      item.classList.add("active");
    }
  });
};

window.addEventListener("scroll", setActiveLink);
document.addEventListener("DOMContentLoaded", setActiveLink);

// CONTACT FORM
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = form.querySelectorAll("input, textarea");
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
    }
  });

  if (!isValid) return;
  form.reset();
  successMsg.style.display = "block";
  setTimeout(() => {
    successMsg.style.display = "none";
  }, 5000);
});

// SCROLL TO TOP
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// COUNTER
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  const startCounting = (counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 2000;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      let progress = Math.min(elapsedTime / duration, 1);
      progress =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const currentCount = Math.floor(progress * target);
      counter.innerText = currentCount;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target + "+";
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const observerOptions = {
    root: null,
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
});

// MODAL
document.addEventListener("DOMContentLoaded", () => {
  const modals = document.querySelectorAll(".modal");

  const openModal = (modalId) => {
    const modal = document.getElementById(`modal-${modalId}`);
    if (!modal) return;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    const content = modal.querySelector(".modal-content");
    if (content) content.focus();
  };

  const closeModal = (modal) => {
    const content = modal.querySelector(".modal-content");
    if (content) {
      content.style.animation = "modalSlideDown 0.25s cubic-bezier(0.22, 1, 0.36, 1) both";
    }
    setTimeout(() => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
      if (content) content.style.animation = "";
    }, 220);
  };

  document.querySelectorAll(".card[data-modal]").forEach(card => {
    card.addEventListener("click", () => {
      openModal(card.getAttribute("data-modal"));
    });
  });

  document.querySelectorAll(".modal-close, .modal-close-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const modal = btn.closest(".modal");
      if (modal) closeModal(modal);
    });
  });

  modals.forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modals.forEach(modal => {
        if (modal.classList.contains("active")) closeModal(modal);
      });
    }
  });

  document.querySelectorAll(".modal-contact-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      if (modal) closeModal(modal);
    });
  });
});

// NAV DROPDOWN
document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".nav-dropdown");
  const toggle = dropdown.querySelector(".nav-dropdown-toggle");

  toggle.addEventListener("click", (e) => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      e.preventDefault();
      dropdown.classList.toggle("open");
    }
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
    }
  });

  document.querySelectorAll("[data-open-modal]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const modalId = link.getAttribute("data-open-modal");
      const target = link.getAttribute("href");

      dropdown.classList.remove("open");
      navLinks.classList.remove("active");

      document.querySelector(target).scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        const modal = document.getElementById(`modal-${modalId}`);
        if (!modal) return;
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
        const content = modal.querySelector(".modal-content");
        if (content) content.focus();
      }, 500);
    });
  });
});

// COOKIE BANNER
document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookieBanner");
  const accept = document.getElementById("cookieAccept");
  const decline = document.getElementById("cookieDecline");

  if (!localStorage.getItem("cookieConsent")) {
    setTimeout(() => banner.classList.add("show"), 800);
  }

  const dismiss = (value) => {
    banner.classList.remove("show");
    localStorage.setItem("cookieConsent", value);
  };

  accept.addEventListener("click", () => dismiss("accepted"));
  decline.addEventListener("click", () => dismiss("declined"));
});

// LEGAL MODALS
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-legal]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.getAttribute("data-legal");
      const modal = document.getElementById(`modal-legal-${id}`);
      if (!modal) return;
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
      modal.querySelector(".modal-content").scrollTop = 0;
    });
  });
});