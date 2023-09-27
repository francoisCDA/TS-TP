import { recipes } from "./data/recipes.js";
import { Recipe } from "./interface/recipe.js";


// récupération des recettes

const recipesList: Recipe[] = [] ;
for ( const cle in recipes ) { recipesList.push(recipes[cle]); }

// récupération des clés et affectation à chaque recette
// potentiellement inutile, je pense pouvoir m'en passer...

const recettesKeys = Object.keys(recipes);

for (let i = 0 ; i < recipesList.length ; i++) {
    recipesList[i].id =recettesKeys[i];
}
console.dir(recipesList);


//filtres

function checkIngredients(recIngr: {}, ingrsRequired: string[]): boolean {

    if (ingrsRequired.length == 0) {
        return true ;
    } else {
        
        const lstIngreRec: string[] = [];
            
        for ( const ind in recIngr ) { lstIngreRec.push(recIngr[ind].name) } 
        // => erreur de compilation : Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.
        // No index signature with a parameter of type 'string' was found on type '{}'.ts(7053)
        // mais ça fonctionne...

        const retBool: boolean[] = [];

        ingrsRequired.forEach( ingr => { retBool.push(lstIngreRec.includes(ingr))  })

        return !retBool.includes(false);
    }
        
}

function megaFilter(tmpPrep: number = 15, tmpCook: number = 30, nom: string = '', lstIngre: string[] = []): Recipe[] {

    let recettesOk = recipesList.filter( recette  => parseInt(recette.prepTime) <= tmpPrep )
    recettesOk = recettesOk.filter( recette  => parseInt(recette.cookTime) <= tmpCook )
    recettesOk = recettesOk.filter( recette  => recette.name.substring(0,nom.length).toLowerCase() == nom.toLowerCase() )
    recettesOk = recettesOk.filter( recette => checkIngredients(recette.ingredients, lstIngre) )
    
    return recettesOk;
}

function updModal(recet: Recipe): void {
    console.log("From Modal");
    console.dir(recet);
}

//affichage des "boutons-menus"

const domLstRecettes = document.querySelector('.recettes-container') as HTMLDivElement ;
const modalRecette = document.querySelector("dialog") as HTMLDialogElement ;
const btnModalExit = document.getElementById("btnCloseModal") as HTMLButtonElement ;

function mkButtonMenus(lstRecets: Recipe[]): void {
    lstRecets.forEach( recet => {
        const newButton = document.createElement('button');
        newButton.innerText = recet.name ;
       // newButton.setAttribute("data-key",(recet.id)? recet.id : (new Date).toString()); // affectation de la clé en data-set
        newButton.onclick = () => {
            updModal(recet) ;      // passage de l'objet complet en paramètre, ce qui rend le data-key inutile
            modalRecette.showModal();
        }

        domLstRecettes.appendChild(newButton);
    })
}

btnModalExit.onclick = () => { modalRecette.close() }

mkButtonMenus(recipesList);





















