const Account = require("../../models/account");
const createHash = require("./cryptos");
const crypto = require('crypto');

class LoginSystem{
    constructor(id, pass){
        this._id = id;
        this._password = pass;
    }

    async Register(cryptedId, cryptedPW, salt){
        const account = await Account.create({id: cryptedId, password: cryptedPW, salt: salt})
    }

    Login(id, pw){
        const comparePW = new Promise(async (resolve, reject) =>{
        const salt = await Account.findOne({
            attributes: ['salt'],
            raw: true,
            where:{
                id,
            },
        },);
        crypto.pbkdf2(pw, salt, 104906, 64, 'sha512', (err, key) => {
            if(err) rejects(err);
            else resolve({hashed : key.toString('base64'), salt});
        });
    },).then(async (result) => {
    
    });    
    }
}

let test = new LoginSystem('mclub4', '23444');
test.Login('mclub4', 'wweqwe');