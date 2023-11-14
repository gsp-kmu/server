import { ParadiseLost } from "../Ability/ParadiseLost";
import { Ability } from "../Ability/Ability";
import { Card } from "./Card";
import { RoomClient } from "../RoomClient";

export class FallenAngelCard extends Card {
    constructor(id: number, number: number, data: any, cardId:number) {
        super(id, number, data, cardId);
        this.number = number;data.id
        this.ability = new ParadiseLost(data.id);
    }

    Use(roomClient:RoomClient){
        super.Use(roomClient);
        this.ability.Play(roomClient);
    }
}