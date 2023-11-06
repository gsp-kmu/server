import { Card } from "./Card/Card";

export class DiscardHolder{
    cards: Array<number>
    constructor() {
        this.cards = [];
    }

    AddCard(card: number){
        this.cards.push(card);
    }
}