const dotenv = require('dotenv');
const express = require('express');
dotenv.config();

const {sequelize} = require('./models');
const webSocket = require('./socket');
const MainService = require('./src/MainController');
const RandomService = require('./src/shop/randomCard');
const app = express();

const mainService = new MainService();
const randomService = new RandomService();
mainService.Start();

sequelize.sync({force:false})
    .then(()=>{
        console.log('데이터베이스 연결 됨');
    })
    .catch((error) => {
        console.log(error);
    });

app.set('port', 8000);

app.use('/random', (req, res) => {
    res.send(randomService.Start());
});

app.use('/test', (req, res) => {
    mainService.JoinUser('강현서', '20191546');
    res.send('test');
});

const server = app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});


webSocket(server);