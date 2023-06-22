export default function verifyEmail(email){
    if(email.match(/\s/))return 'tira esse espaço acefalo'
    
    const verifyArroba = email.split('@');
    if(verifyArroba.length === 1)return "coloca o @ ai filho da puta!"; 
    for(let i = 0; verifyArroba.length - 1; ++i)if(verifyArroba[i] == '' && verifyArroba[i + 1] == '')return 'mais de um @';

    const verifyDomain = email.split('@')[1].split('.')[0];
    if(verifyDomain.length == "") return 'Domínio de email inválido';
    const regexSanitize = new RegExp(/[.!@#$%^&*()_+-=~{}<>]/);
    if(regexSanitize.test(verifyDomain))return "Domínio de email Inválido";

    return true;
}