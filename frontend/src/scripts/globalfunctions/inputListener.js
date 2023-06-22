import verifyPassword from "./exports/verifyPassword.js";
import verifyEmail from "./exports/verifyEmail.js";

function focusIn(evt){
    evt.target.classList.remove('error');
}

function verifyCamp(evt){
    const camp = evt.target;
    const id = camp.getAttribute('id');
    const messageError = document.querySelector(`#${id} ~ p`);
    const campLabel = document.querySelector(`#${id} ~ label`);

    const btnShowPass = document.querySelector(`#${id} ~ button > span`) || undefined;

    function removeError(){
        camp.addEventListener('focusin', (evt)=>{
            focusIn(evt)
            messageError.innerHTML = ""
            campLabel.classList.remove('errorMessage');
            if(btnShowPass)btnShowPass.classList.remove('errorMessage');
            camp.removeEventListener('focusin', {});
        })}

    function addError(){
        camp.classList.add('error');
        campLabel.classList.add('errorMessage');
        messageError.classList.add('errorMessage')
        if(btnShowPass)btnShowPass.classList.add('errorMessage');
        removeError();
    }


    
    if(camp.validity.tooShort){
        messageError.innerHTML = `${id.toUpperCase()} deve conter no mínimo ${camp.getAttribute('minlength')} caracteres`;        
        if(btnShowPass)btnShowPass.classList.add('errorMessage');
        addError();
        return;
    }

    if(id === 'email'){
        messageError.innerHTML = verifyEmail(camp.value);
        if(messageError.innerHTML == 'true'){
            messageError.innerHTML = "" 
        }else{
            addError();
        }
    }
    
    if(id === 'senha') {
        messageError.innerHTML = verifyPassword(camp.value);
        if (messageError.innerHTML == 'true') {
            messageError.innerHTML = ""
        } else {
            addError();
        }
    }
    camp.removeEventListener('focusout', {})
}

export default function inputListener(evt){
    const transformValue = evt.target.value !== "" ? "0" : "10px";
    const fontSizeValue = evt.target.value !== "" ? "10px" : "15px";

    evt.target.nextElementSibling.style.top = `${transformValue}`;
    evt.target.nextElementSibling.style.fontSize = fontSizeValue;

    evt.target.addEventListener('focusout', verifyCamp);
}