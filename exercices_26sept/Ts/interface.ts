interface Personne {
    nom: string;
    age: number;
}

interface User extends Personne {
    occupation: string;
}

interface Admin extends Personne {
    role: String;
}


export { User, Admin}