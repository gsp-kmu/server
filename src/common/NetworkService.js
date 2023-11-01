const { Model } = require('sequelize');

let io = null;

function GetSocket(socketId){
    console.log("socketId:   ", socketId);
    const socket = io.sockets.sockets.get(socketId)
    console.log(io.sockets.sockets);
    console.log("socket    ", socket);
    return socket;
}
function Send(id, eventName, eventMessage){
    io.to(id).emit(eventName, eventMessage);
}

function GetIO(){
    return io;
}
class NetworkService{
    static InGameTurn = (turn)=>{
        return {
            "turn":turn,
        }
    };
}
module.exports.NetworkService = NetworkService;
module.exports = {GetSocket, Send, GetIO};
module.exports.InitIO =(_io)=>{
    io = _io;
}
module.exports.io = io;