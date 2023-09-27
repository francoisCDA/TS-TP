import { recipes } from "./data/recipes.js";
const recipesList = [];
for (const cle in recipes) {
    recipesList.push(recipes[cle]);
}
function megaFilter(tmpPrep = 15, tmpCook = 30, nom = '', lstIngre = []) {
    let recettesOk = recipesList.filter(recette => parseInt(recette.prepTime) <= tmpPrep);
    recettesOk = recettesOk.filter(recette => parseInt(recette.cookTime) <= tmpCook);
    recettesOk = recettesOk.filter(recette => recette.name.substring(0, nom.length).toLowerCase() == nom.toLocaleLowerCase());
    return recettesOk;
}
console.log(megaFilter(undefined, undefined, 'Lem', undefined));
