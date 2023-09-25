import Contact from "./class/contact.js";

const annuaire: Contact[] = [];


const lstContact = document.getElementById('listContacts') as HTMLDivElement;


function updContactAff(prenomNom: string, ind: number): void {
    const newButton = document.createElement("button");
    newButton.className = "d-block btn btn-secondary" ;
    newButton.innerText = prenomNom ;
    newButton.setAttribute('data-set',`${ind}`);
    lstContact.appendChild(newButton);
}




function addContact(nom: string, prenom: string, date: Date, tel: string, mail: string, imgSrc: string ="./img/profil.png"): void {

    let contct = new Contact(nom,prenom,date,tel,mail,imgSrc);
    annuaire.push(contct);
    updContactAff(contct.nomDuContact, annuaire.length);

}


function initContacts(): void {

    addContact('jean', 'robert', new Date(97,7,26),"0123456789","jeanrobert@truc.fr");
    addContact('vincent', 'martin', new Date(5,8,15),"0123456789","vincentmartin@mail.fr");
    addContact( 'smith', 'catherine', new Date(90,4,2),"0123456789","cathsmith@machin.fr");
    addContact('lempaleur', 'vlad', new Date(57,1,28),"0123456789","dracula@transylvamail.ro");

}

initContacts();