const Router = require('koa-router')
const fs = require('fs')

const path = require('path')
const router = new Router()
router.get('/', async (ctx) => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./views/InsightFinance.html')
})
router.get('/sign_in', async (ctx) => {
        ctx.response.type = 'html'
        ctx.response.body = fs.createReadStream('./views/sign_In2.html')
})
router.get('/sign_up', async (ctx) => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./views/sign_up2.html')
    // /sign_in_with_google_account.html')
})
router.get('/signIn2', async (ctx) => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./views/sign_in2.html')
    // /sign_in_with_google_account.html')
})
router.get('/AboutUs', async (ctx) => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./views/about.html')
    // /sign_in_with_google_account.html')
})
router.get('/infoStock', async (ctx) => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./views/information.html')
    // /sign_in_with_google_account.html')
})
router.get('/analysis', async (ctx) => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./views/analysis.html')
    // /sign_in_with_google_account.html')
})
router.get('/blog', async (ctx) => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./views/blog.html')
    // /sign_in_with_google_account.html')
})
router.get('/admain_login', async (ctx) => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream()
})
router.get('/test', async (ctx) => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./views/test.html')
})
router.get('/getData', async (ctx) => {
    var index = ctx.query.value
    console.log("Wa:" + index)
    ctx.response.type = 'json'
    ctx.response.body = fs.createReadStream('./static/json/1.json')
})
router.get('/plot', async (ctx) => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./views/dynamic_plot.html')
})
router.get('/dynamic_chart', async (ctx) => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./views/dynamic_chart.html')
})
router.get('/charts', async (ctx) => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./views/charts.html')
})
router.get('/cashflow', async (ctx) => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./views/charts/cashflow.html')
})
router.get('/charting', async (ctx) => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./views/charts/charting.html')
})
router.get('/income_stat', async (ctx) => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./views/charts/income_stat.html')
})
module.exports = router