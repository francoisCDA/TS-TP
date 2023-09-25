export default class Contact {
    private _nom: string;
    private _prenom: string;
    private _dateNaissance: Date;
    private _tel: string;
    private _mail: string;
    private _urlSrc: string;

    constructor(nom: string, prenom: string, dateNaissance: Date, tel: string, mail: string, imgSrc: string) {
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

    get infosContact() {
        return [this._nom,this._prenom,this._dateNaissance,this._tel,this._mail,this._urlSrc];
    }


}