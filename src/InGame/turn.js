const Utill = require("../util/utill");

class Turn{
    constructor(length){
        this.length = length;
        this.currentTurn = Utill.GetRandomNumber(0, length);
    }

    GetTurn(){
        return this.currentTurn;
    }

    NextTurn(){
        this.currentTurn = (this.currentTurn + 1) % this.length;
    }
}

module.exports = Turn;