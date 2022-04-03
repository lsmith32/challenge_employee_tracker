const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Lasm#0289',
    database: 'managment',
    port: 3303
});

module.exports = db;