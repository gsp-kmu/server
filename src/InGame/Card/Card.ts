import {RoomClient} from "../RoomClient";

export class Card{
    constructor(){

    }

    Use(myId:string, roomClient: RoomClient){
        return roomClient.GetUser();
    }
};