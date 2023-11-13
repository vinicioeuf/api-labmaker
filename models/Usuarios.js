const mongoose = require('mongoose');

const Usuarios = new mongoose.Schema({
    nome: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    senha: {
        type: String,
        required: false
    },
    idBiometria: {
        type: Number,
        required: false
    },
    foto: {
        type: String,
        required: false
    }
},
{
    timestamps: true,
});

Usuarios.pre('save', function(next) {
    if (!this.idBiometria) {
        this.idBiometria = Math.floor(Math.random() * 120) + 1;
    }
    next();
});

mongoose.model('usuarios', Usuarios);