import { GameUser } from "../GameUser";
import {RoomClient} from "../RoomClient";
import { Ability } from "./Ability";
import { Digit } from "../../common/Digit";

// 게임 종료시 이 카드의 숫자는 옆카드 숫자와 같게 됨
export class Sol extends Ability{
    targetIndex:number;
    targetDigit:number;
    constructor(myId:number, targetIndex:number, targetDigit:number){
        super(myId);
        this.targetIndex = targetIndex;
        this.targetDigit = targetDigit;

    }

    Play(roomClient: RoomClient){
        this.Use(roomClient);
    }

    Use(roomClient: RoomClient) {
        const user:GameUser = roomClient.GetUser(this.targetIndex);
        if(this.targetDigit == Digit.one){
            user.RemoveCardOne();
        }
        else if(this.targetDigit == Digit.ten){
            user.RemoveCardTen();
        }
    }
};