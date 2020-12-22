const koa = require('koa')
const Router = require('koa-router')
const fs=require('fs')
const static = require('koa-static')
const path = require('path')
const app = new koa()
const router = new Router()
router.get('/',async (ctx)=>{
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./views/dynamic_chart.html')
})
router.get('/test',async (ctx)=>{
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./views/test.html')
})
router.get('/getData',async (ctx)=>{
    var index = ctx.query.value
    console.log("Wa:"+index)
    ctx.response.type='json'
    ctx.response.body = fs.createReadStream('./static/json/1.json')
})
router.get('/plot',async(ctx)=>{
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./views/dynamic_plot.html')
})
router.get('/dynamic_chart',async(ctx)=>{
	ctx.response.type = 'html'
	ctx.response.body = fs.createReadStream('./views/IvyOnlineTest3.html')
})
router.get('/charts',async(ctx)=>{
	ctx.response.type = 'html'
	ctx.response.body = fs.createReadStream('./views/charts.html')
})
app.use(static(path.join((__dirname))))
app.use(router.routes())
app.use(router.allowedMethods({}))
app.listen(3000,()=>{
    console.log('application started on port: 3000')
})