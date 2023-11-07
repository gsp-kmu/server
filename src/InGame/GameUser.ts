import { Card } from "./Card/Card";
import {Deck} from "./Deck";
import {Hand} from "./Hand";
import { Holder } from "./Holder";

export class GameUser{
    socketId: string;
    deck: Deck;
    hand: Hand;
    holder: Array<Holder>;

    constructor(socketId:string, cards:Array<number>){
        this.socketId = socketId;

        this.deck = new Deck(cards);
        this.hand = new Hand();
        this.holder = [new Holder(), new Holder()];
    }

    Play(cardIndex: number){
        return this.hand.TakeOutCard(cardIndex);
    }

    Draw(){
        const card:number = this.deck.Draw();
        this.hand.AddCard(card);
        return card;
    }

    getOne():Holder {
        return this.holder[0];
    }

    getTen():Holder {
        return this.holder[1];
    }

    setOneValue(number:number){
        this.holder[0].number = number;
    }

    setTenValue(number: number) {
        this.holder[1].number = number;
    }

    AddCardOne(cardId:number, number:number){
        this.holder[0].AddCard(cardId, number);
    }

    AddCardTen(cardId: number, number: number) {
        this.holder[1].AddCard(cardId, number);
    }

}

function IFtest(cond:boolean){
    if(cond == true)
        console.log("테스트 성공");
    else
        console.log("테스트 실패");
}
