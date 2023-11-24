import { LoveLetter } from "../Ability/LoveLetter";
import { Ability } from "../Ability/Ability";
import { Card } from "./Card";
import { RoomClient } from "../RoomClient";

export class Aico extends Card {
    constructor(id: number, number:number, data:any, cardId:number) {
        super(id, number, data, cardId);
        this.number = number;
        this.ability = new LoveLetter(data.id, data.targetId, data.drawDigit, cardId, number);
    }

    Use(roomClient: RoomClient) {
        super.Use(roomClient);
        this.ability.Play(roomClient);
    }
}