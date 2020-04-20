const router = require('koa-router')()
const news = require('./news.js')
const User = require('../model/user.js')

router.get('/', (ctx, next) => {
  ctx.body = 'hello koa2'
})

router.get('/test_get', (ctx, next) => {
  let url = ctx.url
  let query = ctx.request.query
  ctx.body = {
    url,
    query,
  }
})

router.get('/test_post', (ctx, next) => {
  // 当GET请求时候返回表单页面
  let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/test_post">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <button type="submit">submit</button>
      </form>
    `
  ctx.body = html
})

router.post('/test_post', (ctx, next) => {
  let postData = ctx.request.body
  ctx.body = postData
})

router.get('/test_cookie', (ctx, next) => {
  ctx.cookies.set('cid', 'hello world', {
    domain: 'localhost', // 写cookie所在的域名
    path: '/test_cookie', // 写cookie所在的路径
    maxAge: 10 * 60 * 1000, // cookie有效时长
    expires: new Date('2020-05-15'), // cookie失效时间
    httpOnly: false, // 是否只用于http请求中获取
    overwrite: false, // 是否允许重写
  })
  ctx.body = 'cookie is ok'
})

router.get('/test_session', (ctx, next) => {
  let n = ctx.session.views || 0
  console.log(ctx.session)

  // ctx.session.views = ++n
  ctx.body = n + ' views'
})
router.get('/test_mongoose', (ctx, next) => {
  console.log('11111111111')

  const xiaoming = new User({ name: '小明', age: '24', sex: '男', job: '工作' })
  xiaoming.save()
})

router.use('/news', news.routes())

module.exports = router
