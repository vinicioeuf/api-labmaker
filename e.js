const { Pool } = require('pg');

const pool = new Pool({
    user: 'u38qbi3ojpsa20',
    host: 'ccba8a0vn4fb2p.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com',
    database: 'd3fps7of3eqn7j',
    password: 'pe8c0334852286e5c2189ec7991828147216f133cac7249c16864fdc50ddd930d',
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
