const bcrypt = require('bcrypt')
const express = require('express');
const User = require('./database/User');
const request = express();
//register
request.use(express.json());
    
request.post('/register/auth', async(req, res) => {
    try{
        const { username, email, password } = req.body;

        
        const existingUser = await User.findOne({ username })
        if(existingUser){
            return res.json({
                error: 'Username já existente',
                email: true,
                username: false,
            })
        }

        const existingEmail = await User.findOne({ email })
        if(existingEmail){
            return res.json({
                error: 'Email já existe',
                email: false,
                username: true,
            })
            return;
        }

        // Criptografar a senha
        const genPassword = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, genPassword);

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword, 
        });


        await newUser.save();   

        
        res.json({
            success: true,
            redirectUrl: '/login',
        })
    } catch(error){
        console.log('Error ao registrar usuário', error);
        res.json({ error: 'Registro falhou!' });
    }
})

request.post('/login/auth', async (req, res) => {
    try{
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if(!user){
            return res.json({ 
                email: false,
                senha: true,
                error: 'Email não existente', 
            })
        }
    
        const verifyPassword = await bcrypt.compare(password, user.password)
        if(!verifyPassword){
            return res.json({
                senha: false,
                email:true,
                error: 'A senha está incorreta',
            })
        }

       return res.json({
        success: true,
        redirectUrl: '/',
        
    })

    } catch(error){
        res.json({ error})
        }
})

request.post('/redefinir-senha/auth', async(req, res) => {
    try{    
        const { email, newPassword } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ 
                error: 'Email não existente',
                email: false, 
            });
        }

        if(bcrypt.compare(newPassword, user.password)){
            return res.json({
                error: `Essa é sua senha atual`,
                senha: false,
            })
        }

        const saltRounds = 10;

        bcrypt.hash(newPassword, saltRounds, (err, hashedPassword) =>{
            if(err){
                return res.json(err);
            }else{
                user.password = hashedPassword;
                return user.save();
            }
        })

        return res.json({
            success: true,
            redirectUrl: '/login',
        });
    } catch(error){
        res.json({ error})
    }
})


module.exports = request;