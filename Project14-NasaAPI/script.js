// DOM ELEMENTS
// ============ 

const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// LOCAL STORAGE
// =============
let favorites = {}; // items are kept as attributes in an object(rather than elements in an array) as they are easier to retrieve and delete directly (rather than array where u have to search)


// GLOBAL VARIABLES 
// ===============
const count = 10;
const apiKey = 'DEMO_KEY'
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;
let resultsArray = [];


// FUNCTIONS
// =========

// getNasaPictures() - API call to NASA
// -----------------
async function getNasaPictures(){
    loader.classList.remove('hidden');
    try {
        const res = await fetch(apiURL);
        resultsArray = await res.json();
        updateDOM('results');
    } catch(err){
        console.log('API error: ', err);
    }
}

// showContent()
// -------------
// 1. start at the top of the screen
// 2. set the correct Navbar, either for the API page or the Favorites Page
// 3. hide the loader image
function showContent(page){
    window.scrollTo({
        top:0,
        behavior:'instant'
    });

    if(page === 'results'){
        resultsNav.classList.remove('hidden');
        favoritesNav.classList.add('hidden');
    } else {
        resultsNav.classList.add('hidden');
        favoritesNav.classList.remove('hidden');
    }
    
    loader.classList.add('hidden');

}

// updateDOM()
// ----------
// 1. Clear textcontent
// 2. grab favorites from local storage
// 3. Construct DOM nodes - createDOMNodes()
// 4. show Content - showContent()
function updateDOM(page){
    imagesContainer.textContent = ''; //force refresh data
    
    if(localStorage.getItem('nasaFavorites')){
        favorites = JSON.parse(localStorage.getItem('nasaFavorites'));
    }
    createDOMNodes(page);
    showContent(page);

}

// createDOMNodes - 
// --------------
// 1. Construct elements for 'page' = either API call or the favorites 
// 2. Append to Nodes in DOM
function createDOMNodes(page){
    const arr = (page === 'results') ? resultsArray : Object.values(favorites); //favs is converted to an array
    arr.forEach((result)=>{
        const card = document.createElement('div');
        card.classList.add('card');

        const link = document.createElement('a');
        link.href = result.hdurl;
        link.title ='View Full Image';
        link.target = '_blank';

        const image = document.createElement('img');
        image.src = result.url;
        image.alt = 'NASA Picture of the Day';
        image.loading = 'lazy'; // Lazy loading
        image.classList.add('card-img-top');

        const cardbody = document.createElement('div');
        cardbody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = result.title;
        
        const saveText = document.createElement('p');
        saveText.classList.add('clickable');
        if(page === 'results'){
            saveText.textContent = 'Add to Favorites';
            saveText.setAttribute('onclick',`saveFavorite('${result.url}')`); // onclick=
        } else {
            saveText.textContent = 'Remove Favorites';
            saveText.setAttribute('onclick',`removeFavorite('${result.url}')`); // onclick=
        }
        const cardText = document.createElement('p');
        cardText.textContent = result.explanation;
        
        const footer = document.createElement('small');
        footer.classList.add('text-muted');
        
        const date = document.createElement('strong');
        date.textContent = result.date;
        
        const copyrightResult = result.copyright === undefined ? '' : result.copyright;
        const copyright = document.createElement('span');
        copyright.textContent = `${copyrightResult}`;

        // Append
        footer.append(date, copyright);
        cardbody.append(cardTitle, saveText, cardText, footer);
        link.appendChild(image);
        card.append(link, cardbody);
        imagesContainer.appendChild(card);
    });
}

// saveFavorite
// ------------
// 1. Find the item to save and check it is not already in favorites
// 2. Save item as an attribute in the favorites object
// 3. flash an 'ADDED!' card for 2sec
// 4. Add local storage

function saveFavorite(itemUrl){
    resultsArray.forEach((item)=>{
        if(item.url.includes(itemUrl) && !favorites[itemUrl]){
            favorites[itemUrl] = item; 
            setTimeout(()=>{
                saveConfirmed.hidden = false;
            },2000);
            saveConfirmed.hidden = true;
            localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
        }
    });
}

// removeFavorite()
// ----------------
// 1. Deletes item if found in favorites
// 2. Updates favorites in local storage
// 3. Re-render page 
function removeFavorite(itemURL){
        if(favorites[itemURL]) {
            delete favorites[itemURL];
            localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
            updateDOM('favorites');
        }
}

// ON LOAD
// =======
getNasaPictures();