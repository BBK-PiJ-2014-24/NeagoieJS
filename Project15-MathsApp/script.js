// DOM ELEMENTS
// ============
// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
const itemContainer = document.querySelector('.item-container');
// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

// GLOBAL VARIABLES
// ================
let questionAmount = 0; // choice of number of questions in game
let equationsArray = []; // array of math question objects
let playerGuessArray = []; // array of player's guesses
let bestScoreArray = []; // array of object

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time
let timer;
let timePlayed = 0;
let basetime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDisplay = '0.0'
// Scroll
let valueY = 0; // scrolls down to next question



// FUNCTIONS
// =========

// startTimer() start the stopwatch
// ------------
function startTimer(){
  timePlayed = 0;
  penaltyTime = 0;
  finalTime = 0;
  timer = setInterval(addTime, 100);
  gamePage.removeEventListener('click', startTimer);
}

// addTime() - Add time to the timer and check if game has ended
// ---------
function addTime(){
  timePlayed += 0.1;
  checkTime();
}

// checkTime() - Actions after end of game
// -----------
// 1. stop timer once last math questioned answered
// 2. Determine number of Penalties for wrong answers AND total time
// 3. send to scoresToDOM()
function checkTime(){
  console.log('player guess array', playerGuessArray);
  if(playerGuessArray.length ==  questionAmount){
    clearInterval(timer); // stop timer
    equationsArray.forEach((equation, index)=>{
      if(equation.evaluated === playerGuessArray[index]){
        // penalty Time
      } else {
        penaltyTime += 0.5;
      }
    });
   finalTime = timePlayed + penaltyTime;
   console.log('time', timePlayed, 'penalty', penaltyTime, 'finalTime',finalTime);
   scoresToDOM();
  }
}

// scoresToDOM() - Prettify the Scores and send to DOM + update BestScore
// -------------
function scoresToDOM(){
  finalTimeDisplay = finalTime.toFixed(1);  // reduce to 1dp
  baseTime = timePlayed.toFixed(1);
  penaltyTime = penaltyTime.toFixed(1);
  
  baseTimeEl.textContent = `Base Time: ${baseTime}s`;  // send to DOM
  penaltyTimeEl.textContent = `Penalty Time: +${penaltyTime}s`;
  finalTimeEl.textContent = `${finalTimeDisplay}s`;

  updateBestScore();

  itemContainer.scrollTo({top:0, behavior: 'instant'}); // scroll back to the top
  showScorePage();
}

// showScorePage() - transition from Game Page -> Score Page
// ---------------
function showScorePage(){
  setTimeout(()=>{
      playAgainBtn.hidden = false;  // temp hide play again button to avoid miss hit
  }, 1000);
  gamePage.hidden = true;
  scorePage.hidden = false;
}

// showGamePage() - transition from countdown page -> game page
// --------------
function showGamePage() {
  gamePage.hidden = false;
  countdownPage.hidden = true;
}

// select() - onclick= on right/wrong buttons - records the player's guess and pushes to playerGuessArray
// --------
function select(guessTrue){
  valueY+= 80;
  itemContainer.scroll(0, valueY);
  return (guessTrue) ? playerGuessArray.push('true') : playerGuessArray.push('false');
}


// randomInt() -> random generator of Integer values 
// -----------
function randomInt(maxRndNumber){
  return Math.floor(Math.random() * Math.floor(maxRndNumber));
}

// createEquations() - Create Correct and Incorrect Random Equations AND then shuffle order of questions
// -----------------
function createEquations() {
  // Randomly choose how many correct equations there should be
  const correctEquations = randomInt(questionAmount);
  const wrongEquations = questionAmount - correctEquations;
  console.log('correct questions', correctEquations);
  console.log('wrong questions', wrongEquations);
 // Loop through, multiply random numbers up to 9, push to array
  for (let i = 0; i < correctEquations; i++) {
    firstNumber = randomInt(9)
    secondNumber = randomInt(9)
    const equationValue = firstNumber * secondNumber;
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
    equationObject = { value: equation, evaluated: 'true' };
    equationsArray.push(equationObject);
  }
  //Loop through, mess with the equation results, push to array
  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = randomInt(9);
    secondNumber = randomInt(9);
    const equationValue = firstNumber * secondNumber;
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
    const formatChoice = randomInt(3);
    const equation = wrongFormat[formatChoice];
    equationObject = { value: equation, evaluated: 'false' };
    equationsArray.push(equationObject);
  }
  shuffle(equationsArray);
}

// equationsToDOM() - Add the Maths questions to the DOM
// ----------------
function equationsToDOM(){
  equationsArray.forEach((equation) => {
    const item = document.createElement('div');
    item.classList.add('item');

    const equationText = document.createElement('h1');
    equationText.textContent = equation.value;

    item.appendChild(equationText);
    itemContainer.appendChild(item);
  });
}

// populateGamePage() - Dynamically adding correct/incorrect equations
// ------------------
// 1. reset DOM
// 2. set up Container for the maths questions in the DOM
// 3. create Maths questions
// 4. Add Maths Question to the DOM 
function populateGamePage() {
  // Reset DOM, Set Blank Space Above
  itemContainer.textContent = '';
  // Spacer
  const topSpacer = document.createElement('div');
  topSpacer.classList.add('height-240');
  // Selected Item
  const selectedItem = document.createElement('div');
  selectedItem.classList.add('selected-item');
  // Append
  itemContainer.append(topSpacer, selectedItem);
  // Create Maths Questions and Add to DOM
  createEquations();
  equationsToDOM();
  // Set Blank Space Below
  const bottomSpacer = document.createElement('div');
  bottomSpacer.classList.add('height-500');
  itemContainer.appendChild(bottomSpacer);
}


// countdownStart() - display the count down to the game
// -----------------
function countdownStart(){
  let count = 3;
  countdown.textContent = count;
  const timeCountDown = setInterval(() => {
    count--;
    if(count === 0) {
      countdown.textContent = 'Go!';
    } else if(count == -1) {
      showGamePage();
      clearInterval(timeCountDown);
    } else {
      countdown.textContent = count;
    }
  }, 1000);
}

// showCountdown()
// ---------------
// 1. transition from the splash page to the countdown page
// 2. populate the game with maths questions
// 3. start the countdown to the game 3..2..1
function showCountdown(){
  countdownPage.hidden = false;
  splashPage.hidden = true;
  populateGamePage();
  countdownStart();
}

// selectQuestionAmount() - function on radio btn listener
// ----------------------
// 1. Select the number of questions
// 2. Start the transition to the game 
function selectQuestionAmount(e){
  e.preventDefault();
  questionAmount = getRadioValue();
  if(questionAmount){// check selection
    showCountdown();
  }  
}

// getRadioValue() - gets the number of questions associated with radioValue 
// ---------------
function getRadioValue(){
  let radioValue;
  radioInputs.forEach((radioInput)=>{
    if(radioInput.checked){
      radioValue = radioInput.value;
    }
  });
  return radioValue;
}

// playAgain() - onclick= on the play again button 
// -----------
function playAgain(){
  gamePage.addEventListener('click', startTimer); // reconnect the start round  listener on the game page
  scorePage.hidden = true; // close score page
  splashPage.hidden = false; // return to splash page
  equationsArray = []; // reset array of equations
  playerGuessArray = []; // reset last game's array of answers
  valueY = 0;  // scroll position at top
  playAgainBtn.hidden.true; // hide play again button
}

// getSavedBestScores()
// --------------------
// 1. get best scores from local storage or set up if does not exist
// 2. render best Scores to DOM
 function getSavedBestScores(){
  if(localStorage.getItem('bestScores')){
    bestScoreArray = JSON.parse(localStorage.bestScores);
  } else {
    bestScoreArray = [
      {questions: 10, bestScore: finalTimeDisplay},
      {questions: 25, bestScore: finalTimeDisplay},
      {questions: 50, bestScore: finalTimeDisplay},
      {questions: 99, bestScore: finalTimeDisplay},
    ];
    localStorage.setItem('bestScores', JSON.stringify(bestScoreArray));
  }
  bestScoresToDom();
}

// updateBestScore() 
// -----------------
// 1. loop array of best scores and check if new record
// 2. update local storage
function updateBestScore(){
  bestScoreArray.forEach((score, index) => {
    if(questionAmount == score.questions){
      const getSavedBestScore = Number(bestScoreArray[index].bestScore); // convert to number
      if(getSavedBestScore === 0 || getSavedBestScore > finalTime ){
        bestScoreArray[index].bestScore = finalTimeDisplay;
      }
    }
  });
  bestScoresToDom();
  localStorage.setItem('bestScores', JSON.stringify(bestScoreArray));
}

// bestScoresToDom() - render best scores to DOM
// -----------------
function bestScoresToDom(){
  bestScores.forEach((bestScore, index)=>{
    const bestScoreEl  = bestScore;
    bestScoreEl.textContent = `${bestScoreArray[index].bestScore}`;
  });
}

// EVENT LISTENERS
// ===============

// click Radio Button 
startForm.addEventListener('click', ()=>{
  radioContainers.forEach((radioEl)=>{
      radioEl.classList.remove('selected-label'); // clear all old clicks
      if(radioEl.children[1].checked){         // click on the 2nd child element which is the actual input tag  
        radioEl.classList.add('selected-label');
      }
  });
});

// submit game option choice
startForm.addEventListener('submit', selectQuestionAmount);
gamePage.addEventListener('click', startTimer);


// ON LOAD
// =======
getSavedBestScores();