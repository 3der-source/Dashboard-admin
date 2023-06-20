const validDomains = 
[
    'gmail',
    'AOL',
    'outlook',
    'hotmail',
    'yahoo',
    'icloud',
    'mozilla',
];

const validDot = 
[
    '.com',
    '.com.br',
    '.uol',
    '.net',
]

function verifyEmail(email){
    if(email.match(/\s/))return 'tira esse espaço acefalo'
    
    const splitado = email.split('@');
    if(splitado.length === 1)return "coloca o @ ai filho da puta!"; 
    for(let i of splitado)if(i === '')return 'mais de um @';
}

let msg = verifyEmail('rafa@gmail.com') || true;
console.log(msg)