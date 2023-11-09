import { ParadiseLost } from "../Ability/ParadiseLost";
import { Ability } from "../Ability/Ability";
import { Card } from "./Card";
import { RoomClient } from "../RoomClient";

export class FallenAngelCard extends Card {
    ability: Ability
    constructor(id: number, number:number, data:any) {
        super(id, number, data);
        this.number = number;
        this.ability = new ParadiseLost(this.id);
    }

    Use(roomClient:RoomClient){
        super.Use(roomClient);
        this.ability.Play(roomClient);
    }
}