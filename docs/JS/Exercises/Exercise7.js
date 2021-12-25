// Render a scatter plot based on an array of coordinates. Create the container for the plot and create each point using javascript.
var points = [
    {x: 10, y: 20},
    {x: 40, y: 40},
    {x: 60, y: 20},
    {x: 80, y: 50},
];

const enlarge = (num) => {
    return num * 5;
}

let box = document.getElementById("box");
let boxWidth = boxHeight = 100;
box.style.height = enlarge(boxHeight) + "px";
box.style.width = enlarge(boxWidth) + "px";
box.style.border = "1px solid black";
box.style.position = "relative";


points.forEach((point, index)=>{

    var dot = document.createElement("div");
    var dotDiameter = 10;
    dot.style.height = dotDiameter+"px";
    dot.style.width = dotDiameter+"px";
    dot.style.backgroundColor = "red";
    dot.style.borderRadius = "100%";
    dot.style.position = "absolute";
    dot.style.bottom = enlarge(point.y)+"px";
    dot.style.left = enlarge(point.x)+"px";
    dot.style.transform = "translate(-50%, 50%)";
    dot.setAttribute("id", "point"+(index+1));


    dot.addEventListener("mouseover", ()=>{
        var x = 0;
        var diameter = dotDiameter;
        var enlarge = setInterval(() => {
            if(x===10 || diameter>(dotDiameter+10)){
                clearInterval(enlarge);
            }else{
                diameter += 1;
                dot.style.height = diameter+"px";
                dot.style.width = diameter+"px";
                x++;
            } 
        }, 10);
    });

    dot.addEventListener("mouseout", ()=>{
        var x = 0;
        var diameter = dotDiameter+10;
        var enlarge = setInterval(() => {
            if(x===10 || diameter<dotDiameter){
                clearInterval(enlarge);
            }else{
                diameter -= 1;
                dot.style.height = diameter+"px";
                dot.style.width = diameter+"px";
                x++;
            } 
        }, 10);
    });

    dot.addEventListener("click", ()=>{
        var charList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

        var getRandom = (num)=>{
            return Math.floor(Math.random()*num);
        }
        
        var colorCode = "#" + charList[getRandom(16)]+ charList[getRandom(16)]+ charList[getRandom(16)]+ charList[getRandom(16)]+ charList[getRandom(16)]+ charList[getRandom(16)];
        dot.style.backgroundColor = colorCode;
    })

    box.appendChild(dot);
})