import { Revival } from "../Ability/Revival";
import { Ability } from "../Ability/Ability";
import { Card } from "./Card";
import { RoomClient } from "../RoomClient";

export class NecromancerCard extends Card {
    constructor(id: number, number: number, data: any, cardId:number) {
        super(id, number, data, cardId);
        this.number = number;
        this.ability = new Revival(data.id, number, data.targetCardIndex);
    }

    Use(roomClient:RoomClient){
        super.Use(roomClient);
        this.ability.Play(roomClient);
    }
}