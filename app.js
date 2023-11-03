const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
dotenv.config();

const {sequelize} = require('./models');
const webSocket = require('./socket');
const MainService = require('./src/MainController');
const RandomService = require('./src/shop/randomCard');
const app = express();

sequelize.sync({force:false})
    .then(()=>{
        console.log('데이터베이스 연결 됨');
    })
    .catch((error) => {
        console.log(error);
    });

app.set('port', 8000);

app.use(bodyParser.json());

app.use('/random', (req, res) => {
    res.send(randomService.Start());
});

// 회원가입
app.post("/register", async (req, res) => {
    const LoginSystem = require("./src/util/LoginSystem");
    console.log(typeof(req));
    console.log(typeof(req.body));
    console.log(req.body);

    const {id, password} = req.body;

    const module = new LoginSystem(id, password);
    const execute = await module.Register();

    if(execute == true){
        res.status(200).send('success register');
    }
    else{
        res.status(400).send('duplicate username : ${id}');
    }
})

// 로그인
app.post("/login", async (req, res) => {
    const LoginSystem = require("./src/util/LoginSystem");
    const {id, password} = req.body;

    const module = new LoginSystem(id, password);
    const execute = await module.Login();

    if(execute == true){
        res.status(200).send('success login');
    }
    else{
        res.status(400).send('failed username : ${id}');
    }
})

app.use('/test', (req, res) => {
    mainService.JoinUser('강현서', '20191546');
    res.send('test');
});

const server = app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});


const _io = webSocket(server);
require("./src/common/NetworkService").InitIO(_io);
const mainService = new MainService();
const randomService = new RandomService();
mainService.Start();
