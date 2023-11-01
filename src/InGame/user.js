class GameUser{
    constructor(socketId){
        this.socketId = socketId;
        this.numberHold = [0,0];
    }

    getOneValue() {
        return numberHold[0];
    }

    getTenValue() {
        return this.numberHold[1];
    }
}

module.exports = GameUser;
