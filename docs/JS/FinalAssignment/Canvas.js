let tableBorderWidth;
let balls = [];
let gameStates = ["ballInHand","preShoot", "postShoot", "turnCalc"];
let gameState;
let moving;
let start = false;
let players = [];
let firstBreak = true;
let ballsLeft;
let turnDetail = {
    turn: 0,
    firstBallTouched: "",
    pocketedBalls: [],
}

document.onmousedown = function(event) {
    if(event.which === 1){
        mouse.pressed = true;
    }
}

document.onmouseup = function(event) {
    if(mouse.pressed == true){
        if(gameState == gameStates[1]){
            gameState = gameStates[2];
            cue.shoot(stick.power, stick.rotation);
            cue.moving = true;
            stick.pullDistance = 5;
            stick.power = 0;
            moving = true;
        }
        else if(gameState == gameStates[0]){
            let xTempPos = mouse.xPosition;
            let yTempPos = mouse.yPosition;
            let ok = checkCuePlacement(xTempPos, yTempPos);
            if(ok){
                cue.xPosition = xTempPos;
                cue.yPosition = yTempPos;
                cue.xSpeed = 0;
                cue.ySpeed = 0;
                cue.opacity = 1;
                cue.pocketed = false;
                cue.pocketing = false;

                gameState = gameStates[1];
            }
        }
    }
    mouse.pressed = false;
}

document.onmousemove = function(event) {
    mouse.xPosition = event.pageX;
    mouse.yPosition = event.pageY;
}

function checkCuePlacement(xTempPos, yTempPos){
    if((xTempPos < (tableBorderWidth + cue.radius)) || 
    (xTempPos > (table.width - tableBorderWidth - cue.radius)) || 
    (yTempPos < (tableBorderWidth + cue.radius)) || 
    (yTempPos > (table.height - tableBorderWidth - cue.radius))){
        return false;
    }
    for(let i=0; i < balls.length; i++){
        if(balls[i].pocketed || balls[i].pocketing){
            continue;
        }else{
            let dist = calcDistance(balls[i].xPosition, balls[i].yPosition, xTempPos, yTempPos);
            if(dist < (balls[i].radius + cue.radius)){
                return false
            }
        }
    }
    return true;
}

function drawGuide(){
    let tempxPos;
    let tempyPos;
    let reflectedxPos;
    let reflectedyPos;

    let slope = (mouse.yPosition - cue.yPosition) / (mouse.xPosition - cue.xPosition);
    let c = cue.yPosition - (slope * cue.xPosition);
    let reflectedSlope = -slope;
    let reflectedC;

    if((mouse.xPosition - cue.xPosition) > 0){
        tempxPos = table.width - tableBorderWidth - cue.radius;
        tempyPos = (slope * tempxPos) + c;
        if((mouse.yPosition - cue.yPosition) > 0){
            if(tempyPos > table.height - tableBorderWidth -cue.radius ){
                tempyPos = table.height - tableBorderWidth -cue.radius;
                tempxPos = (tempyPos - c) / slope;

                reflectedC = tempyPos - (reflectedSlope * tempxPos);
                reflectedyPos = tempyPos - 40;
                reflectedxPos = (reflectedyPos - reflectedC) / reflectedSlope;
            }else{
                reflectedC = tempyPos - (reflectedSlope * tempxPos);
                reflectedxPos = tempxPos - 40;
                reflectedyPos = (reflectedSlope * reflectedxPos) + reflectedC;
            }
        }else if((mouse.yPosition - cue.yPosition) < 0){
            if(tempyPos < tableBorderWidth + cue.radius ){
                tempyPos = tableBorderWidth + cue.radius;
                tempxPos = (tempyPos - c) / slope;

                reflectedC = tempyPos - (reflectedSlope * tempxPos);
                reflectedyPos = tempyPos + 40;
                reflectedxPos = (reflectedyPos - reflectedC) / reflectedSlope;
            }else{
                reflectedC = tempyPos - (reflectedSlope * tempxPos);
                reflectedxPos = tempxPos - 40;
                reflectedyPos = (reflectedSlope * reflectedxPos) + reflectedC;
            }
        }
    }else if((mouse.xPosition - cue.xPosition) < 0){
        tempxPos = tableBorderWidth + cue.radius;
        tempyPos = (slope * tempxPos) + c;
        if((mouse.yPosition - cue.yPosition) > 0){
            if(tempyPos > table.height - tableBorderWidth -cue.radius ){
                tempyPos = table.height - tableBorderWidth -cue.radius;
                tempxPos = (tempyPos - c) / slope;

                reflectedC = tempyPos - (reflectedSlope * tempxPos);
                reflectedyPos = tempyPos - 40;
                reflectedxPos = (reflectedyPos - reflectedC) / reflectedSlope;
            }else{
                reflectedC = tempyPos - (reflectedSlope * tempxPos);
                reflectedxPos = tempxPos + 40;
                reflectedyPos = (reflectedSlope * reflectedxPos) + reflectedC;
            }
        }else if((mouse.yPosition - cue.yPosition) < 0){
            if(tempyPos < tableBorderWidth + cue.radius ){
                tempyPos = tableBorderWidth + cue.radius;
                tempxPos = (tempyPos - c) / slope;

                reflectedC = tempyPos - (reflectedSlope * tempxPos);
                reflectedyPos = tempyPos + 40;
                reflectedxPos = (reflectedyPos - reflectedC) / reflectedSlope;
            }else{
                reflectedC = tempyPos - (reflectedSlope * tempxPos);
                reflectedxPos = tempxPos + 40;
                reflectedyPos = (reflectedSlope * reflectedxPos) + reflectedC;
            }
        }
    }

    ctx.beginPath();
    ctx.moveTo(cue.xPosition, cue.yPosition);
    ctx.lineTo(tempxPos, tempyPos);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(tempxPos, tempyPos);
    ctx.lineTo(reflectedxPos, reflectedyPos);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(tempxPos, tempyPos, cue.radius, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.arc(mouse.xPosition, mouse.yPosition, cue.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.lineWidth = 1;
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
        if(!ball2.pocketed && !ball2.pocketing){
            if(turnDetail.firstBallTouched == ""){
                let dist = calcDistance(cue.xPosition, cue.yPosition, ball2.xPosition, ball2.yPosition);
                if(dist < (cue.radius + ball2.radius)){
                    turnDetail.firstBallTouched = ball2;
                }
            }
            collisionAlgorithm(cue, ball2);
        }
    }
    for(let i = 0; i < balls.length; i++){
        let ball1 = balls[i];
        if(!ball1.pocketed && !ball1.pocketing){
            for(let j = i + 1; j < balls.length; j++){
                let ball2 = balls[j];
                if(!ball2.pocketed || !ball2.pocketing){
                    collisionAlgorithm(ball1, ball2);
                }
            }
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
    if(!ball1.pocketing && !ball1.pocketed){
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

function loadExistingPlayer(){
    players[0].ball = "";
    players[1].ball = "";
}

function loadPlayer(){
    let player1 = new Player("user", "Player1");
    let player2 = new Player("user", "Player2");
    players.push(player1);
    players.push(player2);
}

function load(){
    table = new Table();
    tableBorderWidth = table.cornorThickness;
    document.querySelector(".turn-info").style.top = `${table.height}px`;
    
    balls = [];
    for(let i = 0; i < 15; i++){
        if(i<7){
            let newBall = new Ball(BALL_POSITIONS[i].xPosition, BALL_POSITIONS[i].yPosition, halfBallImage, "half");
            balls.push(newBall);
        }else if(i==7){
            let newBall = new Ball(BALL_POSITIONS[i].xPosition, BALL_POSITIONS[i].yPosition, blackBallImage, "black");
            balls.push(newBall);
        }else if(i>7){
            let newBall = new Ball(BALL_POSITIONS[i].xPosition, BALL_POSITIONS[i].yPosition, fullBallImage, "full");
            balls.push(newBall);
        }
        
    }
    stick = new Stick();
    ballInHand = new BallInHand();
    cue = new Cue();
    cue.xPosition = table.linePos + table.cornorThickness;
    cue.yPosition = canvas.height / 2;
    gameState = gameStates[1];
    moving = false;
    firstBreak = true;
    if(players[1].justWon){
        turnDetail = {
            turn: 1,
            firstBallTouched: "",
            pocketedBalls: [],
        }
        document.querySelector(".turn-info").innerText = `${players[1].name} Turn, ${players[1].ball}`;
    }else{
        turnDetail = {
            turn: 0,
            firstBallTouched: "",
            pocketedBalls: [],
        }
        document.querySelector(".turn-info").innerText = `${players[0].name} Turn, ${players[0].ball}`;
    }
    
    start = true;
}

function endGame(){
    if(players[turnDetail.turn].ball == ""){
        if(turnDetail.turn == 0){
            players[1].winStreak++;
            players[1].justWon = true;
        }else if(turnDetail.turn == 1){
            players[0].winStreak++;
            players[0].justWon = true;
        }
    }else{
        ballsLeft = 0;
        balls.forEach(ball=>{
            if(ball.type == players[turnDetail.turn].ball){
                if(ball.pocketed == false){
                    ballsLeft++
                }
            }
        });
        if(ballsLeft == 0){
            let cuePocketed = false;
            turnDetail.pocketedBalls.forEach((item)=> {
                if(item.type == "cue"){
                    cuePocketed = true;
                }
            });
            if(cuePocketed){
                if(turnDetail.turn == 0){
                    players[1].winStreak++;
                    players[1].justWon = true;
                }else if(turnDetail.turn == 1){
                    players[0].winStreak++;
                    players[0].justWon = true;
                }
            }else{
                if(turnDetail.turn == 1){
                    players[1].winStreak++;
                    players[1].justWon = true;
                }else if(turnDetail.turn == 0){
                    players[0].winStreak++;
                    players[0].justWon = true;
                }
            }
        }else{
            if(turnDetail.turn == 0){
                players[1].winStreak++;
                players[1].justWon = true;
            }else if(turnDetail.turn == 1){
                players[0].winStreak++;
                players[0].justWon = true;
            }
        }
    }
    start = false;
    document.querySelector(".score1").innerText = players[0].winStreak;
    document.querySelector(".score2").innerText = players[1].winStreak;
    document.querySelector(".scoreboard").style.display = "flex"
}

function animate(){
    if(start){
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
                if(stick.power >= 3300){
                    stick.power = 3300;
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
                    if(item.type == "black"){
                        endGame();
                    }
                });

                let foul = false;

                if(firstBreak == false){
                    if(players[turnDetail.turn].ball != ""){
                        foul = true;
                        for(let i=0; i< turnDetail.pocketedBalls.length;i++){
                            console.log(players[turnDetail.turn].ball, turnDetail.pocketedBalls[i].type);
                            console.log(players[turnDetail.turn].ball== turnDetail.pocketedBalls[i].type);
                            if(players[turnDetail.turn].ball == turnDetail.pocketedBalls[i].type){
                                foul = false;
                                break;
                            }
                        }

                        if(turnDetail.firstBallTouched.type != players[turnDetail.turn].ball){
                            foul = true;
                        }
                    }else{
                        if(turnDetail.firstBallTouched.type == "black" || turnDetail.firstBallTouched == ""){
                            foul = true;
                        }
                    }
                }
                

                turnDetail.pocketedBalls.forEach((item)=> {
                    if(item.type == "cue"){
                        foul = true;
                    }
                });


                if(foul == true){
                    gameState = gameStates[0];
                    if(turnDetail.turn == 0){
                        turnDetail = {
                            turn: 1,
                            firstBallTouched: "",
                            pocketedBalls: [],
                        }
                        document.querySelector(".turn-info").innerText = `${players[1].name} Turn, ${players[1].ball}`;
                    }else if(turnDetail.turn == 1){
                        turnDetail = {
                            turn: 0,
                            firstBallTouched: "",
                            pocketedBalls: [],
                        }
                        document.querySelector(".turn-info").innerText = `${players[0].name} Turn, ${players[0].ball}`;
                    }
                }else{
                    if(firstBreak == false){
                        if(players[turnDetail.turn].ball == ""){
                            if(turnDetail.firstBallTouched.type == turnDetail.pocketedBalls[0].type){

                                //assigning balls
                                if(turnDetail.turn == 0){
                                    if(turnDetail.pocketedBalls[0].type == "half"){
                                        players[0].ball = "half";
                                        players[1].ball = "full";
                                    }else if(turnDetail.pocketedBalls[0].type == "full"){
                                        players[0].ball = "full";
                                        players[1].ball = "half";
                                    }
                                }if(turnDetail.turn == 1){
                                    if(turnDetail.pocketedBalls[0].type == "half"){
                                        players[1].ball = "half";
                                        players[0].ball = "full";
                                    }else if(turnDetail.pocketedBalls[0].type == "full"){
                                        players[1].ball = "full";
                                        players[0].ball = "half";
                                    }
                                }
                                
                            }
                        }
                    }
                    
                    gameState = gameStates[1];
                    if(turnDetail.turn == 1){
                        turnDetail = {
                            turn: 1,
                            firstBallTouched: "",
                            pocketedBalls: [],
                        }
                        document.querySelector(".turn-info").innerText = `${players[1].name} Turn, ${players[1].ball}`;
                    }else if(turnDetail.turn == 0){
                        turnDetail = {
                            turn: 0,
                            firstBallTouched: "",
                            pocketedBalls: [],
                        }
                        document.querySelector(".turn-info").innerText = `${players[0].name} Turn, ${players[0].ball}`;
                    }
                }
                
            }else{
                if(players[turnDetail.turn].ball != ""){
                    console.log(players[turnDetail.turn].ball, turnDetail.firstBallTouched.type)
                    console.log(players[turnDetail.turn].ball== turnDetail.firstBallTouched.type)
                    if(players[turnDetail.turn].ball == turnDetail.firstBallTouched.type){
                        gameState = gameStates[1];
                    }else if(turnDetail.firstBallTouched.type == "black"){
                        ballsLeft = 0;
                        balls.forEach((ball)=>{
                            if(ball.type == players[turnDetail.turn].ball){
                                if(ball.pocketed == false){
                                    ballsLeft++;
                                }
                            }
                        });
                        if(ballsLeft == 0){
                            gameState = gameStates[1];
                        }else{
                            gameState = gameStates[0];
                        }
                    }
                    else{
                        gameState = gameStates[0];
                    }
                }else{
                    if(turnDetail.firstBallTouched.type == "black" || turnDetail.firstBallTouched == ""){
                        gameState = gameStates[0];
                    }else{
                        gameState = gameStates[1];
                    }
                    
                }
                if(turnDetail.turn == 0){
                    turnDetail = {
                        turn: 1,
                        firstBallTouched: "",
                        pocketedBalls: [],
                    }
                    document.querySelector(".turn-info").innerText = `${players[1].name} Turn, ${players[1].ball}`;
                }else if(turnDetail.turn == 1){
                    turnDetail = {
                        turn: 0,
                        firstBallTouched: "",
                        pocketedBalls: [],
                    }
                    document.querySelector(".turn-info").innerText = `${players[0].name} Turn, ${players[0].ball}`;
                }
            }
            if(firstBreak== true){
                firstBreak = false;
            }
        }
        else if(gameState == gameStates[0]){
            ballInHand.update();
            ballInHand.draw();
        }
        
        checkWallCollision();
        checkBallCollision();
        
        if(gameState == gameStates[1]){
            drawGuide();
        }
        if(gameState != gameStates[0]){
            cue.draw();
            cue.update();
        }

        nextFrame();
    }
    
}