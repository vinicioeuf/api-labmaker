const mongoose = require('mongoose');

const Acessos = new mongoose.Schema(
    {
    titulo:{
        type: String,
        require: true
    },
    conteudo:{
        type: String,
        require: true
    }
},
{
    timestamps: true,
});

mongoose.model('acessos', Acessos);