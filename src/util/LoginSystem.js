const Account = require("../../models/account");
const cryptoModule = require("./cryptos");
const crypto = require('crypto');
const User = require('../../models/user');

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

        console.log("오류 찍기");

        if(exist == null){
            console.log("OK");
            const hash = await cryptoModule.createHash(this._password);
            const cryptedPW = hash.hashed;
            const salt = hash.salt;

            const account = await Account.create({id: cryptedId, password: cryptedPW, salt: salt});
            const user = await User.create();
            await account.setUser(user);
            return true;
        }
        else{
            return false;
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
        if(realPW.password == result.hashed){
            console.log("로그인 성공!");
            bool = true;
        }
        else{
            console.log("로그인 실패!");
            bool = false;
        }
    });
    return bool;    
    }
}

module.exports = LoginSystem;
