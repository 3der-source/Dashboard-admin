const mongoose = require('mongoose');

// Definir o esquema do usuário
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Criar o modelo User usando o esquema definido
const User = mongoose.model('User', userSchema);

module.exports = User;