'use strict';
const mysql = require('mysql2');
//local mysql db connection
const dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database : 'backsql'
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("LMS Database Connected successfully!");
});
module.exports = dbConn;