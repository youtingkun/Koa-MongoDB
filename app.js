let Koa=require('koa'),
    render = require('koa-art-template'),
    path=require('path'),
    bodyParser=require('koa-bodyparser'),
    DB=require('./module/db.js'),
    cors = require('koa2-cors');
    
// 引入路由
let router = require('koa-router')(),
    index= require('./routes/index.js');

// 引入session
let session = require('koa-session');

// 引入静态资源
let static = require('koa-static')


var app=new Koa();

//配置post提交数据的中间件
app.use(bodyParser());

// 配置session中间件
app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  maxAge: 60*1000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true)  ture表示只有服务器端可以获取cookie*/
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** 在每次请求时强行设置cookie，这将重置cookie 过期时间（默认：false） */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));

// 配置静态资源中间件
app.use(static(__dirname+'/static'));

//测试jenkins自动化部署
app.use(cors());
// 使用路由
router.use(index);
app.use(router.routes());
app.use(router.allowedMethods());
// 监听端口
app.listen(3000);


