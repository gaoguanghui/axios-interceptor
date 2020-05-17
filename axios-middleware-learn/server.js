const express = require('express');
let app = express();

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.get('/getData', (req, res) => {
    res.send('get res Hello world!');
});

app.post('/postData', (req, res) => {
    res.send('post res hello world!');
});


let server = app.listen(9000, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log('listening at http://%s:%s', host, port, server.address());
});