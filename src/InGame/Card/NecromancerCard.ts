import { Revival } from "../Ability/Revival";
import { Ability } from "../Ability/Ability";
import { Card } from "./Card";
import { RoomClient } from "../RoomClient";

export class NecromancerCard extends Card {
    ability: Ability
    constructor(id: number, number:number, data:any) {
        super(id, number, data);
        this.number = number;
        this.ability = new Revival(this.id, number, data.targetCardIndex);
    }

    Use(roomClient:RoomClient){
        super.Use(roomClient);
        this.ability.Play(roomClient);
    }
}