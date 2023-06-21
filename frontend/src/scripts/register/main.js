function verifyCamp(evt){
    const camp = evt.target;
    const id = camp.getAttribute('id');
    
    if(camp.validity.tooShort){
        const messageError = document.querySelector(`#${id} ~ p`);
        messageError.classList.add('errorMessage')
        messageError.innerHTML = 
        `${id.toUpperCase()} deve conter no mínimo 7 caracteres`;
        
        camp.classList.add('error');
    }
}

const usernameCamp = document.getElementById('username');
const emailCamp = document.getElementById('email');
const passwordCamp = document.getElementById('password');

usernameCamp.addEventListener('focusout', verifyCamp);
usernameCamp.addEventListener('focusin', () => {
    usernameCamp.classList.remove('error');
})



document.querySelector('.button-register', () => {
    const dados = {
        username: usernameCamp.value,
        email: emailCamp.value,
        password: passwordCamp.value,
    
    }

    const cabecalho = {
        method: 'POST',
        header:{
            'content-type': 'aplication-json',
        },
        body: JSON.stringify(dados),
    }
    fetch('/auth/register', cabecalho)    
})