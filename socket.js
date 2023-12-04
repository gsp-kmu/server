const SocketIO = require('socket.io');
const { AddUserId } = require('./src/util/database');
const { User, Account, UserState } = require('./models');
const Info = require('./src/common/Info');
const cryptoModule = require("./src/util/cryptos");
const { sequelize } = require('./models');

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
                const UserId = user.UserId;
                const userState = await UserState.findOne({
                    where:{
                        'UserId':UserId,
                    }
                });

                if(userState != null){
                    socket.emit("login_fail", "");
                    console.log("중복 로그인!!!!!!!!!!!!!!!!!");
                }
                else{
                    console.log(data, " 유저 로그인 성공");
                    AddUserId(socket.id, user.UserId);
                    socket.emit("initid", user.UserId);
                    socket.emit("login_success", "");
                }
            }
        });

        socket.on(Info.EVENT_MESSAGE.MATCH_START, async(deckIndex)=>{
            await new Promise(resolve => setTimeout(resolve, 1000));

            const userState = await UserState.findOne({
                where:{
                    'socketId':socket.id,
                    'state':Info.userState.Join,
                }
            });
            
            if(userState != undefined){
                if(userState.state != Info.userState.Join)
                    return;

                if(deckIndex == "")
                    deckIndex = 1;

                socket.deckIndex = deckIndex;
                console.log(socket.id, " 매칭 시작함");
                userState.state = Info.userState.Match;
                await userState.save();
                socket.emit(Info.EVENT_MESSAGE.MATCH_START, "");
            }
        });

        socket.on(Info.EVENT_MESSAGE.MATCH_CANCEL, async ()=>{
            const userState = await UserState.findOne({
                where:{
                    'socketId':socket.id,
                    'state':Info.userState.Match,
                }
            });

            if (userState != undefined) {
                if (userState.state != Info.userState.Match)
                    return;

                console.log(socket.id, " 매칭 취소함");
                userState.state = Info.userState.Join;
                await userState.save();
                socket.emit(Info.EVENT_MESSAGE.MATCH_CANCEL, "");
0            }
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
    });
    process.stdin.on('data', (data) => {
        const input = data.toString().trim();
        if (input == 'allkick') {
            io.sockets.emit('test-message', "you kick bye bye")
            UserState.destroy({
                where: {},
                truncate: true,
            });
        }
        else if (input.startsWith('db ')) {
            // 'db'로 시작하는 명령어인 경우
            const query = input.substring(3); // 'db '를 제외한 나머지 문자열을 추출
            sequelize.query(query).then((result) => {
                console.log('쿼리 실행 결과:', result);
            });
        } 
        else if (input.startsWith('notice ')) {
            const data = input.substring(6); 
            io.emit("notice", data);
        }
    });
    
    return io;
}

module.exports.getIO =()=>{
    return io;
}
module.exports.io = io;

