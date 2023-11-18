const Card = require("../../models/card");
const User = require("../../models/user");
const UserCard = require("../../models/usercard");

class RandomService{
    //카드 종류
    _card = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

    //각 카드별 확률
    //카드별 확률 합이 100이 되도록 구성 
    _pbt = [9,9,9,8,5,5,5,5,5,5,5,5,5,5,5,5,2,1,1,1];

    //카드 뽑기 시작
    async Start(userId){
        console.log(userId + '님이 카드 뽑기를 시작합니다...');

        let randomlist = [];
        let duplicate = [];

        duplicate.push(false);

        const user = await User.findOne({
            where: {
                id: userId
            }
        });
        
        if (user.coin < 100) return [[],[]];
        
        await user.update({
            coin : user.coin - 100
        });
        
        for(let i = 0; i<5; i++){
            let tmp = this.Random();
            randomlist.push(tmp);

            const card = await Card.findOne({
                where:{
                    id : tmp
                }
            });

            await user.addCard(card);

            const count = await UserCard.findOne({
                where:{
                    userId : user.id,
                    cardId : tmp
                }
            })
            
            if (count.count >= 2) {
                duplicate.push(true);
                await user.update({
                    coin: user.coin + 10
                });
            }
            else {
                await UserCard.update({
                    count : count.count+1
                },
                {
                    where : {
                        UserId : user.id,
                        CardId : tmp
                    }
                });
                
                duplicate.push(false);
            }
        }
        
        return [randomlist, duplicate];
    }

    //랜덤한 카드 뽑기
    Random(){
        let random = (Math.random() * 100).toFixed(2);
        let prev = 0;
        let next = 0;
        let res = '';

        for(let i = 0; i<this._pbt.length; i++){
            if(random >= 100){
                res = this._card[this._pbt.length-1];
                break;
            }
            else{
                next = prev + this._pbt[i];
                if(random >= prev && random < next){
                    res = this._card[i];
                    break;
                }
                else prev = next;
            }
        }
        
        return res;
    }
}

module.exports = RandomService;