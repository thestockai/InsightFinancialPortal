const mysql = require('mysql')
function get_connection(){
    const connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'123456',
        database:'USERS',
        port:3306
    });
    return connection
}
module.exports = get_connection