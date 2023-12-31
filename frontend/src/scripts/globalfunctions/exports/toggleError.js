function focusIn(evt){
    evt.target.classList.remove('error');
}

function removeError(camp, label, message, btnShowPass = undefined){
    camp.addEventListener('focusin', (evt)=>{
        focusIn(evt)
        message.innerHTML = ""
        label.classList.remove('errorMessage');
        if(btnShowPass)btnShowPass.classList.remove('errorMessage');
        camp.removeEventListener('focusin', {});
    })}

export default function toggleError(camp, label, message, btnShowPass = undefined){
    camp.classList.add('error');
    label.classList.add('errorMessage');
    message.classList.add('errorMessage')
    if(btnShowPass)btnShowPass.classList.add('errorMessage');
    removeError(camp, label, message, btnShowPass);
}