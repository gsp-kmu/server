const Turn = require("./turn");
const Info = require('../common/Info');
const resultService = require('../ResultService');
const {Send, GetIO} = require('../common/NetworkService');
const UserState = require('../../models/userstate');
const GameUser = require('./user');
const NetworkService = require('../common/NetworkService').NetworkService;

class GameRoom{
    constructor(user1, user2, id){  
        this.users = []
        this.users.push(new GameUser(user1));
        this.users.push(new GameUser(user2));
        this.id = id;
        this.turn = new Turn(Info.MAX_PLAYER);
        this.SendFirstTurn();
    }

    Update(){
        this.SendMessage('test-message', "update 잘 되고 있음");
        if(this.turn.CheckTurnEnd() == true){
            const result = resultService.GetUserReuslt(this.users[0], this.users[1]);
            io.to(testId).emit(Info.EVENT_MESSAGE.INGAME_END, result);
        }
    }

    SendMessage(eveentName, message){
        Send("room" + this.id, eveentName, message);
    }

    CheckUserConnected(){
        const io = GetIO();
        const room = io.sockets.adapter.rooms.get("room" + this.id);
        if(room == undefined)
            return false;

        return true;
    }

    SendFirstTurn(){
        const currentTurn = this.turn.currentTurn;
        for(let i=0;i<this.users.length;i++){
            const InGameTurn = {
                turn: '0',
            }
            if(i != currentTurn)
                InGameTurn.turn = '1';

            console.log("socketId: ", this.users[i].socketId, "   turn:  ", InGameTurn);
            Send(this.users[i].socketId, Info.EVENT_MESSAGE.INGAME_TURN, InGameTurn);
        }
    }
}

module.exports = GameRoom;