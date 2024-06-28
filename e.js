const { Pool } = require('pg');

const pool = new Pool({
    user: 'alvaro',
    host: 'dpg-cpb3su6n7f5s73f53npg-a.oregon-postgres.render.com',
    database: 'apilab_h7s0',
    password: 'qww3MIWoJs4dl1SJRK11mPPlXgMTySRh',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

// Teste de conexão
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erro adquirindo cliente do pool', err.stack);
    }
    console.log('Conexão bem-sucedida com o banco de dados');
    release();
});

module.exports = pool;
