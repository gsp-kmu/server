import { Reaper } from "../Ability/Reaper";
import { Ability } from "../Ability/Ability";
import { Card } from "./Card";
import { RoomClient } from "../RoomClient";

export class ReaperCard extends Card {
    ability: Ability
    constructor(id: number, number:number, data:any, cardId:number) {
        super(id, number, data);
        this.number = number;
        this.ability = new Reaper(this.id, data.drawDigit, data.targetId, data.targetDigit);
    }

    Use(roomClient:RoomClient){
        super.Use(roomClient);
        this.ability.Play(roomClient);
    }
}