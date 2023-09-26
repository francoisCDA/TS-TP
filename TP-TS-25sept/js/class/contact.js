class Contact {
    constructor(nom, prenom, dateNaissance, tel, mail, imgSrc) {
        this._numId = ++Contact._cmpt;
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
    get age() {
        const hui = new Date();
        const anniv = new Date((new Date).setFullYear(this._dateNaissance.getFullYear()));
        return hui.getFullYear() - anniv.getFullYear() - (anniv < this._dateNaissance ? 1 : 0);
    }
    get dateFormat() {
        const jr = this._dateNaissance.getDate();
        const ms = this._dateNaissance.getMonth() + 1;
        const an = this._dateNaissance.getFullYear();
        return `${an}-${ms < 10 ? `0${ms}` : `${ms}`}-${jr < 10 ? `0${jr}` : `${jr}`}`;
    }
    get infosContactStr() {
        return [this._prenom, this._nom, this.dateFormat, this._tel, this._mail, this._urlSrc];
    }
    get infosContact() {
        return [this._prenom, this._nom, this._dateNaissance, this._tel, this._mail, this._urlSrc];
    }
    uptInfosContact(nom, prenom, date, tel, mail, urlSrc) {
        this._nom = nom;
        this._prenom = prenom;
        this._dateNaissance = date;
        this._tel = tel;
        this._mail = mail;
        this._urlSrc = urlSrc;
    }
    get numID() {
        return this._numId;
    }
}
Contact._cmpt = 0;
export default Contact;
