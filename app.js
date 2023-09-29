const express = require('express');
const MainService = require('./src/MainController');
const RandomService = require('./src/shop/randomCard');
const app = express();

const mainService = new MainService();
const randomService = new RandomService();
mainService.Start();

app.set('port', 8000);

app.use('/random', (req, res) => {
    res.send(randomService.Start());
});

app.use('/test', (req, res) => {
    mainService.JoinUser('강현서', '20191546');
    res.send('test');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});
