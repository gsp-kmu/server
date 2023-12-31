const Util = require("../../util/utill");
import { Card } from "./Card";
import { SolCard } from "./SolCard";
import { BlackAicoCard } from "./BlackAikoCard";
import { ReaperCard } from "./ReaperCard";
import { Aico } from "./Aico";
import { HackerCard } from "./HackerCard";
import { NecromancerCard } from "./NecromancerCard";
import { FallenAngelCard } from "./FallenAngelCard";
import { MedusaCard } from "./MedusaCard";
import { ElfCard } from "./ElfCard";
import { LunaCard } from "./LunarCard";

export class CardFactory {
    static GetCard(userId:number, cardId: number, data:any) {
        console.log("cardFactory id: ", cardId);
        const randomIndex = Util.GetRandomNumber(0, 2);
        //if(cardId == 3)
            //return new SolCard(userId, 3, data);
        if (cardId == 1)
            return new ReaperCard(userId, 0, data, cardId);
        else if(cardId == 2)
            return new HackerCard(userId, 1, data, cardId);
        else if(cardId == 3)
            return new Aico(userId, 2, data, cardId);
        else if(cardId == 4)
            return new SolCard(userId, 3, data, cardId);
        else if (cardId == 5)
            return new NecromancerCard(userId, 4, data, cardId);
        else if(cardId == 6)
            return new BlackAicoCard(userId, 5, data, cardId);
        else if(cardId == 7)
            return new FallenAngelCard(userId, 6, data, cardId);
        else if(cardId == 8)
            return new MedusaCard(userId, 7, data, cardId);
        else if(cardId == 9)
            return new ElfCard(userId, 8, data, cardId);
        else if(cardId ==10)
            return new LunaCard(userId, 9, data, cardId);
        else if(cardId == 8)
            return new Card(userId, 7, data, cardId);
        else if(cardId == 9)
            return new Card(userId, 8, data, cardId);
        else if(cardId == 10)
            return new Card(userId, 9, data, cardId);
        else if (cardId == 11)
            return new Card(userId, 0, data, cardId);
        else if(cardId == 12)
            return new Card(userId, 1, data, cardId);
        else if(cardId == 13)
            return new Card(userId, 2, data, cardId);
        else if(cardId == 14)
            return new Card(userId, 3, data, cardId);
        else if (cardId == 15)
            return new Card(userId, 4, data, cardId);
        else if(cardId == 16)
            return new Card(userId, 5, data, cardId);
        else if(cardId == 17)
            return new Card(userId, 6, data, cardId);

        return new ElfCard(userId, 5, data, cardId);
    }
}