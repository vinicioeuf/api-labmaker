// e.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'alvaro',
    host: 'dpg-cpb3su6n7f5s73f53npg-a.oregon-postgres.render.com',
    database: 'apilab_h7s0',
    password: 'qww3MIWoJs4dl1SJRK11mPPlXgMTySRh',
    port: 5432,
});

module.exports = pool;
