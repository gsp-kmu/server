const { roomService } = require("../match/RoomService");
const { DestroyRoom } = require("../util/database");

module.exports = class GameController {
    rooms: any;
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

            if (this.rooms[i].CheckRoomClose() == false){
                console.log("삭제됨");
                DestroyRoom(this.rooms[i].id);
                this.rooms.splice(i, 1);
                
                break;
            }
            this.rooms[i].Update();
        }
    }
}


