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
        AddUserId('hello', 3);
    })
    .catch((error) => {
        console.log(error);
    });
}
