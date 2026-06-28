document.addEventListener("DOMContentLoaded", () => {
  // ================= DATA =================
  const genresData = [
    {
      name: "Romance", icon: "❤️", id: "romance",
      dramas: [
        { id: 1, title: "Doom at Your Service", image: "Desgraça ao seu dispor.jpeg", watchUrl: "https://www.viki.com/tv/37776c-doom-at-your-service#about", genre: "Romance, Fantasy", rating: 4.5, year: 2021, actors: ["Park Bo-young", "Seo In-guk"] },
        { id: 2, title: "My Dearest Nemesis", image: "My dearest nemesis.jpeg", watchUrl: "https://www.viki.com/tv/40976c-my-dearest-nemesis#about", genre: "Romance, Comedy", rating: 4.3, year: 2024, actors: ["Moon Ga-young", "Choi Hyun-wook"] },
        { id: 3, title: "Extraordinary You", image: "Extraordinary you.jpeg", watchUrl: "https://www.viki.com/tv/36728c-extra-ordinary-you#about", genre: "Romance, Fantasy", rating: 4.4, year: 2019, actors: ["Kim Hye-yoon", "Rowoon"] }
      ]
    },
    {
      name: "Thriller", icon: "🕵️", id: "thriller",
      dramas: [
        { id: 4, title: "Taxi Driver", image: "TAXI DRIVER.jpeg", watchUrl: "https://www.viki.com/tv/37770c-taxi-driver#about", genre: "Thriller, Action", rating: 4.6, year: 2021, actors: ["Lee Je-hoon", "Esom"] },
        { id: 5, title: "The Player", image: "Ano_ 2018.jpeg", watchUrl: "https://www.viki.com/tv/36186c-the-player#about", genre: "Thriller, Crime", rating: 4.3, year: 2018, actors: ["Song Seung-heon", "Krystal Jung"] },
        { id: 6, title: "Night Has Come", image: "Night Has Come_ Best K-Drama TV Series Review 2025 - Feed Flow.jpeg", watchUrl: "https://www.viki.com/tv/40227c-night-has-come#about", genre: "Thriller, Mystery", rating: 4.2, year: 2023, actors: ["Lee Jae-in", "Kim Woo-seok"] }
      ]
    },
    {
      name: "Rom-com", icon: "😂", id: "comedy",
      dramas: [
        { id: 7, title: "Strong Woman Do Bong Soon", image: "Strong Woman.jpeg", watchUrl: "https://www.viki.com/tv/32311c-strong-woman-do-bong-soon#about", genre: "Comedy, Romance", rating: 4.7, year: 2017, actors: ["Park Bo-young", "Park Hyung-sik"] },
        { id: 8, title: "Welcome to Waikiki", image: "Welcome to Waikiki.jpeg", watchUrl: "https://www.viki.com/tv/36425c-welcome-to-waikiki#about", genre: "Comedy, Drama", rating: 4.5, year: 2018, actors: ["Kim Jung-hyun", "Lee Yi-kyung"] },
        { id: 9, title: "What's Wrong With Secretary Kim", image: "Whats wrong.jpeg", watchUrl: "https://www.viki.com/tv/35835c-whats-wrong-with-secretary-kim#about", genre: "Romance, Comedy", rating: 4.6, year: 2018, actors: ["Park Seo-joon", "Park Min-young"] }
      ]
    },
    {
      name: "Action", icon: "💥", id: "action",
      dramas: [
        { id: 10, title: "Weak Hero Class 1", image: "Weak Hero Class 1.jpeg", watchUrl: "https://www.viki.com/tv/38971c-weak-hero-class-1#about", genre: "Action, Drama", rating: 4.6, year: 2022, actors: ["Park Ji-hoon", "Choi Hyun-wook"] },
        { id: 11, title: "Undercover High School", image: "download (1).jpeg", watchUrl: "https://www.viki.com/tv/40985c-undercover-high-school#about", genre: "Action, Comedy", rating: 4.4, year: 2025, actors: ["Seo Kang-joon", "Jin Ki-joo"] },
        { id: 12, title: "Healer", image: "Healer.jpeg", watchUrl: "https://www.viki.com/tv/23730c-healer#about", genre: "Action, Romance", rating: 4.8, year: 2014, actors: ["Ji Chang-wook", "Park Min-young"] }
      ]
    },
    {
      name: "Medical", icon: "🏥", id: "medical",
      dramas: [
        { id: 13, title: "Doctor John", image: "Doctor John.jpeg", watchUrl: "https://www.viki.com/tv/36646c-doctor-john#about", genre: "Medical, Drama", rating: 4.4, year: 2019, actors: ["Ji Sung", "Lee Se-young"] },
        { id: 14, title: "Doctor Stranger", image: "Dr stranger.jpeg", watchUrl: "https://www.viki.com/tv/22343c-doctor-stranger#about", genre: "Medical, Romance", rating: 4.3, year: 2014, actors: ["Lee Jong-suk", "Jin Se-yeon"] },
        { id: 15, title: "Romantic Doctor", image: "ROMANTIC DOCTOR, TEACHER KIM.jpeg", watchUrl: "https://www.viki.com/tv/32754c-dr-romantic#about", genre: "Medical, Drama", rating: 4.6, year: 2016, actors: ["Han Suk-kyu", "Yoo Yeon-seok"] }
      ]
    },
    {
      name: "Horror", icon: "👻", id: "horror",
      dramas: [
        { id: 16, title: "Duty After School", image: "DUTY AFTER SCHOOL.jpeg", watchUrl: "https://www.viki.com/tv/39621c-duty-after-school#about", genre: "Horror, Thriller", rating: 4.2, year: 2023, actors: ["Shin Hyun-soo", "Kim Ki-hae"] },
        { id: 17, title: "Happiness", image: "˗ˏˋ happiness ˎˊ-.jpeg", watchUrl: "https://www.viki.com/tv/38039c-happiness#about", genre: "Horror, Thriller", rating: 4.5, year: 2021, actors: ["Han Hyo-joo", "Park Hyung-sik"] },
        { id: 18, title: "Zombie Detective", image: "Zombie Detective (2020).jpeg", watchUrl: "https://www.viki.com/tv/37285c-zombie-detective#about", genre: "Horror, Comedy", rating: 4.1, year: 2020, actors: ["Choi Jin-hyuk", "Park Ju-hyun"] }
      ]
    }
  ];

  // ================= STATE =================
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  let currentFilter = "all", searchTimeout;

  // ================= ELEMENTS =================
  const $ = id => document.getElementById(id);
  const genresContainer = $("genresContainer"),
        searchBar = $("searchBar"),
        searchResults = $("searchResults"),
        clearSearch = $("clearSearch"),
        noResults = $("noResults"),
        filterTags = document.querySelectorAll(".filter-tag"),
        mobileMenuBtn = $("mobileMenuBtn"),
        navLinks = $("navLinks");

  // ================= INIT =================
  renderGenres();
  initMobileMenu();
  createScrollTop();
  checkLoginStatus();
  updateGenreStats();

  // ================= RENDER =================
  function renderGenres() {
    const filtered = currentFilter === "all"
      ? genresData
      : genresData.filter(g => g.id === currentFilter);

    if (!filtered.length) {
      noResults.style.display = "block";
      genresContainer.innerHTML = "";
      return;
    }

    noResults.style.display = "none";
    genresContainer.innerHTML = filtered.map(g => `
      <section class="genre-section" id="${g.id}">
        <h2 class="genre-title"><i>${g.icon}</i> ${g.name}</h2>
        <div class="genre-grid">${g.dramas.map(createDramaCard).join("")}</div>
      </section>
    `).join("");
  }

  function createDramaCard(drama) {
    const isFav = favorites.some(f => f.id === drama.id);
    return `
      <div class="card" data-id="${drama.id}">
        <img src="${drama.image}" alt="${drama.title}" loading="lazy">
        <div class="card-overlay">
          <h3 class="drama-title">${drama.title}</h3>
          <div class="drama-rating"><i class="fas fa-star"></i> ${drama.rating}</div>
          <a href="${drama.watchUrl}" target="_blank">
            <button class="watch-btn"><i class="fas fa-play"></i> Watch Now</button>
          </a>
          <button class="favorite-btn ${isFav ? "active" : ""}" 
            onclick="toggleFavorite(${drama.id}, '${drama.title.replace(/'/g, "\\'")}', '${drama.image}', '${drama.watchUrl}')">
            <i class="fas fa-heart"></i> ${isFav ? "Favorited" : "Add to Favorites"}
          </button>
        </div>
      </div>
    `;
  }

  // ================= FAVORITES =================
  window.toggleFavorite = (id, title, image, watchUrl) => {
    const index = favorites.findIndex(f => f.id === id);

    if (index === -1) {
      favorites.push({ id, title, image, watchUrl, dateAdded: new Date().toISOString() });
      notify("❤️ Added to favorites!", "success");
    } else {
      favorites.splice(index, 1);
      notify("Removed from favorites", "info");
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderGenres();
  };

  // ================= SEARCH =================
  searchBar?.addEventListener("input", e => {
    const term = e.target.value.toLowerCase().trim();
    clearTimeout(searchTimeout);

    clearSearch.style.display = term ? "block" : "none";
    if (!term) return searchResults.classList.remove("show");

    searchTimeout = setTimeout(() => {
      const results = genresData.flatMap(g => g.dramas).filter(d =>
        d.title.toLowerCase().includes(term) ||
        d.genre.toLowerCase().includes(term) ||
        d.actors.some(a => a.toLowerCase().includes(term))
      );
      displaySearchResults(results.slice(0, 5));
    }, 300);
  });

  function displaySearchResults(results) {
    searchResults.innerHTML = results.length
      ? results.map(d => `
          <div class="search-result-item" onclick="scrollToDrama(${d.id})">
            <img src="${d.image}" alt="${d.title}">
            <div class="search-result-info">
              <h4>${d.title}</h4>
              <p>${d.genre}</p>
              <span class="genre-tag">⭐ ${d.rating}</span>
            </div>
          </div>
        `).join("")
      : `<div class="search-result-item" style="justify-content:center;color:#999;">No dramas found</div>`;

    searchResults.classList.add("show");
  }

  clearSearch?.addEventListener("click", () => {
    searchBar.value = "";
    searchBar.focus();
    clearSearch.style.display = "none";
    searchResults.classList.remove("show");
  });

  document.addEventListener("click", e => {
    if (!searchBar?.contains(e.target) && !searchResults?.contains(e.target)) {
      searchResults.classList.remove("show");
    }
  });

  window.scrollToDrama = id => {
    const card = document.querySelector(`.card[data-id="${id}"]`);
    if (!card) return;

    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.style.animation = "pulse 1s ease";
    card.style.boxShadow = "0 0 0 3px #667eea";

    setTimeout(() => {
      card.style.animation = "";
      card.style.boxShadow = "";
    }, 2000);

    searchResults.classList.remove("show");
    searchBar.value = "";
    clearSearch.style.display = "none";
  };

  // ================= FILTER =================
  filterTags.forEach(tag => {
    tag.addEventListener("click", function () {
      filterTags.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      currentFilter = this.dataset.filter;
      renderGenres();
      genresContainer.scrollIntoView({ behavior: "smooth" });
    });
  });

  $("clearFiltersBtn")?.addEventListener("click", () => {
    filterTags.forEach(t => t.classList.remove("active"));
    document.querySelector('[data-filter="all"]')?.classList.add("active");
    currentFilter = "all";
    renderGenres();
  });

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

  // ================= NOTIFICATION =================
  function notify(message, type = "info") {
    const n = document.createElement("div");
    n.className = `notification ${type}`;
    n.innerHTML = message;
    document.body.appendChild(n);

    setTimeout(() => {
      n.style.animation = "slideIn 0.3s ease reverse";
      setTimeout(() => n.remove(), 300);
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

  // ================= LOGIN =================
  function checkLoginStatus() {
    const userMenu = document.querySelector(".user-menu");
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
      notify("Logged out successfully", "success");
      setTimeout(() => window.location.href = "home.html", 1500);
    });
  }

  // ================= EXTRA =================
  document.head.insertAdjacentHTML("beforeend", `
    <style>
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
    </style>
  `);

  function updateGenreStats() {
    const totalDramas = genresData.reduce((a, g) => a + g.dramas.length, 0);
    console.log(`Total Dramas: ${totalDramas}, Total Genres: ${genresData.length}`);
  }
});