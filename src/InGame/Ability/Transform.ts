import {RoomClient} from "../RoomClient";
import { Ability } from "./Ability";

export class Transform extends Ability{
    constructor(myId:number){
        super(myId);
    }

    Use(roomClient: RoomClient){
        return roomClient.RegisterAbility();
    }
};