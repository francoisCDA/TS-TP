export class Note {
    constructor(eleve, matiere, note) {
        this._nom = eleve[0];
        this._prenom = eleve[1];
        this._matiere = matiere;
        this._note = note;
    }
    get nom() { return this._nom.toUpperCase(); }
    get prenom() { return this._prenom; }
    get matiere() { return this._matiere; }
    get note() { return this._note; }
    noteTupple() {
        return [this._nom.toUpperCase(), this._prenom, this._matiere, this._note.toString()];
    }
}
