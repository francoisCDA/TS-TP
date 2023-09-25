import Contact from "./class/contact.js";
const annuaire = [];
const lstContact = document.getElementById('listContacts');
function updContactAff(prenomNom, ind) {
    const newButton = document.createElement("button");
    newButton.className = "d-block btn btn-secondary";
    newButton.innerText = prenomNom;
    newButton.setAttribute('data-set', `${ind}`);
    lstContact.appendChild(newButton);
}
function addContact(nom, prenom, date, tel, mail, imgSrc = "./img/profil.png") {
    let contct = new Contact(nom, prenom, date, tel, mail, imgSrc);
    annuaire.push(contct);
    updContactAff(contct.nomDuContact, annuaire.length);
}
function initContacts() {
    addContact('jean', 'robert', new Date(97, 7, 26), "0123456789", "jeanrobert@truc.fr");
    addContact('vincent', 'martin', new Date(5, 8, 15), "0123456789", "vincentmartin@mail.fr");
    addContact('smith', 'catherine', new Date(90, 4, 2), "0123456789", "cathsmith@machin.fr");
    addContact('lempaleur', 'vlad', new Date(57, 1, 28), "0123456789", "dracula@transylvamail.ro");
}
initContacts();
