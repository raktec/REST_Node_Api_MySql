const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'helloworld'
    // host: '198.71.225.84:3306',
    // user: 'rakeshapi',
    // password: 'raktec786@',
    // database: 'adminapi'
})



module.exports = pool