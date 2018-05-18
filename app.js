const express = require('express');
const path = require('path');
const message = require('./router/message')
const user = require('./router/user')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var session = require('express-session');
// var FileStore = require('session-file-store')(session);
var RedisStore = require('connect-redis')(session);

let db = mongoose.connect('mongodb://localhost:27017/message')

const app = express()
 
var identityKey = 'laowang'
var options = {
  "host": "127.0.0.1",
  "port": "6379",
  "ttl": 60 * 3
};
app.use(session({
  name: identityKey,
  store: new RedisStore(options),
  secret: 'yige',
  resave: false, // 是否每次都重新保存会话，建议false,
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
}));
// var identityKey = 'skey';
 
// app.use(session({
//   name: identityKey,
//   secret: 'yige', // 用来对session id相关的cookie进行签名
//   store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
//   saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
//   resave: false, // 是否每次都重新保存会话，建议false
//   cookie: {
//     maxAge: 600 * 1000 // 有效期，单位是毫秒
//   }
// }));

app.use(express.static(path.join(__dirname,'dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', message);
app.use('/api', user);
app.listen(3000);