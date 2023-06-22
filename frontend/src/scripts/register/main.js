
function verifyCamp(evt){
    const camp = evt.target;
    const id = camp.getAttribute('id');
    const messageError = document.querySelector(`#${id} ~ p`);

    if(camp.validity.tooShort){
        messageError.classList.add('errorMessage')
        messageError.innerHTML = 
        `${id.toUpperCase()} deve conter no mínimo ${camp.getAttribute('minlength')} caracteres`;
        camp.classList.add('error');
        document.querySelector(`#${id} ~ label`).classList.add('errorMessage');        
    } 
    camp.addEventListener('focus', ()=>{
            messageError.innerHTML = ""
            document.querySelector(`#${id} ~ label`).classList.remove('errorMessage');
    
    })

}


function focusIn(evt){
    evt.target.classList.remove('error');
}

function inputListener(evt){
    const transformValue = evt.target.value !== "" ? "-10px" : "0";
    const fontSizeValue = evt.target.value !== "" ? "10px" : "15px";

    evt.target.nextElementSibling.style.transform = `translateY(${transformValue})`;
    evt.target.nextElementSibling.style.fontSize = fontSizeValue;
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
const passwordCamp = document.getElementById('password');
const showPasswordBtn = document.getElementById('showPasswordBtn');


const inputs = Array.from(document.querySelectorAll('input'));

inputs.forEach(input => {
    input.addEventListener('input', inputListener);
})

usernameCamp.addEventListener('focusout', verifyCamp);
usernameCamp.addEventListener('focusin', focusIn);

document.querySelector('.button-register').addEventListener('click', registerUser);


showPasswordBtn.addEventListener('click', () => {
    const getTypeVerify = passwordCamp.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordCamp.setAttribute('type', getTypeVerify)
    showPasswordBtn.classList.toggle('showPasswordBtn')
})