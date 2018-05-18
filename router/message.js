const express = require('express');
const router = express.Router();
const Message = require('../models/messageSchema');
// const getIp = require('../utils/getIp.js');
// const xlsx = require('node-xlsx');
// const excelExports = require('excel-export')
// const fs = require('fs');

router.get('/', (req, res) =>{
  res.send('hello, express!!!')
})

// 查询留言列表(无分页)
router.get('/GetMessageList',(req, res) => {
  Message.find({})
    .sort({_id: -1})
    .then(message => {
      res.json(message);
    })
    .catch(err => {
      res.json(err)
    })
})

// 带分页
router.post('/GetMessageListForPaging', (req, res) => {
  // 第几页
  var currPage = req.body.currPage
  // 返回条数
  var maxResultCount = req.body.maxResultCount
  var query = Message.find({});
  query.skip((currPage-1)*maxResultCount);
  query.limit(maxResultCount);
  query.sort({_id: -1});
  query.exec((err, rs) => {
    if (err) {
      res.send(err);
    } else {
      Message.find((err, result) => {
        var jsonArray = {result: rs, totalCount: result.length};
        res.json(jsonArray);
      })
    }
  })
})

// 添加留言信息
router.post('/AddMessage',(req, res) => {
  // var clientIp = getIp(req)
  Message.create(req.body)
    .then(message => {
      res.json({'result': message, 'message': '添加成功', 'status': true})
    })
    .catch(err => {
      res.json(err)
    })
})

// 删除留言信息
router.post('/DeleteMessage', (req, res) => {
  Message.findByIdAndRemove(req.body.id)
    .then(message => {
      res.json({'result': '删除成功', 'status': true})
    })
    .catch(err => {
      res.json(err)
    })
})

// 通过node-xlsx导出excel表格
// router.get('/exportExcel', (req, res) => {
//   var title = ['姓名','留言信息','时间']
//   var content = [
//     ['老王','沙发','2012.02.01'],
//     ['老王','沙发','2012.02.01'],
//     ['老王','沙发','2012.02.01']
//   ]
//   // var data = [['姓名','留言信息','时间'],['老王','沙发','2012.02.01']];
//   var data = [title, content];
//   var buffer = xlsx.build([{name: "mySheetName", data: data}]);
//   fs.writeFileSync('b.xlsx', buffer, 'binary');
//   res.send('export successfully!');
// })

// 通过excel-export导出excel表格
// router.get('/excelExport', (req, res) => {
//   var conf ={};
// 	conf.stylesXmlFile = "styles.xml";
//     conf.name = "mysheet";
//   	conf.cols = [{
// 		caption:'string',
//         type:'string',
//         beforeCellWrite:function(row, cellData){
// 			  return cellData.toUpperCase();
// 		},
//         width:28.7109375
// 	},{
// 		caption:'date',
// 		type:'date',
// 		beforeCellWrite:function(){
// 			var originDate = new Date(Date.UTC(1899,11,30));
// 			return function(row, cellData, eOpt){
//           		if (eOpt.rowNum%2){
//             		eOpt.styleIndex = 1;
//           		}  
//           		else{
//             		eOpt.styleIndex = 2;
//           		}
//                 if (cellData === null){
//                   eOpt.cellType = 'string';
//                   return 'N/A';
//                 } else
//                   return (cellData - originDate) / (24 * 60 * 60 * 1000);
// 			} 
// 		}()
// 	},{
// 		caption:'bool',
// 		type:'bool'
// 	},{
// 		caption:'number',
// 		 type:'number'				
//   	}];
//   	conf.rows = [
//  		['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14],
//  		["e", new Date(2012, 4, 1), false, 2.7182],
//         ["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.61803],
//         ["null date", null, true, 1.414]  
//   	];
//   	var result = excelExports.execute(conf);
//   	res.setHeader('Content-Type', 'application/vnd.openxmlformats');
//   	res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
//   	res.end(result, 'binary');
// })


/**
 * ----------------------------------------------------------
 * 下边是用户接口
 * ----------------------------------------------------------
 */


module.exports = router