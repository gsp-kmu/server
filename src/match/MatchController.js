const { User } = require("../../models");
const { UserState } = require("../../models");
const RoomController = require("./RoomService");
const Info = require("../common/Info");
const Utill = require("../util/utill");
const io = require("../../socket");
const { roomService } = require('./RoomService');
const { Send, GetSocket } = require("../common/NetworkService");

class MatchController {
    constructor() {
    }
    async Update() {
        this.GetMatchUserStates().then(async ({ count, rows }) => {
            //console.log("count: ", count);
            if (count >= 2) {
                console.log('2명 이상 접속됨');
                const { user1, user2 } = await this.GetUserTwoRandom(count, rows);
                if(user1.state != Info.userState.Match & user2.state != Info.userState.Match)
                    return;
                
                user1.state = Info.userState.Game;
                user2.state = Info.userState.Game;
                console.log("매칭 완료 user1, user2 Game상태 변경");
                await user1.save();
                await user2.save();

                Send(user1.socketid, Info.EVENT_MESSAGE.MATCH_SUCCESS, "");
                Send(user2.socketid, Info.EVENT_MESSAGE.MATCH_SUCCESS, "");

                setTimeout(() => {
                    this.MatchUsers(user1, user2)
                }, 3000);
            }
        });
    }
    async MatchUsers(user1, user2) {
        const deckId1 = await this.getDeckId(user1);
        const deckId2 = await this.getDeckId(user2);
        
        const room = await roomService.CreateRoom(user1, user2, deckId1, deckId2);
        console.log("매칭 성공");
        roomService.AddRoom(room);
        Send(user1.socketid, Info.EVENT_MESSAGE.MATCH_END, "");
        Send(user2.socketid, Info.EVENT_MESSAGE.MATCH_END, "");
    }

    async getDeckId(user) {
        const userId = user.UserId;
        const socket = await GetSocket(user.socketid);
        const deckIndex = socket.deckIndex;
        if(userId == undefined || deckIndex == undefined)
            return 1;
        
        console.log("userId: ", userId, " deckIndex:  ", deckIndex);
        const deckId = (userId - 1) * 5 + deckIndex;
        return deckId;
    }

    async GetUserTwoRandom(count, users) {
        if (count < 2) {
            throw new Error("2명 이상 아님");
        }

        let numbers = [Utill.GetRandomNumber(0, count)];
        while (true) {
            let number = Utill.GetRandomNumber(0, count);
            if (numbers[0] != number) {
                numbers.push(number);
                break;
            }
        }
        const user1 = await users[numbers[0]];
        const user2 = await users[numbers[1]];
        return { user1, user2 }
    }

    async GetMatchUserStates() {
        const { count, rows } = await UserState.findAndCountAll({
            where: {
                state: Info.userState.Match,
            }
        });
        return { count, rows };
    }
}

module.exports = MatchController;