const Room = require('../../models/room');

class RoomController{
    async CreateRoom(userState1, userState2){
        const room = await Room.create({});
        const user1 = await userState1.getUser();
        const user2 = await userState2.getUser();

        await room.addUser([user1, user2]);

        return room;
    }

    RemoveRoom(){

    }
}

module.exports = RoomController;