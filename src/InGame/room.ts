const Info = require('../common/Info');
const resultService = require('./ResultService').resultService;
const { Send, GetIO, GetSocket } = require('../common/NetworkService');
const { SetUserState, AddUserWinLose, GetDeckCards } = require('../util/database');
const { NetworkService } = require('../common/NetworkService');
import { Ability } from "./Ability/Ability";
import { GameUser } from "./GameUser";
import { RoomClient } from "./RoomClient";
import { CardFactory } from "./Card/CardFactory";
import { eventNames } from "process";
import Turn from "./turn";

class GameRoom implements RoomClient {
    isActive: boolean;
    users: GameUser[];
    endAbility: Ability[];
    id: any;
    turn: Turn;
    socket1: any;
    socket2: any;

    // user1 GameUser
    constructor(user1: any, user2: any, id: any) {
        this.isActive = true;
        this.users = [];
        this.endAbility = [];
        this.id = id;
        this.turn = new Turn(Info.MAX_PLAYER);

        GetDeckCards(1).then(async (cards: Array<number>) => {
            console.log("cards: ", cards);
            const gameUser1 = new GameUser(user1, cards);
            this.users.push(gameUser1);

            const cards2 = await GetDeckCards(1);
            const gameUser2 = new GameUser(user2, cards2);
            this.users.push(gameUser2);

            for (let j = 0; j < this.users.length; j++) {
                Send(this.users[j].socketId, Info.EVENT_MESSAGE.INGAME_INIT_ID, j);
            }
            this.socket1 = GetSocket(user1);
            this.socket2 = GetSocket(user2);

            this.SendInitMessage();
            this.RegisterEvent();

            this.CheckRoomClose = this.RealCheckRoomClose;
        });
    }

    SendInitMessage() {
        this.SendFirstCard();
        this.SendTurn();
    }

    RegisterEvent() {
        for (let i = 0; i < Info.MAX_PLAYER; i++) {
            const socket = GetSocket(this.users[i].socketId);
            const io = GetIO();
            const room = io.of('/room' + this.id);

            socket.on("cheat_ingame_draw_card", (data:any) => {
                this.users[i].hand.AddCard(data.id);
                Send(this.users[i].socketId, Info.EVENT_MESSAGE.INGAME_DRAW_CARD, NetworkService.Card(data.id));
                Send(this.users[i].socketId, "show_hand", this.users[i].hand.cards.toString());
            });

            socket.on(Info.EVENT_MESSAGE.INGAME_TURN_END, () => {
                // Turn_End 메시지를 보낸 유저와 현재 turn 유저와 같으면 실행
                if (i == this.turn.GetTurn() && this.turn.isCurrentTurnProgress == true) {
                    this.turn.NextTurn();
                    console.log(this.users[i].socketId, "해당 유저가 턴을 끝냈다고 메시지 보냄.");
                    this.SendTurn();
                }
            });

            socket.on(Info.EVENT_MESSAGE.TEST, (data: any) => {
                console.log(i, "  test:  ", data);
            });
            
            socket.on(Info.EVENT_MESSAGE.INGAME_PLAY_SEND, (data:any)=>{
                if (i == this.turn.GetTurn()) {
                    this.turn.isCurrentTurnProgress = true;
                    const cardId = this.users[i].hand.cards[data.cardIndex];
                    console.log("받았음 cardIdnex: ", data.cardIndex);
                    console.log("userHand값은:  ", this.users[i].hand.cards);
                    let sendData = {
                        'id':data.id,
                        'cardId':cardId,
                        'drawDigit':data.drawDigit,
                        'targetId':data.targetId,
                        'targetDigit':data.targetDigit,
                        'targetCardIndex':data.targetCardIndex,
                    };
                    console.log('sendData:  ', sendData);
                    this.PlayCard(i, data);
                    this.SendMessage(Info.EVENT_MESSAGE.INGAME_PLAY_RECV, sendData);
                    const a = this.users[0].holder[1].GetNumber() * 10 + this.users[0].holder[0].GetNumber();
                    const b = this.users[1].holder[1].GetNumber() * 10 + this.users[1].holder[0].GetNumber();

                    console.log("room" + this.id, ": user1 number: ", a);
                    console.log("room" + this.id, ": user2 number: ", b);
                }
            });

            socket.on(Info.EVENT_MESSAGE.INGAME_SURRENDER, (data)=>{
                this.GameEndLose(this.users[i].socketId);
            })
        }
    }

    PlayCard(id: number, data: any) {
        const cardId = this.users[id].Play(data.cardIndex);
        const card = CardFactory.GetCard(id, cardId, data);
        card.Use(this);
    }

    Update() {
        this.TurnUpdate();
    }

    TurnUpdate() {
        if (this.turn.CheckTurnEnd() == true) {
            this.isActive = false;
            this.PlayEndAbility();
            const result = resultService.CalculateResult(this.users[0], this.users[1]);
            const winSocketId: string = result.user.socketId;

            console.log("room" + this.id, ": 얘가 승리함 ㅅㄱ", winSocketId);
            this.GameEnd(winSocketId);
        }
    }
    
    GameEndLose(loseSocketId){
        for (let i = 0; i < this.users.length; i++) {
            SetUserState(this.users[i].socketId, Info.userState.Join);
            if (loseSocketId != this.users[i].socketId) {
                AddUserWinLose(this.users[i].socketId, 1, 0);
                Send(this.users[i].socketId, Info.EVENT_MESSAGE.INGAME_END_WIN, NetworkService.InGameEnd("0"));
            }
            else {
                AddUserWinLose(this.users[i].socketId, 0, 1);
                Send(this.users[i].socketId, Info.EVENT_MESSAGE.INGAME_END_WIN, NetworkService.InGameEnd("1"));
            }
        }
    }

    GameEnd(winSocketId:string){
        for (let i = 0; i < this.users.length; i++) {
            SetUserState(this.users[i].socketId, Info.userState.Join);
            if (winSocketId == this.users[i].socketId) {
                AddUserWinLose(winSocketId, 1, 0);
                Send(winSocketId, Info.EVENT_MESSAGE.INGAME_END_WIN, NetworkService.InGameEnd("0"));
            }
            else {
                AddUserWinLose(this.users[i].socketId, 0, 1);
                Send(this.users[i].socketId, Info.EVENT_MESSAGE.INGAME_END_WIN, NetworkService.InGameEnd("1"));
            }
        }
    }

    SendMessage(eventName: string, message: any) {
        for (let i = 0; i < this.users.length; i++) {
            Send(this.users[i].socketId, eventName, message)
        }
    }

    CheckRoomClose = () => {
        return true;
    }

    RealCheckRoomClose() {
        if (this.isActive == false)
            return false;

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
            if (i == currentTurn){
                setTimeout(()=>{
                    const card = this.users[i].Draw();
                    Send(this.users[i].socketId, Info.EVENT_MESSAGE.INGAME_DRAW_CARD, NetworkService.Card(card));
                    Send(this.users[i].socketId, "show_hand", this.users[i].hand.cards.toString());
                }, 2000);
                turn = '1';
            }

            Send(this.users[i].socketId, Info.EVENT_MESSAGE.INGAME_TURN, NetworkService.InGameTurn(turn));
        }
    }

    SendFirstCard() {
        for (let i = 0; i < this.users.length; i++) {
            this.users[i].Draw();
            this.users[i].Draw();
            const firstCard = NetworkService.FirstCard(this.users[i].hand.cards[0], this.users[i].hand.cards[1]);
            Send(this.users[i].socketId, Info.EVENT_MESSAGE.INGAME_FIRST_CARD, firstCard);
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

    GetUser(id: number): GameUser {
        return this.users[id];
    }

    GetUsers(): GameUser[] {
        return this.users;
    }
}

module.exports = GameRoom;