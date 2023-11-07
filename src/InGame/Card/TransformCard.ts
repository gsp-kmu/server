import { Transform } from "../Ability/Transform";
import { Ability } from "../Ability/Ability";
import { Card } from "./Card";

export class TransformCard extends Card {
    ability: Ability
    constructor(id: number, number:number) {
        super(number);
        this.number = 0;
        this.ability = new Transform(id);
    }

    GetAbility(): Ability {
        return this.ability;
    }
}