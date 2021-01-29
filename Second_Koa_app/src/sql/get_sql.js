const mysql = require('mysql')
const connection = mysql.createConnection({
    host:'database-2.co1vuibsrxfp.us-east-2.rds.amazonaws.com',
    user:'admin',
    password:'9879877878783Wjjj123',
    database:'SCHOOL',
    port:3306
});
module.exports = connection