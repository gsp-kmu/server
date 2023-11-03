const Room = require('../../models/room');
const GameRoom = require('../InGame/room');
const { GetSocket } = require('../common/NetworkService');
const io = require('../common/NetworkService').io;

class RoomService{
    rooms = [];
    
    async CreateRoom(userState1, userState2){
        const room = await Room.create({});
        const user1 = await userState1.getUser();
        const user2 = await userState2.getUser();

        const user1Socket = GetSocket(userState1.socketid);
        const user2Socket = GetSocket(userState2.socketid);

        const roomId = "room" + room.id;
        user1Socket.join(roomId);
        user2Socket.join(roomId);

        user1Socket.emit("test-message", "testtesttest");
        await room.addUser([user1, user2]);
        console.log('room 생성 완료');
        
        return this.CreateGameRoom(userState1.socketid, userState2.socketid, room);
    }

    CreateSocketRoom(){

    }

    CreateGameRoom(user1, user2, room){
        return new GameRoom(user1, user2, room.id);
    }

    AddRoom(room){
        this.rooms.push(room);
    }

    RemoveRoom(){

    }
}
const roomService = new RoomService();
module.exports = {roomService};