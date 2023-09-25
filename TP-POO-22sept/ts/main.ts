import { Eleve } from "./class/eleve.js";
import { Note } from "./class/note.js";

// database (ou assimilé)

const lstEleves: Eleve[] = [];
const lstMatieres: string[] = [];
const lstNotes: Note[] = [];


// éléments de saisie

const selectEleve = document.getElementById('listeEleve') as HTMLSelectElement;
const selectMat = document.getElementById('listeMatiere') as HTMLSelectElement;

const inpNom = document.getElementById('inNom') as HTMLInputElement;
const inpPrenom = document.getElementById('inPrenom') as HTMLInputElement;
const inpMatiere = document.getElementById('inMatiere') as HTMLInputElement;
const inpNote = document.getElementById('inNote') as HTMLInputElement;

const btnAddEleve = document.getElementById('addEleve') as HTMLButtonElement;
const btnAddMat = document.getElementById('addMatiere') as HTMLButtonElement;
const btnAddNote = document.getElementById('addNote') as HTMLButtonElement;


// générateurs de DOM

function mkOptions(parent: HTMLSelectElement, list: string[] ,label: string): void {

    parent.innerHTML = '' ;
    const newOpt = document.createElement('option');
    newOpt.value = '-1' ;
    newOpt.innerText = `--- Sélectionner ${label} ---` ;

    parent.appendChild(newOpt);

    for (let i: number = 0 ; i < list.length ; i++) {
        const newNewOpt = document.createElement('option');
        newNewOpt.value = i.toString() ;
        newNewOpt.innerText = list[i] ;

        parent.appendChild(newNewOpt);
    }

} 


function addOption(parent: HTMLSelectElement,ind: number, label:string): void {
    const newOpt = document.createElement('option');
    newOpt.value = ind.toString() ;
    newOpt.innerText = label ;

    parent.appendChild(newOpt);
}


// ajouter un élève

function addEleve(sonNom: string,sonPrenom: string): void {

    lstEleves.push(new Eleve(sonNom,sonPrenom));

    addOption(selectEleve,lstEleves.length-1,lstEleves[lstEleves.length-1].getEleveStr())

}


if (btnAddEleve && inpNom  && inpPrenom && selectEleve) {

    btnAddEleve.onclick = () => {
       
        if( inpPrenom.value && inpNom.value ) {
            addEleve(inpNom.value,inpPrenom.value);
        }
    }   
}


// ajouter une matière

function addMatiere(discipline: string): void {
    lstMatieres.push(discipline);

    addOption(selectMat,lstMatieres.length-1,discipline);
}


if (btnAddMat && inpMatiere && selectMat) {
  
    btnAddMat.onclick = () => {
        if (inpMatiere.value) {
            addMatiere(inpMatiere.value);
        }
    }
}


// ajouter une note

function addNote(indEleve: number, indMat: number, note: number):void {
    lstNotes.push(new Note(lstEleves[indEleve].getEleveTupple(),lstMatieres[indMat],note));
}

if (btnAddNote && inpNote && selectEleve && selectMat) {
    btnAddNote.onclick = () => {
        if (parseInt(selectEleve.value) > -1 && parseInt(selectMat.value) > -1 && inpNote.value) {
            addNote(parseInt(selectEleve.value),parseInt(selectMat.value),Number(inpNote.value));
         
        }
    }
}

// affichage

const affMoyenne = document.getElementById('moyenne') as HTMLParagraphElement;
const affNotes = document.getElementById('tableauAffichage') as HTMLTableSectionElement;


function uptAfficheNotes(): void {
    affNotes.innerHTML = '';
    let somme: number = 0 ; 
    let cmpt: number = 0 ;
    
    lstNotes.forEach( note => {
        
        const newTr = document.createElement('tr');
        
        note.noteTupple().forEach( (item) => {
            const newTd = document.createElement('td');
            newTd.innerText = item;
            newTr.appendChild(newTd);
        });

        somme += note.note ;
        cmpt++ ;
       
        affNotes.appendChild(newTr);
    })



}






// générer données

function generateur(nb: number): void {
 addEleve("Jacques", "Jean");
 addEleve("Gandhi", "Yves");
 addEleve("John", "Watson");
 addEleve("San", "Cheng");
 addEleve("Lefevre", "Alice");
 addEleve("Martin", "Robert");
 addEleve("Leroux", "Sophie");
 addEleve("Gagnon", "David");
 addEleve("Dubois", "Marie");
 addEleve("Lemoine", "Pierre");
 addEleve("Bernard", "Luc");
 addEleve("Rousseau", "Camille");
 addEleve("Lefevre", "Paul");
 addEleve("Tremblay", "Nathalie");
 addEleve("Deschamps", "Isabelle");

 addMatiere('mathématique');
 addMatiere('anglais');
 addMatiere('sport');
 addMatiere('art plastique');
 addMatiere('claquettes');

for (let i: number = 0 ; i < nb ; i++) {
    addNote(Math.floor(Math.random()*lstEleves.length),Math.floor(Math.random()*lstMatieres.length),Math.round(Math.random()*200)/10);
}

console.dir(lstNotes);
uptAfficheNotes();

}

generateur(100);
