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
    constructor(myId: number, myDigit: number, myCardIndex: number, number: number, cardId: number){
        super(myId, number, cardId);
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
            if(cardId == undefined)
                return;

            console.log('----------------------------');
            console.log('this.myCardIndex: ', this.myCardIndex);
            console.log('number: ', number);
            console.log('----------------------------');
            user.getOne().cards.splice(this.myCardIndex, 1);
            user.getOne().number.splice(this.myCardIndex,1);
            user.AddCardTen(cardId, number)
        }
        else if(this.myDigit = Digit.ten){
            cardId = user.getTen().cards[this.myCardIndex];
            number = user.getTen().number[this.myCardIndex];
            if (cardId == undefined)
                return;

            console.log('----------------------------');
            console.log('this.myCardIndex: ', this.myCardIndex);
            console.log('number: ', number);
            console.log('----------------------------');
            user.getTen().cards.splice(this.myCardIndex, 1);
            user.getTen().number.splice(this.myCardIndex, 1);
            user.AddCardOne(cardId, number)
        }
    }
};