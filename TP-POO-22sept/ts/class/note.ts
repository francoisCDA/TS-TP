export class Note {
    private _nom: string;
    private _prenom: string;
    private _matiere: string;
    private _note: number;

    constructor(eleve: [string,string],matiere: string, note: number) {
        this._nom = eleve[0];
        this._prenom = eleve[1];
        this._matiere = matiere;
        this._note = note;
    }


}