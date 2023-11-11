import { LetterOfCurse } from "../Ability/LetterOfCurse";
import { Ability } from "../Ability/Ability";
import { Card } from "./Card";
import { RoomClient } from "../RoomClient";

export class BlackAicoCard extends Card {
    ability: Ability
    constructor(id: number, number:number, data:any, cardId:number) {
        super(id, number, data);
        this.number = number;
        this.ability = new LetterOfCurse(this.id, data.targetId, data.targetDigit, cardId, number);
    }

    Use(roomClient:RoomClient){
        this.ability.Play(roomClient);
    }
}