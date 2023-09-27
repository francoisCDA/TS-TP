export class Pile {
    constructor() {
        this.monArray = [];
    }
    monPush(newItem) {
        this.monArray.push(newItem);
    }
    monPop() {
        this.monArray.pop();
    }
}
