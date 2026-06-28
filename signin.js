// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Get all form elements
    const form = document.getElementById('signupForm');
    const name = document.getElementById('name');
    const age = document.getElementById('age');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const terms = document.getElementById('terms');
    const submitBtn = document.getElementById('submitBtn');

    // Add input event listeners for real-time validation
    name.addEventListener('input', validateName);
    age.addEventListener('input', validateAge);
    email.addEventListener('input', validateEmail);

    password.addEventListener('input', function () {
        validatePassword();
        validateConfirm();
        updatePasswordStrength();
    });

    confirmPassword.addEventListener('input', validateConfirm);
    terms.addEventListener('change', validateForm);


    // Validate Name
    function validateName() {
        const nameError = document.getElementById('nameError');

        if (name.value.trim().length < 2) {
            name.classList.add('error');
            nameError.classList.add('show');
            return false;
        } else {
            name.classList.remove('error');
            nameError.classList.remove('show');
            return true;
        }
    }


    // Validate Age
    function validateAge() {
        const ageError = document.getElementById('ageError');
        const ageValue = parseInt(age.value);

        if (ageValue < 13 || ageValue > 120 || isNaN(ageValue)) {
            age.classList.add('error');
            ageError.classList.add('show');
            return false;
        } else {
            age.classList.remove('error');
            ageError.classList.remove('show');
            return true;
        }
    }


    // Validate Email
    function validateEmail() {
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.value)) {
            email.classList.add('error');
            emailError.classList.add('show');
            return false;
        } else {
            email.classList.remove('error');
            emailError.classList.remove('show');
            return true;
        }
    }


    // Validate Password
    function validatePassword() {
        const passwordError = document.getElementById('passwordError');

        if (password.value.length < 8) {
            password.classList.add('error');
            passwordError.classList.add('show');
            return false;
        } else {
            password.classList.remove('error');
            passwordError.classList.remove('show');
            return true;
        }
    }


    // Confirm Password Validation
    function validateConfirm() {
        const confirmError = document.getElementById('confirmError');

        if (password.value !== confirmPassword.value || confirmPassword.value === '') {
            confirmPassword.classList.add('error');
            confirmError.classList.add('show');
            return false;
        } else {
            confirmPassword.classList.remove('error');
            confirmError.classList.remove('show');
            return true;
        }
    }


    // Password Strength Meter
    function updatePasswordStrength() {
        const passwordValue = password.value;
        const strengthBar = document.getElementById('strengthBar');
        const strengthText = document.getElementById('strengthText');

        let strength = 0;

        if (passwordValue.length >= 8) strength++;
        if (passwordValue.match(/[a-z]/) && passwordValue.match(/[A-Z]/)) strength++;
        if (passwordValue.match(/\d/)) strength++;
        if (passwordValue.match(/[^a-zA-Z\d]/)) strength++;

        strengthBar.className = 'strength-bar';

        if (passwordValue.length === 0) {
            strengthBar.style.width = '0';
            strengthText.textContent = 'Enter password';
        }
        else if (strength <= 2) {
            strengthBar.classList.add('weak');
            strengthText.textContent = 'Weak password';
        }
        else if (strength === 3) {
            strengthBar.classList.add('medium');
            strengthText.textContent = 'Medium password';
        }
        else {
            strengthBar.classList.add('strong');
            strengthText.textContent = 'Strong password';
        }
    }


    // Validate Full Form
    function validateForm() {
        const isValid =
            validateName() &&
            validateAge() &&
            validateEmail() &&
            validatePassword() &&
            validateConfirm() &&
            terms.checked;

        submitBtn.disabled = !isValid;
        return isValid;
    }


    // Form Submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (validateForm()) {

            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Creating Account...';
            submitBtn.disabled = true;

            const formData = {
                name: name.value.trim(),
                age: parseInt(age.value),
                email: email.value.trim(),
                password: password.value
            };

            // Simulate API call
            setTimeout(() => {

                alert('Account created successfully!');

                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = true;

                window.location.href = 'index.html';

            }, 1500);
        }
    });


    // Optional Email Check
    async function checkEmailExists(email) {
        return false;
    }

});