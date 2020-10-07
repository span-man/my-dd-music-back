const fs = require('fs')
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const cors = require('koa-cors');
const koaStatic = require('koa-static')
const indexModule = require("./index.js")

router.get('/', async (ctx, next) => {
    ctx.body = '<h1>我的音乐 后</h1>'
})
router.get('/makeJson', async (ctx, next) => {
    indexModule.main()
    ctx.body = "制造json ok 了"
})
router.get('/getAllData', async (ctx, next) => {
    let str = fs.readFileSync('./data/allData.json', 'utf-8')
    ctx.body = str
})

// 静态文件目录
app.use(koaStatic(__dirname + '/musicFiles/')); // eg. http://localhost:3001/xx.mp3

app.use(cors());
app.use(router.routes()); // 注意先后顺序 先写 路由再 规定下面的可跨域
app.listen(3002, console.log('ok -> 3002'));