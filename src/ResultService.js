class ResultService {
    CalculateResult(user1, user2){
        user1_number = this.CalculateNumber(user1.numberHold);
        user2_number = this.CalculateNumber(user2.numberHold);

        // user1 이 숫자가 더크면 user1 승리
        if(user1_number > user2_number){
            return GetUserReuslt(user1, user1_number);
        }

        // 그게 아니면 user2 승리
        return GetUserReuslt(user2, user2_number);
    }

    GetUserReuslt(user, user_nubmer){
        return {
            "user": user,
            "number": user_nubmer
        }
    }

    CalculateNumber(numberHold){
        return numberHold[0] * 10 + numberHold[1];
    }
}

const resultService = new ResultService();
module.exports = resultService;