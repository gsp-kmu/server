const { sequelize } = require('../../models');
const User  = require('../../models/user');
const UserState = require('../../models/userstate');
const Info = require('../common/Info');

// 게임에 유저가 로그인함
async function AddUser(socketId, user) {
    AddUserId(socketId, user.id);
};


// 게임에 유저가 로그인함
async function AddUserId(socketId, userId) {
    let userState = await UserState.create({
        socketid: socketId,
        state: Info.userState.Join,
    });

    userState.setUser(userId);
};


module.exports = {AddUser, AddUserId};


const test = () => {
    sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 됨');
        AddUserId('ce020e4e401438867853183fbf73b495', 1);
        AddUserId('7829f1f37beb95abd615fe1116f01e46', 2);
        AddUserId('642a03285e9889978f08c5513033b297', 3);
    })
    .catch((error) => {
        console.log(error);
    });
}


test();