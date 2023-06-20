import express, { Request, Response } from 'express';
const path = require('path');

const server = express();

server.use(express.static(path.join(__dirname + '/../css')));

server.get('/', (req: Request, res: Response) =>{
    res.sendFile(path.join(__dirname + '/../register.html'))
})

server.listen(8080, () =>{
    console.log(`Servidor aberto!`);
});