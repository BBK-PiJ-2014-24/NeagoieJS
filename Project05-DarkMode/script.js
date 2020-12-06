// DOM ELEMENTS
// ============
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

// GLOBAL VARIABLES
// ================
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';


// LOCAL STORAGE - Remembers Theme Setting
// =============
const currentTheme = localStorage.getItem('theme');
if(currentTheme){
    document.documentElement.setAttribute('data-theme', currentTheme);
    if(currentTheme === 'dark'){
        toggleSwitch.checked =true;
        toggleLightDarkMode(true);
    }
}


// FUNCTIONS
// =========
// switchTheme() - Toggles Background Themes
// -------------
function switchTheme(e){
    console.log(e.target.checked);
    if(e.target.checked){
    document.documentElement.setAttribute('data-theme', DARK_THEME);
    localStorage.setItem('theme', DARK_THEME);
    toggleLightDarkMode(DARK_THEME); // Set Nav and Images to Dark Mode
 } else {
     document.documentElement.setAttribute('data-theme', LIGHT_THEME);
    localStorage.setItem('theme', LIGHT_THEME);
    toggleLightDarkMode(LIGHT_THEME);
 }
}

// toggleLightDarkMode() - Toggle Nav and Images to Light/Dark Model
// ---------------------
function toggleLightDarkMode(theme){
    const isDark = (theme === DARK_THEME) ? true : false;
    nav.style.backgroundColor = isDark ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor = isDark ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
    toggleIcon.children[0].textContent = isDark ? 'Dark Mode' : 'Light Mode'
    isDark ? toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon') : toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    isDark ? imageMode('dark') : imageMode('light');
}


// imageMode() - Helper to Change Color of Images
// ----------
function imageMode(color){
    image1.src = `img/undraw_proud_coder_${color}.svg`;
    image2.src = `img/undraw_feeling_proud_${color}.svg`;
    image3.src = `img/undraw_conceptual_idea_${color}.svg`;
}

// EVENT LISTENERS
// ===============
toggleSwitch.addEventListener('change',switchTheme);


// ON LOAD
// =======
