export class Pile {
    constructor(item) {
        this.monArray = [item];
    }
    monPush(newItem) {
        this.monArray.push(newItem);
    }
    monPop() {
        this.monArray.pop();
    }
}
