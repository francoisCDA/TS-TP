import Contact from "./class/contact.js";

const annuaire: Contact[] = [];

const lstContact = document.getElementById('listContacts') as HTMLDivElement;
const btnAddContact = document.getElementById('btnAddContact') as HTMLButtonElement;

// cacher détail, afficher formulaire vide


function dateFomat(date: Date): string {
    const jr: number = date.getDate();
    const ms: number = date.getMonth() + 1;
    const an: number = date.getFullYear();

    return `${jr < 10 ? `0${jr}` : `${jr}`}/${ms < 10 ? `0${ms}` : `${ms}`}/${an}`;
}

function affichCtct(ind: number):void {
    annuaire.forEach( (contct) => { 
        if (contct.numID == ind) {
            const infosCtct = contct.infosContactStr;
            const affInfos = document.querySelectorAll('.infoCtct') as NodeListOf<HTMLParagraphElement>;
          
            for(let i:number = 0 ; i < affInfos.length ; i++ ) {
                affInfos[i].innerText = infosCtct[i];
            }

            const affAge = document.querySelector('.age') as HTMLParagraphElement;
            affAge.innerHTML = contct.age.toString() + " ans";

        }
    })    
}


function updContactAff(prenomNom: string, ind: number): void {
    const newButton = document.createElement("button");
    newButton.className = "d-block btn btn-secondary" ;
    newButton.innerText = prenomNom ;
    newButton.setAttribute('data-numID',`${ind}`);
    newButton.onclick = () => {
       affichCtct(ind)
    } ;
    lstContact.appendChild(newButton);
}


function addContact(nom: string, prenom: string, date: Date, tel: string, mail: string, imgSrc: string ="./img/profil.png"): void {

    let contct = new Contact(nom,prenom,date,tel,mail,imgSrc);
    annuaire.push(contct);
    updContactAff(contct.nomDuContact, contct.numID);

}


function initContacts(): void {

    addContact('jean', 'robert', new Date(97,7,26),"0123456789","jeanrobert@truc.fr");
    addContact('vincent', 'martin', new Date(5,8,15),"0123456789","vincentmartin@mail.fr");
    addContact( 'smith', 'catherine', new Date(90,4,2),"0123456789","cathsmith@machin.fr");
    addContact('lempaleur', 'vlad', new Date(57,1,28),"0123456789","dracula@transylvamail.ro");

    affichCtct(1);

}

initContacts();