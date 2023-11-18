import { includes } from "lodash";
import { sequelize } from "../../models";

class ChangeDeck{
    Card = require("../../models/card");
    Deck = require('../../models/deck');
    DeckCard = require('../../models/deckcard');

    userId:number;
    decklist:number[][]
    name:string[]
    
    constructor(userId:number, decklist:number[][], name:string[]){
        this.userId = userId;
        this.decklist = decklist;
        this.name = name;
    }

    async saveDeck():Promise<number> {
        try{
            //TODO : 유저가 구성한 덱이 실제로 유저가 소유한 카드인가? 검증
            var flag:boolean = false;
            for(let i = 1; i<=5; i++){
                const decks:any = await this.Deck.findOne({
                    where:{
                        id:(this.userId - 1)*5 + i,
                        userId:this.userId
                    }
                });
                
                await decks.update({
                    name : this.name[i-1]
                }
                );

                //덱이 20장이 안되면 그 덱은 저장 안함
                console.log("deckList length: ", this.decklist[i - 1].length);
                if(this.decklist[i-1].length != 20){
                    flag = true;
                    continue;
                }

                //각 덱의 구성을 받아서 카드를 맵핑시켜줌.
                const cards:Promise<object[]> = await this.Card.findAll({
                    where:{
                        id: this.decklist[i-1]
                    }
                });
                
                await decks.setCards(cards);

                const result:any = this.decklist[i-1].reduce((arr,cur)=> {
                    arr.set(cur, (arr.get(cur)||0) +1) ;
                    return arr;
                  },new Map());
                
                for (let [key, value] of result.entries()) {
                    const query:any = 'UPDATE deckcard SET count = ? WHERE DeckId IN (SELECT id FROM decks WHERE UserId = ? AND id = ?) AND CardId = ?';
                    await sequelize.query(query,{
                        replacements: [value, this.userId, (this.userId-1)*5 + i, key]
                    });
                }
            }
            
            // 0은 덱의 일부가 개수 부족으로 저장이 안된 경우, 1은 정상적으로 모두 저장된 경우
            if(flag) return 0;
            else return 1;
        }
        catch(err){
            console.log(err);
            return 2;
        }
    }
}

module.exports = ChangeDeck;