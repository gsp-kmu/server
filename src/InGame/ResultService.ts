import { GameUser } from './GameUser';
import { Holder } from './Holder';

class ResultService {
    CalculateResult(user1:GameUser, user2:GameUser){
        const user1_number = this.CalculateNumber(user1.holder);
        const user2_number = this.CalculateNumber(user2.holder);

        // user1 이 숫자가 더크면 user1 승리
        if(user1_number > user2_number){
            return this.GetUserReuslt(user1, user1_number);
        }

        // 그게 아니면 user2 승리
        return this.GetUserReuslt(user2, user2_number);
    }

    GetUserReuslt(user:any, user_nubmer:any){
        return {
            "user": user,
            "number": user_nubmer
        }
    }

    CalculateNumber(numberHold:Array<Holder>){
        return numberHold[0].number * 10 + numberHold[1].number;
    }
}

const resultService:ResultService = new ResultService();
module.exports.resultService = resultService;