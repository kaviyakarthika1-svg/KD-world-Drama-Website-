document.addEventListener("DOMContentLoaded", () => {
  const $ = id => document.getElementById(id);

  // ================= ELEMENTS =================
  const contactForm = $("contactForm"),
        newsletterForm = $("newsletterForm"),
        mobileMenuBtn = $("mobileMenuBtn"),
        navLinks = $("navLinks"),
        submitBtn = $("submitBtn"),
        formStatus = $("formStatus"),
        name = $("name"),
        email = $("email"),
        subject = $("subject"),
        message = $("message"),
        userMenu = document.querySelector(".user-menu"),
        mapContainer = document.querySelector(".map-container");

  const fields = [name, email, subject, message];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ================= INIT =================
  initMobileMenu();
  initFAQ();
  createScrollTop();
  checkLoginStatus();
  initAnimations();
  initDraft();
  initCharCount();

  // ================= MOBILE MENU =================
  function initMobileMenu() {
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
  }

  // ================= FAQ =================
  function initFAQ() {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
      item.querySelector(".faq-question")?.addEventListener("click", () => {
        const active = item.classList.contains("active");
        faqItems.forEach(i => i.classList.remove("active"));
        if (!active) item.classList.add("active");
      });
    });
  }

  // ================= VALIDATION =================
  const validators = {
    name: () => name.value.trim().length >= 2,
    email: () => emailRegex.test(email.value.trim()),
    subject: () => subject.value.trim() !== "",
    message: () => message.value.trim().length >= 10
  };

  function toggleError(field, valid) {
    const error = $(`${field.id}Error`);
    field.classList.toggle("error", !valid);
    error?.classList.toggle("show", !valid);
    return valid;
  }

  function validateForm() {
    return [
      toggleError(name, validators.name()),
      toggleError(email, validators.email()),
      toggleError(subject, validators.subject()),
      toggleError(message, validators.message())
    ].every(Boolean);
  }

  fields.forEach(field => field?.addEventListener("input", validateForm));

  // ================= CONTACT FORM =================
  contactForm?.addEventListener("submit", async e => {
    e.preventDefault();
    if (!validateForm()) return;

    submitBtn.classList.add("loading");
    submitBtn.disabled = true;
    formStatus.style.display = "none";

    const formData = {
      name: name.value.trim(),
      email: email.value.trim(),
      subject: subject.value.trim(),
      message: message.value.trim(),
      timestamp: new Date().toISOString()
    };

    try {
      await fakeApi(formData, 1500, 0.9);
      showNotification("Message sent successfully! We'll get back to you soon.", "success");
      contactForm.reset();
      fields.forEach(f => f.classList.remove("error"));
      localStorage.removeItem("contactFormDraft");
      updateCharCount();
    } catch (err) {
      formStatus.textContent = err.message || "Failed to send message. Please try again.";
      formStatus.className = "form-status error";
      formStatus.style.display = "block";
      showNotification("Failed to send message. Please try again.", "error");
    } finally {
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
    }
  });

  // ================= NEWSLETTER =================
  newsletterForm?.addEventListener("submit", async e => {
    e.preventDefault();
    const newsletterEmail = $("newsletterEmail");
    const newsletterStatus = $("newsletterStatus");
    const value = newsletterEmail.value.trim();

    if (!emailRegex.test(value)) {
      newsletterStatus.textContent = "Please enter a valid email address";
      newsletterStatus.style.color = "#ffd700";
      return;
    }

    newsletterStatus.textContent = "Subscribing...";
    newsletterStatus.style.color = "white";

    await fakeApi({ email: value }, 1000, 1);
    newsletterStatus.textContent = "Successfully subscribed! Check your email for confirmation.";
    newsletterEmail.value = "";
    showNotification("Successfully subscribed to newsletter!", "success");
  });

  function fakeApi(data, delay = 1000, successRate = 1) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() < successRate ? resolve(data) : reject(new Error("Network error. Please try again."));
      }, delay);
    });
  }

  // ================= NOTIFICATION =================
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

  // ================= SCROLL TOP =================
  function createScrollTop() {
    const btn = document.createElement("button");
    btn.className = "scroll-top";
    btn.innerHTML = "↑";
    btn.setAttribute("aria-label", "Scroll to top");
    document.body.appendChild(btn);

    window.addEventListener("scroll", () =>
      btn.classList.toggle("show", window.pageYOffset > 300)
    );

    btn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  // ================= LOGIN STATUS =================
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

    $("logoutBtn")?.addEventListener("click", e => {
      e.preventDefault();
      sessionStorage.clear();
      localStorage.removeItem("rememberMe");
      showNotification("Logged out successfully", "success");
      setTimeout(() => window.location.href = "home.html", 1500);
    });
  }

  // ================= ANIMATIONS =================
  function initAnimations() {
    const items = document.querySelectorAll("[data-aos]");
    if (!items.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.1 });

    items.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "all 0.6s ease";
      observer.observe(el);
    });
  }

  // ================= TEXTAREA + CHAR COUNT =================
  const charCount = document.createElement("div");
  charCount.className = "char-count";
  charCount.style.cssText = "text-align:right;font-size:0.85rem;color:#999;margin-top:5px;";
  message?.parentNode.appendChild(charCount);

  function updateCharCount() {
    const count = message.value.length;
    charCount.textContent = `${count}/500 characters`;
    charCount.style.color = count > 500 ? "#ff4d4f" : count > 400 ? "#faad14" : "#999";
  }

  function initCharCount() {
    message?.addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
      updateCharCount();
    });
    updateCharCount();
  }

  // ================= COPY EMAIL =================
  document.querySelectorAll(".contact-card").forEach(card => {
    const link = card.querySelector('a[href^="mailto:"]');
    if (!link) return;

    card.addEventListener("click", () => {
      navigator.clipboard?.writeText(link.href.replace("mailto:", ""))
        .then(() => showNotification("Email copied to clipboard!", "success"));
    });
  });

  // ================= FORM DRAFT =================
  function initDraft() {
    const saved = JSON.parse(localStorage.getItem("contactFormDraft") || "{}");
    name.value = saved.name || "";
    email.value = saved.email || "";
    subject.value = saved.subject || "";
    message.value = saved.message || "";

    let timer;
    fields.forEach(field => {
      field?.addEventListener("input", () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          localStorage.setItem("contactFormDraft", JSON.stringify({
            name: name.value,
            email: email.value,
            subject: subject.value,
            message: message.value
          }));
        }, 1000);
      });
    });
  }

  // ================= EXTRA =================
  document.addEventListener("visibilitychange", () => {
    console.log(document.hidden ? "Page hidden - user left" : "Page visible - user returned");
  });

  mapContainer?.addEventListener("click", () => {
    console.log("Map clicked - user is exploring location");
  });
});