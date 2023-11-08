class ChangeDeck{
    Card = require("../../models/card");
    Deck = require('../../models/deck');

    userId:number;
    decklist:number[][]
    
    constructor(userId:number, decklist:number[][]){
        this.userId = userId;
        this.decklist = decklist;
    }

    async saveDeck():Promise<number> {
        try{
            //TODO : 유저가 구성한 덱이 실제로 유저가 소유한 카드인가? 검증
            var flag:boolean = false;
            for(let i = 1; i<=5; i++){
                //덱이 20장이 안되면 그 덱은 저장 안함
                console.log(this.decklist[i-1]);
                if(this.decklist[i-1].length != 20){
                    flag = true;
                    continue;
                }
                //각 덱의 구성을 받아서 카드를 맵핑시켜줌.
                console.log("하나만 걸려라 ㅋㅋ");
                const decks:any = await this.Deck.findOne({
                    where:{
                        name:i,
                        userId:this.userId
                    }
                });
                
                const cards:Promise<object> = await this.Card.findAll({
                    where:{
                        id: this.decklist[i-1]
                    }
                });

                await decks.setCards(cards);
            }
            
            // 0은 덱의 일부가 개수 부족으로 저장이 안된 경우, 1은 정상적으로 모두 저장된 경우
            if(flag) return 0;
            else return 1;
        }
        catch{
            return 2;
        }
    }
}

module.exports = ChangeDeck;