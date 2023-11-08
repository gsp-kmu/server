import { Ability } from "./Ability/Ability";

export interface RoomClient{
    GetUsers();

    RegisterEndAbility(ability: Ability);
    PlayEndAbility();
};