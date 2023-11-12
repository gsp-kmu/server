import { Ability } from "../Ability/Ability";
import { Card } from "./Card";
import { RoomClient } from "../RoomClient";
import { Empty } from "../Ability/Empty";
import { Digit } from "../../common/Digit";

export class LunaCard extends Card {
    constructor(id: number, number:number, data:any) {
        const new_data = data;
        new_data.drawDigit = Digit.one;
        super(id, number, new_data);
        this.number = number;
        this.ability = new Empty(this.id);
    }

    Use(roomClient:RoomClient){
        super.Use(roomClient);
        this.ability.Play(roomClient);
    }
}