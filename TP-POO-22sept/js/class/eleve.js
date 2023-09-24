export class Eleve {
    constructor(nom, prenom) {
        this._nom = nom;
        this._prenom = prenom;
    }
    getEleveTupple() {
        return [this._nom, this._prenom];
    }
    getEleveStr() {
        return `${this._nom.toUpperCase()} ${this._prenom}`;
    }
}
