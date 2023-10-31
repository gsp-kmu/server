const { roomService } = require("../match/RoomService");


class GameController {
    constructor(){
        this.rooms = roomService.rooms;
    }
    Update(){
        
    }
}

module.exports = GameController;