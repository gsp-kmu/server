import {RoomClient} from "../RoomClient";

export class Ability{
    myId:number;
    constructor(myId:number){
        this.myId = myId;
    }

    Use(roomClient: RoomClient){
        return roomClient.GetUser();
    }
};