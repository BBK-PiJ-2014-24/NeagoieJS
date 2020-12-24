// DOM ELEMENTS
// ============
const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');


// GLOBAL VARIABLES
// ================

// LOCAL STORAGE
// =============
let bookmarks = [];


// FUNCTIONS
// =========
// showModal()
// -----------
// reveals modal, puts cursor in Name Input
function showModal(){
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

function closeModal(){
    modal.classList.remove('show-modal');
}

// storeBookmark()
// ---------------
// 1. add https to url
// 2. check valid form inputs
function storeBookmark(e){
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    console.log(nameValue, urlValue);
    if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
        urlValue = `https://${urlValue}`; 
    }
    if(!validateForm(nameValue,urlValue)){
        return false;
    };
}

// validateForm()
// --------------
// 1. check correct url format with regex
// 2. check both inputs submitted
// 3. Add input to bookmark array
// 4. push bookmark to local storage
// 5. then fetch all bookmarks from local storage
// 6.  Finally Returns a boolean to confirm correct input
function validateForm(nameValue, urlValue){
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
   
    if(!nameValue || !urlValue){
        alert('Submit all Inputs');
    }

    if (!urlValue.match(regex)) {
      alert("Incorrect URL");
      return false;
    }

    const bookmark = {
        name: nameValue,
        url: urlValue
    };

    bookmarks.push(bookmark); // push new bookmark onto array
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); // update local storage
    fetchBookmarks(); // then fetch all bookmarks from local storage
    bookmarkForm.reset(); // clear the Form
    websiteNameEl.focus(); // put prompt in first box

    return true;
}

// fetchBookmarks()
// ----------------
// 1. fetchbookmarks from local storage
// 2. Call buildBookmarks to construct the HTML structure of each bookmark on the DOM
function fetchBookmarks(){
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        bookmarks = [{
            name: 'Google',
            url: 'https://google.com'
        }];
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    buildBookmarks();
}

// buildBookmarks
// --------------
// 1. Construct the HTML structure for each bookmark on the DOM
function buildBookmarks(){
    bookmarksContainer.textContent = ''; // erase prior DOM tree
    bookmarks.forEach((bookmark)=>{
        const {name, url} = bookmark;
        const item = document.createElement('div'); // item
        item.classList.add('item');
        const closeCrossIcon = document.createElement('i'); //icon
        closeCrossIcon.classList.add('fas', 'fa-times');
        closeCrossIcon.setAttribute('title', 'DeleteBookmark');
        closeCrossIcon.setAttribute('onclick',`deleteBookmark('${url}')`);
        const linkInfo = document.createElement('div'); // container for favicon
        linkInfo.classList.add('name');
        const favicon = document.createElement('img'); //favicon
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');
        const link = document.createElement('a'); //href link
        link.setAttribute('href',`${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;

        linkInfo.append(favicon, link);  // add hierarchy of links
        item.append(closeCrossIcon, linkInfo);
        bookmarksContainer.appendChild(item);

    });
}

// deleteBookmark()
// ----------------
function deleteBookmark(url){
    // bookmarks.forEach((bookmark, index)=>{
    //     if(bookmark.url === url){
    //         bookmarks.splice(index, 1); 
    //     }
    // });
    bookmarks = bookmarks.filter(bookmark => bookmark.url !== url);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    console.log('bookmarks delete', bookmarks);
    fetchBookmarks();
}

// EVENT LISTENERS
// ===============
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', closeModal);
window.addEventListener('click', (e)=>{
    e.target === modal ? closeModal(): false; // close the modal anywhere on the page
});
bookmarkForm.addEventListener('submit', storeBookmark);

// ON LOAD
// =======
fetchBookmarks();