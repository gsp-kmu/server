const Room = require('../../models/room');
const GameRoom = require('../InGame/room');

class RoomService{
    async CreateRoom(userState1, userState2){
        const room = await Room.create({});
        const user1 = await userState1.getUser();
        const user2 = await userState2.getUser();

        await room.addUser([user1, user2]);
        console.log('room 생성 완료');
        
        return this.CreateGameRoom(user1, user2);
    }

    CreateGameRoom(user1, user2){
        return new GameRoom(user1, user2);
    }

    AddRoom(room){
        this.rooms.push(room);
    }

    RemoveRoom(){

    }
}
const roomService = new RoomService();
module.exports = {roomService};