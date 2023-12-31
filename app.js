const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
dotenv.config();

const {sequelize} = require('./models');
const webSocket = require('./socket');
const io = require("./socket").io;
const MainService = require('./src/MainController');
const RandomService = require('./src/shop/randomCard');
const { CreateCard } = require('./src/util/database.js');
const app = express();

sequelize.sync({force:false})
    .then(()=>{
        console.log('데이터베이스 연결 됨');
        CreateCard();
        sequelize.query("DELETE FROM userState;").then((result) => {
            console.log('쿼리 실행 결과:', result);
        });
    })
    .catch((error) => {
        console.log(error);
    });

app.set('port', 8000);

app.use(bodyParser.json());

app.post('/test', (req, res)=>{
    const user = "test";
    res.status(200).send("rrr");
    res.status(400).send("rrrr");
});

app.post('/random', async (req, res) => {
    try{
        const {userId} = req.body;

        const [randomlist, duplicate, coin] = await randomService.Start(userId);

        console.log(duplicate);

        if (randomlist.length == 0) res.status(400).json({ msg: "Coin is not enough" });
        else res.status(200).json({msg : 'Successfully Random', cardList : randomlist, duplicate : duplicate, coin : coin});
    }
    catch (err){
        console.log(err);
        res.status(401).json({msg : "Unexpected Error"});
    }
});

app.post('/getcoin', async (req, res) => {
    try {
        const coinSystem = require("./src/shop/getCoin.js");
        const { userId } = req.body;
        
        const coin = await coinSystem.getCoin(userId);

        res.status(200).json({ coin: coin });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Unexpected Error" });
    }
});

//코인 치트
app.post('/setcoin', async (req, res) => {
    try {
        const coinCheat = require('./src/shop/getCoin.js');
        const { userId, cheatCode } = req.body;

        console.log(cheatCode);
        console.log(process.env.CHEAT_CODE);

        if (cheatCode == process.env.CHEAT_CODE) {
            await coinCheat.setCoin(userId);
            
            const coin = await coinCheat.getCoin(userId);
            res.status(200).json({ coin: coin });
        }
        else {
            res.status(400).json({ msg: "Unexpected Error" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Unexpected Error" });
    }
});

// 회원가입
app.post("/register", async (req, res) => {
    try{
        const LoginSystem = require("./src/util/LoginSystem");

        const {id, password} = req.body;

        const module = new LoginSystem(id, password);
        const execute = await module.Register();

        if(execute == 1){
            console.log(id + "님이 회원가입 하셨습니다.");
            res.status(200).send('success register');
        }
        else if (execute == 0) {
            console.log(id + "비밀번호 형식이 일치하지 않습니다.");
            res.status(400).send('Password Pattern is not good');
        }
        else if(execute == 2){
            console.log(id + "님은 이미 등록된 회원입니다.");
            res.status(401).send('duplicate username : ' + id);
        }
    }
    catch (err){
        console.log(err);
        res.status(402).send('Unexpected Error');
    }
})

// 로그인
app.post("/login", async (req, res) => {
    try{
        const LoginSystem = require("./src/util/LoginSystem");
        const {id, password} = req.body;

        const module = new LoginSystem(id, password);
        const execute = await module.Login();

        if(execute != -1){
            console.log(id + "님이 로그인하셨습니다.");
            res.status(200).json({msg:'success login',userId : execute});
        }
        else{
            console.log(id + "님은 등록되지 않은 회원입니다.");
            res.status(400).json({msg:'failed username : ' + id,userId : execute});
        }
    }
    catch (err){
        console.log(err);
        if(err == 'Nan') res.status(401).json({msg:'Non Account'});
        else res.status(401).json({msg:'Unexpected Error'});
    }
});

// 덱 편집하기
app.post("/savedeck", async(req, res)=> {
    try{
        const ChangeDeck = require('./src/deck/ChangeDeck.ts');
        const {userId, deckList, nameList} = req.body;

        console.log(userId + "번 유저가 덱 저장을 시도하려 합니다.");
        const module = new ChangeDeck(userId, deckList, nameList);
        const execute = await module.saveDeck();

        if(execute == 0) res.status(400).send("All decks are not updated");
        else if(execute == 1) res.status(200).send("All decks are updated");
        else if(execute == 2) res.status(401).send("Deck update Failed");
    }
    catch(err){
        console.log(err);
        res.status(402).send("Unexpected Error");
    }
});

// 덱 리스트 얻기
app.post("/getdeck", async(req, res)=> {
    try{
        const GetDeck = require('./src/deck/GetDeck.ts');
        const {userId} = req.body;

        console.log(userId + "번 유저가 덱 목록을 얻을려고 시도합니다.");
        const module = new GetDeck(userId);
        const [decklist, namelist] = await module.getDeckList();

        res.status(200).json({msg:"Successfully get deck list",deckList:decklist, nameList:namelist});
    }
    catch{
        res.status(400).json({msg:"Unexpected Error"});
    }    
});

// 전체 카드 리스트 얻기
app.post("/getcard", async(req, res)=> {
    try{
        const GetAllCard = require('./src/deck/GetAllCard.ts');
        const {userId} = req.body;

        console.log(userId + "번 유저가 전체 카드 목록을 얻을려고 시도합니다.");
        const module = new GetAllCard(userId);
        const cardlist = await module.getCardList();

        res.status(200).json({msg:"Successfully get card list",cardList:cardlist});
    }
    catch (err){
        console.log(err);
        res.status(400).json({msg:"Unexpected Error"});
    }    
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
