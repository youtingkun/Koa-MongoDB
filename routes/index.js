/**
 * Created by Administrator on 2018/3/20 0020.
 */

let router=require('koa-router')();
let admin=require('./admin/index.js');
let api = require('./api/index.js')

router.get('/',async (ctx)=>{

    ctx.body='最大的首页';
})

router.use('/admin',admin)
router.use('/api',api)

module.exports=router.routes();