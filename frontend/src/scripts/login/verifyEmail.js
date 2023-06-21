export default function verifyEmail(email){
    if(email.match(/\s/))return 'tira esse espaço acefalo'
    
    const verifyArroba = email.split('@');
    if(verifyArroba.length === 1)return "coloca o @ ai filho da puta!"; 
    for(let i of verifyArroba)if(i === '')return 'mais de um @';

    const verifyDomain = email.split('@')[1].split('.')[0];
    if(verifyDomain.length === 0) return 'Domínio de email inválido';
    const regexSanitize = new RegExp(/[.!@#$%^&*()_+-=~{}<>]/);
    if(regexSanitize.test(verifyDomain))return "Domínio de email Inválido";

    return true;
}