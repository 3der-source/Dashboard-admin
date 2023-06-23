export default function verifyPassword(password){
    if(password == '')return 'SENHA: por favor preencha esse campo'
    const verifyTolowerCase =  new RegExp(/[a-z]/);
    const verifyToUperCase = new RegExp(/[A-Z]/);
    const verifyPasswordNumber = new RegExp(/[0-9]/);
    const verifySpecialCharacters = new RegExp(/[!@#$.,;:&*%-_+=()]/)

    if(!verifyTolowerCase.test(password) || !verifyToUperCase.test(password)){
        return 'A senha tem que ter letras maiúsculas e minúsculas!'
    } 
    if(!verifyPasswordNumber.test(password)){
        return 'A senha dever conter números!'
    }

    if(!verifySpecialCharacters.test(password)){
        return 'A senha precisar ter uma caracter especial!'
    }

    return 'true';

}
