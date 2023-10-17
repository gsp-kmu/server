const Room = require('../../models/room');
const GameRoom = require('../InGame/room');

class RoomController{
    constructor(){
        this.rooms = [];
    }

    Update(){

    }
    
    async CreateRoom(userState1, userState2){
        const room = await Room.create({});
        const user1 = await userState1.getUser();
        const user2 = await userState2.getUser();

        await room.addUser([user1, user2]);
        console.log('room 생성 완료');
        const gameRoom = new GameRoom(user1,user2);
        return gameRoom;
    }

    AddRoom(room){
        this.rooms.push(room);
    }

    RemoveRoom(){

    }
}

module.exports = RoomController;