const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
dotenv.config();

const {sequelize} = require('./models');
const { CreateCard } = require('./src/util/database');
const webSocket = require('./socket');
const MainService = require('./src/MainController');
const RandomService = require('./src/shop/randomCard');
const app = express();

sequelize.sync({force:false})
    .then(()=>{
        console.log('데이터베이스 연결 됨');
        CreateCard();
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

    const {id, password} = req.body;

    const module = new LoginSystem(id, password);
    const execute = await module.Register();

    if(execute == true){
        console.log(id + "님이 회원가입 하셨습니다.");
        res.status(200).send('success register');
    }
    else{
        console.log(id + "님은 이미 등록된 회원입니다.");
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
        console.log(id + "님이 로그인하셨습니다.");
        res.status(200).send('success login');
    }
    else{
        console.log(id + "님은 등록되지 않은 회원입니다.");
        res.status(400).send('failed username : ${id}');
    }
});

// 덱 생성하기
app.post("/builddeck", async(req, res) => {
    const BuildDeck = require('./src/deck/BuildDeck.ts');
    const {name, userId} = req.body;

    console.log(userId + "번 유저가 " + name + " 덱 생성을 시도합니다.");
    const module = new BuildDeck(name, userId);
    const execute = await module.CreateDeck();

    if(execute == 0) res.status(200).send("Success deck build");
    else if(execute == 1) res.status(400).send("Duplictated deckname : ${name}");
    else if(execute == 2) res.status(401).send("Deck List Full");
    else if(execute == 3) res.status(402).send("Exception");
});

// 덱 편집하기
app.post("/changedeck", async(req, res)=> {
    const ChangeDeck = require('./src/deck/ChangeDeck.ts');
    const {name, userId, deckList} = req.body;

    console.log(userId + "번 유저가 " + name + " 덱 변경을 시도합니다.");
    const module = new ChangeDeck(name, userId, deckList);
    const execute = await module.ModifyDeck();

    if(execute == 0) res.status(400).send("Number of Cards is not enough");
    else if(execute == 1) res.status(200).send("Success change deck");
    else if(execute == 2) res.status(401).send("Deck change Failed");
});

app.post("/deletedeck", async(req, res)=> {
    const DeleteDeck = require('./src/deck/DeleteDeck.ts');
    const {name, userId} = req.body;

    console.log(userId + "번 유저가 " + name + " 덱 제거를 시도합니다.");
    const module = new DeleteDeck(name, userId);
    const execute = await module.DeleteDeck();
    
    if(execute) res.status(200).send("Success delete deck");
    else res.status(400).send("Deck delete Failed");
});

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