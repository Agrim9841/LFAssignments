let tableBorderWidth;
let balls = [];
let gameStates = ["ballInHand","preShoot", "postShoot", "turnCalc"];
let gameState;
let moving;
let turnDetail = {
    firstBallTouched: "",
    pocketedBalls: [],
}

document.onmousedown = function(event) {
    if(event.which === 1){
        mouse.pressed = true;
    }
}

document.onmouseup = function(event) {
    mouse.pressed = false;
    if(gameState == gameStates[1]){
        gameState = gameStates[2];
        cue.shoot(stick.power, stick.rotation);
        cue.moving = true;
        stick.pullDistance = 5;
        stick.power = 0;
        moving = true;
    }
}

document.onmousemove = function(event) {
    mouse.xPosition = event.pageX;
    mouse.yPosition = event.pageY;
}

function collisionAlgorithm(ball1, ball2){
    let dist = calcDistance(ball1.xPosition, ball1.yPosition, ball2.xPosition, ball2.yPosition);     
    if(dist < (ball1.radius + ball2.radius)){

        // find minimun translation distance
        let mtdx = ((ball1.xPosition - ball2.xPosition) * (ball1.radius * 2 - dist))/dist;
        let mtdy = ((ball1.yPosition - ball2.yPosition) * (ball1.radius * 2 - dist))/dist;

        // pull or push ball positions
        ball1.xPosition = ball1.xPosition + (mtdx/2);
        ball1.yPosition = ball1.yPosition + (mtdy/2);
        
        ball2.xPosition = ball2.xPosition - (mtdx/2);
        ball2.yPosition = ball2.yPosition - (mtdy/2);

        // unit normal vector
        let xNormal = (ball2.xPosition - ball1.xPosition) / dist;
        let yNormal = (ball2.yPosition - ball1.yPosition) / dist;

        // unit tangent vector
        let xTangent = -yNormal;
        let yTangent = xNormal;

        // project velocities onto unit normal and unit tangent vectors
        let v1Normal = xNormal * ball1.xSpeed + yNormal * ball1.ySpeed;
        let v1Tangent = xTangent * ball1.xSpeed + yTangent * ball1.ySpeed;

        let v2Normal = xNormal * ball2.xSpeed + yNormal * ball2.ySpeed;
        let v2Tangent = xTangent * ball2.xSpeed + yTangent * ball2.ySpeed;


        // new normal velocities
        let v1NTag = v2Normal;
        let v2NTag = v1Normal;

        //convert the scalar normal and tangential velocity into vectors
        let xV1NTag = xNormal * v1NTag;
        let yV1NTag = yNormal * v1NTag;
        
        let xV1TTag = xTangent * v1Tangent;
        let yV1TTag = yTangent * v1Tangent;
        
        let xV2NTag = xNormal * v2NTag;
        let yV2NTag = yNormal * v2NTag;
        
        let xV2TTag = xTangent * v2Tangent;
        let yV2TTag = yTangent * v2Tangent;

        // update velocities
        ball1.xSpeed = xV1TTag + xV1NTag;
        ball1.ySpeed = yV1TTag + yV1NTag;
        while(Math.abs(ball1.xSpeed) > 30 || Math.abs(ball1.ySpeed) > 30){
            ball1.xSpeed = ball1.xSpeed * (0.98 ** 3);
            ball1.ySpeed = ball1.ySpeed * (0.98 ** 3);
        }
        
        ball2.xSpeed = xV2TTag + xV2NTag;
        ball2.ySpeed = yV2TTag + yV2NTag;
        while(Math.abs(ball2.xSpeed) > 30 || Math.abs(ball2.ySpeed) > 30){
            ball2.xSpeed = ball2.xSpeed * (0.98 ** 3);
            ball2.ySpeed = ball2.ySpeed * (0.98 ** 3);
        }

        ball1.moving = true;
        ball2.moving = true;
    }
}

function checkBallCollision(){

    for(let j = 0; j < balls.length; j++){
        let ball2 = balls[j];
        collisionAlgorithm(cue, ball2);
    }
    for(let i = 0; i < balls.length; i++){
        let ball1 = balls[i];
        for(let j = i + 1; j < balls.length; j++){
            let ball2 = balls[j];
            collisionAlgorithm(ball1, ball2);
        }
    }

}

function checkWallCollision(){
    if(!cue.pocketing || !cue.pocketed){
        if(cue.xPosition < (tableBorderWidth + cue.radius)){
            cue.xPosition = tableBorderWidth + cue.radius;
            cue.xSpeed = -cue.xSpeed;
            cue.xSpeed = cue.xSpeed * (0.98 ** 3);
            cue.ySpeed = cue.ySpeed * (0.98 ** 3);
        }if(cue.xPosition > (table.width - tableBorderWidth - cue.radius)){
            cue.xPosition = table.width - tableBorderWidth - cue.radius;
            cue.xSpeed = -cue.xSpeed;
            cue.xSpeed = cue.xSpeed * (0.98 ** 3);
            cue.ySpeed = cue.ySpeed * (0.98 ** 3);
        }if(cue.yPosition < (tableBorderWidth + cue.radius)){
            cue.yPosition = tableBorderWidth + cue.radius;
            cue.ySpeed = -cue.ySpeed;
            cue.xSpeed = cue.xSpeed * (0.98 ** 3);
            cue.ySpeed = cue.ySpeed * (0.98 ** 3);
        }if(cue.yPosition > (table.height - tableBorderWidth - cue.radius)){
            cue.yPosition = table.height - tableBorderWidth - cue.radius;
            cue.ySpeed = -cue.ySpeed;
            cue.xSpeed = cue.xSpeed * (0.98 ** 3);
            cue.ySpeed = cue.ySpeed * (0.98 ** 3);
        }
    }
    for(let i=0; i < balls.length; i++){
        if(!balls[i].pocketing || !balls[i].pocketed){
            if(balls[i].xPosition < (tableBorderWidth + balls[i].radius)){
                balls[i].xPosition = tableBorderWidth + balls[i].radius;
                balls[i].xSpeed = -balls[i].xSpeed;
                balls[i].xSpeed = balls[i].xSpeed * (0.98 ** 3);
                balls[i].ySpeed = balls[i].ySpeed * (0.98 ** 3);
            }if(balls[i].xPosition > (table.width - tableBorderWidth - balls[i].radius)){
                balls[i].xPosition = table.width - tableBorderWidth - balls[i].radius;
                balls[i].xSpeed = -balls[i].xSpeed;
                balls[i].xSpeed = balls[i].xSpeed * (0.98 ** 3);
                balls[i].ySpeed = balls[i].ySpeed * (0.98 ** 3);
            }if(balls[i].yPosition < (tableBorderWidth + balls[i].radius)){
                balls[i].yPosition = tableBorderWidth + balls[i].radius;
                balls[i].ySpeed = -balls[i].ySpeed;
                balls[i].xSpeed = balls[i].xSpeed * (0.98 ** 3);
                balls[i].ySpeed = balls[i].ySpeed * (0.98 ** 3);
            }if(balls[i].yPosition > (table.height - tableBorderWidth - balls[i].radius)){
                balls[i].yPosition = table.height - tableBorderWidth - balls[i].radius;
                balls[i].ySpeed = -balls[i].ySpeed;
                balls[i].xSpeed = balls[i].xSpeed * (0.98 ** 3);
                balls[i].ySpeed = balls[i].ySpeed * (0.98 ** 3);
            }
        }
    }
    
}

function checkMoving(){
    moving = false;
    if(cue.moving === true){
        moving = true;
    }
    for(i = 0; i < balls.length; i++){
        if(balls[i].moving === true){
            moving = true;
            break;
        }
    }
}

function pocketingAlgorithm(ball1){
    if(!ball1.pocketing || !ball1.pocketed){
        table.pockets.forEach(pocket => {
            let distance = calcDistance(ball1.xPosition, ball1.yPosition, pocket.xPosition, pocket.yPosition);
            if(distance < (pocket.radius)){
                turnDetail.pocketedBalls.push(ball1);
                ball1.pocketing = true;
                ball1.xPosition = pocket.xPosition;
                ball1.yPosition = pocket.yPosition;
                ball1.xSpeed = 0;
                ball1.ySpeed = 0;
            }
        });
    }
}

function checkBallPocketing(){
    pocketingAlgorithm(cue);
    
    for(let i = 0; i < balls.length; i++){
        pocketingAlgorithm(balls[i]);
    }
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function nextFrame(){
    requestAnimationFrame(animate);
}

function load(){
    table = new Table();
    tableBorderWidth = table.cornorThickness;
    
    balls = [];
    for(let i = 0; i < 15; i++){
        if(i<8){
            let newBall = new Ball(BALL_POSITIONS[i].xPosition, BALL_POSITIONS[i].yPosition, cueBallImage, "half");
            balls.push(newBall);
        }else if(i==8){
            let newBall = new Ball(BALL_POSITIONS[i].xPosition, BALL_POSITIONS[i].yPosition, cueBallImage, "half");
            balls.push(newBall);
        }else if(i>8){
            let newBall = new Ball(BALL_POSITIONS[i].xPosition, BALL_POSITIONS[i].yPosition, cueBallImage, "half");
            balls.push(newBall);
        }
        
    }
    stick = new Stick();
    cue = new Cue();
    cue.xPosition = table.linePos + table.cornorThickness;
    cue.yPosition = canvas.height / 2;
    gameState = gameStates[1];
    moving = false;
    turnDetail = {
        firstBallTouched: "",
        pocketedBalls: [],
    }
}

function animate(){
    clearCanvas();
    table.draw();

    balls.forEach(ball => {
        if(!ball.pocketed){
            ball.draw();
            ball.update();
        }
    });
    
    if(gameState == gameStates[1]){

        stick.update();
        if(mouse.pressed === true){
            if(stick.power >= 2900){
                stick.power = 2900;
            }else{
                stick.pullDistance++;
                stick.power += 50;
            }
        }
        stick.draw(cue.xPosition, cue.yPosition, cue.radius);
    }
    else if(gameState == gameStates[2]){
        checkBallPocketing();
        
        checkMoving();
        if(moving === false){
            gameState = gameStates[3];
        }

    }
    else if(gameState == gameStates[3]){
        if(turnDetail.pocketedBalls.length > 0){
            turnDetail.pocketedBalls.forEach((item)=> {
                if(item.type == "cue"){
                    gameState = gameStates[0];
                }
            })
        }else{
            gameState = gameStates[1];
        }
        turnDetail = {
            firstBallTouched: "",
            pocketedBalls: [],
        }
    }
    else if(gameState == gameStates[0]){
        cue.xPosition = table.linePos + table.cornorThickness;
        cue.yPosition = table.height / 2;
        cue.opacity = 1;
        cue.pocketed = false;
        cue.pocketing = false;

        gameState = gameStates[1];
    }
    
    checkWallCollision();
    checkBallCollision();
    cue.draw();
    cue.update();

    nextFrame();
}