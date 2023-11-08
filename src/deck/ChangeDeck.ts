class ChangeDeck{
    Card = require("../../models/card");
    Deck = require('../../models/deck');


    deckName:string;
    userId:number;
    decklist:number[]
    
    constructor(deckName:string, userId:number, decklist:number[]){
        this.deckName = deckName;
        this.userId = userId;
        this.decklist = decklist;
    }

    async ModifyDeck():Promise<number> {
        try{
            //TODO : 유저가 구성한 덱이 실제로 유저가 소유한 카드인가? 검증
            if(this.decklist.length != 20){
                return 0;
            }

            const cards:Promise<object> = await this.Card.findAll({
                where:{
                    id: this.decklist
                }
            })

            const decks:any = await this.Deck.findOne({
                where:{
                    name:this.deckName,
                    userId:this.userId
                }
            })

            await decks.setCards(cards);
            // const test = await decks.getCards(); -> 이걸로 목록 받아올 예정

            return 1;
        }
        catch{
            return 2;
        }
    }
}

module.exports = ChangeDeck;