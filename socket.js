const SocketIO = require('socket.io');

let io = null;

let testId = null;
module.exports = (server) => {
    io = SocketIO(server, {path:'/socket.io'});
    
    io.on('connection', (socket)=>{
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        console.log('new client join! ', ip, socket.id, req.ip);
        testId = socket.id
        //io.to(testId).emit("hhhh", "testtest hhh");

        socket.on("test-card", (data)=>{
            const card = data;
            console.log(card);
        })

        socket.on('disconect', ()=>{
            console.log('bye bye client', ip, socket.id);
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