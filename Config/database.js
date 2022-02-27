const mysql = require("mysql2");


    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'lmsbd'
    });
    
    module.exports = pool.promise();




