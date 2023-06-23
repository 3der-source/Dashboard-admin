const bcrypt = require('bcrypt')
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
        })
    } catch(error){
        console.log('Error ao registrar usuário', error);
        res.json({ error: 'Registro falhou!' });
    }
})

request.post('/login/auth', async (res, req) => {
    try{
        const { email, password } = req.body;
        
        const user = await User.findOne({ email: email });
        if(!user){
            return res.json({ error: 'Email já existe' })
        }
    
        const verifyPassword = await bcrypt.compare(password, user.password)
        if(!verifyPassword){
            return res.json({ error: 'A senha está incorreta'})
        }

       return res.json({
        msg: 'Login feito com sucesso!',
        redirectUrl: '/'
        
    })

    } catch(error){
        console.log('Error ao fazer login', error);
        res.json({ error: 'Login falhou!'})
}
})

request.post('/redifinir-senha/auth', async(req, res) => {
    try{    
        const { email, newPassword } = red.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({ error: 'Email já existe' });
        }

        const saltRounds = 10;
        const forgotPassword = bcrypt.hash(newPassword, saltRounds);
        

        user.password = forgotPassword;
        await user.save();

        return res.json({msg: 'Senha redifinida!'});
    } catch(error){
        console.log('Error ao redifinir a senha!', error);
        res.json({ error: 'Redifinir a senha falhou!'})
    }
})


module.exports = request;