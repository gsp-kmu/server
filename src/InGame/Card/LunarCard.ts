import { Ability } from "../Ability/Ability";
import { Card } from "./Card";
import { RoomClient } from "../RoomClient";
import { Luna } from "../Ability/Luna";
import { Digit } from "../../common/Digit";

export class LunaCard extends Card {
    constructor(id: number, number: number, data: any, cardId:number) {
        super(id, number, data, cardId);
        this.number = number;
        this.ability = new Luna(id, data.drawDigit, number, cardId);
    }

    Use(roomClient:RoomClient){
        super.Use(roomClient);
        this.ability.Play(roomClient);
    }
}