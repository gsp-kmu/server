import { GameUser } from "../GameUser";
import {RoomClient} from "../RoomClient";
import { Ability } from "./Ability";
import { Digit } from "../../common/Digit";

// 게임 종료시 이 카드의 숫자는 옆카드 숫자와 같게 됨
export class Reaper extends Ability{
    targetIndex:number;
    targetDigit:number;
    myDigit:number;
    constructor(myId:number, myDigit:number, targetIndex:number, targetDigit:number){
        super(myId);
        this.myDigit = myDigit;
        this.targetIndex = targetIndex;
        this.targetDigit = targetDigit;

    }

    Play(roomClient: RoomClient){
        this.Use(roomClient);
    }

    Use(roomClient: RoomClient) {
        const user:GameUser = roomClient.GetUser(this.myId);
        const targetUser:GameUser = roomClient.GetUser(this.targetIndex);
        let targetCardId = 0;
        let targetCardNumber = 0;
        if(this.targetDigit == Digit.one){
            targetCardId = targetUser.getOne().GetCardId();
            targetCardNumber = targetUser.getOne().GetNumber();
            targetUser.RemoveCardOne();
        }
        else{
            targetCardId = targetUser.getTen().GetCardId();
            targetCardNumber = targetUser.getTen().GetNumber();
            targetUser.RemoveCardTen();
        }

        if(this.myDigit == Digit.one){
            user.AddCardTen(targetCardId, targetCardNumber);
        }
        else if(this.myDigit == Digit.ten){
            user.AddCardOne(targetCardId, targetCardNumber);
        }
    }
};