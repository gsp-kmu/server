import { Card } from "./Card/Card";
import {Deck} from "./Deck";
import {Hand} from "./Hand";
import { DiscardHolder } from "./DisCardHolder";

export class GameUser{
    socketId: string;
    numberHold: Array<number>;
    deck: Deck;
    hand: Hand;
    discardHolder: DiscardHolder;

    constructor(socketId:string, cards:Array<number>){
        this.socketId = socketId;
        this.numberHold = [0,0];

        this.deck = new Deck(cards);
        this.hand = new Hand();
        this.discardHolder = new DiscardHolder();
    }

    Draw(){
        const card:number = this.deck.Draw();
        this.hand.AddCard(card);
        return card;
    }

    getOneValue() {
        return this.numberHold[0];
    }

    getTenValue() {
        return this.numberHold[1];
    }

    setOneValue(value:number){
        this.numberHold[0] = value;
    }

    setTenValue(value:number){
        this.numberHold[1] = value;
    }
}

function IFtest(cond:boolean){
    if(cond == true)
        console.log("테스트 성공");
    else
        console.log("테스트 실패");
}
function test(){
    const user: GameUser = new GameUser('iosveoniesv', []);
    IFtest(user.getOneValue() == 0);
    IFtest(user.getTenValue() == 0);
    user.setOneValue(50);
    IFtest(user.getOneValue() == 50);
    user.setTenValue(103);
    IFtest(user.getTenValue() == 103);
}
