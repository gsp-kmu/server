import { Ability } from "../Ability/Ability";
import { Card } from "./Card";
import { RoomClient } from "../RoomClient";
import { Copy } from "../Ability/Copy";

export class HackerCard extends Card {
    ability: Ability;
    constructor(id: number, number:number, data:any) {
        super(id, number, data);
        this.number = number;
        this.ability = new Copy(this.id, data);
    }

    Use(roomClient:RoomClient){
        super.Use(roomClient);
        this.ability.Play(roomClient);
    }
}