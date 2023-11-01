const Turn = require("./turn");
const Info = require('../common/Info');
const resultService = require('../ResultService');
const {Send, GetIO} = require('../common/NetworkService');
const UserState = require('../../models/userstate');

class GameRoom{
    constructor(user1, user2, id){  
        this.users = []
        this.users.push(user1);
        this.users.push(user2);
        this.id = id;
        this.turn = new Turn(Info.MAX_PLAYER);
    }

    SendMessage(eveentName, message){
        console.log("eventName: ", eveentName, "  message:  ", message);
        Send("room" + this.id, eveentName, message);
    }
x
    Update(){
        this.SendMessage('test-message', "update 잘 되고 있음");
        if(this.turn.CheckTurnEnd() == true){
            const result = resultService.GetUserReuslt(this.users[0], this.users[1]);
            io.to(testId).emit(Info.EVENT_MESSAGE.INGAME_END, result);
        }
    }

    CheckUserConnected(){
        const io = GetIO();
        const room = io.sockets.adapter.rooms.get("room" + this.id);
        if(room == undefined)
            return false;

        return true;
    }
}

module.exports = GameRoom;