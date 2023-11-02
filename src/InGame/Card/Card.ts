import {RoomClient} from "./RoomClient";

export class Card{
    constructor(){

    }

    Use(roomClient: RoomClient){
        roomClient.Test();
    }
};