const router = require('koa-router')()

router.get('/', (ctx, next) => {
  ctx.body = '/news新闻首页'
})

router.get('/newslist', (ctx) => {
  ctx.body = 'title新闻的子接口接口'
})

module.exports = router
