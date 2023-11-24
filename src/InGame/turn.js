const Utill = require("../util/utill");
const Info = require('../common/Info');
class Turn{
    constructor(length){
        this.length = length;
        this.currentTurn = Utill.GetRandomNumber(0, length);
        this.currentTurnCount = 1;
        this.isCurrentTurnProgress = false;
    }

    GetTurn(){
        return this.currentTurn;
    }

    NextTurn(){
        this.isCurrentTurnProgress = false;
        this.currentTurn = (this.currentTurn + 1) % this.length;
        this.currentTurnCount++;
        console.log("현재턴: ", parseInt(this.currentTurnCount / 2), "/", Info.MAX_TURN);
    }

    // 턴이 설정한 MAX_TURN 보다 크면 true => 즉 턴을 다 마쳤고 게임 종료
    CheckTurnEnd(){
        if (this.currentTurnCount/2 >= Info.MAX_TURN){
            return true;
        }

        return false;
    }
}

module.exports = Turn;