const Turn = require("./turn");
const Info = require('../common/Info');

class GameRoom{
    constructor(user1, user2){
        this.users = []
        this.users.push(user1);
        this.users.push(user2);
        this.turn = new Turn(Info.MAX_PLAYER);
    }

    Update(){

    }
}

module.exports = GameRoom;