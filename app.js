process.env.TZ = 'America/Sao_Paulo';
const express = require('express');
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const uri = "mongodb+srv://vinimvdz:manuelneuer2003@api.ibyeq3e.mongodb.net/";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("Conexão realizada com sucesso!");

    const database = client.db("sua_database");
    const usuariosCollection = database.collection("usuarios");
    const acessosCollection = database.collection("acessos");

    app.get("/", async (req, res) => {
      try {
        const usuarios = await usuariosCollection.find({}).toArray();
        return res.json({ usuarios });
      } catch (err) {
        return res.status(400).json({
          error: true,
          message: "Ocorreu um erro na API, estamos resolvendo!"
        });
      }
    });

    app.get("/acessos", async (req, res) => {
      try {
        const acessos = await acessosCollection.find({}).toArray();
        return res.json({ acessos });
      } catch (err) {
        return res.status(400).json({
          error: true,
          message: "Nenhum acesso até o momento!"
        });
      }
    });

    app.post("/addusuarios", async (req, res) => {
      try {
        await usuariosCollection.insertOne(req.body);
        return res.status(200).send("Usuário adicionado com sucesso");
      } catch (err) {
        return res.status(400).send("Erro ao adicionar usuário");
      }
    });

    app.post("/addacessos", async (req, res) => {
      try {
        await acessosCollection.insertOne(req.body);
        return res.status(200).send("Acesso adicionado com sucesso");
      } catch (err) {
        return res.status(400).send("Erro ao adicionar acesso");
      }
    });

    app.get("/listarusuario/:id", async (req, res) => {
      try {
        const usuario = await usuariosCollection.findOne({ _id: req.params.id });
        if (usuario) {
          return res.json(usuario);
        } else {
          return res.status(400).json({
            error: true,
            message: "Nenhum usuário com o ID fornecido foi encontrado!"
          });
        }
      } catch (err) {
        return res.status(400).json({
          error: true,
          message: "Ocorreu um erro na API, estamos resolvendo!"
        });
      }
    });

    app.put("/usuarios/editar/:id", async (req, res) => {
      try {
        await usuariosCollection.updateOne({ _id: req.params.id }, { $set: req.body });
        return res.status(200).json({
          error: false,
          message: "Alterações feitas"
        });
      } catch (err) {
        return res.status(400).json({
          error: true,
          message: "Ocorreu um problema, tente novamente"
        });
      }
    });

    app.listen(port, () => {
      console.log(`Servidor iniciado no endereço: http://localhost:${port}`);
    });
  } finally {
    // Ensure that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);
