export default function showPassword(){
    const input = this.previousElementSibling.previousElementSibling;
    input.focus();
    const getTypeVerify = input.getAttribute('type') === 'password' ? 'text' : 'password';
    const imgButton = input.getAttribute('type') === 'password' ? 'visibility' : 'visibility_off';
    
    this.firstElementChild.innerHTML = imgButton; 
    input.setAttribute('type', getTypeVerify);
}