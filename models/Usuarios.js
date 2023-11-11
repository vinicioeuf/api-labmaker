const mongoose = require('mongoose');

const Usuarios = new mongoose.Schema({
    nome:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    senha:{
        type: String,
        require: true
    },
    idBiometria:{
        type: Number,
        require: true
    },
    foto:{
        type: String,
        require: true
    }
},
{
    timestamps: true,
});

mongoose.model('usuarios', Usuarios);