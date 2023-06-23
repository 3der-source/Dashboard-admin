import verifyPassword from "./exports/verifyPassword.js";
import verifyEmail from "./exports/verifyEmail.js";
import toggleError from "./exports/toggleError.js";

function verifyCamp(evt, controler){
    if(!controler.registro)return;
    const camp = evt.target;
    const id = camp.getAttribute('id');
    const messageError = document.querySelector(`#${id} ~ p`);
    const campLabel = document.querySelector(`#${id} ~ label`);

    const btnShowPass = document.querySelector(`#${id} ~ button > span`) || undefined;
    
    if(camp.validity.tooShort){
        messageError.innerHTML = `${id.toUpperCase()} deve conter no mínimo ${camp.getAttribute('minlength')} caracteres`;        
        if(btnShowPass)btnShowPass.classList.add('errorMessage');
        toggleError(camp, campLabel, messageError, btnShowPass);
        controler[id] = false;
        return;
    }

    if(id === 'email'){
        messageError.innerHTML = verifyEmail(camp.value);
        if(messageError.innerHTML == 'true'){
            messageError.innerHTML = "" 
        }else{
            toggleError(camp, campLabel, messageError, btnShowPass);
            controler[id] = false;
            return;
        }
    }
    
    if(id === 'senha') {
        messageError.innerHTML = verifyPassword(camp.value);
        if (messageError.innerHTML == 'true') {
            messageError.innerHTML = ""
        } else {
            toggleError(camp, campLabel, messageError, btnShowPass);
            controler[id] = false;
            return;
        }
    }
    camp.removeEventListener('focusout', {})
    controler[id] = true;
}

export default function inputListener(evt, controler){
    const transformValue = evt.target.value !== "" ? "0" : "10px";
    const fontSizeValue = evt.target.value !== "" ? "10px" : "15px";

    evt.target.nextElementSibling.style.top = `${transformValue}`;
    evt.target.nextElementSibling.style.fontSize = fontSizeValue;

    evt.target.addEventListener('focusout', function(evt){
        verifyCamp(evt, controler);
    });
}