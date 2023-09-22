class Test{
    constructor(name, studentNumber){
        this.name = name;
        this.studentNumber = studentNumber;
    }

    ChangeName(name){
        this.name = name;
    }

    toString() {
        return `이름은: ${this.name} 학번: ${this.studentNumber}`;
    }
}

module.exports = Test;