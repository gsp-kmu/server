class RandomService{
    //카드 종류
    _card = ['0번 카드', '1번 카드', '2번 카드', '3번 카드', '4번 카드', '5번 카드', '6번 카드', '7번 카드', '8번 카드', '9번 카드'];

    //각 카드별 확률
    //카드별 확률 합이 100이 되도록 구성 
    _pbt = [10,10,10,10,10,10,10,10,10,10];

    //천장 (생각좀 해보고 도입 예정)
    _pity = [1];

    //카드 뽑기 시작
    Start(){
        console.log('카드 뽑기를 시작합니다...');
        console.log(this.Random())
    }

    //랜덤한 카드 뽑기
    Random(){
        let random = (Math.random() * 100).toFixed(2);
        let prev = 0;
        let next = 0;
        let res = '';

        for(let i = 0; i<this._pbt.length; i++){
            if(random >= 100){
                res = this._card[this._pbt.length-1];
                break;
            }
            else{
                next = prev + this._pbt[i];
                if(random >= prev && random < next){
                    res = this._card[i];
                    break;
                }
                else prev = next;
            }
        }
        
        return res;
    }
}

module.exports = RandomService;