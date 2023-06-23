import inputListener from '../globalfunctions/inputListener.js'
import showPassword from '../globalfunctions/showPassword.js';
import toggleError from '../globalfunctions/exports/toggleError.js';

function loginUser(evt) {
    evt.preventDefault();

    if(!controler.email || !controler.senha){
        return;
    }

    const emailCamp = document.getElementById('email');
    const passwordCamp = document.getElementById('senha');

    const dados = {
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

        fetch('/login/auth', cabecalho)
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
                const messageError = document.querySelector(`#${inputs[1].getAttribute('id')} ~ p`);
                messageError.innerHTML = data.error;
                messageError.classList.add('errorMessage');
                toggleError(inputs[1], messageError.previousElementSibling, messageError);
            }
        })
        .catch(res=> console.log('There was a problem with your fetch operation: ' + res.message));
}


const inputs = Array.from(document.querySelectorAll('input'));
const showPasswordBtn = document.getElementById('showPasswordBtn');

const controler = {
    email: false,
    senha: false,
};

showPasswordBtn.addEventListener('click', showPassword)

inputs.forEach(input => {
    input.addEventListener('input', function(evt){
        inputListener(evt, controler);
    });
})

document.querySelector('.style-button-enter').addEventListener('click', function(evt){
    inputs.map((input) => {
        if(input.validity.valueMissing){
            input.classList.add('error');
            const label = input.nextElementSibling;
            const messageError = document.querySelector(`#${input.getAttribute('id')} ~ p`);
            messageError.innerHTML = `${input.getAttribute('id').toUpperCase()}: Por favor preencha esse campo!`;

            const btnShowPass = document.querySelector(`#${input.getAttribute('id')} ~ button > span`) || undefined;
            
            toggleError(input, label, messageError, btnShowPass);
            return;
        }
    })

    loginUser(evt);
});
