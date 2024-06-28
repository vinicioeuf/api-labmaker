const pool = require('../e');

const getAcessos = async () => {
    console.log("Buscando todos os acessos");
    const res = await pool.query('SELECT * FROM acessos');
    return res.rows;
};

const createAcesso = async (data) => {
    console.log("Criando acesso com dados:", data);
    const { nome, email, foto, idBiometria, tipo } = data;
    const res = await pool.query(
        'INSERT INTO acessos (nome, email, foto, "idBiometria", tipo, "createdAt") VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
        [nome, email, foto, idBiometria, tipo]
    );
    return res.rows[0];
};

module.exports = { getAcessos, createAcesso };
