import Contact from "./class/contact.js";

const annuaire: Contact[] = [];
let focus: number;

const lstContact = document.getElementById('listContacts') as HTMLDivElement;

const btnAddContact = document.getElementById('btnAddContact') as HTMLButtonElement;
const btnEditSuppr = document.getElementById('btnEditSuppr') as HTMLButtonElement;
const btnSuppr = document.getElementById('btnDelete') as HTMLButtonElement;
const btnEdit = document.getElementById('btnEdit') as HTMLButtonElement;

const imgProfil = document.getElementById('#details img') as HTMLImageElement;

const inputs = document.querySelectorAll('#formulaire input') as NodeListOf<HTMLInputElement> ;

// bouton editer 

btnEdit.onclick = () => {
    initForm(focus);
    switchAff('Editer');
}


//bouton supprimer

btnSuppr.onclick = () => {

    let eliminer = 0 ;

    for (let i:number ; i < annuaire.length ; i++) {

        if (annuaire[i].numID == focus) {
            const check = confirm(`Voulez-vous supprimer ${annuaire[i].nomDuContact} de l'annuaire`) ;
    
            if (check) {  eliminer = i }
        }

        break;
    }
   
    annuaire.splice(eliminer,1);

    const contacts = document.querySelectorAll('#listContacts > button') as NodeListOf<HTMLButtonElement> ;

    let delButton: HTMLButtonElement;

    contacts.forEach( button => {
        if (button.getAttribute("data-numID") == focus.toString()) {
            delButton = button ;

        }
    } )
    lstContact.removeChild(delButton);
    
}


// cacher détail, afficher formulaire vide

function initForm(target: number = 0): void {
       
    if (target == 0) {
        inputs.forEach(input => { input.value = '' })
    } else {
        for (let i = 0 ; i < annuaire.length ; i++) {
            if (annuaire[i].numID == target) {
                const infoCtct = annuaire[i].infosContactStr ;

                for (let j = 0 ; j < inputs.length ; j++) {
                    inputs[j].value = infoCtct[j];
                }

                break;
            }
        }
    }
}


function switchAff(label : string): void {
    btnEditSuppr.innerText = label ;
    const chDisplay = document.querySelectorAll(".switch") as NodeListOf<HTMLElement>;
    chDisplay.forEach( balise => {balise.classList.toggle('d-none')});
}

btnAddContact.onclick = () => {
    focus = 0;
    initForm(focus);
    switchAff('Ajouter');
}

btnEditSuppr.onclick = () => {

    if (focus == 0) {
        addContact(inputs[0].value,inputs[1].value,new Date(inputs[2].value),inputs[3].value,inputs[4].value,inputs[5].value);
    } else {
        for (let i = 0 ; i < annuaire.length ; i++) {
           
            if (annuaire[i].numID == focus){
                annuaire[i].uptInfosContact(inputs[0].value,inputs[1].value,new Date(inputs[2].value),inputs[3].value,inputs[4].value,inputs[5].value);
                affichCtct();
                break;
            }
        }
    }
    switchAff('Editer');
}


/* function dateFomat(date: Date): string {
    const jr: number = date.getDate();
    const ms: number = date.getMonth() + 1;
    const an: number = date.getFullYear();

    return `${jr < 10 ? `0${jr}` : `${jr}`}/${ms < 10 ? `0${ms}` : `${ms}`}/${an}`;
}
 */

function affichCtct(ind: number=focus):void {
    focus = ind;
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
       affichCtct(ind);
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