import { Card } from "./Card/Card";
import { TransformCard } from "./Card/TransformCard";
class CardFactory {
    static GetCard(cardId:number) {
        return new TransformCard(0);
    }
}

export class Hand {
    cards: Array<number>
    constructor() {
        this.cards = [];
    }

    AddCard(card: number){
        this.cards.push(card);
    }
}