import Contact from "./class/contact.js";
const annuaire = [];
const lstContact = document.getElementById('listContacts');
const btnAddContact = document.getElementById('btnAddContact');
function dateFomat(date) {
    const jr = date.getDate();
    const ms = date.getMonth() + 1;
    const an = date.getFullYear();
    return `${jr < 10 ? `0${jr}` : `${jr}`}/${ms < 10 ? `0${ms}` : `${ms}`}/${an}`;
}
function affichCtct(ind) {
    annuaire.forEach((contct) => {
        if (contct.numID == ind) {
            const infosCtct = contct.infosContactStr;
            const affInfos = document.querySelectorAll('.infoCtct');
            for (let i = 0; i < affInfos.length; i++) {
                affInfos[i].innerText = infosCtct[i];
            }
            const affAge = document.querySelector('.age');
            affAge.innerHTML = contct.age.toString() + " ans";
        }
    });
}
function updContactAff(prenomNom, ind) {
    const newButton = document.createElement("button");
    newButton.className = "d-block btn btn-secondary";
    newButton.innerText = prenomNom;
    newButton.setAttribute('data-numID', `${ind}`);
    newButton.onclick = () => {
        affichCtct(ind);
    };
    lstContact.appendChild(newButton);
}
function addContact(nom, prenom, date, tel, mail, imgSrc = "./img/profil.png") {
    let contct = new Contact(nom, prenom, date, tel, mail, imgSrc);
    annuaire.push(contct);
    updContactAff(contct.nomDuContact, contct.numID);
}
function initContacts() {
    addContact('jean', 'robert', new Date(97, 7, 26), "0123456789", "jeanrobert@truc.fr");
    addContact('vincent', 'martin', new Date(5, 8, 15), "0123456789", "vincentmartin@mail.fr");
    addContact('smith', 'catherine', new Date(90, 4, 2), "0123456789", "cathsmith@machin.fr");
    addContact('lempaleur', 'vlad', new Date(57, 1, 28), "0123456789", "dracula@transylvamail.ro");
    affichCtct(1);
}
initContacts();
