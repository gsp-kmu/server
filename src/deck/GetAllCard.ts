import { sequelize } from "../../models";

class GetAllCard{
    UserCard = require('../../models/usercard');

    userId:number;
    
    constructor(userId:number){
        this.userId = userId;
    }
    
    async getCardList():Promise<number[]> {
        try{
            let cardList:number[] = [];
  
            const cards:any = await this.UserCard.findAll({
                where:{
                    userId:this.userId
                },
            });
            
            if(cards.length != 0){
                for(let i = 0; i<cards.length; i++){
                    for(let j = 0; j<cards[i].count; j++){
                        cardList.push(cards[i].CardId);
                    }
                }
            }
            else{
                cardList.push(0);
            }
            
            return cardList;
        }
        catch (err){
            console.log(err);
            return [];
        }
    }
}

module.exports = GetAllCard;