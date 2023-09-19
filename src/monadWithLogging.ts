// First we define a struct to capture the 
// return type: 

interface NumberWithLogs {
    // This struct houses the result 
    // and the logs array
    result: number
    logs: string[]
}

function square(x: number): NumberWithLogs {
    return {
        result: x * x,
        logs: [ `Squared ${x} to get ${x * x}.` ]
    }
}

function addOne(x: NumberWithLogs): NumberWithLogs {
    return {
        result: x.result + 1,
        logs: x.logs.concat([
            `Added 1 to ${x.result} to get ${x.result + 1}`
        ])
    }
}

// The above works, but what if we want to do 
// something like: 

// square(square(2)) this won't work because 
// argument of type 'NumWithLogs' is not assignable 
// to type 'number' 