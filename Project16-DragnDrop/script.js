// DOM ELEMENTS
// ============
const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');


// GLOBAL VARIABLES
// ================= 

// Items 
let updatedOnLoad = false;

// Column Channel Arrays - Each elem in the array contains the text of each item
let backlogListArray = []; 
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = []; // Array of all arrays

// Drag Functionality
let draggedItem;
let currentColumn;
let dragging = false;

// FUNCTIONS
// =========

// LOCAL STORAGE
// -------------

// getSavedColumns() - Get Column Arrays from localStorage if available, set default items if not
// -----------------
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
}

// UpdateSavedColumns() - Update and Set localStorage Arrays, which represent each column channel
// --------------------
function updateSavedColumns() {
  listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
  const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
  arrayNames.forEach((arrName, index)=>{
    localStorage.setItem(`${arrName}Items`, JSON.stringify(listArrays[index]));
  });  
}

// DRAG FUNCTIONALITY
// ------------------
// drag() 
// ------
function drag(e){
  draggedItem = e.target;
  dragging = true;
}

function allowDrop(e){
  e.preventDefault();
}

function dragEnter(column){
  listColumns[column].classList.add('over');
  currentColumn = column;
}

function drop(e){
  e.preventDefault();
  listColumns.forEach((column)=>{
    column.classList.remove('over');
  });
  const parentEl = listColumns[currentColumn];
  parentEl.appendChild(draggedItem);
  dragging = false;
  rebuildArrays(); // REBUILD THE ARRAYS AFTER ITEMS HAVE BEEN MOVED AROUND
}

// rebuildArrays() - 
// ---------------
// 1. Rebuilds the Arrays after items have been moved from one column to the next 
// 2. Update the DOM
function rebuildArrays(){
  
  backlogListArray = Array.from(backlogListEl.children).map(i => i.textContent);
  progressListArray = Array.from(progressListEl.children).map(i => i.textContent);
  completeListArray = Array.from(completeListEl.children).map(i => i.textContent);
  onHoldListArray = Array.from(onHoldListEl.children).map(i => i.textContent);
 
  updateDOM();
}

// RENDERING LOGIC
// ---------------

// updateDOM()
// -----------
// 1. Check localStorage once
// 2. For Each Channel Colum
//    a. clear old elements
//    b. create new elements and add to DOM
//    c. filter out null elements in array
//  3. update local storage
function updateDOM() {
  if(!updatedOnLoad){
    getSavedColumns();
  }
  backlogList.textContent = ''; // remove  old elements
  backlogListArray.forEach((backlogItem, index)=>{
    createItemEl(backlogList, 0, backlogItem, index);
  });
  backlogListArray = filterArray(backlogListArray); // remove null elements in array

  progressList.textContent = ''; // remove elements
  progressListArray.forEach((progressItem, index)=>{
    createItemEl(progressList, 1, progressItem, index);
  });
  progressListArray = filterArray(progressListArray);
  
  completeList.textContent = ''; // remove elements
  completeListArray.forEach((completeItem, index)=>{
    createItemEl(completeList, 2, completeItem, index);
  });
  completeListArray = filterArray(completeListArray);
  
  onHoldList.textContent = ''; // remove elements
  onHoldListArray.forEach((onHoldItem, index)=>{
    createItemEl(onHoldList, 3, onHoldItem, index);
  });
  onHoldListArray = filterArray(onHoldListArray);
  
  // Run getSavedColumns only once, Update Local Storage
  updatedOnLoad = true;
  updateSavedColumns();
}

// function filterArray() - remove null item objects that occur after deletion 
// ----------------------
function filterArray(arr) {
  const filterArr = arr.filter((item) => item !==null);
  return filterArr;
}



// ITEM BOX
// --------

// CreateItemEl() - Funtion that constructs the DOM Elements for each list item <li>
// --------------
// 1. ColumnEl is the Channel Column
// 2. Column is the index of the colum channel
// 3. item is the textContent
// 4. index is the order in the column array where the item has been dropped
function createItemEl(columnEl, column, item, index) {
  const listEl = document.createElement('li');
  listEl.textContent = item;
  listEl.id = index;
  listEl.classList.add('drag-item');
  listEl.draggable = true; // make draggable
  listEl.setAttribute('onfocusout', `updateItem(${index}, ${column})`);
  listEl.setAttribute('ondragstart', 'drag(event)');
  listEl.contentEditable = true;
  columnEl.appendChild(listEl);
}
// showInputBox() - reveals the textbox to edit the item
// --------------
function showInputBox(column){
  addBtns[column].style.visibility = 'hidden'; // hides the "Add Item Btn"
  saveItemBtns[column].style.display = 'flex'; // flex items are revealed when display changed from 'none'
  addItemContainers[column].style.display = 'flex';
}

// hideInputBox() - hides the textbox on the item
// --------------
function hideInputBox(column){
  addBtns[column].style.visibility = 'visible'; // returns the "Add Item Btn"
  saveItemBtns[column].style.display = 'none';
  addItemContainers[column].style.display = 'none';
  addToColumn(column);
}

// addToColumn() - Add new item to a channel column
// -------------
function addToColumn(column){
  const  itemText = addItems[column].textContent;
  const selectedArray = listArrays[column];
  selectedArray.push(itemText);
  addItems[column].textContent = '';
  updateDOM();
}

// updateItem()
// ------------
function updateItem(id, column){
  const selectedArray = listArrays[column];
  const selectedColumnEl = listColumns[column].children;
  if(!dragging){
    if(!selectedColumnEl[id].textContent){
      delete selectedArray[id];
    } else {
      selectedArray[id] = selectedColumnEl[id].textContent;
    }
    updateDOM();
  }
}



// EVENT LISTENERS
// =============== 
// NONE - Instead, HTML onclick= attributes are inserted instead. 

// ON LOAD
// =======
updateDOM();