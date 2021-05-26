class User {
    constructor(account, email, password, money, companies, stocks_id, isscribed) {
        this.account = account
        this.email = email
        this.password = password
        this.money = money
        this.companies = companies
        this.stocks_id = stocks_id
        this.isscribed = isscribed
    }
    get_email(){
        return this.email    
    }
    get_password(){
        return this.password
    }
}
module.exports = User