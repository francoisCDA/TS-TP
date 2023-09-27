import { recipes } from "./data/recipes.js";
import { Recipe } from "./interface/recipe.js";

const recipesList: Recipe[] = [] ;

for ( const cle in recipes ) { recipesList.push(recipes[cle]); }


function megaFilter(tmpPrep: number = 15, tmpCook: number = 30, nom: string = '', lstIngre: string[] = []): Recipe[] {

    let recettesOk = recipesList.filter( recette  => parseInt(recette.prepTime) <= tmpPrep )
    recettesOk = recettesOk.filter( recette  => parseInt(recette.cookTime) <= tmpCook )
    recettesOk = recettesOk.filter( recette  => recette.name.substring(0,nom.length).toLowerCase() == nom.toLocaleLowerCase()  )
    
    return recettesOk;
}


console.log(megaFilter(undefined,undefined,'Lem',undefined));
