const rotas = require('express').Router();
const path = require('path');

const mainPath = __dirname.split('\\backend')[0];
const dirPages = '/frontend/pages';

rotas.get('/register' || '/', (req, res) => {
    res.sendFile(path.join(mainPath + dirPages + '/register.html'));
})

rotas.get('/login', (req, res) => {
    res.sendFile(path.join(mainPath + dirPages + '/Log-in.html'));
})

rotas.get('/esqueceuasenha', (req, res) => {
    res.sendFile(path.join(mainPath + dirPages + '/Esqueceu-sua-Senha.html'));
})

module.exports = rotas;