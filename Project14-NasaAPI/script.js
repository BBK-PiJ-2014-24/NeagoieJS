// DOM ELEMENTS
// ============ 

const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// LOCAL STORAGE
// =============
let favorites = {};


// GLOBAL VARIABLES 
// ===============
const count = 10;
const apiKey = 'DEMO_KEY'
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;
let resultsArray = [];


// FUNCTIONS
// =========
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

function updateDOM(page){
    
    if(localStorage.getItem('nasaFavorites')){
        favorites = JSON.parse(localStorage.getItem('nasaFavorites'));
    }
    imagesContainer.textContent = ''; //force refresh data
    createDOMNodes(page);
    showContent(page);

}


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


function saveFavorite(itemUrl){
    resultsArray.forEach((item)=>{
        if(item.url.includes(itemUrl) && !favorites[itemUrl]){
            favorites[itemUrl] = item; 
            // console.log(favorites);
            saveConfirmed.hidden = false;
            setTimeout(()=>{
                saveConfirmed.hidden = true;
            },2000);
            localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
        }
    });
}

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