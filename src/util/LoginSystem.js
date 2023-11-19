const Account = require("../../models/account");
const Deck = require("../../models/deck");
const Card = require("../../models/card");
const UserCard = require("../../models/usercard");
const cryptoModule = require("./cryptos");
const crypto = require('crypto');
const User = require('../../models/user');
import { sequelize } from "../../models";

class LoginSystem{
    constructor(id, pass){
        this._id = id;
        this._password = pass;
    }

    async Register(){
        const cryptedId = await cryptoModule.cipher(this._id);
        
        console.log(cryptedId);
        const exist = await Account.findOne({
            where:{
                id : cryptedId,
            },
        },);

        if (exist == null) {
            // let reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/

            // if (reg.test(this._password) == false) return 0;

            const hash = await cryptoModule.createHash(this._password);
            const cryptedPW = hash.hashed;
            const salt = hash.salt;

            //DB에 계정 정보 등록
            const account = await Account.create({id: cryptedId, password: cryptedPW, salt: salt});
            const user = await User.create();
            console.log(user.id);
            await account.setUser(user);

            //새로 가입한 유저를 위한 덱 공간 5개 생성
            for(let i = 1; i<=5; i++){
                const deck = await Deck.create({ name: i });
                deck.setUser(user);
                if (i == 1) {
                    const basic = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                    const cards = await Card.findAll({
                    where:{
                        id: basic
                    }
                    });

                    await deck.setCards(cards);

                    const result = basic.reduce((arr,cur)=> {
                        arr.set(cur, (arr.get(cur)||0) +1) ;
                        return arr;
                    },new Map());
                
                    for (let [key, value] of result.entries()) {
                        const query = 'UPDATE deckcard SET count = :value WHERE DeckId IN (SELECT id FROM decks WHERE UserId = :userId AND id = :deckId) AND CardId = :cardId';
                        const tmp = (user.id - 1) * 5 + i;
                        await sequelize.query(query,{
                            replacements: {
                                value: value,
                                userId: user.id,
                                deckId: tmp,
                                cardId : key
                            }
                        });
                    }
                }
            }

            const decklist = [1,2,3,4,5,6,7,8,9,10];
            const cards = await Card.findAll({
                where:{
                    id: decklist
                }
            });

            await user.setCards(cards);
            await UserCard.update({
                count : 2
            },
            {
                where : {
                    userId : user.id
                }
            });
            
            await User.update({
                coin : 500
            },
            {
                where : {
                    id : user.id
                }
            });
            

            console.log("회원가입 성공");
            return 1;
        }
        else{
            console.log("회원가입 실패");
            return 2;
        }
    }

    async Login(){
        const id = await cryptoModule.cipher(this._id);
        let bool = false;
        const comparePW = await new Promise(async (resolve, reject) =>{
            const salt = await Account.findOne({
                attributes: ['salt'],
                raw: true,
                where:{
                    id,
                },
            },);

            if(salt != null){
                crypto.pbkdf2(this._password, salt.salt, 104906, 64, 'sha512', (err, key) => {
                    if(err) reject(err);
                    else resolve({hashed : key.toString('base64'), salt});
                });    
            }
            else{
                reject('Nan');
            }
            },)
            .then(async (result) => {
            const realPW = await Account.findOne({
                attributes: ['password', 'UserId'],
                raw: true,
                where:{
                    id,
                },
            },);
            if(realPW.password == result.hashed){
                console.log("로그인 성공!");
                bool = realPW.UserId;
            }
            else{
                console.log("로그인 실패!");
                bool = -1;
            }
        });
        return bool; 
    }
}

module.exports = LoginSystem;
