const Koa = require('koa')
const routers = require('./router/index.js') // 引入router
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const session = require('koa-session')

// 在new之前先引入所有的中间件
const app = new Koa()

// 使用post提交数据中间件,这个插件要放在路由之前才会生效。
app.use(bodyParser())

// 配置session中间件
app.keys = ['some secret hurr']
const CONFIG = {
  key: 'koa:sess' /** (string) cookie key (default is koa:sess) */,
  maxAge: 60 * 1000,
  autoCommit: true /** (boolean) automatically commit headers (default true) */,
  overwrite: true /** (boolean) can overwrite or not (default true) */,
  httpOnly: true /** (boolean) httpOnly or not (default true)  ture表示只有服务器端可以获取cookie*/,
  signed: true /** (boolean) signed or not (default true) */,
  rolling: false /** 在每次请求时强行设置cookie，这将重置cookie 过期时间（默认：false） */,
  renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/,
}
app.use(session(CONFIG, app))

// 使用静态资源中间件,设置资源的根路径
app.use(static(__dirname + '/static'))

// 使用路由
app.use(routers.routes())
app.use(routers.allowedMethods())

// 监听端口，这句话放在最下面
app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')
