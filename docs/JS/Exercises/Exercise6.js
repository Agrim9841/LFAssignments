// Write a program to normalize a given input to get the expected output.

// From this
var input = {
  '1': {
    id: 1,
    name: 'John',
    children: [
      { id: 2, name: 'Sally' },
      { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
    ]
  },
  '5': {
    id: 5,
    name: 'Mike',
    children: [{ id: 6, name: 'Peter' }]
  }
};

// To this
// var output = {
//   '1': { id: 1, name: 'John', children: [2, 3] },
//   '2': { id: 2, name: 'Sally' },
//   '3': { id: 3, name: 'Mark', children: [4] },
//   '4': { id: 4, name: 'Harry' },
//   '5': { id: 5, name: 'Mike', children: [6] },
//   '6': { id: 6, name: 'Peter' }
// };

function normalize(obj){
    var newObj = {};

    Object.keys(obj).forEach(function(key) {

        function change(existingObject, oldObject){

            // Array to replace the children values
            var newArr = [];

            //check if they have any children
            if(oldObject.children){

                //iteraing through each children
                oldObject.children.forEach((value)=>{

                    // pushing the id of the children into array
                    newArr.push(value.id);

                    // checking if the children has their own children
                    existingObject = change(existingObject, value);
                })
            }

            // adding key and value to the existing object
            existingObject[oldObject.id] = oldObject;

            // replacing the children array
            if(newArr.length != 0){
                existingObject[oldObject.id].children = newArr;
            }
            
            // return
            return existingObject;
        }

        if(obj[key].children){
            newObj = change(newObj, obj[key]);
        }
    });

    return newObj;
}

console.log("Output for exercise 6:");
var output = normalize(input);
console.log(output);