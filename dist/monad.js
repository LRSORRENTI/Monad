export function square(x) {
    return x * x;
}
export function addOne(x) {
    return x + 1;
}
console.log(addOne(square(2))); // 5 
// the result of the above looks like: 
/*
Call with logging:

addOne(square(2)) => {
    result: 5,
    logs: [
        "first square 2 to get 4",
        "second add 1 to 4 to get 5"
    ]
}
*/
// first square 2 to get 4
// second add 1 to 4 to get 5
