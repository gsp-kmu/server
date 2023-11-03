import { Transform } from "../Ability/Transform";
import { Ability } from "../Ability/Ability";
import {RoomClient} from "../RoomClient";

export class Card{
    constructor(){

    }

    Use(myId:string, roomClient: RoomClient){
        return roomClient.GetUsers();
    }
};

class TransformCard extends Card{
    ability: Ability
    constructor(id:number){
        super();
        this.ability = new Transform(id);
    }
}