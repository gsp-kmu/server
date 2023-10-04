class Utill {
    static GetRandomNumber(min, max) {
        let n = Math.floor(Math.random() * (max - min)) + min;
        return n;
    }
}

module.exports = Utill;