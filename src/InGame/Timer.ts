import { Send } from "../common/NetworkService";
const Info = require('../common/Info');
export class Timer{
    start_time:number;
    end_time:number;
    timeId:NodeJS.Timeout;
    constructor(start_time, end_time){
        this.start_time = start_time;
        this.end_time = end_time;
        this.timeId = undefined;
    }

    Start(socketId:string):void {
        this.Clear();

        this.timeId = setTimeout(()=>{
            this.SendTimerStart(socketId);
            this.timeId = setTimeout(()=>{
                this.SendTimerEnd(socketId);
            }, this.end_time);
        }, this.start_time);
    }
    
    Clear(){
        if(this.timeId != undefined)
            clearTimeout(this.timeId);
    }

    SendTimerStart(socketId:string){
        console.log("timer 시작");
        Send(socketId, Info.EVENT_MESSAGE.INGAME_TIME_START, this.end_time);
    }

    SendTimerEnd(socketId:string){
        console.log("timer end");
        Send(socketId, Info.EVENT_MESSAGE.INGAME_TIME_END, "");
    }
}