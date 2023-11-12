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
        this.cards.splice(index,1);
        this.number.splice(index,1);
    }

    GetCardId():number{
        if(this.cards.length == 0)
            return undefined;
        
        return this.cards[this.number.length-1];
    }

    GetLast(){
        if(this.number.length == 0)
            return undefined;
        
        return this.Get(this.number.length -1);
    }

    Get(i:number){
        return {
            number:this.number[i],
            card: this.cards[i]
        }
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


function test(){
    const holder: Holder = new Holder();
    console.log(holder.length());
    holder.AddCard(1,2);
    console.log(holder);
    holder.SetNumber(3);
    console.log(holder);
    holder.AddCard(4, 5);
    holder.AddCard(6, 7);
    console.log(holder);

    holder.RemoveCard(0);
    console.log(holder);

    const a = holder.GetLast();
    console.log(a.card);
    console.log(a.number);

    console.log(holder);
    holder.RemoveCard(holder.length() -1);
    console.log(holder);
    console.log(holder.GetCardId());
    console.log(holder.length());
}

//test();