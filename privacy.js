// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== DOM ELEMENTS ====================
    const profileTrigger = document.getElementById('profileTrigger');
    const profileMenu = document.getElementById('profileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const signOutBtn = document.getElementById('signOutBtn');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const themeToggle = document.getElementById('themeToggle');
    const dropdownArrow = document.getElementById('dropdownArrow');

    // User data (in production, this would come from your backend/session)
    const userData = {
        name: 'John Doe',
        email: 'john.doe@kdworld.com',
        membership: 'premium',
        stats: {
            days: 127,
            dramas: 45,
            reviews: 12,
            hours: 127,
            avgRating: 4.8
        }
    };

    // ==================== INITIALIZATION ====================
    loadUserData();
    initializeProfileDropdown();
    initializeMobileMenu();
    initializeDarkMode();
    initializeClickOutside();
    loadContinueWatching();

    // ==================== LOAD USER DATA ====================
    function loadUserData() {
        // Update profile information
        document.getElementById('profileName').textContent = userData.name;
        document.getElementById('menuUserName').textContent = userData.name;
        document.getElementById('menuUserEmail').textContent = userData.email;
        document.getElementById('welcomeName').textContent = userData.name.split(' ')[0] + '!';
        
        // Update stats
        updateStats(userData.stats);
        
        // Update profile images with user's name
        updateProfileImages(userData.name);
    }

    function updateStats(stats) {
        document.querySelectorAll('.stat-value').forEach((el, index) => {
            const values = [stats.dramas, stats.hours, stats.avgRating];
            if (el.closest('.stat-card')) {
                // Update main stats
                const statNumbers = document.querySelectorAll('.stat-card .stat-number');
                if (statNumbers[0]) statNumbers[0].textContent = stats.dramas;
                if (statNumbers[1]) statNumbers[1].textContent = stats.hours;
                if (statNumbers[2]) statNumbers[2].textContent = stats.avgRating;
            } else if (el.closest('.user-stats')) {
                // Update menu footer stats
                const statValues = document.querySelectorAll('.user-stats .stat-value');
                if (statValues[0]) statValues[0].textContent = stats.days;
                if (statValues[1]) statValues[1].textContent = stats.dramas;
                if (statValues[2]) statValues[2].textContent = stats.reviews;
            }
        });
    }

    function updateProfileImages(name) {
        const encodedName = encodeURIComponent(name);
        const imageUrl = `https://ui-avatars.com/api/?name=${encodedName}&background=667eea&color=fff&bold=true&size=128`;
        
        document.querySelectorAll('.profile-img, .menu-header-img').forEach(img => {
            img.src = imageUrl;
        });
    }

    // ==================== PROFILE DROPDOWN ====================
    function initializeProfileDropdown() {
        profileTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleProfileMenu();
        });

        // Keyboard accessibility
        profileTrigger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleProfileMenu();
            } else if (e.key === 'Escape' && profileMenu.classList.contains('show')) {
                closeProfileMenu();
            }
        });

        // Handle menu item keyboard navigation
        const menuItems = profileMenu.querySelectorAll('[role="menuitem"]');
        menuItems.forEach((item, index) => {
            item.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const next = menuItems[index + 1] || menuItems[0];
                    next.focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prev = menuItems[index - 1] || menuItems[menuItems.length - 1];
                    prev.focus();
                } else if (e.key === 'Escape') {
                    closeProfileMenu();
                    profileTrigger.focus();
                }
            });
        });
    }

    function toggleProfileMenu() {
        const isOpen = profileMenu.classList.contains('show');
        if (isOpen) {
            closeProfileMenu();
        } else {
            openProfileMenu();
        }
    }

    function openProfileMenu() {
        profileMenu.classList.add('show');
        profileTrigger.classList.add('active');
        profileTrigger.setAttribute('aria-expanded', 'true');
        dropdownArrow.style.transform = 'rotate(180deg)';
        
        // Trigger animation for menu items
        document.querySelectorAll('.menu-items li').forEach((item, index) => {
            item.style.animation = `fadeInUp 0.3s ease ${index * 0.1}s forwards`;
        });
    }

    function closeProfileMenu() {
        profileMenu.classList.remove('show');
        profileTrigger.classList.remove('active');
        profileTrigger.setAttribute('aria-expanded', 'false');
        dropdownArrow.style.transform = 'rotate(0deg)';
        
        // Reset animations
        document.querySelectorAll('.menu-items li').forEach(item => {
            item.style.animation = '';
        });
    }

    // Close menu when clicking outside
    function initializeClickOutside() {
        document.addEventListener('click', function(e) {
            if (!profileTrigger.contains(e.target) && !profileMenu.contains(e.target)) {
                closeProfileMenu();
            }
        });
    }

    // ==================== MOBILE MENU ====================
    function initializeMobileMenu() {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
                document.body.style.overflow = 'hidden';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelectorAll('span').forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
                document.body.style.overflow = '';
            });
        });
    }

    // ==================== DARK MODE ====================
    function initializeDarkMode() {
        // Check for saved preference
        const darkMode = localStorage.getItem('darkMode') === 'true';
        
        if (darkMode) {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
            updateThemeText(true);
        }

        darkModeToggle.addEventListener('change', function(e) {
            const isDark = e.target.checked;
            document.body.classList.toggle('dark-mode', isDark);
            localStorage.setItem('darkMode', isDark);
            updateThemeText(isDark);
            
            showNotification(`${isDark ? 'Dark' : 'Light'} mode activated`, 'info');
        });
    }

    function updateThemeText(isDark) {
        const themeText = themeToggle.querySelector('.theme-text span:last-child');
        const icon = themeToggle.querySelector('.theme-text i');
        
        if (isDark) {
            themeText.textContent = 'Light Mode';
            icon.className = 'fas fa-sun';
        } else {
            themeText.textContent = 'Dark Mode';
            icon.className = 'fas fa-moon';
        }
    }

    // ==================== SIGN OUT ====================
    signOutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Show confirmation dialog
        if (confirm('Are you sure you want to sign out?')) {
            // Clear session storage
            sessionStorage.clear();
            
            // Show loading state
            signOutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing out...';
            
            // Simulate sign out process
            setTimeout(() => {
                showNotification('Signed out successfully', 'success');
                window.location.href = 'login.html';
            }, 1000);
        }
    });

    // ==================== LOAD CONTINUE WATCHING ====================
    function loadContinueWatching() {
        const dramaGrid = document.querySelector('.drama-grid');
        
        // Show loading spinner
        dramaGrid.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';
        
        // Simulate API call
        setTimeout(() => {
            // Sample continue watching data
            const dramas = [
                { title: 'Crash Landing on You', progress: 75, image: 'https://via.placeholder.com/300x400' },
                { title: 'Goblin', progress: 45, image: 'https://via.placeholder.com/300x400' },
                { title: 'Itaewon Class', progress: 90, image: 'https://via.placeholder.com/300x400' },
                { title: 'Vincenzo', progress: 30, image: 'https://via.placeholder.com/300x400' }
            ];

            dramaGrid.innerHTML = dramas.map(drama => `
                <div class="drama-card">
                    <img src="${drama.image}" alt="${drama.title}">
                    <div class="progress-bar">
                        <div class="progress" style="width: ${drama.progress}%"></div>
                    </div>
                    <h4>${drama.title}</h4>
                    <p>${drama.progress}% completed</p>
                </div>
            `).join('');
        }, 1500);
    }

    // ==================== NOTIFICATION FUNCTION ====================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // ==================== UPDATE USER DATA (SIMULATED) ====================
    function updateUserData() {
        // This would normally come from an API
        setInterval(() => {
            const newStats = {
                ...userData.stats,
                dramas: userData.stats.dramas + 1
            };
            updateStats(newStats);
        }, 300000); // Update every 5 minutes (simulated)
    }

    // Start periodic updates
    updateUserData();

    // ==================== ADD STYLES FOR DRAMA CARDS ====================
    const style = document.createElement('style');
    style.textContent = `
        .drama-card {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: var(--shadow-sm);
            transition: var(--transition);
        }
        
        .drama-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }
        
        .drama-card img {
            width: 100%;
            height: 250px;
            object-fit: cover;
        }
        
        .progress-bar {
            height: 5px;
            background: #e1e1e1;
            margin: 10px 0;
        }
        
        .progress {
            height: 100%;
            background: var(--primary-gradient);
            border-radius: 5px;
        }
        
        .drama-card h4 {
            padding: 0 10px;
            margin-bottom: 5px;
            color: var(--text-dark);
        }
        
        .drama-card p {
            padding: 0 10px 10px;
            color: var(--text-light);
            font-size: 0.9rem;
        }
        
        body.dark-mode .drama-card {
            background: #1a1a2e;
        }
        
        body.dark-mode .drama-card h4 {
            color: #fff;
        }
        
        body.dark-mode .drama-card p {
            color: #999;
        }
    `;
    document.head.appendChild(style);
});