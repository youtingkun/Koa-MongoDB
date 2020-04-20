const mongoose = require('mongoose')
mongoose.connect(
  'mongodb://MGDBuser:MGDBpassword@47.111.249.97:27017/koa?authSource=admin'
)
const Schema = mongoose.Schema
const UserSchema = new Schema({
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
const User = mongoose.model('User', UserSchema)

module.exports = User
