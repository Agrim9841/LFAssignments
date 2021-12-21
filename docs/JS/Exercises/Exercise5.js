// Write a program to sort an array of object by a target key. 
// The original array should remain unchanged.
var arr = [{
    id: 1,
    name: 'John',
}, {
    id: 2,
    name: 'Mary',
}, {
    id: 3,
    name: 'Andrew',
}, {
    id: 4,
    name: 'Santa',
}, {
    id: 5,
    name: 'Ganesh',
}];

function sortBy(array, key) {
    var sortedArray = [];
    sortedArray.push(array[0]);

    for(let i = 1; i < array.length; i++ ){
        let temp = array[i][key];
        var j=0;
        for(j = 0; j < sortedArray.length; j++){
            if(temp < sortedArray[j][key]){
                sortedArray.splice(j, 0, array[i]);
                break;
            }
        }
        if(j== sortedArray.length){
            sortedArray.push(array[i]);
        }
    }

    return sortedArray;
}

console.log("Output for exercise 5:");
var sorted = sortBy(arr, 'name');
console.log(sorted);
