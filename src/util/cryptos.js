const { rejects } = require('assert');
const crypto = require('crypto');

const dotenv = require('dotenv');
const { text } = require('express');
const { copyFileSync } = require('fs');
const { resolve } = require('path');
dotenv.config();

const CRYPTO_KEY = process.env.CRYPTO_KEY; 

//hash만들기
test('test');

async function test(string){
    const test = await createHash(string);
    console.log(test.hashed);
}

async function createHash(string) {
    const salt = await createSalt();
    return crypto.pbkdf2(string, salt, 104906, 64, 'sha256');
}

function createSalt() {
    return new Promise((resolve, rejects) => {
        crypto.randomBytes(64, (err, buf) => {
            if(err) rejects(err);
            else resolve(buf.toString('base64'))
        })
    })
}