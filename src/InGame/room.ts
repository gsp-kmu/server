const Turn = require("./turn");
const Info = require('../common/Info');
const resultService = require('../ResultService');
const {Send, GetIO, GetSocket} = require('../common/NetworkService');
const UserState = require('../../models/userstate');
const GameUser = require('./user');
const NetworkService = require('../common/NetworkService').NetworkService;
import { RoomClient } from "./RoomClient";
class GameRoom implements RoomClient{
    users: any[];
    id: any;
    turn: any;
    socket1: any;
    socket2: any;

    constructor(user1:any, user2:any, id:any){  
        this.users = []
        this.users.push(new GameUser(user1));
        this.users.push(new GameUser(user2));
        this.id = id;
        this.turn = new Turn(Info.MAX_PLAYER);
        this.SendTurn();

        this.socket1 = GetSocket(user1);
        this.socket2 = GetSocket(user2);

        this.RegisterEvent();
    }

    RegisterEvent(){
        for (let i = 0; i < Info.MAX_PLAYER; i++) {
            const socket = GetSocket(this.users[i].socketId);

            socket.on(Info.EVENT_MESSAGE.INGAME_TURN_END,()=>{
                // Turn_End 메시지를 보낸 유저와 현재 turn 유저와 같으면 실행
                if (i == this.turn.GetTurn()){
                    this.turn.NextTurn();
                    this.SendTurn();
                }
            });

            socket.on(Info.EVENT_MESSAGE.TEST, (data:any) => {
                console.log(i,"  test:  ", data);
            })
        }
    }

    Update(){
        if(this.turn.CheckTurnEnd() == true){
            const result = resultService.GetUserReuslt(this.users[0], this.users[1]);
        }
    }

    SendMessage(eveentName:string, message:any){
        Send("room" + this.id, eveentName, message);
    }

    CheckUserConnected(){
        const io = GetIO();
        const room = io.sockets.adapter.rooms.get("room" + this.id);
        if(room == undefined)
            return false;

        return true;
    }

    SendTurn(){
        const currentTurn = this.turn.currentTurn;
        for(let i=0;i<this.users.length;i++){
            const InGameTurn = {
                turn: '0',
            }
            if(i != currentTurn)
                InGameTurn.turn = '1';

            Send(this.users[i].socketId, Info.EVENT_MESSAGE.INGAME_TURN, InGameTurn);
        }
    }

    RegisterAbility(){
        
    }

    GetUser() {
        
    }
}

module.exports = GameRoom;