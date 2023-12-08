const express = require('express');
const { Pool } = require('pg');

require("dotenv").config()
const app = express();

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL
});

const port = process.env.PORT || 3000;

app.use(express.json());



app.listen(port, ()=>{
    console.log(`Servidor iniciado no endereço: http://localhost:${port}`);
});