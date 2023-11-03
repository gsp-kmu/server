class Info {
    static userState = Object.freeze({
        Join:'JOIN',
        Match:'MATCH',
        Game:'GAME',
    });

    static MAX_PLAYER = Object.freeze(2);
    static MAX_TURN = 8;

    static EVENT_MESSAGE = Object.freeze({
        MATCH_START:'match_start',
        MATCH_SUCCESS:'match_success',
        MATCH_CANCEL: 'match_cancel',
        MATCH_END:'match_end',
        INGAME_END:'ingame_end',
        SOCKET_LOGIN:'socket_login',
        INGAME_TURN:'ingame_turn',
        INGAME_TURN_END:'ingame_turn_end',
        INGAME_END_WIN:'ingame_end_win',
        INGAME_END_LOSE:'ingame_end_lose',
        TEST:'test',
    })
}

module.exports = Info;