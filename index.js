// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== DOM ELEMENTS ====================
    const loginForm = document.getElementById('loginForm');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const rememberMe = document.getElementById('rememberMe');
    const loginBtn = document.getElementById('loginBtn');

    // ==================== USERS DATABASE (SIMULATED) ====================
    // In a real application, this would be on your server
    const users = [
        {
            email: 'test@example.com',
            password: 'password123',
            name: 'Test User',
            id: 1
        },
        {
            email: 'user@kdworld.com',
            password: 'kdrama123',
            name: 'John Doe',
            id: 2
        },
        {
            email: 'admin@kdworld.com',
            password: 'admin123',
            name: 'Admin User',
            id: 3,
            role: 'admin'
        }
    ];

    // Check for saved credentials
    loadSavedCredentials();

    // Add input event listeners for real-time validation
    email.addEventListener('input', validateEmail);
    password.addEventListener('input', validatePassword);
    
    // ==================== VALIDATION FUNCTIONS ====================
    function validateEmail() {
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email.value.trim()) {
            email.classList.add('error');
            emailError.textContent = 'Email is required';
            emailError.classList.add('show');
            return false;
        } else if (!emailRegex.test(email.value)) {
            email.classList.add('error');
            emailError.textContent = 'Please enter a valid email address';
            emailError.classList.add('show');
            return false;
        } else {
            email.classList.remove('error');
            emailError.classList.remove('show');
            return true;
        }
    }

    function validatePassword() {
        const passwordError = document.getElementById('passwordError');
        
        if (!password.value) {
            password.classList.add('error');
            passwordError.textContent = 'Password is required';
            passwordError.classList.add('show');
            return false;
        } else if (password.value.length < 6) {
            password.classList.add('error');
            passwordError.textContent = 'Password must be at least 6 characters';
            passwordError.classList.add('show');
            return false;
        } else {
            password.classList.remove('error');
            passwordError.classList.remove('show');
            return true;
        }
    }

    // ==================== AUTHENTICATION FUNCTION ====================
    function authenticateUser(email, password) {
        // Find user by email (case-insensitive)
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (!user) {
            return {
                success: false,
                message: 'Email not found. Please check your email or sign up.'
            };
        }

        // Check password
        if (user.password !== password) {
            return {
                success: false,
                message: 'Incorrect password. Please try again.'
            };
        }

        // Login successful
        return {
            success: true,
            message: 'Login successful!',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role || 'user'
            }
        };
    }

    // ==================== SAVE CREDENTIALS ====================
    function saveCredentials() {
        if (rememberMe.checked) {
            // Save email only, NEVER save passwords in localStorage!
            localStorage.setItem('savedEmail', email.value);
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('savedEmail');
            localStorage.removeItem('rememberMe');
        }
    }

    // ==================== LOAD SAVED CREDENTIALS ====================
    function loadSavedCredentials() {
        const savedEmail = localStorage.getItem('savedEmail');
        const remember = localStorage.getItem('rememberMe');
        
        if (savedEmail && remember === 'true') {
            email.value = savedEmail;
            rememberMe.checked = true;
        }
    }

    // ==================== HANDLE LOGIN ====================
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateEmail() || !validatePassword()) {
            return;
        }

        // Show loading state
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;
        const originalText = loginBtn.innerHTML;
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';

        // Get form data
        const emailValue = email.value.trim();
        const passwordValue = password.value;

        // Simulate network delay (remove in production)
        setTimeout(() => {
            // Authenticate user
            const result = authenticateUser(emailValue, passwordValue);

            if (result.success) {
                // Save credentials if remember me is checked
                saveCredentials();
                
                // Store user data in session storage
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userData', JSON.stringify(result.user));
                sessionStorage.setItem('authToken', 'dummy-jwt-token-' + Date.now());

                // Show success message
                showNotification('Login successful! Redirecting...', 'success');

                // Redirect to home page
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1500);
            } else {
                // Show error message
                showNotification(result.message, 'error');
                
                // Clear password field
                password.value = '';
                password.focus();

                // Add shake animation to form
                loginForm.classList.add('shake');
                setTimeout(() => {
                    loginForm.classList.remove('shake');
                }, 500);
            }

            // Reset button state
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
            loginBtn.innerHTML = originalText;
        }, 1000); // Simulate network delay
    });

    // ==================== DEMO CREDENTIALS HELPER ====================
    function showDemoCredentials() {
        // Create demo credentials banner
        const demoBanner = document.createElement('div');
        demoBanner.className = 'demo-credentials';
        demoBanner.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <div>
                <strong>Demo Credentials:</strong><br>
                Email: test@example.com<br>
                Password: password123
            </div>
            <button class="use-demo-btn" onclick="fillDemoCredentials()">
                Use Demo
            </button>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .demo-credentials {
                background: rgba(102, 126, 234, 0.1);
                border: 2px solid #667eea;
                border-radius: 10px;
                padding: 1rem;
                margin-top: 1rem;
                display: flex;
                align-items: center;
                gap: 1rem;
                animation: slideUp 0.5s ease;
            }
            
            .demo-credentials i {
                font-size: 2rem;
                color: #667eea;
            }
            
            .demo-credentials div {
                flex: 1;
                color: #333;
                line-height: 1.6;
            }
            
            .use-demo-btn {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s ease;
            }
            
            .use-demo-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
            }
            
            .shake {
                animation: shake 0.5s ease;
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);

        // Add to form
        loginForm.appendChild(demoBanner);
    }

    // ==================== FILL DEMO CREDENTIALS ====================
    window.fillDemoCredentials = function() {
        email.value = 'test@example.com';
        password.value = 'password123';
        showNotification('Demo credentials filled!', 'success');
    };

    // ==================== SHOW NOTIFICATION ====================
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = message;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 10px;
                color: white;
                font-weight: 500;
                z-index: 9999;
                animation: slideIn 0.3s ease;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
                max-width: 350px;
            }
            
            .notification.success {
                background: linear-gradient(135deg, #52c41a, #389e0d);
            }
            
            .notification.error {
                background: linear-gradient(135deg, #ff4d4f, #cf1322);
            }
            
            .notification.info {
                background: linear-gradient(135deg, #1890ff, #096dd9);
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    // ==================== ADD PASSWORD TOGGLE ====================
    function addPasswordToggle() {
        const passwordGroup = password.closest('.input-group');
        
        // Create toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'password-toggle';
        toggleBtn.innerHTML = '<i class="far fa-eye"></i>';
        toggleBtn.setAttribute('aria-label', 'Toggle password visibility');
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .input-group {
                position: relative;
            }
            
            .password-toggle {
                position: absolute;
                right: 15px;
                top: 40px;
                background: none;
                border: none;
                cursor: pointer;
                color: #999;
                transition: color 0.3s ease;
                padding: 5px;
            }
            
            .password-toggle:hover {
                color: #667eea;
            }
            
            .password-toggle i {
                font-size: 1.2rem;
            }
        `;
        document.head.appendChild(style);
        
        passwordGroup.appendChild(toggleBtn);
        
        toggleBtn.addEventListener('click', () => {
            const type = password.type === 'password' ? 'text' : 'password';
            password.type = type;
            toggleBtn.innerHTML = type === 'password' ? 
                '<i class="far fa-eye"></i>' : 
                '<i class="far fa-eye-slash"></i>';
        });
    }

    // ==================== INITIALIZE ====================
    addPasswordToggle();
    
    // Show demo credentials after 1 second
    setTimeout(showDemoCredentials, 1000);

    // ==================== ENTER KEY HANDLER ====================
    password.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit'));
        }
    });

    // ==================== CLEAR ERRORS ON FOCUS ====================
    email.addEventListener('focus', () => {
        email.classList.remove('error');
    });
    
    password.addEventListener('focus', () => {
        password.classList.remove('error');
    });
});