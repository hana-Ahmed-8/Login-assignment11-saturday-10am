var userNameInput = document.getElementById('name');
var userEmailInput = document.getElementById('email');
var userPasswordInput = document.getElementById('pass');
var alertName = document.getElementById('alertName');
var alertEmail = document.getElementById('alertEmail');
var alertPass = document.getElementById('alertPass');
var signupBtn = document.getElementById('signupBtn');
var inputsSignUp = Array.from(document.getElementsByClassName('sign-up'));
var alertSignup = document.getElementById('alertSignup');


var searchEmail = document.getElementById('searchEmail');
var searchPass = document.getElementById('searchPass');
var inputsLogin = Array.from(document.getElementsByClassName('sign-in'));
var loginBtn = document.getElementById('loginBtn');
var alertSignin = document.getElementById('alertSignin');


var welcomeSignal = document.getElementById('welcomeSignal');
var logoutBtn = document.getElementById('logOut');


var users = JSON.parse(localStorage.getItem('usersList')) || [];
var loggedInUser = localStorage.getItem('loginList');


if(userNameInput) userNameInput.addEventListener('input', validUserName);
if(userEmailInput) userEmailInput.addEventListener('input', validUserEmail);
if(userPasswordInput) userPasswordInput.addEventListener('input', validUserPass);


if(signupBtn) signupBtn.addEventListener('click', signUp);


function signUp() {
    if (!isEmailExist() && !isInputEmpty() && validUserName() && validUserEmail() && validUserPass()) {
        alertSignup.innerHTML = 'Successfully Registered';
        alertSignup.classList.replace('d-none', 'd-block');
        alertSignup.classList.add('text-success');
        alertSignup.classList.remove('text-danger');
        addUser();
        resetFormSignUp();
    } else if (isEmailExist()) {
        alertSignup.innerHTML = 'This email already exists.. Try another one';
        alertSignup.classList.replace('d-none', 'd-block');
        alertSignup.classList.add('text-danger');
        alertSignup.classList.remove('text-success');
        resetFormSignUp();
    } else if (isInputEmpty()) {
        alertSignup.innerHTML = 'All fields are required.. You should fill them correctly';
        alertSignup.classList.replace('d-none', 'd-block');
        alertSignup.classList.add('text-danger');
        alertSignup.classList.remove('text-success');
        resetFormSignUp();
    } else if (!validUserName() || !validUserEmail() || !validUserPass()) {
        alertSignup.innerHTML = 'There are invalid fields.. You should fill them correctly';
        alertSignup.classList.replace('d-none', 'd-block');
        alertSignup.classList.add('text-danger');
        alertSignup.classList.remove('text-success');
        resetFormSignUp();
    }
}


function addUser() {
    var user = {
        name: userNameInput.value,
        email: userEmailInput.value,
        password: userPasswordInput.value
    };
    users.push(user);
    localStorage.setItem('usersList', JSON.stringify(users));
}


function resetFormSignUp() {
    for (var i = 0; i < inputsSignUp.length; i++) {
        inputsSignUp[i].value = '';
        inputsSignUp[i].classList.remove('is-valid');
        inputsSignUp[i].classList.remove('is-invalid');
    }
}


function isEmailExist() {
    return users.some(user => user.email === userEmailInput.value);
}


function isInputEmpty() {
    return inputsSignUp.some(input => input.value === '');
}

function validUserName() {
    var regexName = /^[A-Z][a-z- ]{2,15}$/;
    if (regexName.test(userNameInput.value)) {
        userNameInput.classList.add('is-valid');
        userNameInput.classList.remove('is-invalid');
        alertName.classList.add('d-none');
        return true;
    } else {
        userNameInput.classList.add('is-invalid');
        userNameInput.classList.remove('is-valid');
        alertName.classList.remove('d-none');
        return false;
    }
}

function validUserEmail() {
    var regexEmail = /^[a-zA-Z0-9_]{3,10}(@[a-zA-Z0-9]{3,15}\.com)$/;
    if (regexEmail.test(userEmailInput.value)) {
        userEmailInput.classList.add('is-valid');
        userEmailInput.classList.remove('is-invalid');
        alertEmail.classList.add('d-none');
        return true;
    } else {
        userEmailInput.classList.add('is-invalid');
        userEmailInput.classList.remove('is-valid');
        alertEmail.classList.remove('d-none');
        return false;
    }
}

function validUserPass() {
    var regexPass = /^[a-zA-Z0-9_]{4,15}$/;
    if (regexPass.test(userPasswordInput.value)) {
        userPasswordInput.classList.add('is-valid');
        userPasswordInput.classList.remove('is-invalid');
        alertPass.classList.add('d-none');
        return true;
    } else {
        userPasswordInput.classList.add('is-invalid');
        userPasswordInput.classList.remove('is-valid');
        alertPass.classList.remove('d-none');
        return false;
    }
}


if (loginBtn) loginBtn.addEventListener('click', logIn);

function logIn() {
    var email = searchEmail.value;
    var password = searchPass.value;

    if (email === '' || password === '') {
        alertSignin.innerHTML = 'All fields are important..';
        alertSignin.classList.replace('d-none', 'd-block');
        alertSignin.classList.add('text-danger');
        resetFormLogin();
    } else {
        var user = users.find(user => user.email === email && user.password === password);
        if (user) {
            localStorage.setItem('loginList', JSON.stringify(user));
            window.location.href = 'welcome.html';
        } else {
            alertSignin.innerHTML = 'There is an error in Email, Password or Both..';
            alertSignin.classList.replace('d-none', 'd-block');
            alertSignin.classList.add('text-danger');
            resetFormLogin();
        }
    }
}

function resetFormLogin() {
    for (var i = 0; i < inputsLogin.length; i++) {
        inputsLogin[i].value = '';
    }
}
if (logoutBtn) logoutBtn.addEventListener('click', logOut);

function logOut() {
    localStorage.removeItem('loginList');
    window.location.href = 'home.html';
}
if (welcomeSignal && loggedInUser) {
    var user = JSON.parse(localStorage.getItem('loginList'));
    welcomeSignal.innerHTML = `Welcome ${user.name}`;
}
