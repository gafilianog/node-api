const mysql = require('mysql2');

const dbPool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 3306
});

// if using dbPool.promise() not connect. why?
module.exports = dbPool.promise();