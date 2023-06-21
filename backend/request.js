const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express');

//register
function httpRequests(app){
    app.use(express.json());
    
    app.post('/register/auth', async(req, res) => {
        const { username, email, password } = req.body;
        res.send(username, email, password)
    })
}

module.exports = {httpRequests};