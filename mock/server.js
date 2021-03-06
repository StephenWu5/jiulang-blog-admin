// 本地模拟json 数据
var express = require('express');
var app = express();
var path = require('path'); //系统路径模块
var fs = require('fs'); //文件模块

app.all('*', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', ' 3.2.1');
    res.header('Content-Type', 'application/json;charset=utf-8');

    let { url } = req;
    if (url.startsWith('/mock')) {
        //前面参数使用正则，后面使用字符串
        let jsonDataName = url.replace(/\//g, '.');
        jsonDataName = jsonDataName.replace('.mock.', '') + '.json';
        var file = path.join(__dirname + '/jsonData/' + jsonDataName); //文件路径，__dirname为当前运行js文件的目录
        //读取json文件
        fs.readFile(file, 'utf-8', function (err, data) {
            if (err) {
                res.send({
                    code: 500,
                    message: `查找【${jsonDataName}】出错...`
                });
            } else {
                if (url === '/mock/api/login') {
                    // 登录需要设置cookie
                    const { data: innerData } = JSON.parse(data);
                    // 设置cookie，内容要字符串化
                    res.cookie('resc', JSON.stringify(innerData), {
                        expires: new Date(Date.now() + 900000000)
                    });
                }
                res.send(data);
            }
        });
    } else {
        res.send({
            code: 500,
            message: '请给接口开头加上/mock'
        });
    }
});

app.listen(5000, function () {
    console.log('Example app listening on port 5000!');
});
