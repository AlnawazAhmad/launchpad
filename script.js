const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Check user theme preference
themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    // Switch Emoji Icon
    if (body.classList.contains('dark-theme')) {
        themeToggleBtn.textContent = '☀️';
    } else {
        themeToggleBtn.textContent = '🌙';
    }
});