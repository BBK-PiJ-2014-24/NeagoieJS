// DOM ELEMENTS
// ============
const form = document.getElementById('form');
const password1El = document.getElementById('password1');
const password2El = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');


// GLOBAL VARIABLES
// ================
let isValid = false;
let passwordMatch =  false;



// FUNCTIONS// 
// =========
// 1. validate form
// 2. store Form data in a object
function processFormData(e){
    e.preventDefault();
    console.log(e);
    validateForm();
    if(isValid && passwordMatch){
        storeFormData();
    }
}

// validateForm()
// --------------
// 1. check validation of form
// 2. check password confirmation
function validateForm(){
    isValid = form.checkValidity();
    if(!isValid){
        message.textContent = "Incorrect Submission"
        message.style.color = 'red';
        messageContainer.style.borderColor = 'red';
        return;
    } 
    if(password1El.value === password2El.value){
        passwordMatch = true;
        password1El.style.borderColor = 'green';
        password2El.style.borderColor = 'green';
    } else {
        passwordMatch = false;
        password1El.style.borderColor = 'red';
        password2El.style.borderColor = 'red';
        messageContainer.style.borderColor = 'red';
        message.textContent = "Passwords don't match"
        message.style.color = 'red';
        return;
    }

    if(isValid && passwordMatch){
        message.textContent = "Successful Registration";
        message.style.color = 'green';
        messageContainer.style.borderColor = 'green';
    }
}

// storeFormData()
// ---------------
// 1. Create object to form data
function storeFormData(){
    const user = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        website: form.website.value,
        password: form.password.value,
    };
    console.log(user);
}



// EVENT LISTENERS
// ===============
form.addEventListener('submit', processFormData);
