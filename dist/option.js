"use strict";
// Let's look at another Monad: Option 
// which sometimes is referred to as Maybe
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
// change the type signature of the run function to allow the input 
//type T and the output type U to be different:
function run(input, transform) {
    if (input === null || input === undefined) {
        return input;
        // we can safely cast since null and undefined 
        //are valid for Option<U>
    }
    return transform(input);
}
function getCurrentUser() {
    // Mock implementation, you can replace with the actual code
    return null; // or return an actual User
}
function getPet(user) {
    // Mock implementation, you can replace with the actual code
    return null; // or return a Pet
}
function getNickName(pet) {
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
function getPetNickname() {
    const user = getCurrentUser();
    const userPet = run(user, getPet);
    const userPetNickname = run(userPet, getNickName);
    return userPetNickname;
}
// Monads are a design pattern that facilitate the 
// ability to chain operations while Monad manages 
// the work behind the scenes, in this option.ts file,
// we handle possible missing values via Monad, and 
// inside of the monadWithLogging.ts file we manage 
// log concatenation behind the scenes via Monad
