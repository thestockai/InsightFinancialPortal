var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport(
    {
        service:'qq',
        port:465,
        secureConnection:true,
        auth:{
            user : '2336259633',
            pass: 'pyiejrjwdeoeecda'
        }
    }
)
var mailOptions = {
    from:'2336259633@qq.com',
    to:'1800012728@pku.edu.cn',
    subject:'Hello!',
    text:'Hello World~'
}
transporter.sendMail(mailOptions,function(error,info){
    if(error){
        return console.log(error);
    }
    console.log('Message Sent:',info.response)
})