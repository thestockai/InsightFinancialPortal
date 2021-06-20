const Koa = require('koa')
const static = require('koa-static')
const path = require('path')
const router = require('./src/router_o/my_router')
const controller = require('./src/control/controler')
const cookieParser = require('cookie-parser')
const session = require('koa-session')
const port =  process.env.PORT || 8080;
const app = new Koa()

// app.use(cookieParser())

app.keys = ['some secret hurr']
const CONFIG = {
	key: 'koa:sess', //cookie key (default is koa:sess)
	maxAge: 60*5*1000, // cookie 的过期时间 maxAge in ms (default is 1 days)
	overwrite: true, //是否可以 overwrite (默认 default true)
	httpOnly: false, //cookie 是否只有服务器端可以访问 httpOnly or not (default true)//
	signed: true, //签名默认 true
	rolling: false, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
	renew: false, //(boolean) renew session when session is nearly expired,
}
app.use(session(CONFIG, app))
app.use(static(path.join(__dirname,'static')))
app.use(router.routes())
app.use(router.allowedMethods({}))
app.use(controller.routes())
app.use(controller.allowedMethods())

app.listen(port,()=> console.log(`application listening on http://localhost:${port}`))