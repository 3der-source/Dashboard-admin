function verifyCamp(evt){
    const camp = evt.target;
    const id = camp.getAttribute('id');
    const messageError = document.querySelector(`#${id} ~ p`);

    if(camp.validity.tooShort){
        messageError.classList.add('errorMessage')
        messageError.innerHTML = 
        `${id.toUpperCase()} deve conter no mínimo 7 caracteres`;
        camp.classList.add('error');
    }
}

function focusIn(evt){
    evt.target.classList.remove('error');
}

function inputListener(evt){
    const transformValue = evt.target.value !== "" ? "-10px" : "0";
    evt.target.nextElementSibling.style.transform = `translateY(${transformValue})`;
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

    fetch('/auth/register', cabecalho)
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(res => console.log(res))
    .catch(e => console.log('There was a problem with your fetch operation: ' + e.message));
}

const usernameCamp = document.getElementById('username');
const emailCamp = document.getElementById('email');
const passwordCamp = document.getElementById('password');

const inputs = Array.from(document.querySelectorAll('input'));

inputs.forEach(input => {
    input.addEventListener('input', inputListener);
})

usernameCamp.addEventListener('focusout', verifyCamp);
usernameCamp.addEventListener('focusin', focusIn);

document.querySelector('.button-register').addEventListener('click', registerUser);