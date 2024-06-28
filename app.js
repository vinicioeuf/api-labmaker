// app.js
process.env.TZ = 'America/Sao_Paulo';
const express = require('express');
const { getUsuarios, getUsuarioById, createUsuario, updateUsuario } = require('./models/Usuarios');
const { getAcessos, createAcesso } = require('./models/Acessos');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const usuarios = await getUsuarios();
        return res.json({ usuarios });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            error: true,
            message: "Ocorreu um erro na API, estamos resolvendo!"
        });
    }
});

app.get("/acessos", async (req, res) => {
    try {
        const acessos = await getAcessos();
        return res.json({ acessos });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            error: true,
            message: "Nenhum acesso até o momento!"
        });
    }
});

app.post("/addusuarios", async (req, res) => {
    try {
        const usuario = await createUsuario(req.body);
        return res.status(200).send("Usuário adicionado com sucesso");
    } catch (err) {
        console.error("Erro ao adicionar usuário:", err);
        return res.status(400).json({ error: "Erro ao adicionar usuário", details: err.message });
    }
});

app.post("/addacessos", async (req, res) => {
    try {
        const acesso = await createAcesso(req.body);
        return res.status(200).send("Acesso adicionado com sucesso");
    } catch (err) {
        console.error(err);
        return res.status(400).send("Erro ao adicionar acesso");
    }
});

app.get("/listarusuario/:id", async (req, res) => {
    try {
        const usuario = await getUsuarioById(req.params.id);
        return res.json(usuario);
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            error: true,
            message: "Nenhum usuario com o id que você inseriu foi encontrado!"
        });
    }
});

app.put("/usuarios/editar/:id", async (req, res) => {
    try {
        const usuario = await updateUsuario(req.params.id, req.body);
        return res.status(200).json({
            erro: false,
            message: "Alterações feitas"
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            erro: true,
            message: "Ocorreu um problema, tente novamente"
        });
    }
});


app.listen(port, () => {
    console.log(`Servidor iniciado no endereço: http://localhost:${port}`);
});
