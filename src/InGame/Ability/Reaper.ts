import { GameUser } from "../GameUser";
import { RoomClient } from "../RoomClient";
import { Ability } from "./Ability";
import { Digit } from "../../common/Digit";

export class Reaper extends Ability {
    targetIndex: number;
    targetDigit: number;
    myDigit: number;
    constructor(myId: number, myDigit: number, targetIndex: number, targetDigit: number, number:number, cardId:number) {
        super(myId, number, cardId);
        this.myDigit = myDigit;
        this.targetIndex = targetIndex;
        this.targetDigit = targetDigit;

    }

    Play(roomClient: RoomClient) {
        console.log("리퍼 능력 사용");
        this.Use(roomClient);
    }

    Use(roomClient: RoomClient) {
        console.log("리퍼 능력 Start!");
        const user: GameUser = roomClient.GetUser(this.myId);
        const targetUser: GameUser = roomClient.GetUser(this.targetIndex);
        let targetCardId = undefined;
        let targetCardNumber = undefined;
        if (this.targetDigit == Digit.one) {
            targetCardId = targetUser.getOne().GetCardId();
            targetCardNumber = targetUser.getOne().GetNumber();
            targetUser.RemoveCardOne();
        }
        else {
            targetCardId = targetUser.getTen().GetCardId();
            targetCardNumber = targetUser.getTen().GetNumber();
            targetUser.RemoveCardTen();
        }

        if (targetCardId == undefined)
            return;

        if (this.myDigit == Digit.one) {
            user.AddCardTen(targetCardId, targetCardNumber);
        }
        else if (this.myDigit == Digit.ten) {
            user.AddCardOne(targetCardId, targetCardNumber);
        }
        console.log('---------------------------------------'); 
        console.log("this.myDigit: ", this.myDigit);
        console.log("targetCardId: ", targetCardId);
        console.log("targetCardNumber: ", targetCardNumber);
        console.log("this.targetDigit: ", this.targetDigit);
        console.log('---------------------------------------');
    }
};