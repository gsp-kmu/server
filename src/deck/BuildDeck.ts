class BuildDeck{
    Deck = require('../../models/deck.js');
    User = require('../../models/user.js');

    deckName:string;
    userId:number;
    
    constructor(deckName:string, userId:number){
        this.deckName = deckName;
        this.userId = userId;
    }

    async CreateDeck():Promise<number> {
        try{
            const exist:Promise<string[]> = await this.Deck.findAll({
                where:{
                    name: this.deckName,
                    UserId : this.userId,
                },
            },);
            
            // 덱의 이름은 중복 불가
            if(exist == null || (await exist).length == 0){
                const getLength:Promise<string[]> = await this.Deck.findAll({
                    where:{
                        UserId : this.userId,
                    },
                },); 
                
                // 계정당 최대로 만들 수 있는 덱의 개수는 5개
                if((await getLength).length <= 5){
                    const deck:any = await this.Deck.create({name:this.deckName});
                    const user:any = await this.User.findOne({
                        where:{
                            id : this.userId,
                        },
                    },);
                    deck.setUser(user);
                    return 0;
                }
                else{
                    return 2;
                }
                
            }
            else{
                return 1;
            }
        }
        catch{
            return 3;
        }
    }
}

module.exports = BuildDeck;
