import { LetterOfCurse } from "../Ability/LetterOfCurse";
import { Ability } from "../Ability/Ability";
import { Card } from "./Card";
import { RoomClient } from "../RoomClient";

export class BlackAicoCard extends Card {
    constructor(id: number, number:number, data:any, cardId:number) {
        super(id, number, data, cardId);
        this.number = number;
        this.ability = new LetterOfCurse(data.id, data.targetId, data.drawDigit, cardId, number);
    }

    Use(roomClient: RoomClient) {
        super.Use(roomClient);
        this.ability.Play(roomClient);
    }
}