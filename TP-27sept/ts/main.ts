import { recipes } from "./data/recipes.js";
import { Recipe } from "./interface/recipe.js";

//affichage des "boutons-menus"
const domLstRecettes = document.querySelector('.recettes-container') as HTMLDivElement ;
const modalRecette = document.getElementById("affichage-recette") as HTMLDialogElement ;
const modalFormulaire = document.getElementById("nouvelle-recette") as HTMLDialogElement ;
const btnDeleteRecette = document.getElementById("deleteRecette") as HTMLButtonElement ;

//elements de modales
const btnModalRecetteExit = document.getElementById("btnCloseModalRecette") as HTMLButtonElement ;
const btnModalFormExit = document.getElementById("btnCloseModalForm") as HTMLButtonElement ;
const selectFormIngredients = document.getElementById("formSelectIngredients") as HTMLSelectElement ;


// les sélecteurs qui servent de filtre
const selectIngredients = document.getElementById('opt-ingredients') as HTMLElement;
const sliderPrep = document.getElementById('tmp-Preparation') as HTMLInputElement;
const sliderCuisson = document.getElementById('tmp-cuisson') as HTMLInputElement;
const barRecherche = document.getElementById('recherche') as HTMLInputElement;

// bouton reset formulaire
const btnReset = document.getElementById('btn-reset') as HTMLButtonElement;

// label pour les temps sélectionnés
const lblPrepTime = document.getElementById('lbl-tmp-preparation') as HTMLLabelElement;
const lblCookTime = document.getElementById('lbl-tmp-cuisson') as HTMLLIElement;

// tableaux des ingredients sélectionnés par l'utilisateur
let selectedIngre: string[] =[];


// récupération des recettes

let recipesList: Recipe[] = [] ;

for ( const cle in recipes ) { 
    recipesList.push(recipes[cle]); 
    recipesList[recipesList.length-1].id = cle;
}


//filtres

// vérifie les recettes qui nécessitent les ingrédients sélectionnés par l'utilisateur
function checkIngredients(recIngr: {name: string, amount: string}[], ingrsRequired: string[]): boolean {

    if (ingrsRequired.length == 0) {
        return true ;
    } else {
        
        const lstIngreRec: string[] = [];
            
        for ( const ind in recIngr ) { 
            lstIngreRec.push(recIngr[ind].name);
        } 

        const retBool: boolean[] = [];

        ingrsRequired.forEach( ingr => { retBool.push(lstIngreRec.includes(ingr))  })

        return !retBool.includes(false);
    }
        
}

// génére une liste de recettes compatibles avec la sélection et l'envoie à l'affichage; 
function megaFilter(tmpPrep: number = Number(sliderPrep.value), tmpCook: number = Number(sliderCuisson.value), nom: string = barRecherche.value, lstIngre: string[] = selectedIngre): void {

    let recettesOk = recipesList.filter( recette  => parseInt(recette.prepTime) <= tmpPrep )
    recettesOk = recettesOk.filter( recette  => parseInt(recette.cookTime) <= tmpCook )
    recettesOk = recettesOk.filter( recette  => recette.name.substring(0,nom.length).toLowerCase() == nom.toLowerCase() )
    recettesOk = recettesOk.filter( recette => checkIngredients(recette.ingredients, lstIngre) )
    
    mkButtonMenus(recettesOk);
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

function rmRecette(key: string): void {
    recipesList = recipesList.filter( recette => recette.id != key );
    modalRecette.close();
    mkButtonMenus();
}


// affiche la modale pour la recette sélectionnée
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

    const key: string = (recet.id) ? recet.id : '' ; // pourquoi ? parce que typescipt
    btnDeleteRecette.onclick = () => { rmRecette(key) }
}


// formulaire nouvelle recette 

function newRecette() : void {
    modalFormulaire.show() ;

    // copier-coller, à factoriser
    const allIngredients: string[] = [] ; 
    recipesList.forEach( recette => { 
            // récupère la liste d'ingrédient
            for (const ingredient in recette.ingredients) {
                if (!allIngredients.includes(recette.ingredients[ingredient].name)) { allIngredients.push(recette.ingredients[ingredient].name)}
            }
    });

    liGenerator(selectFormIngredients,allIngredients,'option');

} 


//génère les boutons 
function mkButtonMenus(lstRecets: Recipe[] = recipesList): void {
    domLstRecettes.innerHTML = `<p>Recettes<p>` ;
    lstRecets.forEach( recet => {
        const newButton = document.createElement('button');
        newButton.innerHTML = `<p>${recet.name}</p> 
        <hr>
        <div class="infos-tmps">
            <div><img src="./img/chef-hat.svg" alt="toque"> <span>${recet.prepTime}</span> </div>
            <div><img src="./img/fire.svg" alt="toque"> <span>${recet.cookTime}</span> </div>
        </div>
        `;
                 
        // newButton.setAttribute("data-key",(recet.id)? recet.id : (new Date).toString()); // affectation de la clé en data-set
        newButton.onclick = () => {
            updModal(recet) ;      // passage de l'objet complet en paramètre, ce qui rend la data-key inutile
            modalRecette.showModal();
        }

        domLstRecettes.appendChild(newButton);
        
    })

    const newButton = document.createElement('button');
    newButton.innerText = 'ajouter une recette';
    newButton.onclick = () => { newRecette() };

    domLstRecettes.appendChild(newButton);

    lblPrepTime.innerText = `Preparation time : ${sliderPrep.value} min` ;
    lblCookTime.innerText = `Cooking time : ${sliderCuisson.value} min` ;

}

// fermer les modales
btnModalRecetteExit.onclick = () => { modalRecette.close() };
btnModalFormExit.onclick = () => { modalFormulaire.close()};


// les selecteurs / filtres

//initialisation et affichage
function mkIngredientsOpt(): void {

    const tPrep: number[] = [] ;
    const tCook: number[] = [] ;
    const allIngredients: string[] = [] ;

    recipesList.forEach( recette => { 

        tPrep.push(parseInt(recette.prepTime)); // récupère les temps de préparation
        tCook.push(parseInt(recette.cookTime)); // récupère les temps de cuisson
        
        // récupère la liste d'ingrédient
        for (const ingredient in recette.ingredients) {
            if (!allIngredients.includes(recette.ingredients[ingredient].name)) { allIngredients.push(recette.ingredients[ingredient].name)}
        }

    });

    //initialise les paramètres du slider préparation
    sliderPrep.setAttribute("min",`${Math.min(...tPrep)}`);
    sliderPrep.setAttribute("max",`${Math.max(...tPrep)}`);
    sliderPrep.value = `${Math.max(...tPrep)}`;
    
    //initialise les paramètres du slider cuisson
    sliderCuisson.setAttribute("min",`${Math.min(...tCook)}`);
    sliderCuisson.setAttribute("max",`${Math.max(...tCook)}`);
    sliderCuisson.value = `${Math.max(...tCook)}`;
    
    // vide la barre de recherche
    barRecherche.value = '';
    
    // initialise la liste des ingéredients à partir de la liste récupérée plus haut
    liGenerator(selectIngredients,allIngredients,'option');
    
    mkButtonMenus();
}

// enregistre les éléments sélectionnés par l'utilisateur.
function chkOption(): void {
    const lstOpt = document.querySelectorAll("#opt-ingredients > option ") as NodeListOf<HTMLOptionElement> ;
    selectedIngre = [] ;
    lstOpt.forEach( opt => { if (opt.selected) { selectedIngre.push(opt.value) } });
    megaFilter();
}

// évèments des filtres
selectIngredients.onchange = () => { chkOption() };
sliderCuisson.onchange = () => { megaFilter() };
sliderPrep.onchange = () => { megaFilter() };
barRecherche.onkeyup = () => { megaFilter() };

// bouton reset 
btnReset.onclick = () => { mkIngredientsOpt() };

// démarrage
mkIngredientsOpt();


