let userName: string = "la valeur de votre choix" ;
let userAge: number = 123 ;
let isLogin: boolean = true ;

let userNames: string[] ;

userNames.push(userName);

let person: object;

person = {
    firstName: "Dupont",
    age: 20,
    isLoggedIn: true
}

console.log("Il n'est pas possible d'accéder à la propriété person.age");

let person1 :{
    firstName: string,
    age: number,
    isLoggedIn: boolean
} = {
    firstName: "Dupont",
    age: 20,
    isLoggedIn: true
}

console.log(person1.age);

let person2 = {
    firstName: "Dupont",
    age: 20,
    isLoggedIn: true
}

console.log(person2.age);

let infos: [string,number];