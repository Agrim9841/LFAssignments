// Render a circle that moves vertically and bounces back into another direction.

const box = document.getElementById("box");

let boxHeight = boxWidth = 500;
box.innerHTML = "";
box.style.border = "1px solid black";
box.style.height = boxHeight + "px";
box.style.width = boxWidth + "px";
box.style.position = "relative";

let ball = document.createElement("div");
let ballDiameter = 75;
ball.setAttribute("id", "ball");
ball.style.height = ballDiameter+"px";
ball.style.width = ballDiameter+"px";
ball.style.borderRadius = "100%";
ball.style.backgroundColor = "teal";
ball.style.position = "absolute";
ball.style.left = "45%";

box.appendChild(ball);

let topPos = 0;
let goDown = true;
let finalPos = boxHeight-ballDiameter;
let frameRefreshRate = 10;
let timeTaken = 1000;
let distaceCovered = finalPos/(timeTaken/frameRefreshRate);

ball.style.top = topPos+"px";
setInterval(() => {
    if(goDown){
        topPos+= distaceCovered;
        ball.style.top = topPos+"px";
        if(topPos >= finalPos){
            goDown = false;
        }
    }else{
        topPos-= distaceCovered;
        ball.style.top = topPos+"px";
        if(topPos <= 0){
            goDown = true;
        }
    }
}, frameRefreshRate);
