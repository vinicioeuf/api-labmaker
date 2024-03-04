const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const Acessos = new mongoose.Schema(
    {
    idBiometria:{
        type: Number,
        require: false
    },
    nome:{
        type: String,
        require: false
    },
    email:{
        type: String,
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

mongoose.model('acessos', Acessos);