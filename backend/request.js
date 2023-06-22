const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express');
const User = require('./database/User');
const request = express();
//register
request.use(express.json());
    
request.post('/register/auth', async(req, res) => {
    try{
        const { username, email, password } = req.body;

        // Verificar ser o e-mail já existe
        const existingEmail = await User.findOne({ email })
        if(existingEmail){
            return res.json({ error: 'Email já existe'})
        }
        const existingUser = await User.findOne({ username })
        if(existingUser){
            return res.json({ error: 'Username já existente'})
        }

        // Criptografar a senha
        const genPassword = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, genPassword);

        const newUser = new User({
            username,
            email: email,
            password: hashedPassword, 
        });


        await newUser.save();   

        
        res.json({
            success: true,
            redirectUrl: '/login',
            username,
            email,
            password,
            
        })
    } catch(error){
        console.log('Error ao registrar usuário', error);
        res.json({ error: 'Registro falhou!' });
    }
})



module.exports = request;