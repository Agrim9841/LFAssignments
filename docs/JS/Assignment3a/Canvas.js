const CANVAS_HEIGHT = 800;
const CANVAS_WIDTH = 1200;

let canvas = document.getElementById("canvas1");
let ballCount = 500;
let ballList = [];
let literalList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c'
            , 'd', 'e', 'f'];
let directions = [-1, 1]

canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;

// function to generate random color
function randomColor(){
    let color = "#";
    for(let i=0; i < 6; i++){
        color += literalList[Math.floor(Math.random()*(literalList.length-1))];
    }
    return color;
}

// generating balls
for(let i = 0; i < ballCount; i++){
    let creatingBall = true;
    let radius = Math.floor((Math.random()*5)+5);
    let angle = (Math.random() * 90 * Math.PI) / 180;
    let speed = (Math.random())+0.5;
    let xdirection = Math.random() > 0.5? -1 : 1;
    let ydirection = Math.random() > 0.5? -1 : 1;
    let x;
    let y;

    while(creatingBall){
        let i = 0;
        x = Math.floor((Math.random() * (CANVAS_WIDTH - (2 * radius))) );
        y = Math.floor((Math.random() * (CANVAS_HEIGHT - (2 * radius))) );
    
        for (let ball of ballList){
            let distance = Math.sqrt((((ball.x + ball.r)-(x + radius))**2) + (((ball.y + ball.r)-(y + radius))**2))
            if(distance <= (radius+ ball.r)){
                break;
            }
            ++i;
        }
        if(i == ballList.length){
            creatingBall = false;
        }
    }

    let ball = new Ball(x, y, radius, randomColor(), angle, speed, xdirection, ydirection);
    ballList.push(ball);
}

// function to check for collision with wall
function checkWallCollision(ball){
    
    if(ball.x <= 0){
        ball.x = 0;
        ball.xDirection = 1;
    }else if((ball.x + 2 * ball.r) >= CANVAS_WIDTH){
        ball.xDirection = -1;
        ball.x = (CANVAS_WIDTH - 2 * ball.r);
    }

    if(ball.y <= 0){
        ball.y = 0;
        ball.yDirection = 1;
    }else if((ball.y + 2 * ball.r) >= CANVAS_HEIGHT){
        ball.yDirection = -1;
        ball.y = (CANVAS_HEIGHT - ball.r * 2);
    }

}

// function to check collision with each other
function checkBallCollision(ball){
    let i = 0;
    for(i = 0; i < ballList.length; i++){
        if(ballList[i] == ball){
            continue;
        }else{
            let distance = Math.sqrt((((ball.x + ball.r)-(ballList[i].x + ballList[i].r))**2) + (((ball.y + ball.r)-(ballList[i].y + ballList[i].r))**2));
            if(distance <= (ball.r + ballList[i].r)){
                handleCollision(ball, ballList[i], distance);
            }
        }
    }
}

function handleCollision(ball1, ball2, distance){
    let newAngle = Math.atan(Math.abs(ball1.y - ball2.y)/ Math.abs(ball1.x - ball2.x));
    ball1.angle = newAngle;
    ball2.angle = newAngle;

    var temp = ball1.xDirection;
    ball1.xDirection = ball2.xDirection;
    ball2.xDirection = temp;
    
    temp = ball1.yDirection;
    ball1.yDirection = ball2.yDirection;
    ball2.yDirection = temp;

    if(ball1.xDirection == ball2.xDirection && ball1.yDirection ==ball2.yDirection){
        let random = Math.round(Math.random());
        if(random){
            if(ball2.xDirection < 1){
                ball2.xDirection = 1;
            }else{
                ball2.xDirection = -1;
            }
        }else{
            if(ball2.yDirection < 1){
                ball2.yDirection = 1;
            }else{
                ball2.yDirection = -1;
            }
        }
    }

    temp = ball1.speed;
    ball1.speed = ball2.speed;
    ball2.speed = temp;
    if(distance - (ball1.r + ball2.r) < 0){
        let nudge = Math.abs((ball1.r + ball2.r) - distance)/2;
        if(ball1.xDirection > 0){
            ball1.x += (Math.sin(ball1.angle) * nudge);
        }else{
            ball1.x -= (Math.sin(ball1.angle) * nudge);
        }

        if(ball1.yDirection > 0){
            ball1.y += (Math.cos(ball1.angle) * nudge);
        }else{
            ball1.y -= (Math.cos(ball1.angle) * nudge);
        }
        if(ball2.xDirection > 0){
            ball2.x += (Math.sin(ball2.angle) * nudge);
        }else{
            ball2.x -= (Math.sin(ball2.angle) * nudge);
        }

        if(ball2.yDirection > 0){
            ball2.y += (Math.cos(ball2.angle) * nudge);
        }else{
            ball2.y -= (Math.cos(ball2.angle) * nudge);
        }
    }
    
}

let ctx = canvas.getContext("2d");

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ballList.forEach(ball => {

        
        ctx.beginPath();
        ctx.fillStyle = ball.color;
        ctx.arc(ball.x + ball.r, ball.y + ball.r, ball.r, 0, 2*Math.PI);
        ctx.fill();
        
        if(ball.xDirection > 0){
            ball.x += (Math.sin(ball.angle) * ball.speed);
        }else{
            ball.x -= (Math.sin(ball.angle) * ball.speed);
        }

        if(ball.yDirection > 0){
            ball.y += (Math.cos(ball.angle) * ball.speed);
        }else{
            ball.y -= (Math.cos(ball.angle) * ball.speed);
        }

        checkBallCollision(ball);
        checkWallCollision(ball);
        
    })
}

animate();
