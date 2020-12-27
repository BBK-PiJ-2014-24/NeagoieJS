// MODULE IMPORTS
// ==============
import {startConfetti, stopConfetti, removeConfetti} from './confetti.js';


// DOM ELEMENTS
// ============
const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGameItems = document.querySelectorAll('.far');

// GLOBAL VARIABLES
// ================
const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

let computerChoice = '';
let playerScoreNumber = 0;
let computerScoreNumber = 0;

// FUNCTIONS
// =========

// computeRandomChoice() - the computer's random choice in the game 
// ---------------------
function computerRandomChoice(){
  const computerChoiceNumber = Math.random();
  if(computerChoiceNumber <= 0.2){
    computerChoice = 'rock';
  } else if(computerChoiceNumber <= 0.4){
    computerChoice = 'paper';
  } else if(computerChoiceNumber <= 0.6){
    computerChoice = 'scissors';
  } else if(computerChoiceNumber <= 0.8){
    computerChoice = 'lizard';
  } else {
    computerChoice = 'spock';
  }
}

// checkResult()
// -------------
// 1. de-select old choices
// 2. computer's random choice
// 3. 
function checkResult(playerChoice){
  resetSelectedChoice();
  computerRandomChoice();
  displayPlayerChoice();
  updateScore(playerChoice);
}


// select() - select icon choice with HTML attribute onclick="select(.)"" 
// --------
function select(playerChoice){
  checkResult(playerChoice);
  switch(playerChoice){
    case 'rock':
      playerRock.classList.add('selectedChoice');
      playerChoiceEl.textContent = ' --- Rock';
      break;
    case 'paper':
      playerPaper.classList.add('selectedChoice');
      playerChoiceEl.textContent = ' --- Paper';
      break;
    case 'scissors':
      playerScissors.classList.add('selectedChoice');
      playerChoiceEl.textContent = ' --- Scissors';
      break;
    case 'lizard':
      playerLizard.classList.add('selectedChoice');
      playerChoiceEl.textContent = ' --- Lizard';
      break;
    case 'spock':
      playerSpock.classList.add('selectedChoice');
      playerChoiceEl.textContent = '--- Spock';
      break;
    default:
      break;  
  }
}
window.select = select; // script.js is a module and so scope does 
                        // not cover onclick="" attributes in the DOM
                        // Bring function into scope via the window object


// resetSelectedChoice() - Deselect old choices
// ---------------------
function resetSelectedChoice(){
  allGameItems.forEach((icon)=>icon.classList.remove('selectedChoice'));
}

// displayPlayerChoice() - displaty the user's choice
// ---------------------
function displayPlayerChoice(){
  switch(computerChoice){
    case 'rock':
      computerRock.classList.add('selectedChoice');
      computerChoiceEl.textContent = ' --- Rock';
      break;
    case 'paper':
      computerPaper.classList.add('selectedChoice');
      computerChoiceEl.textContent = ' --- Paper';
      break;
    case 'scissors':
      computerScissors.classList.add('selectedChoice');
      computerChoiceEl.textContent = ' --- Scissors';
      break;
    case 'lizard':
      computerLizard.classList.add('selectedChoice');
      computerChoiceEl.textContent = ' --- Lizard';
      break;
    case 'spock':
      computerSpock.classList.add('selectedChoice');
      computerChoiceEl.textContent = ' --- spock';
      break;
    default:
      break;  
  }
}

// updateScore()
// -------------
// 1. display who is winner
// 2. updates scores
function updateScore(playerChoice){
  if(playerChoice === computerChoice){
    resultText.textContent = "It's a tie."
  } else {
    const choice = choices[playerChoice];
    if(choice.defeats.indexOf(computerChoice)> -1 ){
      startConfetti();
      resultText.textContent = "You Won";
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
    } else {
      stopConfetti();
      removeConfetti();
      resultText.textContent = "You Lost";
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    }
  }
}

// resetAll() - resets the game
// ----------
function resetAll(){
  stopConfetti();
  removeConfetti();
  playerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  playerChoiceEl = '';
  computerScoreNumber = 0;
  computerScoreEl.textContent = computerScoreNumber;
  computerChoiceEl = '';
  resetSelectedChoice();
  resultText.textContent = 'Play Again';
}
window.resetAll = resetAll;

// EVENT LISTENERS - NONE: HTML onclick="" attributes are instead
// ===============


// ON LOAD
// =======