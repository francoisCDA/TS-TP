export default class Contact {
    private static _cmpt : number = 0 ;
    private _numId: number;
    private _nom: string;
    private _prenom: string;
    private _dateNaissance: Date;
    private _tel: string;
    private _mail: string;
    private _urlSrc: string;

    constructor(nom: string, prenom: string, dateNaissance: Date, tel: string, mail: string, imgSrc: string) {
        this._numId = ++Contact._cmpt ;
        this._nom = nom ;
        this._prenom = prenom ;
        this._dateNaissance = dateNaissance ;
        this._tel = tel ;
        this._mail = mail ;
        this._urlSrc = imgSrc ;
    }

    get nomDuContact() {
        return `${this._prenom} ${this._nom.toUpperCase()}` ;
    }

    get age() {
        const hui = (new Date()).getFullYear();
        const an = this._dateNaissance.getFullYear();
        return hui - an ;
    }

    get dateFormat() {
        const jr: number = this._dateNaissance.getDate();
        const ms: number = this._dateNaissance.getMonth() + 1;
        const an: number = this._dateNaissance.getFullYear();

        return `${jr < 10 ? `0${jr}` : `${jr}`}/${ms < 10 ? `0${ms}` : `${ms}`}/${an}`;
}

    get infosContactStr() {
        return [this._prenom,this._nom,this.dateFormat,this._tel,this._mail,this._urlSrc];
    }

    get numID() {
        return this._numId;
    }

}