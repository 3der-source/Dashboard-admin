require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const rotas = require('./rotas');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const mainPath = __dirname.split('\\backend')[0];

app.use(express.static(path.join(mainPath + '/frontend/src')));
app.use(express.json());

app.use(rotas);

//conexão banco de dados
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dataBaseUrl = `mongodb+srv://${dbUser}:${dbPass}@cluster0.st1r4mu.mongodb.net/?retryWrites=true&w=majority`;

app.post('/auth/register', (req, res) => {
    let {username, email, password} = req.body;
    console.log(req.body)
    res.send({username, email, password})
})

app.listen(3000, () => {console.log('server rodando')})
