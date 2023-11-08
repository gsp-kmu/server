import { Sol } from "../Ability/Sol";
import { Ability } from "../Ability/Ability";
import { Card } from "./Card";
import { RoomClient } from "../RoomClient";

export class SolCard extends Card {
    ability: Ability
    constructor(id: number, number:number, data:any) {
        super(id, number, data);
        this.number = number;
        this.ability = new Sol(this.id, data.targetId, data.targetDigit);
    }

    Use(roomClient:RoomClient){
        super.Use(roomClient);
        this.ability.Play(roomClient);
    }
}