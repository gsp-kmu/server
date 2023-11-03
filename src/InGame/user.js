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

    setOneValue(value){
        this.numberHold[0] = value;
    }

    setTenValue(value){
        this.numberHold[1] = value;
    }
}

module.exports = GameUser;
