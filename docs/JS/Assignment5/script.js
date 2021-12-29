let player;
let playing = false;
let platformYPos = canvas.height-50;
let backgroundImageList = [];
let pipeList = [];
let platformList = [];

document.querySelector(".start-btn").addEventListener("click", function(){
    playing = true;
    document.querySelector(".menu").style.display = "none";
    animate();
});

window.addEventListener("mousedown", ()=>{
    if(playing === true){
        player.speed = -8;
    }
})

function resetBackground(background){
    let rightmostPos = 0;

    backgroundImageList.forEach(obj=>{
        if(obj.xPosition + obj.width > rightmostPos){
            rightmostPos = obj.xPosition + obj.width;
        }
    });

    background.xPosition = rightmostPos;
}

function resetPlatform(platform){
    let rightmostPos = 0;

    platformList.forEach(obj=>{
        if(obj.xPosition + obj.width > rightmostPos){
            rightmostPos = obj.xPosition + obj.width;
        }
    });

    platform.xPosition = rightmostPos;
}

function generatePipe(){
    let pipeObj = new PipeObject(canvas.width + 100, canvas.height/2, 75, canvas.height / 1.5);

    pipeList.push(pipeObj);
}

function terminate(){
    playing = false;
    setup();
    document.querySelector(".menu").style.display = "flex";
    document.querySelector(".game-over").style.display = "block";
}

function PlayerWallCollisionCheck(){
    if(player.yPosition<0 || player.yPosition +player.length > platformYPos){
        terminate();
    }
}

function setup(){

    let backgroundCovered = 0;
    while(backgroundCovered < 2*canvas.width){
        let backImg = new BackgroundImage(backgroundCovered, canvas.height);
        backgroundCovered += backImg.width;
        backImg.draw();
        backgroundImageList.push(backImg);
    }
    
    let platformCovered = 0;
    while(platformCovered < 2*canvas.width){
        let platformImg = new PlatformImage(platformCovered, platformYPos, canvas.height/10);
        platformCovered += platformImg.width;
        platformImg.draw();
        platformList.push(platformImg);
    }

    generatePipe();

    player = new Player(canvas.width/2, canvas.height/2, 40);
    player.draw();
}

function animate(){
    if(playing === true){

        backgroundImageList.forEach((imgObj)=>{
            imgObj.update();
            if(imgObj.xPosition + imgObj.width < 0){
                resetBackground(imgObj);
            }
            imgObj.draw();
        });

        pipeList.forEach((imgObj)=>{
            imgObj.update();
            imgObj.draw();
        })

        platformList.forEach((imgObj)=>{
            imgObj.update();
            if(imgObj.xPosition + imgObj.width < 0){
                resetPlatform(imgObj);
            }
            imgObj.draw();
        });

        player.update();
        player.draw();

        PlayerWallCollisionCheck();

        requestAnimationFrame(animate);
    }
}