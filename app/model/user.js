const mongoose = require('mongoose')
mongoose.connect(
  'mongodb://MGDBuser:MGDBpassword@47.111.249.97:27017/koa?authSource=admin',
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
)
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: String,
  },
  sex: {
    type: String,
  },
  job: {
    type: String,
  },
})

// 静态方法定义在schema上
UserSchema.statics.findByName = function (name, callback) {
  //this表示整个数据表
  this.find({ name: name }, (err, res) => {
    callback(res)
  })
}

// 动态方法也是定义在schema上
UserSchema.methods.sayHello = function () {
  //这里的this指的是实例
  console.log('我是', this.name)
}

const User = mongoose.model('User', UserSchema)

module.exports = User
