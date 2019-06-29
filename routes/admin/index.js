/**
 * Created by Administrator on 2018/3/20 0020.
 */
var router=require('koa-router')();

var user=require('./user.js');

var focus=require('./focus.js');

var newscate=require('./newscate.js');

//配置admin的子路由  层级路由
router.get('/',async (ctx)=>{
    ctx.body='admin首页'
})

router.use('/user',user);

router.use('/focus',focus);

router.use('/newscate',newscate);


module.exports=router.routes();