const profileTrigger = document.getElementById('profileTrigger');
const profileMenu = document.getElementById('profileMenu');

// Toggle menu visibility
profileTrigger.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevents immediate closing
    if (profileMenu.style.display === 'block') {
        profileMenu.style.display = 'none';
    } else {
        profileMenu.style.display = 'block';
    }
});

// Close menu when clicking outside
window.addEventListener('click', () => {
    profileMenu.style.display = 'none';
});

// Stop menu from closing when clicking inside it
profileMenu.addEventListener('click', (event) => {
    event.stopPropagation();
});