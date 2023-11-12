import { Rock } from "../Ability/Rock";
import { Ability } from "../Ability/Ability";
import { Card } from "./Card";
import { RoomClient } from "../RoomClient";

export class MedusaCard extends Card {
    constructor(id: number, number:number, data:any) {
        super(id, number, data);
        this.number = number;
        this.ability = new Rock(this.id);
    }

    Use(roomClient:RoomClient){
        super.Use(roomClient);
        this.ability.Play(roomClient);
    }
}