// DOM ELEMENTS
// ============
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


// GLOBAL VARIABLES
// ================
const clientID = 'gscFVzD_bzpF9pC9ib2xNT6KN8yzLljC2Y4nR2BQG94'; // YOUR_ACCESS_KEY
const count = 10; // number of photos called from API
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${clientID}&count=${count}`;
let photosArray = []; // array to hold download API data
let ready = false; // Flag to call more images
let imagesLoaded = 0; // # of images loaded on page
let totalImages = 0; // set to photosArray.length in displayImages() 

// EVENT LISTENERS
// ===============

// DETECTING THE BOTTOM OF PAGE
// window.scrollY -> distance scrolled from top of page
// window.innerHeight -> height of browser viewport
// document.body.offsetHeight -> Height of <body>
window.addEventListener('scroll', ()=>{
    // console.log(window.innerHeight + window.screenY);
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready){
        ready=false;
        getPhotos();
    } 
});

// FUNCTIONS
// =========

// getPhotos() - API fetch call
//------------
async function getPhotos(){
 try{
    const res = await fetch(apiURL);
    photosArray = await res.json();
    console.log(photosArray.length);
    displayPhotos();
} catch(err){
    //  error
}
}

// displayPhotos()
// ---------------
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    photosArray.forEach((photo)=>{
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target : '_blank'
        });
            
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// setAttributes()  
// ---------------
// Helper to attach attributes to elements an element 
function setAttributes(elem, attributesObj) {
    for (const key in attributesObj) {
        elem.setAttribute(key, attributesObj[key]);
    }

}
// imageLoaded()
// -------------
// eventListener callback fn on the <img> which is triggered when image is loaded. 
// It keeps count the number of images loaded and flags when at end of photo array.
// It also hides the spinning loader after the first image is loaded 
function imageLoaded(){
    console.log('The Image Loaded', imagesLoaded, totalImages);
    // console.log(totalImages);
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true; // once set to True, it will hide
        console.log('ready = ', true);
    }
}


// LOAD
// ====
getPhotos();