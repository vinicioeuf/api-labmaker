// models/Acessos.js
const pool = require('../e');

const getAcessos = async () => {
    const res = await pool.query('SELECT * FROM acessos');
    return res.rows;
};

const createAcesso = async (data) => {
    const { usuario_id, data_acesso } = data;
    const res = await pool.query('INSERT INTO acessos (usuario_id, data_acesso) VALUES ($1, $2) RETURNING *', [usuario_id, data_acesso]);
    return res.rows[0];
};

module.exports = { getAcessos, createAcesso };
