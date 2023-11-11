const { sequelize, User, Card} = require('../../models');
const UserState = require('../../models/userstate');
const Info = require('../common/Info');
const Room = require('../../models/room');
const Deck = require('../../models/deck');

// 게임에 유저가 로그인함
async function AddUser(socketId, user) {
    AddUserId(socketId, user.id);
};


// 게임에 유저가 로그인함
async function AddUserId(socketId, userId) {
    let userState = await UserState.create({
        socketid: socketId,
        state: Info.userState.Join,
    });

    userState.setUser(userId);
};

async function DestroyRoom(id){
    Room.destroy({
        where: {
            'id': id,
        }
    });
}

async function SetUserState(socketId, state){ 
    const userState = await UserState.findOne({
        where:{
            'socketId': socketId,
        }
    });
    userState.state = state;
    await userState.save();
}

async function AddUserWinLose(socketId, winValue, loseValue){
    const user = await GetSocketIdToUser(socketId);
    
    user.win += winValue;
    user.lose += loseValue;
    await user.save();

}


async function CreateCard(){
    const CreateCardF = (name)=>{
            Card.findOrCreate({
                where: { 'name': name },
                defaults: {
                    'name': name
                }
            });
        }
    CreateCardF('구미호');
    CreateCardF('메지션');
    CreateCardF('영매사');
    CreateCardF('솔');
    CreateCardF('스나이퍼');
    CreateCardF('흑화 아이코');
    CreateCardF('다크 엘프');
    CreateCardF('점술사');
    CreateCardF('테라');
    CreateCardF('대천사');
}
async function GetDeck(deckId){
    const deck = await Deck.findOne({
        where: { 'id': deckId }
    });

    return deck;
}
async function GetDeckCards(deckId){
    // const deck = await Deck.findByPk(deckId,{
    //     include:Card,
    // });
    // const cards = deck.Cards;
    // return cards.map((card)=>{
    //     return card.id;
    // });
    const cards = [];
    for(let i=1;i<=10;i++){
        cards.push(i);
    }

    return cards;
}

async function GetSocketIdToUser(socketId){
    const userState = await UserState.findOne({
        include: User,
        where: {
            'socketId': socketId,
        }
    });

    return userState.User;
}

module.exports = { AddUser, AddUserId, DestroyRoom, SetUserState, AddUserWinLose, CreateCard, GetDeckCards, GetDeck,
    GetSocketIdToUser};


const test = () => {
    sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 됨');
        AddUserId('ce020e4e401438867853183fbf73b495', 1);
        AddUserId('7829f1f37beb95abd615fe1116f01e46', 2);
        AddUserId('642a03285e9889978f08c5513033b297', 3);
    })
    .catch((error) => {
        console.log(error);
    });
}


//test();

async function test2(){
    const cards = await GetDeckCards(1);
    console.log(cards);
}

async function test3(){
    const deck = await Deck.create({
        name:"hi",
    });

    const cards = await Card.findAll();
    deck.addCards(cards);
}

//test3();