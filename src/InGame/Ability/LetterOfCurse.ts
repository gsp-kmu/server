import { GameUser } from "../GameUser";
import { RoomClient } from "../RoomClient";
import { Ability } from "./Ability";
import { Digit } from "../../common/Digit";

export class LetterOfCurse extends Ability {
    targetIndex: number;
    drawDigit: number;
    cardId: number;
    constructor(myId: number, targetIndex: number, drawDigit: number, cardId: number, number: number) {
        super(myId, number, cardId);
        this.targetIndex = targetIndex;
        this.drawDigit = drawDigit;
        this.cardId = cardId;
        this.number = number;
    }

    Play(roomClient: RoomClient) {
        this.Use(roomClient);
    }

    Use(roomClient: RoomClient) {
        const myUser: GameUser = roomClient.GetUser(this.myId);
        const user: GameUser = roomClient.GetUser(this.targetIndex);
        if (this.drawDigit == Digit.one) {
            myUser.RemoveCardOne();
            user.AddCardOne(this.cardId, this.number);
        }
        else if (this.drawDigit == Digit.ten) {
            myUser.RemoveCardTen();
            user.AddCardOne(this.cardId, this.number);
        }
    }
};