import { Ability } from "./Ability/Ability";
import { GameUser } from "./GameUser";

export interface RoomClient{
    GetUser(id:number):GameUser;
    GetUsers():GameUser[];

    RegisterEndAbility(ability: Ability);
    PlayEndAbility();
};