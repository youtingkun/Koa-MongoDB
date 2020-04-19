const Koa = require('koa')
const routers = require('./router/index.js') // 引入router
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')

// 在new之前先引入所有的中间件
const app = new Koa()

// 使用post提交数据中间件,这个插件要放在路由之前才会生效。
app.use(bodyParser())

// 使用静态资源中间件,设置资源的根路径
app.use(static(__dirname + '/static'))

// 使用路由
app.use(routers.routes())
app.use(routers.allowedMethods())

// 监听端口，这句话放在最下面
app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')
