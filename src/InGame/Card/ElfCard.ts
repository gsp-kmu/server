import { LoveLetter } from "../Ability/LoveLetter";
import { Ability } from "../Ability/Ability";
import { Card } from "./Card";
import { RoomClient } from "../RoomClient";
import { Empty } from "../Ability/Empty";

export class ElfCard extends Card {
    constructor(id: number, number:number, data:any, cardId:number) {
        super(id, number, data, cardId);
        this.number = number;
        this.ability = new Empty(data.id, number, cardId);
    }

    Use(roomClient:RoomClient){
        super.Use(roomClient);
        this.ability.Play(roomClient);
    }
}