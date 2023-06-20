const express = require('express');
const app = express();
const path = require('path');

const dirPages = '/frontend/pages';


app.use(express.static(path.join(__dirname + '/frontend/src')));

console.log(__dirname + '/frontend');

app.get('/register' || '/', (req, res) => {
    res.sendFile(path.join(__dirname + dirPages + '/register.html'));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + dirPages + '/Log-in.html'));
})


app.listen(3000, () => {console.log('server running')});