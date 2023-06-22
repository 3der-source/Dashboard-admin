export default function verifyEmail(email){
    if(email.match(/\s/))return 'tira esse espaço acefalo'
    
    const verifyArroba = email.split('@');
    if(verifyArroba.length === 1)return "missing "; 
    for(let i of verifyArroba)if(i === '')return 'coloque o @';

    const verifyDomain = email.split('@')[1].split('.')[0];
    if(verifyDomain.length === 0) return 'Domínio de email inválido';

    const regexSanitize = new RegExp(/[.!@#$%^&*()_+-=~{}<>]/);
    if(regexSanitize.test(verifyDomain))return "Domínio de email Inválido";

    const verfyDot = email.split('.')[1];
    if(verfyDot == '')return "endereço inválido";

    return 'true';
}