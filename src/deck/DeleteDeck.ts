class DeleteDeck{
    deckName:string;
    userId:number;
    
    constructor(deckName:string, userId:number){
        this.deckName = deckName;
        this.userId = userId;
    }

    async DeleteDeck():Promise<boolean> {
        try{
            await Deck.destroy({
                where: {
                    name:this.deckName,
                    userId:this.userId
                }
            })

            return true;
        }
        catch{
            return false;
        }
    }
}
