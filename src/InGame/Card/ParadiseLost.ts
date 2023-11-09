import { GameUser } from "../GameUser";
import { RoomClient } from "../RoomClient";
import { Ability } from "../Ability/Ability";
import { Digit } from "../../common/Digit";

export class ParadiseLost extends Ability {
    constructor(myId: number) {
        super(myId);
    }

    Play(roomClient: RoomClient) {
        this.Use(roomClient);
    }

    Use(roomClient: RoomClient) {
        const users: GameUser[] = roomClient.GetUsers();
        for (let i = 0; i < users.length; i++) {
            if (i == this.myId)
                continue;

            const one = users[i].getOne().GetLast();
            const ten = users[i].getTen().GetLast();

            if(one == undefined || ten == undefined)
                continue;

            users[i].RemoveCardOne();
            users[i].RemoveCardTen();

            users[i].AddCardOne(ten.card, ten.number);
            users[i].AddCardTen(one.card, one.number);
        }
    }
}
