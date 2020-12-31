// DOM ELEMENTS
// ============
const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');



// GLOBAL VARIABLES
// ================
let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false; // awaiting next number after operator inputed false-> expect operator, true-> expect number
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber/secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber*secondNumber,
    '+': (firstNumber, secondNumber) => {return firstNumber+secondNumber},
    '-': (firstNumber, secondNumber) => firstNumber-secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber
};

// FUNCTIONS 
// =========

// sendNumberValue()
// -----------------
function sendNumberValue(number){
    if(awaitingNextValue){ // if calculator expecting a new number 
        calculatorDisplay.textContent = number; // display new digit
        awaitingNextValue =false; // more number digits to be added to this new number 
    } else { // if old number, add another digit to it
        const displayValue = calculatorDisplay.textContent ; // existing number on display
        calculatorDisplay.textContent = (displayValue=== '0') ? number : displayValue + number;
    }
}

// resetAll()
// ----------
function resetAll(){
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false; //awaiting digit inputs
    calculatorDisplay.textContent = '0';
}

// addDecimal()
// ------------
function addDecimal(){
    if(awaitingNextValue){
        return; // If operator pressed, next digit cannot be decimal '.'
    }
    if(!calculatorDisplay.textContent.includes('.')){ // If input does not include decimal yet
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`; //add decimal at end
    } 
}

// useOperator
// -----------
function useOperator(operator){
    // last number inputted converted to int/float
    const currentValue = Number(calculatorDisplay.textContent); // convert to int

    // avoid multiple operator inputs or change of operator made.
    // if already have operator and the calculator awaiting second number
    // update operator value.
    if(operatorValue && awaitingNextValue){
        operatorValue = operator;
        return; // avoid consecutive multiple operator inputs
    }
    // 
    if(!firstValue){ // if operator pressed after previous result
        firstValue = currentValue; // make FV=CV and wait second number
    } else { 
        // ready for calculation with 2 numbers and an operator!!!
        const calculation = calculate[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation; // move to firstValue in case there are further operations to be done on answer 
    }
    awaitingNextValue = true; // awaiting for next number after operator pressed
    operatorValue = operator; // store operator and await next number
}


    

// EVENT LISTENERS
// ===============
// event listners cannot have executional functions, so must reference function to another function()-> which calls differnt arguments
inputBtns.forEach((btn)=>{
    if(btn.classList.length === 0){
        btn.addEventListener('click', () => sendNumberValue(btn.value)); // numbers have no classes
    } else if (btn.classList.contains('operator')){
        btn.addEventListener('click', () => useOperator(btn.value));
    } else if (btn.classList.contains('decimal')){
        btn.addEventListener('click', () => addDecimal());
    }
});

clearBtn.addEventListener('click', resetAll);



// ON LOAD
// =======