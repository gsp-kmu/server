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

    async Login(id, pw){
        const cryptedId = await cryptoModule.cipher(this._id);
        const comparePW = new Promise(async (resolve, reject) =>{
        const salt = await Account.findOne({
            attributes: ['salt'],
            raw: true,
            where:{
                cryptedId,
            },
        },);
        crypto.pbkdf2(pw, salt, 104906, 64, 'sha512', (err, key) => {
            if(err) rejects(err);
            else resolve({hashed : key.toString('base64'), salt});
        });
    },).then(async (result) => {
        if(this._password == result.hashed){
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