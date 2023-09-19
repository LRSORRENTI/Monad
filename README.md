 As it turns out, monads are an extremely powerful design pattern that can be used without any math knowledge. 
 
 We’ll cover what monads are, how they can be incredibly useful, and examine some common monads.

 When working with Monads, the general premise is this: 

 Unwrapped Value -> Wrap That Value -> Send to Monad
 Run Function Unwraps Monad (Run) -> 
 Transform Value 1 -> Value 2

 It's an alternating flow of control between 
 Monad Land and Base Land that demonstrate 
 how Monads are utilized, the three most common
 Monads you'll likely encounter are: 

 - Writer: Accumulation of data

 - Option: Possibility of missing values

 - Future / Promise: Possibility for values to 
   to become available later


Monad Land:
 ```
 // Option Monad:

type Option<T> = T | undefined | null;

function run<T, U>(
    input: Option<T>,
    transform: (_: T) => Option<U>
): Option<U> {
    if (input === null || input === undefined) {
        return input as Option<U>;
        // we can safely cast since null and undefined 
        //are valid for Option<U>
    }
    return transform(input);
}

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

 function getPetNickname(): Option<string> {
    const user: Option<User> = getCurrentUser();
    const userPet: Option<Pet> = run(user, getPet);
    const userPetNickname: Option<string> = run(userPet, getNickName)
    return userPetNickname;
}

 ```

 Arrays are also Monads, especially in the context of functional programming languages or libraries that treat them as such. Here's how arrays fit the monadic interface:

- Type Wrapper: An array in most programming languages wraps around zero or more values of the same type. That is, if you have a value of type T, an array would be T[] (or Array<T> in some languages).

- Unit Function (or Return): This is a function that takes a value and returns a monadic value (i.e., it wraps the value in the monad). For arrays, this is often just putting a single value into an array.

In JavaScript/TypeScript:

```
function unit<T>(value: T): T[] {
    return [value];
}

```

Bind Function (or FlatMap): This is the key function that makes a structure a monad. It takes a monadic value and a function from the value's type to another monadic type, and then returns the new monadic type. For arrays, this involves flattening the resulting array.

In JavaScript/TypeScript, the flatMap method on arrays serves this purpose:

```
const array = [1, 2, 3];
const result = array.flatMap(value => [value, value + 10]);  // results in [1, 11, 2, 12, 3, 13]

```

In essence, the array monad allows you to work with the uncertainty of having zero, one, or many values. For example, if you have a function that can return multiple results and you apply it to each value in an array, you'd get an array of arrays. But the bind operation (or flatMap) flattens it back into a single array.

Moreover, it's worth noting that just because arrays fit the monadic interface doesn't mean they are commonly referred to as monads in every context. In functional programming contexts, this perspective is more explicit, but in day-to-day imperative programming, arrays are often just seen as a basic data structure.

Monads will always have these three components: 

1. Wrapper Type (Option, Future, etc..)
2. Wrap Function (Allowing entry into Monad ecosystem, known commonly as return, pure, unit)
3. Run Function (Runs transformations on Monadic 
values, things like bind and flatMap)