import { GameUser } from "../GameUser";
import {RoomClient} from "../RoomClient";
import { Ability } from "./Ability";
import { Digit } from "../../common/Digit";
import { CardFactory } from "../Card/CardFactory";
import { Card } from "../Card/Card";

// 게임 종료시 이 카드의 숫자는 옆카드 숫자와 같게 됨
export class Empty extends Ability{
    constructor(myId:number){
        super(myId);

    }

    Play(roomClient: RoomClient){
        this.Use(roomClient);
    }

    Use(roomClient: RoomClient) {

    }
};