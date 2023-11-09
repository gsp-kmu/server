const dotenv = require('dotenv');
dotenv.config();

const { sequelize } = require('./models');
const {Op} = require('sequelize');
const Account = require('./models/account');

const create = async  () =>{
    // 생성 하는 코드
    const { Account } = require('./models');
    await Account.create({
        id: '20191546',
        password: 'qwe123',
    })

}

const select = async () => {
    // select * from accounts;
    const accounts = await Account.findAll({});
    console.log(accounts);


    // select id, p assword from accounts where id = 20191546;
    const account = await Account.findOne({
        attributes: ['id', 'password'],
        where: {
            id: '20191546'
        }
    });
    console.log(account.dataValues.password);
}




// main

// sequelize.sync({ force: false })
//     .then(() => {
//         console.log('데이터베이스 연결 됨');
//         create();
//         select();
//     })
//     .catch((error) => {
//         console.log(error);
//     });

const a = {
    a:2,
}

a.a = 5;

console.log(a);