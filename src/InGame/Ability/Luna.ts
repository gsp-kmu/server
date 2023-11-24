import { GameUser } from "../GameUser";
import { RoomClient } from "../RoomClient";
import { Ability } from "./Ability";
import { Digit } from "../../common/Digit";

export class Luna extends Ability {
    drawDigit: number;
    cardId:any
    constructor(myId: number, drawDigit: number, number: number, cardId:any) {
        super(myId, number, cardId);
        this.cardId = cardId;
        this.drawDigit = drawDigit;
        this.number = number;
    }

    Play(roomClient: RoomClient) {
        this.Use(roomClient);
    }

    
    Use(roomClient: RoomClient) {
        const user:GameUser = roomClient.GetUser(this.myId);
        if(this.drawDigit == Digit.one){
            user.RemoveCardOne();
        }
        else if (this.drawDigit == Digit.ten) {
            user.RemoveCardTen();
        }

        user.AddCardOne(this.cardId, this.number);
    }
};