export default function showPassword(){
    const getTypeVerify = this.getAttribute('type') === 'password' ? 'text' : 'password';
    const imgButton = passwordCamp.getAttribute('type') === 'password' ? 'visibility' : 'visibility_off';
    
    this.firstElementChild.innerHTML = imgButton; 
    this.setAttribute('type', getTypeVerify)
}