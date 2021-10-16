// 本地模拟json 数据
var express = require('express');
var app = express();
var path = require('path'); //系统路径模块
var fs = require('fs'); //文件模块

app.all('/mock/api/articles/query', function (req, res) {
  console.log(req.url, 'req');
  let { url } = req;

  if(url.startsWith('/mock')) {
    //前面参数使用正则，后面使用字符串
    let jsonDataName = url.replace(/\//g, '.');
    jsonDataName = jsonDataName.replace('.mock.', '') + '.json';
    var file = path.join(__dirname + '/jsonData/' + jsonDataName); //文件路径，__dirname为当前运行js文件的目录
	  //读取json文件
    fs.readFile(file, 'utf-8', function(err, data) {
      if (err) {
        res.send({
          'code': 500,
          'message': `查找【${jsonDataName}】出错...`
        });
      } else {
        res.send(data);
      }
    });
  }
});

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});