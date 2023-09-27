import { User, Admin } from "./interface";
import { Pile } from "./pile.js";


type personne = User | Admin ;

const population : personne[] = [{
    nom: 'Toto Dupont',
    age: 35,
    occupation: 'Facteur'
},{
    nom: 'Jeanne Doe',
    age: 25,
    role: 'Admin'
},{
    nom: 'Michel Michel',
    age: 23,
    occupation: 'Lutteur'
},{
    nom: 'Michel Flinch',
    age: 64,
    role: 'Gérant'
}];


population.push({
    nom: 'Toto Dupont',
    age: 35,
    occupation: 'Facteur'
})

population.push({
    nom: 'Jeanne Doe',
    age: 25,
    role: 'Admin'
});

population.push({
    nom: 'Michel Michel',
    age: 23,
    occupation: 'Lutteur'
})

population.push({
    nom: 'Michel Flinch',
    age: 64,
    role: 'Gérant'
})

population.forEach( personne => {console.log(`${personne.nom} ${personne.age} ${ 'role' in personne ? `role : ${personne.role}` : ` occupation : ${personne.occupation}` }`)});

console.dir(population);

let pileDeString = new Pile;

pileDeString.monPush("4");
pileDeString.monPush("quatrième string");
pileDeString.monPop();
pileDeString.monPush("troisième string");

console.dir(pileDeString);

let pileDeNumber = new Pile<number>();

pileDeNumber.monPush(2);
pileDeNumber.monPush(3);
pileDeNumber.monPush(4);

pileDeNumber.monPop();

console.dir(pileDeNumber);

let pileDeBoolean: Pile<boolean> ;

pileDeBoolean = new Pile();

pileDeBoolean.monPush(true);
pileDeBoolean.monPush(false);
pileDeBoolean.monPop();

console.dir(pileDeBoolean);