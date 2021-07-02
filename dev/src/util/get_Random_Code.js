function get_Random_Code(min,max){
    return new Promise((resolve,reject)=>{
    var rand = Math.random()
    var range = max - min
    resolve(min+Math.floor(rand*range))

})}
module.exports = {get_Random_Code}