import { Transform } from "../Ability/Transform";
import { Ability } from "../Ability/Ability";
import { Card } from "./Card";

export class TransformCard extends Card {
    constructor(id: number, number:number, data:any) {
        super(id, number, data);
        this.number = 0;
        this.ability = new Transform(id);
    }

    GetAbility(): Ability {
        return this.ability;
    }
}