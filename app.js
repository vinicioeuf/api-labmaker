const express = require('express');
const { Pool } = require('pg');
const port = process.env.PORT || 3000;

const pool = new Pool({
  user: 'fmnercvqudmolw',
  host: 'ec2-3-230-24-12.compute-1.amazonaws.com',
  database: 'db9h5hhh04rd6v',
  password: 'df7629e201f340921d1139325ce8d37c1b293915d3659275bff6ca1ea89d2d58',
  port: 5432,
});

const app = express();

app.use(express.json());

app.get("/", async (req, res) =>{
    try {
        const usuarios = await pool.query('SELECT * FROM usuarios');
        res.json(usuarios.rows);
    } catch (err) {
        console.error('Erro ao buscar usuários', err);
        res.status(400).json({
            error: true,
            message: "Ocorreu um erro na API, estamos resolvendo!"
        });
    }
});

app.post("/addusuarios", async (req, res) => {
    const { nome, email } = req.body;
    try {
        await pool.query('INSERT INTO usuarios (nome, email) VALUES ($1, $2)', [nome, email]);
        res.status(200).send("Usuário adicionado com sucesso");
    } catch (err) {
        console.error('Erro ao adicionar usuário', err);
        res.status(400).send("Erro ao adicionar usuário");
    }
});

app.get("/listarusuario/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        if (usuario.rows.length === 0) {
            return res.status(404).json({
                error: true,
                message: "Nenhum usuário encontrado com o ID fornecido!"
            });
        }
        res.json(usuario.rows[0]);
    } catch (err) {
        console.error('Erro ao buscar usuário', err);
        res.status(400).json({
            error: true,
            message: "Ocorreu um erro na API, estamos resolvendo!"
        });
    }
});

// Adapte os demais endpoints de acordo com as mudanças necessárias para PostgreSQL

app.listen(port, ()=>{
    console.log(`Servidor iniciado no endereço: http://localhost:${port}`);
});
