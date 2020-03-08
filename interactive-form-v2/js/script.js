//Set focus on the first text field
//When the page first loads, the first text field should be in focus by default.

const username = document.getElementById('name');
username.focus();

const otherTitle = document.getElementById('other-title');
otherTitle.style.display = 'none';


// Include a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
const jobRole = document.querySelector('#title');
jobRole.addEventListener('change', (e)=>{
    if(e.target.value === 'other'){
        otherTitle.style.display = 'block';
    } else {
        otherTitle.style.display = 'none';
    }
})


//Until a theme is selected from the “Design” menu, no color options appear in the “Color” drop down 
//and the “Color” field reads “Please select a T-shirt theme”.
const design = document.getElementById('design');
const designOptions = document.querySelectorAll('#design option')
const colorDiv = document.getElementById('colors-js-puns');
colorDiv.style.display = 'none';
const colorDropdown = document.getElementById('color');
const colorOptions = document.querySelectorAll('#color option')

designOptions[0].style.display = 'none';
let message = document.createElement('p');
message.innerHTML = 'Please select a T-shirt theme';
colorDiv.insertBefore(message, colorDropdown);
colorDropdown.style.display = 'none';



// For the T-Shirt "Color" menu, after a user selects a theme, only display the color options that match the design selected in the "Design" menu.
// If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
// If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
// When a new theme is selected from the "Design" menu, both the "Color" field and drop down menu is updated.
design.addEventListener('change', (e)=>{
    colorDiv.style.display = 'block';
    colorDropdown.style.display = 'block';
    message.style.display = 'none';
    hideAllColor();
    let eventValue = e.target.value;
    if(eventValue === 'js puns') {
        colorOptions[0].selected = true;
        colorOptions[0].hidden = false;
        colorOptions[1].hidden = false;
        colorOptions[2].hidden = false;
    } else if (eventValue === 'heart js') {
        colorOptions[3].selected = true;
        colorOptions[3].hidden = false;
        colorOptions[4].hidden = false;
        colorOptions[5].hidden = false;
    }
   
})
function hideAllColor(){
    for(let i = 0; i< colorOptions.length; i++){
        colorOptions[i].hidden = true;
    }
}

//”Register for Activities” section
//Q3: how to update price
const totalAmount = document.createElement('p');
let price = 0;
const activities = document.getElementsByClassName('activities')[0];
activities.appendChild(totalAmount);
const checkbox = document.querySelectorAll('.activities input');

activities.addEventListener('change', (e)=>{
    const clicked = e.target;
    const time = clicked.getAttribute('data-day-and-time');
    let cost = parseInt(clicked.getAttribute('data-cost'));
    if(clicked.checked){
        price += cost;
    } else {price -= cost;}
    for(let i = 0; i < checkbox.length; i++){
        if (time === checkbox[i].getAttribute('data-day-and-time') & checkbox[i] !== clicked){
            if(clicked.checked){
                checkbox[i].disabled = true;
            } else {
                checkbox[i].disabled = false;
                
            }
        }
    }
    totalAmount.textContent = `Total: $${price}`;
})


//"Payment Info" section
const paymentOptions = document.querySelectorAll('#payment option');
paymentOptions[0].style.display = 'none';
const selectMethod = document.querySelector('#payment')
const cc = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

paymentOptions[1].selected = true;
cc.style.display = 'block';
paypal.style.display = 'none';
bitcoin.style.display = 'none';

selectMethod.addEventListener('change', (e)=>{
    eventValue = e.target.value;
    if (eventValue === 'credit card'){
        cc.style.display = 'block';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if (eventValue === 'paypal'){
        cc.style.display = 'none';
        paypal.style.display = 'block';
        bitcoin.style.display = 'none';
    } else {
        cc.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = 'block';
    }
})



//Form validation
function isValidUsername(username){
    return /\S+/.test(username);
}

const email = document.getElementById('mail');
function isValidEmail(email){
    return /^[^@]+@[^@.]+\.\w+$/i.test(email);
}

function isValidActivity(){
    for(let i=0; i<checkbox.length; i++){
        if (checkbox[i].checked){
            return true;
        } else {
            return false;
        }
    }
}

const ccnum = document.getElementById('cc-num');
function isValidCcNum(ccnum){
    return /^\d{13,16}$/.test(ccnum);
}


const zipcode = document.getElementById('zip');
function isValidZipCode(zipcode){
    return /^\d{5}$/.test(zipcode);
}

const cvv = document.getElementById('cvv');
function isValidCVV(cvv){
    return /^\d{3}$/.test(cvv);
}

function showOrHideTip(show, element){
    // show element when show is true, hide when false
    if(show){
        element.style.display = 'inherit';
    } else {
        element.style.display = 'none';
    }
}

function createEventListener(validator){
    return e => {
        const text = e.target.value;
        const valid = validator(text);
        const toolTip = e.target.nextElementSibling;
        if (valid){
            showOrHideTip(false, toolTip);}
        else {
            showOrHideTip(true, toolTip);}
    }
}

email.addEventListener('input', createEventListener(isValidEmail));

username.addEventListener('input', createEventListener(isValidUsername))


const p = document.createElement('p');
p.className = 'nocc';
p.textContent = 'Please enter a credit card number.';
ccnum.parentNode.appendChild(p);
p.style.display = 'none';

const form = document.getElementsByTagName('form')[0];
form.addEventListener('submit', (e)=>{
    if(!isValidUsername(username.value)){
        showOrHideTip(true, username.nextElementSibling);
        e.preventDefault();
    } 
    if(!isValidEmail(email.input)) {
        showOrHideTip(true, email.nextElementSibling);
        e.preventDefault();
    }
    if(!isValidActivity()){   
        showOrHideTip(true, activities.children[1]);
        e.preventDefault();
    }
    if(paymentOptions[1].selected){
        
        if(ccnum.value === ''){
            p.style.display = 'block';
            e.preventDefault();
            ccnum.nextElementSibling.style.display = 'none';
        } else if(!isValidCcNum(ccnum.input)){
            showOrHideTip(true, ccnum.nextElementSibling);
            p.style.display = 'none';
            e.preventDefault();
        }
        if(!isValidZipCode(zipcode.input)){
            showOrHideTip(true, zipcode.nextElementSibling);
            e.preventDefault();
        } 
        if(!isValidCVV(cvv.input)){
            showOrHideTip(true, cvv.nextElementSibling);
            e.preventDefault();
        } 
    }
})