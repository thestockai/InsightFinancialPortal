const retrive_sql = 'SELECT * FROM STUDENTS WHERE NAME = ?'
const add_sql='INSERT INTO STUDENTS (ID,NAME,PASSWORD,SEX,GRADE,PHONE_NUM,ADDRESS,BIRTH,EMAIL) VALUES (?,?,?,?,?,?,?,?,?)'
const chg_sql='UPDATE STUDENTS SET ID = 11000 WHERE NAME = ?'
const del_sql='DELETE FROM STUDENTS WHERE NAME = ?'
User = require('../bean/user')
function Retrive(name){
    var connection = require('./get_sql')    
    add_arg = ['金蝶']
    connection.query(retrive_sql,add_arg,function(err,result,fields){
        if(err) console.log(err);
        else{
            // str = JSON.stringify(result)
            console.log(result);
        }
    })
    connection.end()
}
function Add_User(user){
    var connection = require('./get_sql')
    add_arg = ['000000','嘿嘿嘿','234567','女','3','18888888888','好望角','1999-02-02','122222@qq.com']
    connection.query(add_sql,add_arg,function(err,result,fields){
        if(err) console.log(err)
        else{
            // str = JSON.stringify(result)
            console.log(result)
        }
    })
    connection.end()
}
function Chg_User(name){
    var connection = require('./get_sql')
    add_arg = ['嘿嘿嘿']
    connection.query(del_sql,add_arg,function(err,result,fields){
        if(err) console.log(err)
        else{
            // str = JSON.stringify(result)
            console.log(result)
        }
    })
    connection.end()
}
function Del_User(name){
    var connection = require('./get_sql')
    add_arg = ['嘿嘿嘿']
    connection.query(del_sql,add_arg,function(err,result,fields){
        if(err) console.log(err)
        else{
            // str = JSON.stringify(result)
            console.log(result)
        }
    })
    connection.end()
}
module.exports = {Retrive,Add_User,Chg_User,Del_User}