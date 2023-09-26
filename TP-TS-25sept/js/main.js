import Contact from "./class/contact.js";
const annuaire = [];
let focus;
const lstContact = document.getElementById('listContacts');
const btnAddContact = document.getElementById('btnAddContact');
const btnEditSuppr = document.getElementById('btnEditSuppr');
const btnSuppr = document.getElementById('btnDelete');
const btnEdit = document.getElementById('btnEdit');
const imgProfil = document.querySelector('#details img');
const inputs = document.querySelectorAll('#formulaire input');
btnEdit.onclick = () => {
    initForm(focus);
    switchAff('Editer');
};
btnSuppr.onclick = () => {
    let eliminer = 0;
    for (let i; i < annuaire.length; i++) {
        if (annuaire[i].numID == focus) {
            const check = confirm(`Voulez-vous supprimer ${annuaire[i].nomDuContact} de l'annuaire`);
            if (check) {
                eliminer = i;
            }
        }
        break;
    }
    annuaire.splice(eliminer, 1);
    const contacts = document.querySelectorAll('#listContacts > button');
    let delButton;
    contacts.forEach(button => {
        if (button.getAttribute("data-numID") == focus.toString()) {
            delButton = button;
        }
    });
    lstContact.removeChild(delButton);
};
function initForm(target = 0) {
    if (target == 0) {
        inputs.forEach(input => { input.value = ''; });
    }
    else {
        for (let i = 0; i < annuaire.length; i++) {
            if (annuaire[i].numID == target) {
                const infoCtct = annuaire[i].infosContactStr;
                for (let j = 0; j < inputs.length; j++) {
                    inputs[j].value = infoCtct[j];
                }
                break;
            }
        }
    }
}
function switchAff(label) {
    btnEditSuppr.innerText = label;
    const chDisplay = document.querySelectorAll(".switch");
    chDisplay.forEach(balise => { balise.classList.toggle('d-none'); });
}
btnAddContact.onclick = () => {
    focus = 0;
    initForm(focus);
    switchAff('Ajouter');
};
btnEditSuppr.onclick = () => {
    if (focus == 0) {
        addContact(inputs[0].value, inputs[1].value, new Date(inputs[2].value), inputs[3].value, inputs[4].value, inputs[5].value);
    }
    else {
        for (let i = 0; i < annuaire.length; i++) {
            if (annuaire[i].numID == focus) {
                annuaire[i].uptInfosContact(inputs[0].value, inputs[1].value, new Date(inputs[2].value), inputs[3].value, inputs[4].value, inputs[5].value);
                affichCtct();
                break;
            }
        }
    }
    switchAff('Editer');
};
function affichCtct(ind = focus) {
    focus = ind;
    annuaire.forEach((contct) => {
        if (contct.numID == ind) {
            const infosCtct = contct.infosContactStr;
            const affInfos = document.querySelectorAll('.infoCtct');
            for (let i = 0; i < affInfos.length; i++) {
                affInfos[i].innerText = infosCtct[i];
            }
            const affAge = document.querySelector('.age');
            affAge.innerHTML = contct.age.toString() + " ans";
            imgProfil.src = infosCtct[5];
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
