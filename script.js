const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message) {
    // console.log(input.value);
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerHTML = message;
}

function showSuccess(input) {
    console.log(input.value);
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkRequired(inputArray) {
    let isRequired = false;
    // console.log(inputArray);

    inputArray.forEach((input) => {
        // console.log(input.value);
        if (input.value.trim() === '') {
            showError(input, `${displayValue(input)} is required`);
            isRequired = true;
        } else {
            showSuccess(input);
        }
    });
    return isRequired;
}

function displayValue(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkLength(input, min, max) {
    console.log(input.value.length);
    if (input.value.length < min) {
        showError(input, `${displayValue(input)} must be at least ${min} characters`)
    } else if (input.value.length > max) {
        showError(input, `${displayValue(input)} must be less than ${max} characters`)
    } else {
        showSuccess(input);
    }
}

function checkEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(email.value.trim()))
    if (re.test(email.value.trim())) {
        showSuccess(email);
    } else {
        showError(email, 'Email is not valid');
    }
}

function checkPasswords(pass1, pass2) {
    if (pass1 !== pass2) {
        showError(pass2, 'Passwords must match');
    } else {
        showSuccess(pass2);
    }
}

// event listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // checkRequired([username, email, password, password2]);

    if(checkRequired([username, email, password, password2])) {
        checkLength(username, 3, 15);
        checkLength(password, 6, 25);
        checkEmail(email);
        checkPasswords(password, password2);
    }
})