const { Pool } = require('pg');

const pool = new Pool({
    user: 'up2u0djded4xc8w34voj',
    host: 'bi01ymgejijc7uj6olrn-postgresql.services.clever-cloud.com',
    database: 'bi01ymgejijc7uj6olrn',
    password: 'Q8930qriIRCpL7D6fYb6lXeIaboEYk',
    port: 50013,
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
