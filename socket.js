const SocketIO = require('socket.io');
const { AddUserId } = require('./src/util/database');
const { User, Account, UserState } = require('./models');
const Info = require('./src/common/Info');
const cryptoModule = require("./src/util/cryptos");

let io = null;

let testId = null;

module.exports = (server) => {
    io = SocketIO(server, {path:'/socket.io'});
    const room = io.of('/room');
    room.on('connection', (socket)=>{
        console.log("룸 접속");
        const { rooms } = io.of('/room').adapter;
        console.log(rooms);
    });
    
    room.on("hi", ()=>{
        console.log("room room");
    });

    io.on('connection', (socket)=>{
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        console.log('new client join! ', ip, socket.id, req.ip);

        //console.log(io.sockets.sockets.get(testId));
        //io.to(testId).emit("hhhh", "testtest hhh");
        socket.on("login", async (data)=>{
            const idData = await cryptoModule.cipher(data);
            const user = await Account.findOne({
                where:{
                    'id': idData,
            }},);

            console.log(user);
            if(user != null){
                console.log("AddUserId");
                AddUserId(socket.id, user.UserId);
            }
        });

        socket.on(Info.EVENT_MESSAGE.MATCH_START, async ()=>{
            const userState = await UserState.findOne({
                where:{
                    'socketId':socket.id,
                    'state':Info.userState.Join,
                }
            });

            if(userState != null){
                console.log(socket.id, " 매칭 시작함");
                userState.state = Info.userState.Match;
                await userState.save();
            }
        });
        socket.on(Info.EVENT_MESSAGE.MATCH_CANCEL, async ()=>{
            const userState = await UserState.findOne({
                where:{
                    'socketId':socket.id,
                    'state':Info.userState.Match,
                }
            });

            if(userState != null){
                console.log(socket.id, " 매칭 취소함");
                userState.state = Info.userState.Join;
                await userState.save();
            }
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

    process.stdin.on('data', (data) => {
        const input = data.toString().trim();
        if (input == 'all kick') {
            io.sockets.emit('test-message', "you kick bye bye")
            io.sockets.disconnect();
        }
    })

    return io;
}

module.exports.getIO =()=>{
    return io;
}
module.exports.io = io;
