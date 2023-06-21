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

const inputs = [...document.querySelectorAll('input')];

inputs.map((e) => {
    e.addEventListener('input', function (){
        if(this.value !== ""){
            this.nextElementSibling.style.transform = "translateY(-10px)";
        }else {
            this.nextElementSibling.style.transform = "translateY(0)";
        }
    })
})

usernameCamp.addEventListener('focusout', verifyCamp);
usernameCamp.addEventListener('focusin', () => {
    usernameCamp.classList.remove('error');
})



document.querySelector('.button-register').addEventListener('click', (e) =>{
    e.preventDefault();
    const dados = {
        username: usernameCamp.value,
        email: emailCamp.value,
        password: passwordCamp.value,
    }

    console.log(dados)

    const cabecalho = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    }

    fetch('/auth/register', cabecalho)
    .then(res => res.json())
    .then(res => console.log(res)); 
})