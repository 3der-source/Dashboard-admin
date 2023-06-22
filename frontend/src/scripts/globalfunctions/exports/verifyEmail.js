export default function verifyEmail(email){
    const verifyArroba = email.split('@');
    const verifyDomain = email.split('@')[1].split('.')[0];
    const regexSanitize = new RegExp(/[.!@#$%^&*()_+-=~{}<>]/);
    const verfyDot = email.split('.')[1];

    if(email.match(/\s/))return 'tira esse espaço acefalo';
    
    if(verifyArroba.length === 1)return "coloque o @"; 

    for(let i of verifyArroba)if(i === '')return 'mais de um @';

    if(verifyDomain.length === 0) return 'Domínio de email inválido';

    if(regexSanitize.test(verifyDomain))return "Domínio de email Inválido";

    if(verfyDot == '')return "endereço inválido";

    return 'true';
}