const mongoose = require('mongoose');

const Usuarios = new mongoose.Schema({
    idUsuario: {
        type: String,
        required: false
    },
    entrada: {
        type: String,
        required: false
    },
    saida: {
        type: String,
        required: false
    },
},
{
    timestamps: true,
});

mongoose.model('acoes', acoes);