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
const domLstRecettes = document.querySelector('.recettes-container');
const modalRecette = document.querySelector("dialog");
const btnModalExit = document.getElementById("btnCloseModal");
function liGenerator(parent, items, type) {
    parent.innerHTML = '';
    const liList = [];
    items.forEach(item => {
        const newLi = document.createElement(type);
        newLi.innerText = item;
        parent.appendChild(newLi);
    });
}
function updModal(recet) {
    const modalInfo = document.querySelectorAll('.input-modale');
    modalInfo[0].innerText = recet.prepTime;
    modalInfo[1].innerText = recet.cookTime;
    modalInfo[2].innerText = `${recet.servings} ${recet.servings > 1 ? 'servings' : 'serving'}`;
    modalInfo[3].innerText = recet.name;
    const lstIngredients = document.getElementById('ingredients-list');
    const lstInstructions = document.getElementById('recette-script');
    const lstIngreArray = [];
    recet.ingredients.forEach(ingr => lstIngreArray.push(`${ingr.name} (${ingr.amount})`));
    liGenerator(lstIngredients, lstIngreArray, 'li');
    liGenerator(lstInstructions, recet.instructions, 'li');
}
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
const selectIngredients = document.getElementById('opt-ingredients');
function mkIngredientsOpt() {
    const allIngredients = [];
    recipesList.forEach(recette => {
        for (const ingredient in recette.ingredients) {
            if (!allIngredients.includes(recette.ingredients[ingredient].name)) {
                allIngredients.push(recette.ingredients[ingredient].name);
            }
        }
    });
    console.dir(allIngredients);
    liGenerator(selectIngredients, allIngredients, 'option');
}
mkIngredientsOpt();
