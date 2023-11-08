const Test = require('./test.js');
const MatchController = require('./match/MatchController');
const GameController = require('./InGame/GameController');

class MainService{
    constructor(){
        this.gameController = new GameController();
        this.matchController = new MatchController();
    }
    Start(){
        console.log("서버 시작");
        let startInterval = setInterval(() => {
            this.Update();
        }, 500);
    }

    Update() {
        this.matchController.Update();
        this.gameController.Update();
    }

    JoinUser(name, studentNumber){
        const user = new Test(name, studentNumber);
        console.log(user.toString());
    }

    LeaveUser(){
        console.log("Leav 됨 됨되모딤ㅁ");
    }
}

module.exports = MainService;