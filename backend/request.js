const express = require('express')
const app = express();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//register

app.use(express.json());

app.post('/register/auth', async(req, res) => {
    const { username, email, password } = req.body;
    res.send(username, email, password)
})

