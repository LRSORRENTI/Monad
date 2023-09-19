// Let's look at another Monad: Option 
// which sometimes is referred to as Maybe

// It represents the possible absence of a value

// A number type must always be a number, 
// but an option of a number: 

// Option<number> is something that is a number 
// or nothing at all

// type Option<T> = T | null;
// type Option<T> = T | undefined;

type Option<T> = T | undefined | null;


// Or an Option<User> is either nothing or a User

// similar to how things can be null (absence of 
// a value) or undefined (doesn't exist)

// Let's look at the components, we have the 
// wrapper type which is Option<T>, in this 
// case it's generic so it can wrap any type

// <T> signified a geneic type 

// Second it has a wrap function, turning 
// T's into Option<T>'s: 

// function some<T>(x: T): Option<T>{

// }

// Then we have the run function, which does 
// the transformation:

function run<T, U>(
    input: Option<T>,
    transform: (_: T) => Option<U>
): Option<U> {
    if (input === null || input === undefined) {
        return input as Option<U>;
    }
    return transform(input);
}

// Think of T as the 'raw type'
// And Option<T> as the 'wrapped T'

// Just like before in monadWithLogging.ts
// we had NumberWithLogs transform, which 
// had a function like addOne, which took a 
// number, the raw type, then transformed it into
// returned a number of logs, the wrapped type

// Let's look at a useful example, first without 
// the option type

// function getPetNickname(): string | undefined {
//     const user: User | undefined = getCurrentUser();
//     if(user === undefined){
//         return undefined
//     }
//     const userPet: Pet | undefined = getPet(user)
//     if(userPet === undefined){
//         return undefined
//     }
//     const userPetNickname: string | undefined = getNickName(userPet)
//     return userPetNickname
// }

// The above is what this function where we try to 
// fetch the current user, get the pet of the user,
// and it's nickname, where potentially all those 
// values could be missing, that's all the | undefined 
// checks we have above 

// Let's rewrie it with Option Monad:

type User = {
    id: string;
    name: string;
    // ... other properties
};

type Pet = {
    id: string;
    name: string;
    nickname?: string;
    // ... other properties
};

function getCurrentUser(): Option<User> {
    // Mock implementation, you can replace with the actual code
    return null;  // or return an actual User
}

function getPet(user: User): Option<Pet> {
    // Mock implementation, you can replace with the actual code
    return null;  // or return a Pet
}

function getNickName(pet: Pet): Option<string> {
    // Mock implementation, you can replace with the actual code
    return pet.nickname ? pet.nickname : null;
}
// Using the run function and the Option monad, you can rewrite getPetNickname as:

// function getPetNickname(): Option<string> {
//         const user: Option<User> = getCurrentUser();
//         const userPet: Option<Pet> = run(user, getPet);
//         const userPetNickname: Option<string> = run(userPet, getNickName)
//         return userPetNickname;
// }

function getPetNickname(): Option<string> {
    const user: Option<User> = getCurrentUser();
    const userPet: Option<Pet> = run(user, getPet);
    const userPetNickname: Option<string> = run(userPet, getNickName)
    return userPetNickname;
}




