const Info = require('../common/Info');

const { GetIO, GetSocket } = require('../common/NetworkService');

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
                for(let j = 0;j<this.rooms[i].users.length;j++){
                    const socket = GetSocket(this.rooms[i].users[j].socketId);
                    if(socket == undefined)
                        continue;
                    
                    socket.leave("room" + this.rooms[i].id);
                    
                    socket.removeAllListeners(Info.EVENT_MESSAGE.INGAME_CLIENT_READY);
                    socket.removeAllListeners("cheat_ingame_draw_card");
                    socket.removeAllListeners(Info.EVENT_MESSAGE.INGAME_TURN_END);
                    socket.removeAllListeners(Info.EVENT_MESSAGE.TEST);
                    socket.removeAllListeners(Info.EVENT_MESSAGE.INGAME_PLAY_SEND);
                    socket.removeAllListeners(Info.EVENT_MESSAGE.INGAME_SURRENDER);
                }
                const io = GetIO();
                io.sockets.adapter.del("room" + this.rooms[i].id);

                this.rooms.splice(i, 1);
                
                break;
            }
            this.rooms[i].Update();
        }
    }
}


