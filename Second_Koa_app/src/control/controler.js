const Router = require('koa-router')
const fs=require('fs')
const path = require('path')
const router = new Router()
router.post('/SignIn',async (ctx)=>{
    let postData = await parsePostData( ctx )
    var name = postData.name
    var password = postData.password
    if(name == 'hhh' && password == '123456'){
        ctx.body = {code : '200' , url : '/'}
    }
})
function parsePostData(ctx){
    return new Promise((resolve,reject)=>{
        try {
            // console.log(ctx.req === ctx.request)
            let postData = '';
            ctx.req.addListener('data',(data)=>{
                postData += data;
            })
            ctx.req.addListener('end',()=>{
                let parseData = parseQueryStr(postData);
                resolve(parseData)
            })
        }catch (err) {
            reject(err)
        }
    })
}
function parseQueryStr(queryStr) {
    console.log('queryStr',queryStr)
      let queryData = {};
      let queryStrList = queryStr.split('&');
    //   console.log(queryStrList);
      for(let [index,queryStr] of queryStrList.entries()){
        //   console.log(index,queryStr)
          let itemList = queryStr.split('=');
          queryData[itemList[0]] = decodeURIComponent(itemList[1]);
      }
      return queryData
}
module.exports = router