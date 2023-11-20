const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;


require("./models/Usuarios");
require("./models/Acessos");

// const Artigo = mongoose.model('artigo');
const Usuarios = mongoose.model('usuarios');
const Acessos = mongoose.model('acessos');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://mongo:G-aaGDdDDHF5CfF2b44d6ccFeCa365aH@roundhouse.proxy.rlwy.net:52462').then(() => {
    console.log("Conexão realizada com sucesso!");
}).catch((erro) =>{
    console.log("Ocorreu um erro na conexão!");
});

app.get("/", async (req, res) =>{
    Usuarios.find({}).then((usuarios) =>{
        return res.json({usuarios});
    }).catch((err) =>{
        return res.status(400).json({
            error: true,
            message: "Nenhum usuario cadastrado até o momento!"
        });
    });
});
app.get("/acoes", async (req, res) =>{
    Usuarios.find({}).then((acoes) =>{
        return res.json({acoes});
    }).catch((err) =>{
        return res.status(400).json({
            error: true,
            message: "Nenhuma ação feita até o momento!"
        });
    });
});
app.post("/addusuarios", async (req, res) => {
    try {
        const usuarios = await Usuarios.create(req.body);
        return res.status(200);
    } catch (err) {
        return res.status(400);
    }
});

app.get("/listarusuario/:id", (req, res) => {
    Usuarios.findOne({ _id: req.params.id }).then((usuario) => {
        return res.json(usuario);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum usuario com o id que você inseriu foi encontrado!"
        });
    });
});

app.put("/usuarios/editar/:id", (req, res) => {
    const usuario = Usuarios.updateOne({_id: req.params.id}, req.body)
        .exec()
        .then(() => {
            return res.status(200).json({
                erro: false,
                message: "Alterações feitas"
            });
        })
        .catch((erro) => {
            return res.status(400).json({
                erro: true,
                message: "Ocorreu um problema, tente novamente"
            });
        });
});

app.listen(port, ()=>{
    console.log(`Servidor iniciado no endereço: http://localhost:${port}`);
});
