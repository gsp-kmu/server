const { rejects } = require('assert');
const crypto = require('crypto');

const dotenv = require('dotenv');
const { text } = require('express');
const { copyFileSync } = require('fs');
const { resolve } = require('path');
dotenv.config();

const CRYPTO_KEY = process.env.CRYPTO_KEY; 
const CRYPTO_ALGORITHM = process.env.CRYPTO_ALGORITHM;
const IV = process.env.INITIAL_VECTOR;

//hash만들기
storeHash('mclub4');

//양방향 암호화, 복호화
let test = cipher('mclub4');
console.log(test);
let test2 = decipher(test);
console.log(test2);

async function storeHash(string){
    const hashedString = await createHash(string);
    console.log(hashedString.hashed);
    console.log(hashedString.salt);
    //TODO : 해쉬랑 salt를 각각 DB에 저장하는 로직 만들기
}

async function createHash(string) {
    return new Promise(async (resolve, rejects) => {
        const salt = await createSalt();
        crypto.pbkdf2(string, salt, 104906, 64, 'sha512', (err, key) => {
            if(err) rejects(err);
            else resolve({hashed : key.toString('base64'), salt});
        });
    });

}

function createSalt() {
    return new Promise((resolve, rejects) => {
        crypto.randomBytes(64, (err, buf) => {
            if(err) rejects(err);
            else resolve(buf.toString('base64'))
        })
    });
}

// 대칭키 암호화
function cipher(string){
    const cipher = crypto.createCipheriv(CRYPTO_ALGORITHM, CRYPTO_KEY, IV);
    let result = cipher.update(string, 'utf-8', 'base64') + cipher.final('base64');
    return result;
}

// 대칭키 복호화
function decipher(result){
    const decipher = crypto.createDecipheriv(CRYPTO_ALGORITHM, CRYPTO_KEY, IV);
    let result2 = decipher.update(result, 'base64', 'utf-8') + decipher.final('utf-8');
    return result2
}