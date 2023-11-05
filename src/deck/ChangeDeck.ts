const Card = require("../../models/card");

class ChangeDeck{
    deckName:string;
    userId:number;
    decklist:number[]
    
    constructor(deckName:string, userId:number, decklist:number[]){
        this.deckName = deckName;
        this.userId = userId;
        this.decklist = decklist;
    }

    async ChangeDeck():Promise<boolean> {
        //TODO : 유저가 구성한 덱이 실제로 유저가 소유한 카드인가? 검증
        const cards:Promise<object> = await Card.findAll({
            where:{
                id: this.decklist
            }
        })

        const targetDeck= await Deck.findOne({
            where:{
                name:this.deckName,
                userId:this.userId
            }
        })

        // console.log(typeof(targetDeck));
        console.log(typeof(cards));

        // deck.addCards(cards);

        console.log(cards);
        return true;
    }
}

