import { LoveLetter } from "../Ability/LoveLetter";
import { Ability } from "../Ability/Ability";
import { Card } from "./Card";
import { RoomClient } from "../RoomClient";

export class Aico extends Card {
    constructor(id: number, number:number, data:any, cardId:number) {
        super(id, number, data);
        this.number = number;
        this.ability = new LoveLetter(this.id, data.targetId, data.targetDigit, cardId, number);
    }

    Use(roomClient:RoomClient){
        this.ability.Play(roomClient);
    }
}