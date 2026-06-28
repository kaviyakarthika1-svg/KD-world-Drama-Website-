document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== DOM ELEMENTS ====================
    const loginForm = document.getElementById('loginForm');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const rememberMe = document.getElementById('rememberMe');
    const loginBtn = document.getElementById('loginBtn');

    // Initialize state
    loadSavedCredentials();
    addPasswordToggle();

    // Input monitoring listeners
    email.addEventListener('input', validateEmail);
    password.addEventListener('input', validatePassword);
    email.addEventListener('focus', () => clearError(email, 'emailError'));
    password.addEventListener('focus', () => clearError(password, 'passwordError'));

    // ==================== VALIDATION LOGIC ====================
    function validateEmail() {
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const value = email.value.trim();
        
        if (!value) {
            showInputError(email, emailError, 'Email is required');
            return false;
        } else if (!emailRegex.test(value)) {
            showInputError(email, emailError, 'Please enter a valid email address');
            return false;
        } else {
            clearError(email, 'emailError');
            return true;
        }
    }

    function validatePassword() {
        const passwordError = document.getElementById('passwordError');
        const value = password.value;
        
        if (!value) {
            showInputError(password, passwordError, 'Password is required');
            return false;
        } else if (value.length < 6) {
            showInputError(password, passwordError, 'Password must be at least 6 characters');
            return false;
        } else {
            clearError(password, 'passwordError');
            return true;
        }
    }

    function showInputError(inputEl, errorEl, message) {
        inputEl.classList.add('error');
        errorEl.textContent = message;
        errorEl.classList.add('show');
    }

    function clearError(inputEl, errorId) {
        const errorEl = document.getElementById(errorId);
        inputEl.classList.remove('error');
        if (errorEl) errorEl.classList.remove('show');
    }

    // ==================== AUTHENTICATION RUNTIME ====================
    function authenticateUser(emailVal, passwordVal) {
        // CHANGED: Removed the strict mock user array check so you can test freely!
        // It now accepts ANY email as long as the password is at least 6 characters.
        return { 
            success: true, 
            user: {
                email: emailVal,
                name: 'KD World Explorer'
            } 
        };
    }

    // ==================== CREDENTIALS PERSISTENCE ====================
    function saveCredentials() {
        if (rememberMe.checked) {
            localStorage.setItem('savedEmail', email.value.trim());
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('savedEmail');
            localStorage.removeItem('rememberMe');
        }
    }

    function loadSavedCredentials() {
        const savedEmail = localStorage.getItem('savedEmail');
        const remember = localStorage.getItem('rememberMe');
        if (savedEmail && remember === 'true') {
            email.value = savedEmail;
            rememberMe.checked = true;
        }
    }

    // ==================== INTERACTION ACTION INJECTIONS ====================
    function addPasswordToggle() {
        const passwordGroup = password.closest('.input-group');
        if (!passwordGroup) return;

        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'password-toggle';
        toggleBtn.innerHTML = '<i class="far fa-eye"></i>';
        toggleBtn.setAttribute('aria-label', 'Toggle visibility view control option');
        
        passwordGroup.appendChild(toggleBtn);
        
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isPassword = password.type === 'password';
            password.type = isPassword ? 'text' : 'password';
            toggleBtn.innerHTML = isPassword ? '<i class="far fa-eye-slash"></i>' : '<i class="far fa-eye"></i>';
        });
    }

    // ==================== SUBMIT EVENT RUNTIME HANDLING ====================
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (!isEmailValid || !isPasswordValid) {
            triggerFormShake();
            return;
        }

        // Configure UI Processing Loading State Representation
        loginBtn.disabled = true;
        const originalContent = loginBtn.innerHTML;
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

        const emailValue = email.value.trim();
        const passwordValue = password.value;

        // Artificial execution delay representing remote network authentication trip verification
        setTimeout(() => {
            const result = authenticateUser(emailValue, passwordValue);

            if (result.success) {
                saveCredentials();
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userData', JSON.stringify(result.user));
                
                showNotification('Welcome Back! Redirecting to setup portal...', 'success');
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1200);
            } else {
                showNotification(result.message, 'error');
                password.value = '';
                password.focus();
                triggerFormShake();
                
                loginBtn.disabled = false;
                loginBtn.innerHTML = originalContent;
            }
        }, 800);
    });

    function triggerFormShake() {
        loginForm.classList.add('shake');
        setTimeout(() => loginForm.classList.remove('shake'), 400);
    }

    // Helper Notification component dispatch system element
    function showNotification(message, type) {
        const oldAlert = document.querySelector('.global-toast-alert');
        if (oldAlert) oldAlert.remove();

        const toast = document.createElement('div');
        toast.className = `global-toast-alert ${type}`;
        toast.textContent = message;

        // Apply inline styles to prevent injection styling gaps outside document context limits
        Object.assign(toast.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '14px 24px',
            borderRadius: '10px',
            color: '#fff',
            fontWeight: '600',
            fontSize: '14px',
            zIndex: '99999',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            background: type === 'success' ? 'linear-gradient(135deg, #52c41a, #389e0d)' : 'linear-gradient(135deg, #ff4d4f, #cf1322)'
        });

        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
});