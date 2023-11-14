import { Ability } from "../Ability/Ability";
import { Card } from "./Card";
import { RoomClient } from "../RoomClient";
import { Empty } from "../Ability/Empty";
import { Digit } from "../../common/Digit";

export class LunaCard extends Card {
    constructor(id: number, number: number, data: any, cardId:number) {
        const new_data = data;
        new_data.drawDigit = Digit.one;
        super(id, number, new_data, cardId);
        this.number = number;
        this.ability = new Empty(data.id);
    }

    Use(roomClient:RoomClient){
        super.Use(roomClient);
        this.ability.Play(roomClient);
    }
}