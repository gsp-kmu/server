import { Json } from "sequelize/types/utils";
import { GameUser } from "../GameUser";
import { RoomClient } from "../RoomClient";
import { Ability } from "../Ability/Ability";

export class Card {
    id: number;
    cardId:number;
    data: any
    number: number;
    ability: Ability;

    constructor(id: number, number: number, data: any, cardId: number) {
        this.id = id;
        this.cardId = cardId;
        this.number = number;
        this.data = data;
    }

    Use(roomClient: RoomClient) {
        const user: GameUser = roomClient.GetUser(this.id);

        if (this.data.drawDigit == 0) {
            console.log(user.socketId, "가 ", this.data.drawDigit, "에 카드 냄 카드 번호: ", this.number);
            user.AddCardOne(this.cardId, this.number);
        }
        else if (this.data.drawDigit == 1) {
            console.log(user.socketId, "가 ", this.data.drawDigit, "에 카드 냄 카드 번호: ", this.number);
            user.AddCardTen(this.cardId, this.number);
        }

    }
};

