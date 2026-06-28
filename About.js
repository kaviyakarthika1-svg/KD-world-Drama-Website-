document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);
  const mobileMenuBtn = $("mobileMenuBtn");
  const navLinks = $("navLinks");
  const userMenu = document.querySelector(".user-menu");
  const statsSection = document.querySelector(".stats-section");

  // ================= AOS =================
  if (window.AOS) {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }

  // ================= MOBILE MENU =================
  mobileMenuBtn?.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const spans = mobileMenuBtn.querySelectorAll("span");
    const active = navLinks.classList.contains("active");

    spans[0].style.transform = active ? "rotate(45deg) translate(6px,6px)" : "none";
    spans[1].style.opacity = active ? "0" : "1";
    spans[2].style.transform = active ? "rotate(-45deg) translate(6px,-6px)" : "none";
  });

  navLinks?.querySelectorAll("a").forEach(link =>
    link.addEventListener("click", () => navLinks.classList.remove("active"))
  );

  // ================= STATS COUNTER =================
  function animateStats() {
    document.querySelectorAll(".stat-number").forEach(stat => {
      const target = +stat.dataset.target || 0;
      let current = 0;
      const step = target / 50;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          stat.textContent = target;
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current);
        }
      }, 30);
    });
  }

  if (statsSection) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateStats();
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    observer.observe(statsSection);
  }

  // ================= TESTIMONIALS =================
  function initTestimonials() {
    const testimonials = document.querySelectorAll(".testimonial");
    const dots = document.querySelectorAll(".testimonial-dots .dot");
    const slider = document.querySelector(".testimonials-slider");
    if (!testimonials.length) return;

    let current = 0, interval;

    const show = (i) => {
      testimonials.forEach(t => t.classList.remove("active"));
      dots.forEach(d => d.classList.remove("active"));
      testimonials[i]?.classList.add("active");
      dots[i]?.classList.add("active");
    };

    const next = () => {
      current = (current + 1) % testimonials.length;
      show(current);
    };

    interval = setInterval(next, 5000);

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        clearInterval(interval);
        current = i;
        show(current);
        interval = setInterval(next, 5000);
      });
    });

    slider?.addEventListener("mouseenter", () => clearInterval(interval));
    slider?.addEventListener("mouseleave", () => interval = setInterval(next, 5000));
  }

  initTestimonials();

  // ================= SCROLL TOP =================
  const scrollBtn = document.createElement("button");
  scrollBtn.className = "scroll-top";
  scrollBtn.innerHTML = "↑";
  scrollBtn.setAttribute("aria-label", "Scroll to top");
  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", () => {
    scrollBtn.classList.toggle("show", window.pageYOffset > 300);
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ================= LOGIN STATUS =================
  function showNotification(message, type = "info") {
    const note = document.createElement("div");
    note.className = `notification ${type}`;
    note.innerHTML = message;
    document.body.appendChild(note);

    setTimeout(() => {
      note.style.animation = "slideIn 0.3s ease reverse";
      setTimeout(() => note.remove(), 300);
    }, 3000);
  }

  function checkLoginStatus() {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken || !userMenu) return;

    const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");
    userMenu.innerHTML = `
      <div class="user-dropdown">
        <button class="user-btn">
          <i class="fas fa-user-circle"></i> ${userData.name || "User"}
        </button>
        <div class="dropdown-content">
          <a href="profile.html">Profile</a>
          <a href="settings.html">Settings</a>
          <a href="#" id="logoutBtn">Logout</a>
        </div>
      </div>
    `;

    document.getElementById("logoutBtn")?.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.clear();
      localStorage.removeItem("rememberMe");
      showNotification("Logged out successfully", "success");
      setTimeout(() => window.location.href = "home.html", 1500);
    });
  }

  checkLoginStatus();

  // ================= TIMELINE / FADE ANIMATION =================
  const animatedItems = document.querySelectorAll(
    ".timeline-item, .mission-card, .vision-card, .team-member"
  );

  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translate(0,0)";
      }
    });
  }, { threshold: 0.3 });

  animatedItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = item.classList.contains("timeline-item")
      ? `translateX(${index % 2 === 0 ? "-50px" : "50px"})`
      : "translateY(20px)";
    item.style.transition = "all 0.6s ease";
    fadeObserver.observe(item);
  });

  // ================= OFFER HOVER =================
  document.querySelectorAll(".offer-item").forEach(item => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "translateY(-10px) scale(1.05)";
    });
    item.addEventListener("mouseleave", () => {
      item.style.transform = "translateY(0) scale(1)";
    });
  });

  // ================= RANDOM FACT =================
  const facts = [
    "Korean dramas have been produced since the 1960s!",
    "The first Korean drama was 'The Gate of Heaven' in 1961.",
    "'Crash Landing on You' is one of the most-watched K-dramas globally.",
    "Korean dramas are known for their 16-episode format.",
    "Many K-drama actors are also K-pop idols!",
    "The term 'K-drama' was added to the Oxford English Dictionary in 2021."
  ];

  if (statsSection) {
    const fact = document.createElement("div");
    fact.className = "random-fact";
    fact.innerHTML = `
      <i class="fas fa-lightbulb"></i>
      <p>${facts[Math.floor(Math.random() * facts.length)]}</p>
    `;
    statsSection.parentNode.insertBefore(fact, statsSection.nextSibling);
  }

  // ================= LOAD / IMAGE / ANCHOR =================
  window.addEventListener("load", () => document.body.classList.add("loaded"));

  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", function () {
      this.src = "placeholder.jpg";
      this.alt = "Image not available";
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href"))?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  // ================= CARD CLICK =================
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      if (card.querySelector("img")) showNotification("✨ Beautiful K-Drama moment!", "info");
    });
  });

  // ================= FOOTER YEAR =================
  const footerYear = document.querySelector(".footer-bottom p");
  if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace("2026", new Date().getFullYear());
  }

  console.log("About page loaded at:", new Date().toLocaleString());
});