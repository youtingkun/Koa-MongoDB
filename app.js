var Koa=require('koa'),
    router = require('koa-router')(),
    render = require('koa-art-template'),
    path=require('path'),
    bodyParser=require('koa-bodyparser'),
    DB=require('./module/db.js');
    cors = require('koa2-cors');

var app=new Koa();

//配置post提交数据的中间件
app.use(bodyParser());

//配置 koa-art-template模板引擎
render(app, {
    root: path.join(__dirname, 'views'),   // 视图的位置
    extname: '.html',  // 后缀名
    debug: process.env.NODE_ENV !== 'production'  //是否开启调试模式
});
//显示学员信息
router.get('/',async (ctx)=>{
    let result=await DB.find('user',{});
    ctx.body = {
        code: 200,
        msg: "success",
        result:result
    }
    // await ctx.render('index',{
    //     list:result
    // });
})

router.get('/getUser',async (ctx)=>{
    let result=await DB.find('user',{});
    ctx.body = {
        code: 200,
        msg: "success",
        result:result
    }
    // await ctx.render('index',{
    //     list:result
    // });
})
//增加学员
router.get('/add',async (ctx)=>{

    await ctx.render('add');
})


//执行增加学员的操作
router.post('/addUser',async (ctx)=>{

    //获取表单提交的数据

   // console.log(ctx.request.body);  //{ username: '王麻子', age: '12', sex: '1' }


    let data=await DB.insert('user',ctx.request.body);
    //console.log(data);
    try{
        if(data.result.ok){
            ctx.body = {
                code: 200,
                msg: "success",
                result:{}
            }
        }
    }catch(err){
        console.log(err);
        return;
        ctx.redirect('/add');
    }



})



//编辑学员
router.get('/edit',async (ctx)=>{
    //通过get传过来的id来获取用户信息

    let id=ctx.query.id;

    let data=await DB.find('user',{"_id":DB.getObjectId(id)});

    //获取用户信息
    await ctx.render('edit',{

        list:data[0]
    });

})


router.post('/editUser',async (ctx)=>{
    //通过get传过来的id来获取用户信息
    //console.log(ctx.request.body);

    var id=ctx.request.body._id;
    var username=ctx.request.body.username;

    let data=await DB.update('user',{"_id":DB.getObjectId(id)},{
        username
    })

    try{
        if(data.result.ok){
            ctx.body = {
                code: 200,
                msg: "success",
                result:{}
            }
        }
    }catch(err){
        console.log(err);
        return;
        ctx.redirect('/');
    }

})


//删除学员
router.post('/delUser',async (ctx)=>{

    let id=ctx.request.body._id;

    var data=await DB.remove('user',{"_id":DB.getObjectId(id)});
    console.log(data);
    if(data){
        ctx.body = {
            code: 200,
            msg: "success",
            result:{}
        }
    }

})

//测试jenkins自动化部署
app.use(cors());
app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());
app.listen(3000);


