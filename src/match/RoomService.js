const Room = require('../../models/room');
const GameRoom = require('../InGame/room');
const { GetSokcet } = require('../common/NetworkService');

class RoomService{
    rooms = [];
    
    async CreateRoom(userState1, userState2){
        const room = await Room.create({});
        const user1 = await userState1.getUser();
        const user2 = await userState2.getUser();

        const user1Socket = GetSokcet(userState1.socketid);
        console.log("emit: ", user1Socket);
        user1Socket.emit("test-message", "testtesttest");
        console.log("룸 생성 완료 했으니 테스트 메시지 보냄");
        await room.addUser([user1, user2]);
        console.log('room 생성 완료');
        
        return this.CreateGameRoom(user1, user2);
    }

    CreateGameRoom(user1, user2){
        return new GameRoom(user1, user2);
    }

    AddRoom(room){
        console.log("룸 추가:   " , room);
        this.rooms.push(room);
    }

    RemoveRoom(){

    }
}
const roomService = new RoomService();
module.exports = {roomService};