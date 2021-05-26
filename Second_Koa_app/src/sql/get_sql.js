const mysql = require('mysql')
const connection = mysql.createConnection({
    host:'XXXXXX',
    user:'XXXXX',
    password:'XXXXx',
    database:'SCHOOL',
    port:3306
});
module.exports = connection
