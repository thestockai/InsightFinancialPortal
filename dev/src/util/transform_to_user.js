const User =  require('../bean/user')
function transform_to_user(carl){
    var obj =carl[0]
    if(obj == null) return obj
    // console.log(obj.email)
    var account = obj.account
    var email = obj.email
    var password = obj.password
    var money = obj.money
    var companies = obj.companies
    var stocks_id = obj.stocks_id
    var isscribed = obj.isscribed
    var user =new User(account,email,password,money,companies,stocks_id,isscribed)
    // console.log(user)
    return user
}

module.exports = {transform_to_user}