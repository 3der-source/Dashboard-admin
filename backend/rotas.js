const rotas = require('express').Router();
const path = require('path');

const dirPages = '/frontend/pages';

rotas.get('/register' || '/', (req, res) => {
    res.sendFile(path.join(mainPath + dirPages + '/register.html'));
})

rotas.get('/login', (req, res) => {
    res.sendFile(path.join(mainPath + dirPages + '/Log-in.html'));
})

module.exports = rotas;