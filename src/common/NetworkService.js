let io = null;

function GetSocket(socketId){
    //console.log("socketId:   ", socketId);
    const socket = io.sockets.sockets.get(socketId)
    //console.log(io.sockets.sockets);
    //console.log("socket    ", socket);
    return socket;
}

function Send(id, eventName, eventMessage){
    console.log("id:", id, "  eventName:", eventName, "  message: ", eventMessage);
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

    static InGameEnd = (winId)=>{
        return {
            "winId":winId,
        }
    }

    static FirstCard = (card1, card2)=>{
        return{
            "card1": { "id": card1},
            "card2": { "id": card2 },
        }
    }
}

module.exports = {NetworkService, GetSocket, Send, GetIO};
module.exports.InitIO =(_io)=>{
    io = _io;
}
module.exports.io = io;