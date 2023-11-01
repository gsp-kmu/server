const { roomService } = require("../match/RoomService");

class GameController {
    constructor(){
        this.rooms = roomService.rooms;
        console.log("length는?: ", roomService.rooms.length);
    }
    Update(){
        for(let i = 0; i < this.rooms.length; i++){
            //console.log("i는? ", i);
            //console.log("this는?: ", this.rooms.length);
            //console.log(this.rooms);
            //console.log(this.rooms[i]);

            if(this.rooms[i].CheckUserConnected() == false){
                console.log("삭제됨");
                this.rooms.splice(i, 1);
                break;
            }
            this.rooms[i].Update();
        }
    }
}

module.exports = GameController;