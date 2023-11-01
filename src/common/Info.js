class Info {
    static userState = Object.freeze({
        Join:'JOIN',
        Match:'MATCH',
        Game:'GAME',
    });

    static MAX_PLAYER = Object.freeze(2);
    static MAX_TURN = 8;

    static EVENT_MESSAGE = Object.freeze({
        INGAME_END:'ingame_end',
        SOCKET_LOGIN:'socket_login',
        INGAME_TURN:'ingame_turn',
        TEST:'test',
    })
}

module.exports = Info;