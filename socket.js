const SocketIO = require('socket.io');

module.exports = (server) => {
    const io = SocketIO(server, {path:'/socket.io'});
    
    io.on('connection', (socket)=>{
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        console.log('new client join! ', ip, socket.id, req.ip);

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
}