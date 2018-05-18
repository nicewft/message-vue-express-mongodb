const mongoose = require('mongoose');

// 定义数据模型
const messageSchema = mongoose.Schema({
  // ip: String,
  userName: String,
  userId: String,
  // password: String,
  createTime: String,
  // name: String,
  content: String
}, {collection: 'msgcontent'})

const Message = module.exports = mongoose.model('message', messageSchema);