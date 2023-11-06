import { Transform } from "../Ability/Transform";
import { Ability } from "../Ability/Ability";
import { Card } from "./Card";

export class TransformCard extends Card {
    ability: Ability
    number: number;
    constructor(id: number) {
        super();
        this.number = 0;
        this.ability = new Transform(id);
    }

    GetAbility(): Ability {
        return this.ability;
    }
}