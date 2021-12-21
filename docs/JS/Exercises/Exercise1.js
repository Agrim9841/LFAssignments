// Write a function to render the following pattern in the console:
// * * * * *
// * * * *
// * * *
// * * 
// *
// The function needs to take a number as a parameter which represents how many asterisks are rendered on the first row.


function asteriskSlope(num){
    for(let i = num; i > 0; i--){
        let temp = "";
        for (let j = i; j > 0; j--) {
            temp += "*";
        }
        console.log(temp);
    }
}


console.log("Output for exercise 1:");
asteriskSlope(10);