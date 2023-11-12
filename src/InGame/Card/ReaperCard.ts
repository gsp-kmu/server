import { Reaper } from "../Ability/Reaper";
import { Ability } from "../Ability/Ability";
import { Card } from "./Card";
import { RoomClient } from "../RoomClient";

export class ReaperCard extends Card {
    constructor(id: number, number:number, data:any, cardId:number) {
        super(id, number, data);
        this.number = number;
        this.ability = new Reaper(this.id, data.drawDigit, data.targetId, data.targetDigit);
    }

    Use(roomClient:RoomClient){
        super.Use(roomClient);
        console.log("카드 능력 사용");
        this.ability.Play(roomClient);
    }
}