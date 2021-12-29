let canvas = document.getElementById("canvas1");

canvas.height = window.innerHeight;
canvas.width = 500;
ctx = canvas.getContext("2d");

let player1 = new Player(1, canvas.width, canvas.height, playerImage);
let carList = [];
let speed = 1;
let laneImgList = [];
let carGenerationInterval = 0;
let bulletList = [];
let bulletCount = 0;
let bulletAddCounter = 0;
let collided = { 
    state: false,
    object: null,
}

setInterval(() => {
    if(speed <= 3){
        speed += 0.1;
    }
}, 5000);

window.addEventListener('keydown', function(event){
    if(event.code === "KeyA" || event.code === "ArrowLeft"){
        player1.moveLeft();
    }else if(event.code === "KeyD" || event.code === "ArrowRight"){
        player1.moveRight();
    }else if(event.code === "KeyJ"){
        generateBullet();
    }
});

for(let imageCount = 0; imageCount < 3; imageCount++){
    let laneImg = new BackgroundImage(canvas.width, roadImage)
    laneImgList.push(laneImg);
}

function generateCar(){
    filterCarList();

    let filledPos = [];
    let numberOfCar = Math.round(Math.random()) + 1;
    
    for(let i=0; i<numberOfCar; i++){
        let pos;
        let generateCarPos =true;
        while(generateCarPos){
            pos = Math.round(Math.random() * 2);
            if(!filledPos.includes(pos)){
                filledPos.push(pos);
                generateCarPos = false;
            }
        }
        let carImg = Math.round(Math.random() * (carImageList.length-1));
        let car= new Car(pos, canvas.width, carImageList[carImg]);
        carList.push(car);
    }
}

function generateBullet(){
    if(bulletCount>0){
        let bulletItem = new Bullet(player1.xPosition, player1.yPosition, canvas.width/15, canvas.width/15+5);
        bulletList.push(bulletItem);
        bulletCount --;
        document.querySelector(".bullet-count").innerText = bulletCount;
    }
}

function checkBulletCount(){
    if(bulletAddCounter >= 10 && bulletCount<10){
        bulletCount++;
        document.querySelector(".bullet-count").innerText = bulletCount;
        bulletAddCounter = 0;
    }
}

function checkCollision(car, player){
    if (car.xPosition < player.xPosition + player.width &&
    car.xPosition + car.width > player.xPosition &&
    car.yPosition < player.yPosition + player.height &&
    car.height + car.yPosition > player.yPosition) {
        collided.state = true;
        collided.object = car;
    }
}

function checkBulletCollision(car, bullet){
    if (car.xPosition < bullet.xPosition + bullet.width &&
    car.xPosition + car.width > bullet.xPosition &&
    car.yPosition < bullet.yPosition + bullet.height &&
    car.height + car.yPosition > bullet.yPosition) {
        carList = carList.filter((carItem)=> {
            if(carItem != car){
                return carItem;
            }
        });
        bulletList = bulletList.filter((bulletItem)=>{
            if(bulletItem != bullet){
                return bulletItem;
            }
        })
    }
}

function bulletOutOfScreen(bullet){
    if((bullet.y + bullet.height/2) < 0){
        bulletList.filter(bulletItem =>{
            if(bulletItem != bullet){
                return bulletItem;
            }
        })
    }
}

function updateHighScore(){
    let highscore = localStorage.getItem("highscore");
    if(highscore){
        if(parseInt(highscore) < player1.score){
            localStorage.setItem("highscore", player1.score);
            document.querySelector(".highscore").innerText = player1.score;
        }
    }else{
        localStorage.setItem("highscore", player1.score);
        document.querySelector(".highscore").innerText = player1.score;
    }
}

function filterCarList(){
    carList = carList.filter(car => {
        if(car.yPosition < (canvas.height + car.height)){
            return car;
        }
    });
}

function drawLane(){
    let top = 0;
    laneImgList.forEach(laneImg=>{
        if(laneImg.yPosition < top){
            top = laneImg.yPosition;
        }
        ctx.save();
        ctx.translate(0, laneImg.yPosition);
        ctx.drawImage(laneImg.image, 0 , 0, laneImg.width, laneImg.height);
        ctx.restore();
        laneImg.update(speed);
    });

    laneImgList.forEach(laneImg=>{
        if(laneImg.yPosition > canvas.height){
            laneImg.yPosition = top - laneImg.height;
        }
    });
}

function setUp(){
    player1.reset();
    document.querySelector(".score").innerText = "0";
        document.querySelector(".bullet-count").innerText = "0";
    carGenerationInterval = 0;
    collided = { 
        state: false,
        object: null,
    }
    carList = [];
    bulletList = [];
    bulletCount = 0;
    speed = 1;
    let laneDrawingPosition = canvas.height;
    for(let laneCount = 0; laneCount < laneImgList.length; laneCount++){
        laneDrawingPosition -= laneImgList[laneCount].height;
        ctx.save();
        laneImgList[laneCount].yPosition = laneDrawingPosition;
        ctx.translate(0, laneImgList[laneCount].yPosition);
        ctx.drawImage(laneImgList[laneCount].image, 0 , 0, laneImgList[laneCount].width, laneImgList[laneCount].height);
        ctx.restore();
    }
    drawLane();
    ctx.save();
    ctx.translate(player1.xPosition, player1.yPosition);
    ctx.drawImage(player1.image, -player1.width/2, -player1.height/2, player1.width, player1.height);
    ctx.restore();

    ctx.fillStyle = "green";
    ctx.textAlign = "center";
    ctx.font = "30px Comic Sans MS";
    ctx.fillText("Press Start Game to Play", canvas.width/2, canvas.height/2 - 50);
}

document.querySelector('.start-btn').addEventListener("click", ()=>{
    setUp();
    animate();
    document.querySelector('.start-btn').style.display = "none";
})


function animate(){
    carGenerationInterval += (1*speed);
    if(carGenerationInterval >= 400){
        generateCar();
        carGenerationInterval = 0;
    }
    
    drawLane();
    checkBulletCount();

    carList.forEach((car)=> {
        car.update(speed);

        ctx.save();
        ctx.translate(car.xPosition, car.yPosition);
        ctx.drawImage(car.image, -car.width/2, -car.height/2, car.width, car.height);
        ctx.restore();

        if( car.yPosition > player1.yPosition && car.scored === false){
            car.scored = true;
            player1.score++;
            bulletAddCounter++;
            document.querySelector(".score").innerText = player1.score;
        }
        checkCollision(car, player1);
    });

    bulletList.forEach(bullet => {
        bullet.update();

        ctx.save();
        ctx.translate(bullet.xPosition, bullet.yPosition);
        ctx.drawImage(bullet.image, -bullet.width/2, -bullet.height/2, bullet.width, bullet.height);
        ctx.restore();

        bulletOutOfScreen(bullet);
        carList.forEach(car => {
            checkBulletCollision(car, bullet);
        });
    });

    player1.update(speed);

    ctx.save();
    ctx.translate(player1.xPosition, player1.yPosition);
    ctx.drawImage(player1.image, -player1.width/2, -player1.height/2, player1.width, player1.height);
    ctx.restore();
    
    if(collided.state === false){
        requestAnimationFrame(animate);
    }else{
        ctx.save();
        let collisionXPos = ( player1.xPosition + collided.object.xPosition ) / 2;
        let collisionYPos = ( player1.yPosition + collided.object.yPosition ) / 2;
        let collisionWidth = canvas.width / 10;
        ctx.translate(collisionXPos, collisionYPos);
        ctx.drawImage(explosionImage, -collisionWidth/2, -collisionWidth/2, collisionWidth, collisionWidth);
        ctx.restore();
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.font = "40px Comic Sans MS";
        ctx.fillText("Game Over", canvas.width/2, canvas.height/2 - 50); 
        ctx.font = "30px Comic Sans MS";
        ctx.fillText("Press Start to play again", canvas.width/2, canvas.height/2);
        updateHighScore();
        document.querySelector('.start-btn').style.display = "block";
    }
}

setTimeout(() => {
    let checkPreloader = setInterval(() => {
        if(loadedImage === 10){
            clearInterval(checkPreloader);
            let count = 100;
            let removePreloader = setInterval(() => {
                if(count <= 0){
                    clearInterval(removePreloader);
                    preloader.style.display = "none";
                    setUp();
                }else{
                    count-=2;
                    preloader.style.opacity = count + "%";
                }
            }, 10);
        }
    }, 100);
}, 3000);