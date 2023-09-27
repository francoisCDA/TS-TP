import { recipes } from "./data/recipes.js";
import { Recipe } from "./interface/recipe.js";

const recipesList: Recipe[] = [] ;

for ( const cle in recipes ) { recipesList.push(recipes[cle]); }


function checkIngredients(recIngr: {}, ingrsRequired: string[]): boolean {

    if (ingrsRequired.length == 0) {
        return true ;
    } else {
        
        const lstIngreRec: string[] = [];
            
        for ( const ind in recIngr ) { lstIngreRec.push(recIngr[ind].name) } 
        // => erreur de compilation : Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.
        // No index signature with a parameter of type 'string' was found on type '{}'.ts(7053)
        // mais ça fonctionne

        const retBool: boolean[] = [];

        ingrsRequired.forEach( ingr => { retBool.push(lstIngreRec.includes(ingr))  })

        return !retBool.includes(false);
    }
        
}



function megaFilter(tmpPrep: number = 15, tmpCook: number = 30, nom: string = '', lstIngre: string[] = []): Recipe[] {

    let recettesOk = recipesList.filter( recette  => parseInt(recette.prepTime) <= tmpPrep )
    recettesOk = recettesOk.filter( recette  => parseInt(recette.cookTime) <= tmpCook )
    recettesOk = recettesOk.filter( recette  => recette.name.substring(0,nom.length).toLowerCase() == nom.toLocaleLowerCase() )
    recettesOk = recettesOk.filter( recette => (checkIngredients(recette.ingredients, lstIngre)) )
    
    return recettesOk;
}


console.log("resulat   ", megaFilter(undefined,undefined,undefined,["salt","lemon","garlic"]));
