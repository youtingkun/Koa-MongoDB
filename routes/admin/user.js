/**
 * Created by Administrator on 2018/3/20 0020.
 */

/*用户的增加修改删除*/

let router=require('koa-router')();
let DB=require('../../module/db.js');

router.get('/',async (ctx)=>{
    ctx.body='user首页' + ctx.session.username
})

router.get('/getSession',async (ctx)=>{
    ctx.body='session' + ctx.session.username
})

// 用户登录
router.post('/login',async(ctx)=>{
    let data=await DB.find('admin',ctx.request.body);
    console.log(data)
    if(data.length === 0){
        ctx.body={
            code: 400,
            msg: "用户名或密码错误",
            result:{
             
            }
        }
    }else{
        ctx.session.username = data[0].username;
        ctx.body={
            code: 200,
            msg: "success",
            result:{
                token:ctx.session.username,
                uuid:ctx.session.username,
                data:data[0]
            }
        }
    }
})

// 获取用户信息
router.get('/getUser',async (ctx)=>{
    let result=await DB.find('user',{});
    console.log(ctx.session.username)
    ctx.body = {
        code: 200,
        msg: "success",
        result:result
    }
})

//添加用户
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
    }
})

//编辑用户
router.post('/editUser',async (ctx)=>{
    //通过get传过来的id来获取用户信息
    //console.log(ctx.request.body);

    let id=ctx.request.body._id;
    let username=ctx.request.body.username;

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
    }

})

//删除用户
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

module.exports=router.routes();