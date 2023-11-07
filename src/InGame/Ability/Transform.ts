import {RoomClient} from "../RoomClient";
import { Ability } from "./Ability";

// 게임 종료시 이 카드의 숫자는 옆카드 숫자와 같게 됨
export class Transform extends Ability{
    constructor(myId:number){
        super(myId);
    }

    Play(roomClient: RoomClient){
        roomClient.RegisterEndAbility(this);
    }

    Use(roomClient: RoomClient) {
        const user = roomClient.GetUser(this.myId);

        const targetPosition = 1 - this.position;

        if (targetPosition == 0){
            const one = user.getOne();
            user.setTenValue(one.number);
        }
        else{
            const ten = user.getTen();
            user.setOneValue(ten.number);
        }
    }
};