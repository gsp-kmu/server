import { Rock } from "../Ability/Rock";
import { Ability } from "../Ability/Ability";
import { Card } from "./Card";
import { RoomClient } from "../RoomClient";

export class MedusaCard extends Card {
    constructor(id: number, number: number, data: any, cardId:number) {
        super(id, number, data, cardId);
        this.number = number;
        this.ability = new Rock(data.id);
    }

    Use(roomClient:RoomClient){
        super.Use(roomClient);
        this.ability.Play(roomClient);
    }
}