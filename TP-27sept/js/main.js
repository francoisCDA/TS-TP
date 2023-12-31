import { recipes } from "./data/recipes.js";
const domLstRecettes = document.querySelector('.recettes-container');
const modalRecette = document.getElementById("affichage-recette");
const modalFormulaire = document.getElementById("nouvelle-recette");
const btnDeleteRecette = document.getElementById("deleteRecette");
const btnModalRecetteExit = document.getElementById("btnCloseModalRecette");
const btnModalFormExit = document.getElementById("btnCloseModalForm");
const selectFormIngredients = document.getElementById("formSelectIngredients");
const selectIngredients = document.getElementById('opt-ingredients');
const sliderPrep = document.getElementById('tmp-Preparation');
const sliderCuisson = document.getElementById('tmp-cuisson');
const barRecherche = document.getElementById('recherche');
const btnReset = document.getElementById('btn-reset');
const lblPrepTime = document.getElementById('lbl-tmp-preparation');
const lblCookTime = document.getElementById('lbl-tmp-cuisson');
let selectedIngre = [];
let recipesList = [];
for (const cle in recipes) {
    recipesList.push(recipes[cle]);
    recipesList[recipesList.length - 1].id = cle;
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
function megaFilter(tmpPrep = Number(sliderPrep.value), tmpCook = Number(sliderCuisson.value), nom = barRecherche.value, lstIngre = selectedIngre) {
    let recettesOk = recipesList.filter(recette => parseInt(recette.prepTime) <= tmpPrep);
    recettesOk = recettesOk.filter(recette => parseInt(recette.cookTime) <= tmpCook);
    recettesOk = recettesOk.filter(recette => recette.name.substring(0, nom.length).toLowerCase() == nom.toLowerCase());
    recettesOk = recettesOk.filter(recette => checkIngredients(recette.ingredients, lstIngre));
    mkButtonMenus(recettesOk);
}
function liGenerator(parent, items, type) {
    parent.innerHTML = '';
    items.forEach(item => {
        const newLi = document.createElement(type);
        newLi.innerText = item;
        if (type == 'option') {
            newLi.value = item;
        }
        parent.appendChild(newLi);
    });
}
function rmRecette(key) {
    recipesList = recipesList.filter(recette => recette.id != key);
    modalRecette.close();
    mkButtonMenus();
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
    const key = (recet.id) ? recet.id : '';
    btnDeleteRecette.onclick = () => { rmRecette(key); };
}
function newRecette() {
    modalFormulaire.show();
    const allIngredients = [];
    recipesList.forEach(recette => {
        for (const ingredient in recette.ingredients) {
            if (!allIngredients.includes(recette.ingredients[ingredient].name)) {
                allIngredients.push(recette.ingredients[ingredient].name);
            }
        }
    });
    liGenerator(selectFormIngredients, allIngredients, 'option');
}
function mkButtonMenus(lstRecets = recipesList) {
    domLstRecettes.innerHTML = `<p>Recettes<p>`;
    lstRecets.forEach(recet => {
        const newButton = document.createElement('button');
        newButton.innerHTML = `<p>${recet.name}</p> 
        <hr>
        <div class="infos-tmps">
            <div><img src="./img/chef-hat.svg" alt="toque"> <span>${recet.prepTime}</span> </div>
            <div><img src="./img/fire.svg" alt="toque"> <span>${recet.cookTime}</span> </div>
        </div>
        `;
        newButton.onclick = () => {
            updModal(recet);
            modalRecette.showModal();
        };
        domLstRecettes.appendChild(newButton);
    });
    const newButton = document.createElement('button');
    newButton.innerText = 'ajouter une recette';
    newButton.onclick = () => { newRecette(); };
    domLstRecettes.appendChild(newButton);
    lblPrepTime.innerText = `Preparation time : ${sliderPrep.value} min`;
    lblCookTime.innerText = `Cooking time : ${sliderCuisson.value} min`;
}
btnModalRecetteExit.onclick = () => { modalRecette.close(); };
btnModalFormExit.onclick = () => { modalFormulaire.close(); };
function mkIngredientsOpt() {
    const tPrep = [];
    const tCook = [];
    const allIngredients = [];
    recipesList.forEach(recette => {
        tPrep.push(parseInt(recette.prepTime));
        tCook.push(parseInt(recette.cookTime));
        for (const ingredient in recette.ingredients) {
            if (!allIngredients.includes(recette.ingredients[ingredient].name)) {
                allIngredients.push(recette.ingredients[ingredient].name);
            }
        }
    });
    sliderPrep.setAttribute("min", `${Math.min(...tPrep)}`);
    sliderPrep.setAttribute("max", `${Math.max(...tPrep)}`);
    sliderPrep.value = `${Math.max(...tPrep)}`;
    sliderCuisson.setAttribute("min", `${Math.min(...tCook)}`);
    sliderCuisson.setAttribute("max", `${Math.max(...tCook)}`);
    sliderCuisson.value = `${Math.max(...tCook)}`;
    barRecherche.value = '';
    liGenerator(selectIngredients, allIngredients, 'option');
    mkButtonMenus();
}
function chkOption() {
    const lstOpt = document.querySelectorAll("#opt-ingredients > option ");
    selectedIngre = [];
    lstOpt.forEach(opt => { if (opt.selected) {
        selectedIngre.push(opt.value);
    } });
    megaFilter();
}
selectIngredients.onchange = () => { chkOption(); };
sliderCuisson.onchange = () => { megaFilter(); };
sliderPrep.onchange = () => { megaFilter(); };
barRecherche.onkeyup = () => { megaFilter(); };
btnReset.onclick = () => { mkIngredientsOpt(); };
mkIngredientsOpt();
