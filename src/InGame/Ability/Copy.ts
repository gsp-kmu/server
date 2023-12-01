import { GameUser } from "../GameUser";
import {RoomClient} from "../RoomClient";
import { Ability } from "./Ability";
import { Digit } from "../../common/Digit";
import { CardFactory } from "../Card/CardFactory";
import { Card } from "../Card/Card";

// 게임 종료시 이 카드의 숫자는 옆카드 숫자와 같게 됨
export class Copy extends Ability{
    data:any;
    cardId:number;
    constructor(myId: number, data: any, number: number, cardId:number){
        super(myId, number, cardId);
        this.data = data;

    }

    Play(roomClient: RoomClient){
        this.Use(roomClient);
    }

    Use(roomClient: RoomClient) {
        const user:GameUser = roomClient.GetUser(this.myId);
        const myDigit = this.data.drawDigit;
        let cardId = undefined;
        let cardData = JSON.parse(JSON.stringify(this.data));
        if(myDigit == Digit.one){
            console.log(user.getTen());
            cardId = user.getTen().GetCardId();
            //cardData.drawDigit = Digit.ten;
        }
        else if (myDigit == Digit.ten) {
            console.log(user.getOne());
            cardId = user.getOne().GetCardId();
            //cardData.drawDigit = Digit.one;
        }

        if(cardId == undefined)
            return;
        if(this.cardId == cardId)
            return;
         
        const card:Card = CardFactory.GetCard(this.myId, cardId, cardData);
        card.ability.cardId = this.cardId;
        card.ability.number = this.number;
        card.ability.Play(roomClient);
    }
};