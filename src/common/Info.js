module.exports =  class Info {
    static userState = Object.freeze({
        Join:'JOIN',
        Match:'MATCH',
        Game:'GAME',
    });

    static MAX_PLAYER = Object.freeze(2);
    static MAX_TURN = 10;

    static EVENT_MESSAGE = Object.freeze({
        MATCH_START:'match_start',
        MATCH_SUCCESS:'match_success',
        MATCH_CANCEL: 'match_cancel',
        MATCH_END:'match_end',
        INGAME_CLIENT_READY: 'ingame_client_ready',
        INGAME_INIT_ID: 'ingame_init_id',
        INGAME_END:'ingame_end',
        SOCKET_LOGIN:'socket_login',
        INGAME_TURN:'ingame_turn',
        INGAME_TURN_END:'ingame_turn_end',
        INGAME_END_WIN:'ingame_end_win',
        INGAME_END_LOSE:'ingame_end_lose',
        INGAME_FIRST_CARD:'ingame_first_card',
        INGAME_DRAW_CARD:'ingame_draw_card',
        INGAME_PLAY_CARD: 'ingame_play_card',
        INGAME_PLAY_SEND: 'ingame_play_send',
        INGAME_PLAY_RECV: 'ingame_play_recv',
        INGAME_SURRENDER: 'ingame_surrender',
        INGAME_TIME_START:'ingame_time_start',
        INGAME_TIME_END:'ingame_time_end',
        TEST:'test',
    })
}