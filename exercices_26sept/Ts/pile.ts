export class Pile<T> {
    private monArray: T[];

    constructor() {
        this.monArray = [];
    }

    monPush(newItem: T) {
        this.monArray.push(newItem);
    }

    monPop() {
        this.monArray.pop();
    }

}