// --- 1. DRAMA DATABASE ---
// Cleaned: Removed all price, buyLink, and shopping cart details.
// Configured: Links directly to your detail pages using drama.detailPage.
const allDramas = [
    { id: 1, title: "Family By Choice", poster: "FAMILY BY CHOICE.jpeg", genre: "Romance, Comedy", subs: "English, German, Arabic, French", watchLink: "https://www.viki.com/tv/40435c-family-by-choice", detailPage: "family.html" },
    { id: 2, title: "True Beauty", poster: "True Beauty.jpeg", genre: "Idol Drama, Rom-Com", subs: "English, German, Arabic, French", watchLink: "https://www.viki.com/tv/37374c-true-beauty", detailPage: "true.html" },
    { id: 3, title: "The K2", poster: "The K2.jpeg", genre: "Action, Romance, Thriller", subs: "English, German, Arabic, French", watchLink: "https://www.viki.com/tv/31865c-the-k2", detailPage: "k2.html" },
    { id: 4, title: "IDOL", poster: "Idol I Kdrama Poster.jpeg", genre: "Romance, Musical", subs: "English, Spanish, Arabic, French", watchLink: "https://www.viki.com/tv/41302c-idol-i", detailPage: "idol.html" },
    { id: 5, title: "Lovely Runner", poster: "Lovely Runner.jpeg", genre: "Fantasy, Romance", subs: "English, Japanese, Korean", watchLink: "https://www.viki.com/tv/40466c-lovely-runner", detailPage: "lovely.html" },
    { id: 6, title: "Fight For My Way", poster: "fight.jpeg", genre: "Romantic Comedy, Drama", subs: "English, Japanese +34 more", watchLink: "https://www.viki.com/tv/34479c-fight-for-my-way", detailPage: "fight.html" },
    { id: 7, title: "Love Scout", poster: "love scout.jpeg", genre: "Romance, Drama", subs: "English, French, Thai", watchLink: "https://www.viki.com/tv/40833c-love-scout", detailPage: "love.html" },
    { id: 8, title: "To My Beloved Thief", poster: "To my beloved thief.jpeg", genre: "Costume, Rom-Com", subs: "English, Hindi, Indonesian", watchLink: "https://www.viki.com/tv/41295c-to-my-beloved-thief", detailPage: "thief.html" },
    { id: 9, title: "Motel California", poster: "Мотель Калифорния_Motel California.jpeg", genre: "Melodrama, Romance", subs: "English, Italian, Romanian", watchLink: "https://www.viki.com/tv/40832c-motel-california", detailPage: "motel.html" },
    { id: 10, title: "Way Back Love", poster: "Way Back Love.jpeg", genre: "Supernatural, Romance", subs: "English, Polish, Spanish", watchLink: "https://www.viki.com/tv/40999c-way-back-love", detailPage: "way.html" }
];

let visibleCount = 6;
let dramaGrid = document.getElementById('dramaGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// --- 2. RENDER CARD LOGIC ---
function renderDramas() {
    if (!dramaGrid) return;
    const visibleDramas = allDramas.slice(0, visibleCount);
    dramaGrid.innerHTML = '';
    
    visibleDramas.forEach(drama => {
        const card = document.createElement('div');
        card.className = 'drama-card';
        
        // Poster Setup
        const posterDiv = document.createElement('div');
        posterDiv.className = 'poster-wrapper';
        
        const img = document.createElement('img');
        img.src = drama.poster;
        img.alt = drama.title;
        img.onerror = () => { img.src = 'https://placehold.co/400x550/f7e2ec/c8507b?text=' + encodeURIComponent(drama.title); };
        
        const overlay = document.createElement('div');
        overlay.className = 'watch-overlay';
        
        const watchBtn = document.createElement('button');
        watchBtn.className = 'watch-btn';
        watchBtn.innerHTML = '<i class="fas fa-play"></i> Watch Now';
        watchBtn.onclick = (e) => {
            e.stopPropagation();
            window.open(drama.watchLink, '_blank');
        };
        
        overlay.appendChild(watchBtn);
        posterDiv.appendChild(img);
        posterDiv.appendChild(overlay);
        
        // Info Layout (Price badge component removed completely)
        const infoDiv = document.createElement('div');
        infoDiv.className = 'drama-info';
        infoDiv.innerHTML = `
            <h4>${drama.title}</h4>
            <div class="genre-tag" style="margin-bottom: 6px; font-size: 0.9rem; color: #667eea;"><i class="fas fa-tag"></i> ${drama.genre}</div>
            <div class="subs-info" style="font-size: 0.85rem; color: #666; margin-bottom: 15px;"><i class="fas fa-globe"></i> ${drama.subs}</div>
        `;
        
        const actions = document.createElement('div');
        actions.className = 'action-buttons';
        actions.style.display = 'flex';
        actions.style.gap = '10px';
        
        // Dynamic Page Redirection Button
        const detailsBtn = document.createElement('button');
        detailsBtn.style.flex = '1';
        detailsBtn.innerHTML = '<i class="fas fa-info-circle"></i> Details';
        detailsBtn.onclick = () => { 
            window.location.href = drama.detailPage; 
        };
        
        // Favorite Button Toggle
        const favBtn = document.createElement('button');
        favBtn.style.flex = '1';
        favBtn.innerHTML = '<i class="fas fa-heart"></i> Favorite';
        favBtn.onclick = () => {
            showToast(`❤️ "${drama.title}" added to favorites!`);
        };
        
        actions.appendChild(detailsBtn);
        actions.appendChild(favBtn);
        infoDiv.appendChild(actions);
        card.appendChild(posterDiv);
        card.appendChild(infoDiv);
        dramaGrid.appendChild(card);
    });
    
    // Hide or display Load More Button
    if (loadMoreBtn) {
        if (visibleCount >= allDramas.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }
}

function showToast(msg) {
    const existing = document.querySelector('.toast-msg');
    if(existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    // Style applied inline to maintain view independence
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.85)',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '30px',
        fontSize: '0.95rem',
        zIndex: '3000',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    });
    toast.innerHTML = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// --- 3. CAROUSEL BANNER CONTROLLER ---
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-img');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');

function updateSlides(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
}

function nextSlide() {
    if (slides.length === 0) return;
    let newIndex = (currentSlide + 1) % slides.length;
    updateSlides(newIndex);
}

function prevSlide() {
    if (slides.length === 0) return;
    let newIndex = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides(newIndex);
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    setInterval(nextSlide, 5000);
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => updateSlides(idx));
    });
}

// --- 4. EVEN HANDLERS & INITIALIZATION ---
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        visibleCount = Math.min(visibleCount + 4, allDramas.length);
        renderDramas();
    });
}

const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Initialize layout rendering
renderDramas();