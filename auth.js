document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const alertBox = document.getElementById('alert-msg');

    // 1. Tab Switching Logic
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active-form');
        registerForm.classList.remove('active-form');
        clearAlert();
    });

    registerTab.addEventListener('click', () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.add('active-form');
        loginForm.classList.remove('active-form');
        clearAlert();
    });

    // 2. Show/Hide Password Toggle
    document.querySelectorAll('.toggle-pwd').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const pwdInput = document.getElementById(targetId);
            if (pwdInput.type === 'password') {
                pwdInput.type = 'text';
                button.textContent = '🙈';
            } else {
                pwdInput.type = 'password';
                button.textContent = '👁️';
            }
        });
    });

    // Helper Functions
    const showAlert = (msg, type) => {
        alertBox.textContent = msg;
        alertBox.className = `alert-box ${type}`;
    };

    const clearAlert = () => {
        alertBox.textContent = '';
        alertBox.className = 'alert-box';
    };

    const setError = (inputId, errorId, msg) => {
        const input = document.getElementById(inputId);
        const errorSpan = document.getElementById(errorId);
        input.classList.add('invalid');
        errorSpan.textContent = msg;
    };

    const clearError = (inputId, errorId) => {
        const input = document.getElementById(inputId);
        const errorSpan = document.getElementById(errorId);
        input.classList.remove('invalid');
        errorSpan.textContent = '';
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // 3. Login Validation
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        clearAlert();

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        if (!email) {
            setError('login-email', 'login-email-error', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            setError('login-email', 'login-email-error', 'Enter a valid email address');
            isValid = false;
        } else {
            clearError('login-email', 'login-email-error');
        }

        if (!password) {
            setError('login-password', 'login-password-error', 'Password is required');
            isValid = false;
        } else {
            clearError('login-password', 'login-password-error');
        }

        if (isValid) {
            showAlert('Logging in... Redirecting to dashboard.', 'success');
        }
    });

    // 4. Register Validation
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        clearAlert();

        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm-password').value;

        if (!name) {
            setError('reg-name', 'reg-name-error', 'Full name is required');
            isValid = false;
        } else {
            clearError('reg-name', 'reg-name-error');
        }

        if (!email) {
            setError('reg-email', 'reg-email-error', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            setError('reg-email', 'reg-email-error', 'Enter a valid email address');
            isValid = false;
        } else {
            clearError('reg-email', 'reg-email-error');
        }

        if (!password) {
            setError('reg-password', 'reg-password-error', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            setError('reg-password', 'reg-password-error', 'Password must be at least 6 characters');
            isValid = false;
        } else {
            clearError('reg-password', 'reg-password-error');
        }

        if (!confirmPassword) {
            setError('reg-confirm-password', 'reg-confirm-password-error', 'Please confirm password');
            isValid = false;
        } else if (confirmPassword !== password) {
            setError('reg-confirm-password', 'reg-confirm-password-error', 'Passwords do not match');
            isValid = false;
        } else {
            clearError('reg-confirm-password', 'reg-confirm-password-error');
        }

        if (isValid) {
            showAlert('Account created successfully! You can now login.', 'success');
            registerForm.reset();
        }
    });
});