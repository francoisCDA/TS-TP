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
        const hui = (new Date()).getFullYear();
        const an = this._dateNaissance.getFullYear();
        return hui - an;
    }
    get dateFormat() {
        const jr = this._dateNaissance.getDate();
        const ms = this._dateNaissance.getMonth() + 1;
        const an = this._dateNaissance.getFullYear();
        return `${jr < 10 ? `0${jr}` : `${jr}`}/${ms < 10 ? `0${ms}` : `${ms}`}/${an}`;
    }
    get infosContactStr() {
        return [this._prenom, this._nom, this.dateFormat, this._tel, this._mail, this._urlSrc];
    }
    get numID() {
        return this._numId;
    }
}
Contact._cmpt = 0;
export default Contact;
