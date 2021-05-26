var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport(
    {
        service:'qq',
        host : 'stmp.qq.email',
        secure : true,
        port:465,
        secureConnection:true,
        auth:{
            user : '2336259633@qq.com',
            pass: 'pyiejrjwdeoeecda'
        }
    }
)
module.exports = transporter