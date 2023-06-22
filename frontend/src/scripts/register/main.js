import inputListener from '../globalfunctions/inputListener.js'
import showPassword from '../globalfunctions/showPassword.js';

function registerUser(evt) {
    evt.preventDefault();

    if(!controler.username || !controler.email || !controler.senha){
        
        return;
    }

    const usernameCamp = document.getElementById('username');
    const emailCamp = document.getElementById('email');
    const passwordCamp = document.getElementById('senha');

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

const inputs = Array.from(document.querySelectorAll('input'));
const showPasswordBtn = document.getElementById('showPasswordBtn');

const controler = {
    username: false,
    email: false,
    senha: false,
};

showPasswordBtn.addEventListener('click', showPassword)

inputs.forEach(input => {
    input.addEventListener('input', function(evt){
        inputListener(evt, controler);
    });
})


document.querySelector('.button-register').addEventListener('click', function(evt){
    inputs.map((input) => {
        if(input.validity.valueMissing){
            input.classList.add('error');
            const label = input.nextElementSibling;
            const messageError = document.querySelector(`#${input.getAttribute('id')} ~ p`);

            const btnShowPass = document.querySelector(`#${input.getAttribute('id')} ~ button > span`) || undefined;
            
            label.classList.add('errorMessage');
            messageError.innerHTML = 
            `${input.getAttribute('id').toUpperCase()}: por favor preencha esse campo`
            messageError.classList.add('errorMessage');
            if(btnShowPass)btnShowPass.classList.add('errorMessage');

            input.addEventListener('focusin', function(){
                input.classList.remove('error');
                messageError.innerHTML = ""
                label.classList.remove('errorMessage');
                if(btnShowPass)btnShowPass.classList.remove('errorMessage');
                input.removeEventListener('focusin', {});
            })
            return;
        }
    })

    registerUser(evt);
});
