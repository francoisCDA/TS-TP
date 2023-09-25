export default class Contact {
    constructor(nom, prenom, dateNaissance, tel, mail, imgSrc) {
        this._nom = nom;
        this._prenom = prenom;
        this._dateNaissance = dateNaissance;
        this._tel = tel;
        this._mail = mail;
        this._urlSrc = imgSrc;
    }
    get nomDuContact() {
        return `${this._prenom} ${this._nom.toUpperCase()}`;
    }
    get infosContact() {
        return [this._nom, this._prenom, this._dateNaissance, this._tel, this._mail, this._urlSrc];
    }
}
