const { Model } = require('sequelize');

let io = null;

function GetSokcet(socketId){
    console.log("socketId:   ", socketId);
    const socket = io.sockets.sockets.get(socketId)
    console.log(io.sockets.sockets);
    console.log("socket    ", socket);
    return socket;
}

module.exports = {GetSokcet};
module.exports.InitIO =(_io)=>{
    io = _io;
}
module.exports.io = io;