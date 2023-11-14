import { Ability } from "../Ability/Ability";
import { Card } from "./Card";
import { RoomClient } from "../RoomClient";
import { Copy } from "../Ability/Copy";

export class HackerCard extends Card {
    constructor(id: number, number: number, data: any, cardId:number) {
        super(id, number, data, cardId);
        this.number = number;
        this.ability = new Copy(data.id, data);
    }

    Use(roomClient:RoomClient){
        super.Use(roomClient);
        this.ability.Play(roomClient);
    }
}