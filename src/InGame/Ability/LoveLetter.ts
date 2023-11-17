import { GameUser } from "../GameUser";
import { RoomClient } from "../RoomClient";
import { Ability } from "./Ability";
import { Digit } from "../../common/Digit";

export class LoveLetter extends Ability {
    targetIndex: number;
    drawDigit: number;
    cardId: number;
    number: number;
    constructor(myId: number, targetIndex: number, drawDigit: number, cardId: number, number: number) {
        super(myId);
        this.targetIndex = targetIndex;
        this.drawDigit = drawDigit;
        this.cardId = cardId;
        this.number = number;
    }

    Play(roomClient: RoomClient) {
        this.Use(roomClient);
    }

    Use(roomClient: RoomClient) {
        const user: GameUser = roomClient.GetUser(this.targetIndex);
        if (this.drawDigit == Digit.one) {
            user.AddCardOne(this.cardId, this.number);
        }
        else if (this.drawDigit == Digit.ten) {
            user.AddCardOne(this.cardId, this.number);
        }
    }
};