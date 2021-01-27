class User{
    constructor(email,password){
        this.email = email
        this.password = password
    }
    get_email(){
        return this.email
    }
    get_password(){
        return this.password
    }
}
exports = User