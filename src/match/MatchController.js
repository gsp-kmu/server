const { User } = require("../../models");
const { UserState } = require("../../models");
const RoomController = require("./RoomController");
const Info = require("../common/Info");
const Utill = require("../util/utill");
const io = require("../../socket");

class MatchController{
    constructor(){
        this.roomController = new RoomController()
    }
    async Update() {
        this.GetMatchUserStates().then(async ({count, rows}) =>{
            console.log("count: ", count);
            if(count >= 2){
                console.log('2명 이상 접속됨');
                const {user1, user2} = await this.GetUserTwoRandom(count, rows);
                this.roomController.CreateRoom(user1, user2).then(async ()=>{
                    console.log("매칭 성공");
                    user1.state = Info.userState.Game;
                    user2.state = Info.userState.Game;
                    console.log("매칭 완료 user1, user2 Game상태 변경");
                    await user1.save();
                    await user2.save();
                });
            }
        });
      }

    async GetUserTwoRandom(count, users) {
        if(count < 2){
            throw new Error("2명 이상 아님");
        }

        let numbers = [Utill.GetRandomNumber(0, count)];
        while(true){
            let number = Utill.GetRandomNumber(0, count);
            if(numbers[0] != number){
                numbers.push(number);
                break;
            }
        }
        const user1 = await users[numbers[0]];
        const user2 = await users[numbers[1]];
        return {user1, user2}
    }

    async GetMatchUserStates() {
        const {count, rows} = await UserState.findAndCountAll({
            where:{
                state:Info.userState.Match,
            }
        });
        return {count, rows};
    }
}

module.exports = MatchController;