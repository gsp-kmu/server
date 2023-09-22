const Test = require('./test.js');

class MainService{
    Start(){
        console.log("서버 시작");
    }

    JoinUser(name, studentNumber){
        const user = new Test(name, studentNumber);
        console.log(user.toString());
    }
}

module.exports = MainService;