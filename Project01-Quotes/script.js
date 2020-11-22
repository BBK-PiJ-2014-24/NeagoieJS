// DOM ELEMENTS
// ============
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// GLOBAL VARIABLES
// ================
const proxyURL = 'https://cors-anywhere.herokuapp.com/'; // CORS errors
const URL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

let maxQuoteLength = 120;


// EVENT LISTENERS
// ===============
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// FUNCTIONS
// =========

// getQuote()
// ----------
// 1. show Spinner 
// 2. get API fetch
// 3. check if author, adjust font size if long quote
// 4. Add quote and author to DOM with innerText
async function getQuote(){
   try {
   showLoadingSpinner();
    const res = await fetch(proxyURL + URL);
    const data = await res.json();
    authorText.innerText  = data.quoteAuthor === '' ? 'Unknown' :  data.quoteAuthor;
    if(data.quoteText.length > maxQuoteLength){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.innerText =  data.quoteText;
    removeLoadingSpinner();
   } catch(err) {
       getQuote(); // bug in API with unexpected token, so retry
       console.log('My Error Msg --', err);
   }
}

// tweetQuote() - post quote to Twitter
// ------------
function tweetQuote(){
    const quote = quoteText.innerText;
    const author =  authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    console.log(twitterURL);
    window.open(twitterURL, '_blank');
}


// Spin Loader functions
// ---------------------
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
    if(quoteContainer.hidden == true){
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// ON LOAD
// =======
 getQuote();