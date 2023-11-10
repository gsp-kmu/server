import { sequelize } from "../../models";

class GetDeck{
    Deck = require('../../models/deck');
    Card = require("../../models/card");
    DeckCard = require('../../models/deckcard');

    userId:number;
    
    constructor(userId:number){
        this.userId = userId;
    }
    
    async getDeckList():Promise<number[][]> {
        try{
            //TODO : 유저가 구성한 덱이 실제로 유저가 소유한 카드인가? 검증
            let deckList:number[][] = [];
            for(let i = 1; i<=5; i++){
                //덱이 20장이 안되면 그 덱은 저장 안함

                //각 덱의 구성을 받아서 카드를 맵핑시켜줌.
                const decks:any = await this.Deck.findOne({
                    where:{
                        name:i,
                        userId:this.userId
                    },
                });
                
                console.log(i + "번째 덱");
                const cards = await decks.getCards();
                
                let tmp:number[] = [];
                if(cards.length != 0){
                    for(let j = 0; j<cards.length; j++){
                        console.log(cards.length + " " + cards[j].id);
                        const query = 'SELECT * FROM deckcard where DeckId IN (SELECT id FROM decks WHERE UserId = ? AND name = ? ) AND CardId = ? '
                        const number = await sequelize.query(query,{
                            replacements: [this.userId, i.toString(), cards[j].id]
                        });
                        for(let k = 0; k<number[0][0].count; k++){
                            tmp.push(cards[j].id);
                        }
                    }
                }
                else{
                    tmp.push(0);
                }

                deckList.push(tmp);
            }

            return deckList;
        }
        catch{
            return [];
        }
    }
}

module.exports = GetDeck;