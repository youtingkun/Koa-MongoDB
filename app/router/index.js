const router = require('koa-router')()
const news = require('./news.js')

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

router.use('/news', news.routes())

module.exports = router
