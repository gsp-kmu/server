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

    static Card = (card)=>{
        return {
            'id':card,
        }
    }

    static FirstCard = (card1, card2)=>{
        const card11 = NetworkService.Card(card1);
        const card22 = NetworkService.Card(card2);
        return{
            "card1": card11,
            "card2": card22,
        }
    }
}

module.exports = {NetworkService, GetSocket, Send, GetIO};
module.exports.InitIO =(_io)=>{
    io = _io;
}
module.exports.io = io;