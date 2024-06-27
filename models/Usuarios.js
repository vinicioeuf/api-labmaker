// models/Usuarios.js
const pool = require('../e');

const getUsuarios = async () => {
    console.log("Buscando todos os usuários");
    const res = await pool.query('SELECT * FROM usuarios');
    return res.rows;
};

const getUsuarioById = async (id) => {
    console.log(`Buscando usuário com id: ${id}`);
    const res = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return res.rows[0];
};

const createUsuario = async (data) => {
    console.log("Criando usuário com dados:", data);
    const { nome, email } = data;
    const res = await pool.query('INSERT INTO usuarios (nome, email, idBiometria, foto, status) VALUES ($1, $2, $3, $4, $5) RETURNING *', [nome, email]);
    return res.rows[0];
};

const updateUsuario = async (id, data) => {
    console.log(`Atualizando usuário com id: ${id} com dados:`, data);
    const { nome, email } = data;
    const res = await pool.query('UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3 RETURNING *', [nome, email, id]);
    return res.rows[0];
};

module.exports = { getUsuarios, getUsuarioById, createUsuario, updateUsuario };
