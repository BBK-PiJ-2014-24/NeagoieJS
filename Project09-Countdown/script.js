// DOM ELEMENTS
// ============
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');


// GLOBAL VARIABLES 
// ================
let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date(); 


const today = new Date().toISOString().split("T")[0]; // just want yy-mm-dd
dateEl.setAttribute('min', today); // prevents input of future dates in Form

console.log(today);


const second = 1000;
const minute =  second * 60; // in miliseconds
const hour = minute * 60;// in miliseconds
const day = hour * 24;// in miliseconds

let countdownActive; // SetInterval

// LOCAL STRORAGE
// ==============
 let savedCountdown;


// FUNCTIONS
// =========

function updateDOM(){
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const timeGap = countdownValue - now;
        const days = Math.floor(timeGap/day);
        const hours = Math.floor((timeGap % day) / hour);
        const minutes = Math.floor((timeGap % hour) / minute);
        const seconds = Math.floor((timeGap % minute) / second);
        console.log(days, hours, minutes, seconds);
        
        inputContainer.hidden = true; // Hide Form
        if(timeGap < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        }else{
            countdownTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false; // show countdown
        }
    }, second);

}

function updateCountdown(e){
    e.preventDefault(); // stops form automatically being sent over the network
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;

    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));

    if(countdownDate === ''){
        alert('Please Select Date')
    } else {
        countdownValue = new Date(countdownDate).getTime(); // Get future date
        updateDOM();
    }
}

function resetTimer(){
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    clearInterval(countdownActive);
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown(){
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown =  JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// EVENT LISTENERS
// ===============
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click',resetTimer);
completeEl.addEventListener('click', resetTimer);


// ON LOAD
// ========
restorePreviousCountdown(); // check local storage on load