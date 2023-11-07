export class Hand {
    cards: Array<number>
    constructor() {
        this.cards = [];
    }

    AddCard(card: number){
        this.cards.push(card);
    }
    
    TakeOutCard(index:number):any{
        return this.cards.splice(index);
    }
}