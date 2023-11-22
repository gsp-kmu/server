const Room = require('../../models/room');
const GameRoom = require('../InGame/room.ts');
const { GetSocket } = require('../common/NetworkService');

class RoomService{
    rooms = [];
    
    async CreateRoom(userState1, userState2, deckId1, deckId2){
        const room = await Room.create({});
        const user1 = await userState1.getUser();
        const user2 = await userState2.getUser();

        const user1Socket = GetSocket(userState1.socketid);
        const user2Socket = GetSocket(userState2.socketid);

        const roomId = "room" + room.id;
        user1Socket.join(roomId);
        user2Socket.join(roomId);

        console.log(user1.id)

        user1Socket.emit("test-message", "testtesttest");
        await room.addUser([user1, user2]);
        console.log('room 생성 완료');
        
        return this.CreateGameRoom(user1.id, user2.id, userState1.socketid, userState2.socketid, room, deckId1, deckId2);
    }

    CreateSocketRoom(){

    }

    CreateGameRoom(user1Id, user2Id, user1, user2, room, deckId1, deckId2){
        return new GameRoom(user1Id, user2Id, user1, user2, room.id, deckId1, deckId2);
    }

    AddRoom(room){
        this.rooms.push(room);
    }

    RemoveRoom(){

    }
}
const roomService = new RoomService();
module.exports = {roomService};