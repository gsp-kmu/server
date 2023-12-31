import {RoomClient} from "../RoomClient";

export class Ability{
    myId:number;
    cardId:number;
    number:number;
    constructor(myId: number, number: number, cardId:number){
        this.myId = myId;
        this.number = number;
        this.cardId = cardId;
    }

    // 카드를 필드에 낸것 기본적으로 능력이 바로 발동 됨 (발동 안될수도 있음 조건부 발동)
    Play(roomClient: RoomClient){
        this.Use(roomClient);
    }

    // 실제 능력 발동
    Use(roomClient: RoomClient){
        console.log('능력 발동');
    }
};