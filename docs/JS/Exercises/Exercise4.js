// Write a function that transforms an array of inputs into a 
// new array based on a provided transformation function.
// var numbers = [1, 2, 3, 4];

// function transform(collection, tranFunc) { …TODO }

// var output = transform(numbers, function(num) {
//     return num * 2;
// });
// output should be [2, 4, 6, 8]

var numbers = [1, 2, 3, 4];

function transform(collection, tranFunc) { 
    let newArr = [];
    for(let i = 0; i < collection.length; i++){
        newArr.push(tranFunc(collection[i]));
    }
    return newArr;
}

var output = transform(numbers, function(num) {
    return num * 2;
});

console.log("Output for exercise 4:");
console.log(output);