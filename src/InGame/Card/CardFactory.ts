const Util = require("../../util/utill");
import { Card } from ".//Card";
import { TransformCard } from "./TransformCard";

export class CardFactory {
    static GetCard(userId:number, cardId: number, data:any) {
        const randomIndex = Util.GetRandomNumber(0, 2);
        if (randomIndex == 0)
            return new Card(userId, 1, data);
        else if(randomIndex == 1)
            return new Card(userId, 9, data);

        return new Card(userId, 5, data);
    }
}