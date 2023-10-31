const SocketIO = require('socket.io');
const { AddUserId } = require('./src/util/database');
const { User, Account, UserState } = require('./models');

let io = null;

let testId = null;
module.exports = (server) => {
    io = SocketIO(server, {path:'/socket.io'});
    const room = io.of('./room');
    room.on('connection', (socket)=>{
        console.log("룸 접속");
    });
    io.on('connection', (socket)=>{
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        console.log('new client join! ', ip, socket.id, req.ip);
        testId = socket.id;

        //io.to(testId).emit("hhhh", "testtest hhh");
        socket.on("login", async (data)=>{
            const user = await Account.findOne({
                where:{
                'id':data.id,
            }},);

            if(user != null)
                AddUserId(socket.id, user.UserId);
        });

        socket.on("test-card", (data)=>{
            const card = data;
            console.log(card);
        })

        socket.on('disconnect', ()=>{
            console.log('bye bye client', ip, socket.id);
            UserState.destroy({where:{
                    socketId:socket.id,
                }
            });
        })
    });

   process.stdin.on('data', (data)=>{
        const input = data.toString().trim();
        if(input == 'a'){
            io.sockets.emit('test-message', "테스트 메시지입니다.");
            console.log('테스트 메시지를 클라한테 보냄');
        }
    })

    process.stdin.on('data', (data)=>{
        const input = data.toString().trim();
        if(input == 'w'){
            const card = {
                id:"test id",
                name:"러브러브러브",
                url: "./Love.png",
            }
            io.sockets.emit('test-card', card);
            console.log('테스트 카드 클라한테 보냄');
        }
    })
}

module.exports.io = io;