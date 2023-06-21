const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express');
const User = require('./database/User');
const mongoose = require('mongoose')
const request = express();
//register
request.use(express.json());
    
    request.post('/register/auth', async(req, res) => {
        try{
            const { username, email, password } = req.body;

            if(!username){
                return res.json({ error: 'Coloque um nome!' })
            }
            if (!email) {
                return res.json({ error: 'Coloque um email!' })
            }
            if (!password) {
                return res.json({ error: 'Coloque uma senha!' })
            }

            // Verificar ser o e-mail já existe
            const existingUser = await User.findOne({ email })
            if(existingUser){
                return res.json({ error: 'Email já existe'})
            }

            // Criptografar a senha
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                username,
                email: email,
                password: hashedPassword, });


            await newUser.save();   
    
    
            res.send({username, email, password})

        } catch(error){
            console.log('Error ao registrar usuário', error);
            res.json({ error: 'Registro falhou!' });
        }
    })



module.exports = request;