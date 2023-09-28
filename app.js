const express = require('express');
const webSocket = require('./socket');
const MainService = require('./src/MainController');
const app = express();

const mainService = new MainService();
mainService.Start();

app.set('port', 8000);
app.use('/', (req, res) => {
    mainService.JoinUser('강현서', '20191546');
    res.send('test');
});

const server = app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});

webSocket(server);