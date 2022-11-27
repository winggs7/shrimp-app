const mysql = require('mysql2');
const dotenv = require("dotenv");

dotenv.config()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    multipleStatements: true
});

module.exports = connection;