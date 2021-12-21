// Write a function that searches for an object by a specific key value in an array of objects:
// var fruits = [
//     {id: 1, name: 'Banana', color: 'Yellow'},
//     {id: 2, name: 'Apple', color: 'Red'}
// ]

// searchByName(fruits, 'apple');
// Should return: {id: 2, name: 'Apple', color: 'Red'}

// Also try searchByKey(fruits, 'name', 'apple');

var fruits = [
    {id: 1, name: 'Banana', color: 'Yellow'},
    {id: 2, name: 'Apple', color: 'Red'},
    {id: 3, name: 'Orange', color: 'Orange'},
    {id: 4, name: 'BlueBerry', color: 'Blue'},
    {id: 5, name: 'StrawBerry', color: 'Red'},
    {id: 6, name: 'Grapes', color: 'Purple'},
]

function searchByName(arr, name){
    var result;
    for(let i = 0; i < arr.length; i++ ){
        if( arr[i].name === name ){
            result = arr[i];
            break;
        }
    }
    if(result){
        console.log(result);
    }else{
        console.log("Results not found.");
    }
}

function searchByKey(arr, keyName, value){
    var result;
    for(let i = 0; i < arr.length; i++ ){
        if( arr[i][keyName] === value ){
            result = arr[i];
            break;
        }
    }
    if(result){
        console.log(result);
    }else{
        console.log("Results not found.");
    }
}

console.log("Output for exercise 3:");
searchByName(fruits, "Apple");
searchByKey(fruits, 'color', 'Orange');