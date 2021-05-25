let transporter = require('./get_Mailer')
function send_Verification_Code(code, email, callback) {
    return new Promise((resolve, reject) => {
        var mailOptions = {
            from: '2336259633@qq.com',
            to: email,
            subject: 'Insight.AI verification Code : ' + code,
            text: "Your confirmation code is " + code + "— enter it in your open browser to finish signing up."
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
                resolve(false)
            }
            else resolve(true)
        })
    })
}
module.exports = send_Verification_Code

