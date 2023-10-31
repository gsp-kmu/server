const { roomService } = require("../match/RoomService");


class GameController {
    constructor(){
        this.rooms = roomService.rooms;
    }
    Update(){
        for(i = 0; i < this.rooms.length; i++){
            this.rooms[i].Update();
        }
    }
}

module.exports = GameController;