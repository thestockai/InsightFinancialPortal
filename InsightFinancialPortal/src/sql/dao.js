const retrive_sql = 'SELECT * FROM USERS WHERE EMAIL = ?'
const add_sql = 'INSERT INTO USERS (ACCOUNT,EMAIL,PASSWORD,MONEY,COMPANIES,STOCKS_ID,ISSCRIBED) VALUES (?,?,?,?,?,?,?)'
// const chg_sql='UPDATE USERS SET ID = 11000 WHERE NAME = ?'
const del_sql = 'DELETE FROM STUDENTS WHERE NAME = ?'
const User = require('../bean/user')
const {transform_to_user} = require('../util/transform_to_user')
const get_connection=require('./get_sql')
function Retrive(name, callback) {
    // console.log('retriving:'+name)
    return new Promise((resolve, reject) => {
        var connection = get_connection()
        add_arg = [name]
        var user
        connection.query(retrive_sql, add_arg, function (err, result) {
            if (err) console.log(err);
            else {
                // str = JSON.stringify(result)
                //  console.log(result);
                
                user = transform_to_user(result)
                // console.log('1')
                
                // console.log(user)
            }
            
            callback(user)
            resolve()
            
            
        })
        connection.end()
        // console.log('2')
        // console.log(user)
    }
    )
}
function Add_User(user,callback) {
    return new Promise((resolve, rejuct) => {
        var connection = get_connection()
        add_arg = [null,user.get_email(),user.get_password(),0,'',null,false]
        connection.query(add_sql, add_arg, function (err, result, fields) {
            if (err) {
                console.log(err)
                callback(false)
            }
            else {
                // str = JSON.stringify(result)
                callback(true)
            }
            resolve()
        })
        connection.end()
    }
    )
}
function Chg_User(name) {
    var connection = require('./get_sql')
    add_arg = ['嘿嘿嘿']
    connection.query(del_sql, add_arg, function (err, result, fields) {
        if (err) console.log(err)
        else {
            // str = JSON.stringify(result)
            console.log(result)
        }
    })
    connection.end()
}
function Del_User(name) {
    var connection = require('./get_sql')
    add_arg = ['嘿嘿嘿']
    connection.query(del_sql, add_arg, function (err, result, fields) {
        if (err) console.log(err)
        else {
            // str = JSON.stringify(result)
            console.log(result)
        }
    })
    connection.end()
}
module.exports = { Retrive, Add_User, Chg_User, Del_User }