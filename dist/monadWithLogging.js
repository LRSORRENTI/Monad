"use strict";
// First we define a struct to capture the 
// return type: 
// function square(x: number): NumberWithLogs {
//     return {
//         result: x * x,
//         logs: [ `Squared ${x} to get ${x * x}.` ]
//     }
// }
// function addOne(x: NumberWithLogs): NumberWithLogs {
//     return {
//         result: x.result + 1,
//         logs: x.logs.concat([
//             `Added 1 to ${x.result} to get ${x.result + 1}`
//         ])
//     }
// }
// The above works, but what if we want to do 
// something like: 
// square(square(2)) this won't work because 
// argument of type 'NumWithLogs' is not assignable 
// to type 'number' 
// Or what about addOne(5), this won't work either 
// for the same reason
// We can fix this with a function wrapper called 
// wrapWithLogs, where the argument takes 
// a number then returns a NumberWithLogs lke 
// a constructor kind've
// That way we can call functions that expect 
// NumberWithLogs 
// NEW WRAPPER FUNCTION:
function wrapWithLogs(x) {
    return {
        result: x,
        logs: []
    };
}
// Tweaked square function from above: 
// function square(x: NumberWithLogs): NumberWithLogs {
//     return {
//         result: x.result * x.result,
//         logs: x.logs.concat([
//             `Squared ${x.result} to get 
//             ${x.result * x.result} `
//         ])
//     }
// }
// Now we have a new call pattern: 
// square(square(wrapWithLogs(2)))
// And to do addOme of 5: 
// addOne(wrapWithLogs(5))
// We can refactor it though, we've got some 
// duplicated concat logic: 
// Re-organized square function: 
// function square(x: NumberWithLogs): NumberWithLogs {
//     const newNumberWithLogs = {
//         result: x.result * x.result,
//         logs: [
//             `Squared ${x.result} to get: ` +
//             `${x.result * x.result}`
//         ]
//     }
//     return {
//         result: newNumberWithLogs.result,
//         logs: x.logs.concat(newNumberWithLogs.logs)
//     }
// }
function runWithLogs(
// inside this function we have two args
// input which has our NumberWithLogs interface
input, 
// The second is a function to apply to a number,
// like addOne or Square when we invoke it, and 
// returns a new NumberWithLogs 
transform) {
    const newNumberWithLogs = transform(input.result);
    return {
        result: newNumberWithLogs.result,
        logs: input.logs.concat(newNumberWithLogs.logs)
    };
}
// Now the call style has changed, the old 
// call style: 
// addOne(wrapWithLogs(5))
// Now with our new runWithLogs we can refactor 
// both square and addOne: 
function square(x) {
    return {
        result: x * x,
        logs: [`Squares ${x} to get ${x * x}.`]
    };
}
function addOne(x) {
    return {
        result: x + 1,
        logs: [`Added 1 to ${x} to get ${x + 1}`]
    };
}
// Now we can call runWithLogs with any order we 
// want 
const a = wrapWithLogs(5);
console.log(a, square);
const b = runWithLogs(a, addOne);
console.log(b);
const c = runWithLogs(b, square);
console.log(c);
/*
{ result: 5, logs: [] } [Function: square]
{ result: 6, logs: [ 'Added 1 to 5 to get 6' ] }
{
  result: 36,
  logs: [ 'Added 1 to 5 to get 6', 'Squares 6 to get 36.' ]
}
*/
// So what we just did was enable arbitrary combinations
// in whatever order we want 
// And we could add new transform funcs like 
// multiplyByThree() or addSeven()
// And we abstracted away log concatenation 
// inside of runWithLogs, so any new function 
// doesn't ever need that logic
// This above is now a Monad, you're looking 
// at an implementation of a Monad 
// Monads are a useful design pattern and 
// we just built one! 
// Monads allow chaining of operations while 
// abstracting away busy work behind the scenes 
// In this example, the Wrapper Type: NumberWithLogs 
// Second we have the actual Wrapper Function which 
// was wrapWithLogs, this is the entry point into 
// the Monad ecosystem
// Lastly a monad must have a run function, 
// a transformation function ran on monad values,
// in our example that was runWithLogs
