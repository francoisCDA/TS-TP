export class Eleve {
    private _nom: string;
    private _prenom: string;

    constructor(nom: string, prenom: string) {
        this._nom = nom ;
        this._prenom = prenom;
    }

    getEleveTupple(): [string,string] {
        return [this._nom,this._prenom];
    }
 
     getEleveStr(): string {
        return `${this._nom.toUpperCase()} ${this._prenom}`;
     }
}