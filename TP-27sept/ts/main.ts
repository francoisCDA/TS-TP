import { recipes } from "./data/recipes.js";
import { Recipe } from "./interface/recipe.js";

//affichage des "boutons-menus"

const domLstRecettes = document.querySelector('.recettes-container') as HTMLDivElement ;
const modalRecette = document.querySelector("dialog") as HTMLDialogElement ;
const btnModalExit = document.getElementById("btnCloseModal") as HTMLButtonElement ;

// les sélecteurs qui servent de filtre

const selectIngredients = document.getElementById('opt-ingredients') as HTMLElement;
const sliderPrep = document.getElementById('tmp-Preparation') as HTMLInputElement;
const sliderCuisson = document.getElementById('tmp-cuisson') as HTMLInputElement;
const barRecherche = document.getElementById('recherche') as HTMLInputElement;

// label pour les temps sélectionnés.

const lblPrepTime = document.getElementById('lbl-tmp-preparation') as HTMLLabelElement;
const lblCookTime = document.getElementById('lbl-tmp-cuisson') as HTMLLIElement;

//variable globale, paramètres de filtre initiaux

let tempPreparation: number = 15, tempCuisson: number = 30, recherche: string = '', selectedIngre: string[] =[];


// récupération des recettes

const recipesList: Recipe[] = [] ;
for ( const cle in recipes ) { recipesList.push(recipes[cle]); }


// récupération des clés et affectation à chaque recette
// potentiellement inutile, je pense pouvoir m'en passer...

const recettesKeys = Object.keys(recipes);

for (let i = 0 ; i < recipesList.length ; i++) {
    recipesList[i].id =recettesKeys[i];
}


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


function megaFilter(tmpPrep: number = Number(sliderPrep.value), tmpCook: number = Number(sliderCuisson.value), nom: string = barRecherche.value, lstIngre: string[] = selectedIngre): void {

    let recettesOk = recipesList.filter( recette  => parseInt(recette.prepTime) <= tmpPrep )
    recettesOk = recettesOk.filter( recette  => parseInt(recette.cookTime) <= tmpCook )
    recettesOk = recettesOk.filter( recette  => recette.name.substring(0,nom.length).toLowerCase() == nom.toLowerCase() )
    recettesOk = recettesOk.filter( recette => checkIngredients(recette.ingredients, lstIngre) )
    
    mkButtonMenus(recettesOk);
    //return recettesOk;
}



// utilisé  pour les 2 listes dans les modales, et pour les options dans le select
function liGenerator(parent: HTMLElement, items: string[], type: string): void {
    parent.innerHTML = '' ;
    
    type myHTMLElement = HTMLOptionElement | HTMLLIElement ;
        
    items.forEach (item => {
        const newLi: myHTMLElement = document.createElement(type) as myHTMLElement;  // #typescriptcasselespieds
        newLi.innerText = item;
        if (type == 'option') { newLi.value = item }
                
        parent.appendChild(newLi);
    })
  
}


function updModal(recet: Recipe): void {

    const modalInfo = document.querySelectorAll('.input-modale') as NodeListOf<HTMLSpanElement> ;

    modalInfo[0].innerText = recet.prepTime;
    modalInfo[1].innerText = recet.cookTime;
    modalInfo[2].innerText = `${recet.servings} ${recet.servings > 1 ? 'servings' : 'serving' }`;
    modalInfo[3].innerText = recet.name;

    const lstIngredients = document.getElementById('ingredients-list') as HTMLUListElement ;
    const lstInstructions = document.getElementById('recette-script') as HTMLUListElement ;

    const lstIngreArray: string[] = [] ;
    recet.ingredients.forEach( ingr => lstIngreArray.push(`${ingr.name} (${ingr.amount})`) ) ;

    liGenerator(lstIngredients, lstIngreArray,'li');
    liGenerator(lstInstructions, recet.instructions,'li');

}


function mkButtonMenus(lstRecets: Recipe[] = recipesList): void {
    domLstRecettes.innerHTML = '' ;
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

    lblPrepTime.innerText = `Preparation time : ${sliderPrep.value} min` ;
    lblCookTime.innerText = `Cooking time : ${sliderCuisson.value} min` ;

}

btnModalExit.onclick = () => { modalRecette.close() }



// les selecteurs / filtres

//initialisation et affichage
function mkIngredientsOpt(): void {

    const tPrep: number[] = [] ;
    const tCook: number[] = [] ;
    const allIngredients: string[] = [] ;


    recipesList.forEach( recette => { 

        tPrep.push(parseInt(recette.prepTime));
        tCook.push(parseInt(recette.cookTime));
        
        for (const ingredient in recette.ingredients) {
            if (!allIngredients.includes(recette.ingredients[ingredient].name)) { allIngredients.push(recette.ingredients[ingredient].name)}
        }


    });

    sliderPrep.setAttribute("min",`${Math.min(...tPrep)}`);
    sliderPrep.setAttribute("max",`${Math.max(...tPrep)}`);
    sliderPrep.value = `${Math.max(...tPrep)}`;
    tempPreparation = Math.max(...tPrep);
    
    sliderCuisson.setAttribute("min",`${Math.min(...tCook)}`);
    sliderCuisson.setAttribute("max",`${Math.max(...tCook)}`);
    sliderCuisson.value = `${Math.max(...tCook)}`;
    tempCuisson = Math.max(...tCook);

    barRecherche.value = '';
    recherche = '';

    liGenerator(selectIngredients,allIngredients,'option');
    
    mkButtonMenus();
}

mkIngredientsOpt();


function chkOption(): void {

    
    const lstOpt = document.querySelectorAll("#opt-ingredients > option ") as NodeListOf<HTMLOptionElement> ;
    
    selectedIngre = [] ;

    lstOpt.forEach( opt => { if (opt.selected) { selectedIngre.push(opt.value) } })
    
    megaFilter()
}



selectIngredients.onchange = () => { chkOption()  }
sliderCuisson.onchange = () => { megaFilter() }
sliderPrep.onchange = () => { megaFilter() }
barRecherche.onkeyup = () => { megaFilter() }







