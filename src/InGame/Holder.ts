import { Card } from "./Card/Card";

export class Holder{
    cards: Array<number>;
    number: number;
    constructor() {
        this.cards = [];
        this.number = 0;
    }

    AddCard(card: number, number:number){
        this.cards.push(card);
        this.number = number;
    }
}