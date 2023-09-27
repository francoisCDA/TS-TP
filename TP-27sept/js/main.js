import { recipes } from "./data/recipes.js";
const recipesList = [];
for (const cle in recipes) {
    recipesList.push(recipes[cle]);
}
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
    recettesOk = recettesOk.filter(recette => recette.name.substring(0, nom.length).toLowerCase() == nom.toLocaleLowerCase());
    recettesOk = recettesOk.filter(recette => (checkIngredients(recette.ingredients, lstIngre)));
    return recettesOk;
}
console.log("resulat   ", megaFilter(undefined, undefined, undefined, ["salt", "lemon", "garlic"]));
