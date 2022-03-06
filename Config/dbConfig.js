const mysql = require("mysql2");


    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'lms',
        port: '3308'
    });
    
    module.exports = pool.promise();

