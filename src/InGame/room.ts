const Turn = require("./turn");
const Info = require('../common/Info');
const resultService = require('./ResultService').resultService;
const {Send, GetIO, GetSocket} = require('../common/NetworkService');
const UserState = require('../../models/userstate');
const { GameUser } = require('./GameUser');
const { NetworkService } = require('../common/NetworkService');
import { Ability } from "./Ability/Ability";
import { RoomClient } from "./RoomClient";

class GameRoom implements RoomClient {
    users: any[];
    endAbility: Ability[];
    id: any;
    turn: any;
    socket1: any;
    socket2: any;

    constructor(user1: any, user2: any, id: any) {
        this.users = [];
        this.endAbility = [];
        this.users.push(new GameUser(user1));
        this.users.push(new GameUser(user2));
        this.id = id;
        this.turn = new Turn(Info.MAX_PLAYER);
        this.SendTurn();

        this.socket1 = GetSocket(user1);
        this.socket2 = GetSocket(user2);

        this.RegisterEvent();
    }

    RegisterEvent() {
        for (let i = 0; i < Info.MAX_PLAYER; i++) {
            const socket = GetSocket(this.users[i].socketId);

            socket.on(Info.EVENT_MESSAGE.INGAME_TURN_END, () => {
                // Turn_End 메시지를 보낸 유저와 현재 turn 유저와 같으면 실행
                if (i == this.turn.GetTurn()) {
                    this.turn.NextTurn();
                    this.SendTurn();
                }
            });

            socket.on(Info.EVENT_MESSAGE.TEST, (data: any) => {
                console.log(i, "  test:  ", data);
            })
        }
    }

    Update() {
        this.TurnUpdate();
    }

    TurnUpdate() {
        if (this.turn.CheckTurnEnd() == false) {
            this.PlayEndAbility();
            const result = resultService.CalculateResult(this.users[0], this.users[1]);
            const winSocketId: string = result.user.socketId;

            console.log("얘가 승리함 ㅅㄱ", winSocketId);
            for (let i = 0; i < this.users.length; i++) {
                if (winSocketId == this.users[i].socketId)
                    Send(winSocketId, Info.EVENT_MESSAGE.INGAME_END_WIN, NetworkService.InGameEnd("0"));
                else
                    Send(this.users[i].socketId, Info.EVENT_MESSAGE.INGAME_END_WIN, NetworkService.InGameEnd("1"));
            }
        }
    }

    SendMessage(eveentName: string, message: any) {
        Send("room" + this.id, eveentName, message);
    }

    CheckUserConnected() {
        const io = GetIO();
        const room = io.sockets.adapter.rooms.get("room" + this.id);
        if (room == undefined)
            return false;

        return true;
    }

    SendTurn() {
        const currentTurn = this.turn.currentTurn;
        for (let i = 0; i < this.users.length; i++) {
            let turn = '0';
            if (i != currentTurn)
                turn = '1';

            Send(this.users[i].socketId, Info.EVENT_MESSAGE.INGAME_TURN, NetworkService.InGameTurn(turn));
        }
    }

    RegisterEndAbility(ability: Ability) {
        this.endAbility.push(ability);
    }

    PlayEndAbility() {
        for (let i = 0; i < this.endAbility.length; i++) {
            this.endAbility[i].Use(this);
        }
    }

    GetUsers() {
        return this.users;
    }
}

module.exports = GameRoom;