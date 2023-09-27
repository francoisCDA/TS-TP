import { recipes } from "./data/recipes.js";
const recipesList = [];
for (const cle in recipes) {
    recipesList.push(recipes[cle]);
}
const recettesKeys = Object.keys(recipes);
for (let i = 0; i < recipesList.length; i++) {
    recipesList[i].id = recettesKeys[i];
}
console.dir(recipesList);
function checkIngredients(recIngr, ingrsRequired) {
    if (ingrsRequired.length == 0) {
        return true;
    }
    else {
        const lstIngreRec = [];
        for (const ind in recIngr) {
            lstIngreRec.push(recIngr[ind].name);
        }
        const retBool = [];
        ingrsRequired.forEach(ingr => { retBool.push(lstIngreRec.includes(ingr)); });
        return !retBool.includes(false);
    }
}
function megaFilter(tmpPrep = 15, tmpCook = 30, nom = '', lstIngre = []) {
    let recettesOk = recipesList.filter(recette => parseInt(recette.prepTime) <= tmpPrep);
    recettesOk = recettesOk.filter(recette => parseInt(recette.cookTime) <= tmpCook);
    recettesOk = recettesOk.filter(recette => recette.name.substring(0, nom.length).toLowerCase() == nom.toLowerCase());
    recettesOk = recettesOk.filter(recette => checkIngredients(recette.ingredients, lstIngre));
    return recettesOk;
}
function updModal(recet) {
    console.log("From Modal");
    console.dir(recet);
}
const domLstRecettes = document.querySelector('.recettes-container');
const modalRecette = document.querySelector("dialog");
const btnModalExit = document.getElementById("btnCloseModal");
function mkButtonMenus(lstRecets) {
    lstRecets.forEach(recet => {
        const newButton = document.createElement('button');
        newButton.innerText = recet.name;
        newButton.onclick = () => {
            updModal(recet);
            modalRecette.showModal();
        };
        domLstRecettes.appendChild(newButton);
    });
}
btnModalExit.onclick = () => { modalRecette.close(); };
mkButtonMenus(recipesList);
