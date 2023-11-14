import { Sol } from "../Ability/Sol";
import { Ability } from "../Ability/Ability";
import { Card } from "./Card";
import { RoomClient } from "../RoomClient";

export class SolCard extends Card {
    constructor(id: number, number: number, data: any, cardId:number) {
        super(id, number, data, cardId);
        this.ability = new Sol(data.id, data.targetId, data.targetDigit);
    }

    Use(roomClient:RoomClient){
        super.Use(roomClient);
        this.ability.Play(roomClient);
    }
}