const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;


require("./models/Artigo");

const Artigo = mongoose.model('artigo');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1/labmaker').then(() => {
    console.log("Conexão realizada com sucesso!");
}).catch((erro) =>{
    console.log("Ocorreu um erro na conexão!");
});

app.get("/", async (req, res) =>{
    Artigo.find({}).then((artigo) =>{
        return res.json(artigo);
    }).catch((err) =>{
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado"
        });
    });
});

app.get("/artigo/:id", (req, res) => {
    Artigo.findOne({ _id: req.params.id }).then((artigo) => {
        return res.json(artigo);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        });
    });
});

app.post("/artigo", async (req, res) => {
    try {
        const artigo = await Artigo.create(req.body);
        return res.status(200);
    } catch (err) {
        return res.status(400);
    }
});

app.get("/artigo/:id", (req, res) => {
    Artigo.findOne({ _id: req.params.id }).then((artigo) => {
        return res.json(artigo);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        });
    });
});

app.put("/artigo/editar/:id", (req, res) => {
    const artigo = Artigo.updateOne({_id: req.params.id}, req.body)
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
    console.log("Servidor iniciado na porta 8080: https://api-labmaker-db7c20aa74d8.herokuapp.com");
});
