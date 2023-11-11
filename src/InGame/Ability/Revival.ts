import { GameUser } from "../GameUser";
import {RoomClient} from "../RoomClient";
import { Ability } from "./Ability";
import { Digit } from "../../common/Digit";
import { CardFactory } from "../Card/CardFactory";
import { Card } from "../Card/Card";

// 게임 종료시 이 카드의 숫자는 옆카드 숫자와 같게 됨
export class Revival extends Ability{
    myDigit:number;
    myCardIndex:number;
    constructor(myId:number, myDigit:number, myCardIndex:number){
        super(myId);
        this.myDigit = myDigit;
        this.myCardIndex = myCardIndex;
    }

    Play(roomClient: RoomClient){
        this.Use(roomClient);
    }

    Use(roomClient: RoomClient) {
        const user:GameUser = roomClient.GetUser(this.myId);
        let cardId=0;
        let number=0;
        if(this.myDigit == Digit.one){
            cardId = user.getOne().cards[this.myCardIndex];
            number = user.getOne().number[this.myCardIndex];
            user.getOne().cards.slice(this.myCardIndex, 1);
            user.getOne().number.slice(this.myCardIndex,1);
            user.getTen().AddCard(cardId, number);
        }
        else if(this.myDigit = Digit.ten){
            cardId = user.getTen().cards[this.myCardIndex];
            number = user.getTen().number[this.myCardIndex];
            user.getTen().cards.slice(this.myCardIndex, 1);
            user.getTen().number.slice(this.myCardIndex,1);
            user.getOne().AddCard(cardId, number);
        }
    }
};