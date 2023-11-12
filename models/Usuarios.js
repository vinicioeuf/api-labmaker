const mongoose = require('mongoose');

const Usuarios = new mongoose.Schema({
    nome:{
        type: String,
        require: false
    },
    email:{
        type: String,
        require: false
    },
    senha:{
        type: String,
        require: false
    },
    idBiometria:{
        type: Number,
        require: false
    },
    foto:{
        type: String,
        require: false
    }
},
{
    timestamps: true,
});

mongoose.model('usuarios', Usuarios);