export class Hand {
    cards: Array<number>
    constructor() {
        this.cards = [];
    }

    AddCard(card: number){
        this.cards.push(card);
    }
    
    TakeOutCard(index:number):any{
        const cardId = this.cards[index];
        this.cards.splice(index);
        return cardId;
    }
}