export class Pile<T> {
    private monArray: T[];

    constructor(item: T) {
        this.monArray = [item];
    }

    monPush(newItem: T) {
        this.monArray.push(newItem);
    }

    monPop() {
        this.monArray.pop();
    }

}