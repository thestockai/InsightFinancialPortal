const mysql = require('mysql')
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'SCHOOL',
    port:3306
});
module.exports = connection