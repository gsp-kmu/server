import { LoveLetter } from "../Ability/LoveLetter";
import { Ability } from "../Ability/Ability";
import { Card } from "./Card";
import { RoomClient } from "../RoomClient";

export class Aico extends Card {
    ability: Ability
    constructor(id: number, number:number, data:any, cardId:number) {
        super(id, number, data);
        this.number = number;
        this.ability = new LoveLetter(this.id, data.targetId, data.targetDigit, cardId, number);
    }

    Use(roomClient:RoomClient){
        super.Use(roomClient);
        this.ability.Play(roomClient);
    }
}