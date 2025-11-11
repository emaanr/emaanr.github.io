const themeToggle = document.getElementById('theme-toggle');
const lightIcon = document.getElementById('theme-icon_light');
const darkIcon = document.getElementById('theme-icon_dark');

themeToggle.addEventListener('click', () => {
  // Check computed style or just check if dark is currently visible
  const darkMode = window.getComputedStyle(darkIcon).display !== 'none';

  if (darkMode) {
    lightIcon.style.display = 'inline';
    darkIcon.style.display = 'none';
  } else {
    lightIcon.style.display = 'none';
    darkIcon.style.display = 'inline';
  }
});