import { Card } from "./Card/Card";

export class Deck{
    cards: Array<number>;
    constructor(cards:Array<number>){
        this.cards = cards;
        this.Shuffle();
    }

    Draw():number{
        const card = this.cards.pop();
        if(card == undefined)
            return -1;

        return card;
    }

    Shuffle(){
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
}