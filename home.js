    // DRAMA DATABASE (including the style & info from image: family by choice, true beauty, the k2, idol etc with prices)
    const allDramas = [
        { id: 1, title: "Family By Choice", poster: "FAMILY BY CHOICE.jpeg", genre: "Romance, Comedy", subs: "English, German, Arabic, French", price: "£9.99", buyLink: "https://www.amazon.co.uk/dp/B08C1D8Q7Z", watchLink: "https://www.viki.com/tv/40435c-family-by-choice", detailPage: "family.html" },
        { id: 2, title: "True Beauty", poster: "True Beauty.jpeg", genre: "Idol Drama, Rom-Com", subs: "English, German, Arabic, French", price: "£9.99", buyLink: "https://www.amazon.co.uk/dp/B08C1D8Q7Z", watchLink: "https://www.viki.com/tv/37374c-true-beauty", detailPage: "true.html" },
        { id: 3, title: "The K2", poster: "The K2.jpeg", genre: "Action, Romance, Thriller", subs: "English, German, Arabic, French", price: "£9.99", buyLink: "https://www.amazon.co.uk/dp/B08C1D8Q7Z", watchLink: "https://www.viki.com/tv/31865c-the-k2", detailPage: "k2.html" },
        { id: 4, title: "IDOL", poster: "Idol I Kdrama Poster.jpeg", genre: "Romance, Musical", subs: "English, Spanish, Arabic, French", price: "£9.99", buyLink: "https://www.amazon.co.uk/dp/B08C1D8Q7Z", watchLink: "https://www.viki.com/tv/41302c-idol-i", detailPage: "idol.html" },
        { id: 5, title: "Lovely Runner", poster: "Lovely Runner.jpeg", genre: "Fantasy, Romance", subs: "English, Japanese, Korean", price: "£9.99", buyLink: "https://www.amazon.co.uk/dp/B08C1D8Q7Z", watchLink: "https://www.viki.com/tv/40466c-lovely-runner", detailPage: "lovely.html" },
        { id: 6, title: "Fight For My Way", poster: "fight.jpeg", genre: "Romantic Comedy, Drama", subs: "English, Japanese +34 more", price: "£9.99", buyLink: "https://www.amazon.co.uk/dp/B08C1D8Q7Z", watchLink: "https://www.viki.com/tv/34479c-fight-for-my-way", detailPage: "fight.html" },
        { id: 7, title: "Love Scout", poster: "love scout.jpeg", genre: "Romance, Drama", subs: "English, French, Thai", price: "£9.99", buyLink: "https://www.amazon.co.uk/dp/B08C1D8Q7Z", watchLink: "https://www.viki.com/tv/40833c-love-scout", detailPage: "love.html" },
        { id: 8, title: "To My Beloved Thief", poster: "To my beloved thief.jpeg", genre: "Costume, Rom-Com", subs: "English, Hindi, Indonesian", price: "£9.99", buyLink: "https://www.amazon.co.uk/dp/B08C1D8Q7Z", watchLink: "https://www.viki.com/tv/41295c-to-my-beloved-thief", detailPage: "thief.html" },
        { id: 9, title: "Motel California", poster: "Мотель Калифорния_Motel California.jpeg", genre: "Melodrama, Romance", subs: "English, Italian, Romanian", price: "£9.99", buyLink: "https://www.amazon.co.uk/dp/B08C1D8Q7Z", watchLink: "https://www.viki.com/tv/40832c-motel-california", detailPage: "motel.html" },
        { id: 10, title: "Way Back Love", poster: "Way Back Love.jpeg", genre: "Supernatural, Romance", subs: "English, Polish, Spanish", price: "£9.99", buyLink: "https://www.amazon.co.uk/dp/B08C1D8Q7Z", watchLink: "https://www.viki.com/tv/40999c-way-back-love", detailPage: "way.html" }
    ];

    let visibleCount = 6;  // initially 6 dramas (matching the vibe from image: shows 4 but we load more)
    let dramaGrid = document.getElementById('dramaGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    function renderDramas() {
        if (!dramaGrid) return;
        const visibleDramas = allDramas.slice(0, visibleCount);
        dramaGrid.innerHTML = '';
        visibleDramas.forEach(drama => {
            const card = document.createElement('div');
            card.className = 'drama-card';
            // poster
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
            
            // info
            const infoDiv = document.createElement('div');
            infoDiv.className = 'drama-info';
            infoDiv.innerHTML = `
                <h4>${drama.title}</h4>
                <div class="genre-tag"><i class="fas fa-tag"></i> ${drama.genre}</div>
                <div class="subs-info"><i class="fas fa-globe"></i> ${drama.subs}</div>
                <div class="price-badge"><i class="fas fa-pound-sign"></i> ${drama.price}</div>
            `;
            const actions = document.createElement('div');
            actions.className = 'action-buttons';
            
            const detailsBtn = document.createElement('button');
            detailsBtn.innerHTML = '<i class="fas fa-info-circle"></i> View Details';
            detailsBtn.onclick = () => { alert(`✨ "${drama.title}" details page (simulated).`); };
            
            const favBtn = document.createElement('button');
            favBtn.innerHTML = '<i class="fas fa-heart"></i> Favorite';
            favBtn.onclick = () => {
                showToast(`❤️ "${drama.title}" added to favorites!`);
            };
            
            const buyLink = document.createElement('a');
            buyLink.href = drama.buyLink;
            buyLink.target = '_blank';
            buyLink.className = 'buy-link';
            buyLink.innerHTML = '<i class="fas fa-shopping-cart"></i> Buy Now';
            
            actions.appendChild(detailsBtn);
            actions.appendChild(favBtn);
            actions.appendChild(buyLink);
            infoDiv.appendChild(actions);
            card.appendChild(posterDiv);
            card.appendChild(infoDiv);
            dramaGrid.appendChild(card);
        });
        
        // hide load more if all shown
        if (visibleCount >= allDramas.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }

    function showToast(msg) {
        const existing = document.querySelector('.toast-msg');
        if(existing) existing.remove();
        const toast = document.createElement('div');
        toast.className = 'toast-msg';
        toast.innerHTML = msg;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }

    // Slider logic (image carousel)
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
        let newIndex = (currentSlide + 1) % slides.length;
        updateSlides(newIndex);
    }
    function prevSlide() {
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
    
    // load more
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleCount = Math.min(visibleCount + 4, allDramas.length);
            renderDramas();
        });
    }
    
    // mobile menu simulation (basic)
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') navLinks.style.display = 'none';
            else navLinks.style.display = 'flex';
        });
    }
    
    renderDramas();