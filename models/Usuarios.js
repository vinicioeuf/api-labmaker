// models/Usuarios.js
const pool = require('../e');

const getUsuarios = async () => {
    const res = await pool.query('SELECT * FROM usuarios');
    return res.rows;
};

const getUsuarioById = async (id) => {
    const res = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return res.rows[0];
};

const createUsuario = async (data) => {
    const { nome, email } = data;
    const res = await pool.query('INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *', [nome, email]);
    return res.rows[0];
};

const updateUsuario = async (id, data) => {
    const { nome, email } = data;
    const res = await pool.query('UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3 RETURNING *', [nome, email, id]);
    return res.rows[0];
};

module.exports = { getUsuarios, getUsuarioById, createUsuario, updateUsuario };
