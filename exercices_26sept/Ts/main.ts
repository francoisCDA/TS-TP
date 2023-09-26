import { User, Admin } from "./interface";


type personne = User | Admin ;

const population : personne[] = [];


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

console.dir(population);