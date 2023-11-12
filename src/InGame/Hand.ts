export class Hand {
    cards: Array<number>
    constructor() {
        this.cards = [];
    }

    AddCard(card: number) {
        this.cards.push(card);
    }

    TakeOutCard(index: number): any {
        const cardId = this.cards[index];
        this.cards.splice(index, 1);
        return cardId;
    }
}


function test() {
    const hand: Hand = new Hand();
    hand.AddCard(1);
    hand.AddCard(2);
    hand.AddCard(3);
    console.log(hand);
    console.log(hand.TakeOutCard(1));
    console.log(hand);
}

//test();