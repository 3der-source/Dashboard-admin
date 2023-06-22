import verifyPassword from "./verifyPassword.js";
import verifyEmail from "./verifyEmail.js";

function verifyCamp(evt){
    function removeError(){
        camp.addEventListener('focusin', (evt)=>{
            focusIn(evt)
            messageError.innerHTML = ""
            campLabel.classList.remove('errorMessage');
            if(btnShowPass)btnShowPass.classList.remove('errorMessage');
            camp.removeEventListener('focusin', {});
    })}

    function addError(msg){
        camp.classList.add('error');
        campLabel.classList.add('errorMessage');
        messageError.classList.add('errorMessage')
        removeError();
    }

    const camp = evt.target;
    const id = camp.getAttribute('id');
    const messageError = document.querySelector(`#${id} ~ p`);
    const campLabel = document.querySelector(`#${id} ~ label`);

    const btnShowPass = document.querySelector(`#${id} ~ button > span`) || undefined;

    
    if(camp.validity.tooShort){
        messageError.innerHTML = `${id.toUpperCase()} deve conter no mínimo ${camp.getAttribute('minlength')} caracteres`;        
        if(btnShowPass)btnShowPass.classList.add('errorMessage');
        addError(messageError);
        return;
    }

    if(id === 'email'){
        messageError.innerHTML = verifyEmail(camp.value);
        if(messageError.innerHTML == 'true'){
            messageError.innerHTML = "" 
        }else{
            addError(messageError);
        }
    }
    camp.removeEventListener('focusout', {});
}


function focusIn(evt){
    evt.target.classList.remove('error');
}

function inputListener(evt){
    const transformValue = evt.target.value !== "" ? "0" : "10px";
    const fontSizeValue = evt.target.value !== "" ? "10px" : "15px";

    evt.target.nextElementSibling.style.top = `${transformValue}`;
    evt.target.nextElementSibling.style.fontSize = fontSizeValue;

    evt.target.addEventListener('focusout', verifyCamp);
}

function showPassword(){
    const getTypeVerify = passwordCamp.getAttribute('type') === 'password' ? 'text' : 'password';
    const imgButton = passwordCamp.getAttribute('type') === 'password' ? 'visibility' : 'visibility_off';
    this.firstElementChild.innerHTML = imgButton; 
    passwordCamp.setAttribute('type', getTypeVerify)
    
}

function registerUser(evt) {
    evt.preventDefault();

    const dados = {
        username: usernameCamp.value,
        email: emailCamp.value,
        password: passwordCamp.value,
    }

    const cabecalho = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    }

        fetch('/register/auth', cabecalho)
        .then((res) => {
            if (!res || !res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            } else {
                return res.json();
            }
        })
        .then((data) => {
            if (data.success) {
                    window.location.href = data.redirectUrl
            } else {
                console.log(data.error)
            }
        })
        .catch(res=> console.log('There was a problem with your fetch operation: ' + res.message));
}

const usernameCamp = document.getElementById('username');
const emailCamp = document.getElementById('email');
const passwordCamp = document.getElementById('senha');
const showPasswordBtn = document.getElementById('showPasswordBtn');

const inputs = Array.from(document.querySelectorAll('input'));

inputs.forEach(input => {
    input.addEventListener('input', inputListener);
})

document.querySelector('.button-register').addEventListener('click', registerUser);


showPasswordBtn.addEventListener('click', showPassword)