export class GameUser{
    socketId: string;
    numberHold: Array<number>
    constructor(socketId:string){
        this.socketId = socketId;
        this.numberHold = [0,0];
    }

    getOneValue() {
        return this.numberHold[0];
    }

    getTenValue() {
        return this.numberHold[1];
    }

    setOneValue(value:number){
        this.numberHold[0] = value;
    }

    setTenValue(value:number){
        this.numberHold[1] = value;
    }
}

function IFtest(cond:boolean){
    if(cond == true)
        console.log("테스트 성공");
    else
        console.log("테스트 실패");
}
function test(){
    const user: GameUser = new GameUser('iosveoniesv');
    IFtest(user.getOneValue() == 0);
    IFtest(user.getTenValue() == 0);
    user.setOneValue(50);
    IFtest(user.getOneValue() == 50);
    user.setTenValue(103);
    IFtest(user.getTenValue() == 103);
}
