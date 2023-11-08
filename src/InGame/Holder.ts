import { Card } from "./Card/Card";

export class Holder{
    cards: Array<number>;
    number: Array<number>;
    constructor() {
        this.cards = [];
        this.number = [];
    }

    length = ()=>{
        return this.cards.length;
    }

    AddCard(card: number, number:number){
        this.cards.push(card);
        this.number.push(number);
    }

    RemoveCard(index:number){
        this.cards.slice(index,1);
        this.number.slice(index,1);
    }

    GetCardId():number{
        if(this.cards.length == 0)
            return 0;
        
        return this.cards[this.number.length-1];
    }

    GetNumber():number{
        if(this.number.length == 0)
            return 0;
        
        return this.number[this.number.length-1];
    }

    SetNumber(number:number){
        this.number[this.number.length-1] = number;
    }
}