const mongoose = require('mongoose');

// 定义数据模型
const userSchema = mongoose.Schema({
  userName: String,
  password: String,
  createTime: String
}, {collection: 'user'})

const User = module.exports = mongoose.model('user', userSchema);