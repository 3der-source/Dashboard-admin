const express = require('express');
const app = express();
const path = require('path');
const rotas = require('./rotas');

const mainPath = __dirname.split('\\backend')[0];

app.use(express.static(path.join(mainPath + '/frontend/src')));

app.use(rotas);
app.use((req, res)=>{
    res.status(404).send('Página não encontrada seu merda!')
})

app.listen(3000, () => {console.log('server running')});