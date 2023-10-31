const Turn = require("./turn");
const Info = require('../common/Info');
const resultService = require('../ResultService');

class GameRoom{
    constructor(user1, user2){  
        this.users = []
        this.users.push(user1);
        this.users.push(user2);
        this.turn = new Turn(Info.MAX_PLAYER);
    }

    Update(){
        if(this.turn.CheckTurnEnd() == true){
            const result = resultService.GetUserReuslt(this.users[0], this.users[1]);
            io.to(testId).emit(Info.EVENT_MESSAGE.INGAME_END, result);
        }
    }
}

module.exports = GameRoom;