const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'seemingly-frank-cisco.data-1.use1.tembo.io',
    database: 'postgres',
    password: 'ZUibujzg4IJlXQG7',
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
