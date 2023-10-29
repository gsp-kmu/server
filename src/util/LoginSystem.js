const Account = require("../../models/account");
const cryptoModule = require("./cryptos");
const crypto = require('crypto');

class LoginSystem{
    constructor(id, pass){
        this._id = id;
        this._password = pass;
    }

    async Register(){
        const cryptedId = await cryptoModule.cipher(this._id);

        const exist = await Account.findOne({
            where:{
                id : cryptedId,
            },
        },);

        if(exist == null){
            console.log("OK");
            const hash = await cryptoModule.createHash(this._password);
            const cryptedPW = hash.hashed;
            const salt = hash.salt;

            const account = await Account.create({id: cryptedId, password: cryptedPW, salt: salt});

            return true;
        }
        else{
            return false;
        }
    }

    async Login(){
        const id = await cryptoModule.cipher(this._id);
        const comparePW = new Promise(async (resolve, reject) =>{
        const salt = await Account.findOne({
            attributes: ['salt'],
            raw: true,
            where:{
                id,
            },
        },);
        console.log(salt.salt);
        crypto.pbkdf2(this._password, salt.salt, 104906, 64, 'sha512', (err, key) => {
            if(err) rejects(err);
            else resolve({hashed : key.toString('base64'), salt});
        });
        },)
        .then(async (result) => {
        console.log(result.hashed);
        const realPW = await Account.findOne({
            attributes: ['password'],
            raw: true,
            where:{
                id,
            },
        },);
        console.log("해쉬 돌려본 값 " + result.hashed);
        console.log("DB에 있는 값 " + realPW.password);
        if(realPW.password == result.hashed){
            console.log("로그인 성공!");
            return true;
        }
        else{
            console.log("로그인 실패");
            return false;
        }
    });    
    }
}

module.exports = LoginSystem;