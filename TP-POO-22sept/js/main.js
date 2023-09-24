import { Eleve } from "./class/eleve.js";
import { Note } from "./class/note.js";
const lstEleves = [];
const lstMatieres = [];
const lstNotes = [];
const selectEleve = document.getElementById('listeEleve');
const selectMat = document.getElementById('listeMatiere');
const inpNom = document.getElementById('inNom');
const inpPrenom = document.getElementById('inPrenom');
const inpMatiere = document.getElementById('inMatiere');
const inpNote = document.getElementById('inNote');
const btnAddEleve = document.getElementById('addEleve');
const btnAddMat = document.getElementById('addMatiere');
const btnAddNote = document.getElementById('addNote');
function mkOptions(parent, list, label) {
    parent.innerHTML = '';
    const newOpt = document.createElement('option');
    newOpt.value = '-1';
    newOpt.innerText = `--- Sélectionner ${label} ---`;
    parent.appendChild(newOpt);
    for (let i = 0; i < list.length; i++) {
        const newNewOpt = document.createElement('option');
        newNewOpt.value = i.toString();
        newNewOpt.innerText = list[i];
        parent.appendChild(newNewOpt);
    }
}
function addOption(parent, ind, label) {
    const newOpt = document.createElement('option');
    newOpt.value = ind.toString();
    newOpt.innerText = label;
    parent.appendChild(newOpt);
}
function addEleve(sonNom, sonPrenom) {
    lstEleves.push(new Eleve(sonNom, sonPrenom));
    addOption(selectEleve, lstEleves.length - 1, lstEleves[lstEleves.length - 1].getEleveStr());
}
if (btnAddEleve && inpNom && inpPrenom && selectEleve) {
    btnAddEleve.onclick = () => {
        if (inpPrenom.value && inpNom.value) {
            addEleve(inpNom.value, inpPrenom.value);
        }
    };
}
function addMatiere(discipline) {
    lstMatieres.push(discipline);
    addOption(selectMat, lstMatieres.length - 1, discipline);
}
if (btnAddMat && inpMatiere && selectMat) {
    btnAddMat.onclick = () => {
        if (inpMatiere.value) {
            addMatiere(inpMatiere.value);
        }
    };
}
function addNote(indEleve, indMat, note) {
    lstNotes.push(new Note(lstEleves[indEleve].getEleveTupple(), lstMatieres[indMat], note));
}
if (btnAddNote && inpNote && selectEleve && selectMat) {
    btnAddNote.onclick = () => {
        if (parseInt(selectEleve.value) > -1 && parseInt(selectMat.value) > -1 && inpNote.value) {
            addNote(parseInt(selectEleve.value), parseInt(selectMat.value), Number(inpNote.value));
        }
    };
}
function generateur(nb) {
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
    for (let i = 0; i < nb; i++) {
        addNote(Math.floor(Math.random() * lstEleves.length), Math.floor(Math.random() * lstMatieres.length), Math.round(Math.random() * 200) / 10);
    }
    console.dir(lstNotes);
}
generateur(100);
