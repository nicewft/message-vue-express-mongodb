const express = require('express');
const router = express.Router();
const User = require('../models/userSchema.js');


// var findUser = function(name, password){
//   Message.find({})
//     .then(user => {
//       var obj = {}
//       users.forEach(function(item){
//         if (item.userName === name && item.password === password) {
//           obj = item
//         }
//       });
//       return obj;
//     })
// };

// 判断登录状态
router.get('/loginStatus', function(req, res){
  var sess = req.session;
  // res.send(sess);
  var loginUser = sess.loginUser;
  var isLogined = !!loginUser;

  res.json({result: {isLogined: isLogined, userInfo: loginUser || ''}})
});

// 登录接口
router.post('/login', (req, res) => {
  var sess = req.session;
  // var user = findUser(req.body.userName, req.body.password);
  // var user = {}
  // Message.find({})
  //   .then(msg => {
  //     return msg.findIndex((item, index, msg) => {
  //       if ((item.userName === req.body.userName && item.password === req.body.password) !== -1) {
  //         return '123'
  //       }
  //     });
  //   })
  //   .then(item => {
  //     res.json({user: item})
  //   })

    User.find({})
    .then(userList => {
      var user = {}
      userList.forEach(function(item){
        if (item.userName === req.body.userName && item.password === req.body.password){
          user = item
        }
      });
      return user;
    })
    .then(value => {
      var temp = Object.keys(value)
      if (temp.length) {
        req.session.regenerate(function(err) {
        if (err) {
          return res.json({result: {ret_code: 2, message: '登录失败'}});
        }
        // req.session.loginUser = value.userName;
        req.session.loginUser = value;
        res.json({result: {user: value, status: true, message: '登录成功'}});
      })
      } else {
        res.json({result: {status: false, message: '账号或密码错误'}});
      }
    })
    .catch(err => {
      res.json(err)
    })
})

// 退出登录
 
// 退出登录
router.get('/logout', function(req, res){
  // 备注：这里用的 session-file-store 在destroy 方法里，并没有销毁cookie
  // 所以客户端的 cookie 还是存在，导致的问题 --> 退出登陆后，服务端检测到cookie
  // 然后去查找对应的 session 文件，报错
  // session-file-store 本身的bug  

  req.session.destroy(function(err) {
    if(err){
      res.json({status: false, message: '退出登录失败'});
      return;
    }
     
    // req.session.loginUser = null;
    res.clearCookie('connect.sid');
    res.json({result: {status: true, message: '退出登录成功'}})
  });
});

router.get('/getUserInfo', (req, res) => {
  User.find({})
    .then(user => {
      res.json({'result': user, 'message': 'ok', 'status': true})
    })
    .catch(err => {
      res.json(err)
    })
})

// 添加注册用户
router.post('/Adduser',(req, res) => {
  User.create(req.body)
    .then(user => {
      req.session.loginUser = user;
      res.json({'result': user, 'message': '注册成功', 'status': true})
    })
    .catch(err => {
      res.json(err)
    })
})

module.exports = router