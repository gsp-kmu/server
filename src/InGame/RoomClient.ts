import { Ability } from "./Ability/Ability";
import { GameUser } from "./GameUser";
import Turn from "./turn";

export interface RoomClient{
    turn: Turn;

    GetUser(id:number):GameUser;
    GetUsers():GameUser[];

    RegisterEndAbility(ability: Ability);
    PlayEndAbility();
    SendTurn();
};