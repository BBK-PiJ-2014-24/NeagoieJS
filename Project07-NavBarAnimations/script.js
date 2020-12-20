// DOM ELEMENTS
// ============

const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');

// GLOBAL VARIABLES 
// ================

const navArray = [nav1, nav2, nav3, nav4, nav5];


// FUNCTIONS
// =========

function toggleNav(){
    menuBars.classList.toggle('change');
    overlay.classList.toggle('is-overlay-active'); // is-overlay-active is a boolean
    if(overlay.classList.contains('is-overlay-active')){
        overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
        navArray.forEach((navEl, index)=>{
            navEl.classList.replace(`slide-out-${index+1}`,`slide-in-${index+1}`);
        });
    } else {
        overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
        navArray.forEach((navEl, index)=>{
            navEl.classList.replace(`slide-in-${index+1}`,`slide-out-${index+1}`);
        });
    }
}




//  EVENT LISTENERS
// ================

menuBars.addEventListener('click', toggleNav);
navArray.forEach((navEl)=>{
    navEl.addEventListener('click', toggleNav);
});

// nav1.addEventListener('click', toggleNav);
// nav2.addEventListener('click', toggleNav);
// nav3.addEventListener('click', toggleNav);
// nav4.addEventListener('click', toggleNav);
// nav5.addEventListener('click', toggleNav);