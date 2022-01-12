let preloader = document.querySelector(".preloader");
let assetsLoadingLeft = 13;

let tableImage = new Image();
tableImage.src = "./images/tablecloth.png";
tableImage.onload = function(){
    assetsLoadingLeft--;
}

let tableLeftCornerImage = new Image();
tableLeftCornerImage.src = "./images/tableleftcorner.png";
tableLeftCornerImage.onload = function(){
    assetsLoadingLeft--;
}

let tableRightCornerImage = new Image();
tableRightCornerImage.src = "./images/tablerightcorner.png";
tableRightCornerImage.onload = function(){
    assetsLoadingLeft--;
}

let tableTopCornerImage = new Image();
tableTopCornerImage.src = "./images/tabletopcorner.png";
tableTopCornerImage.onload = function(){
    assetsLoadingLeft--;
}

let tableBottomCornerImage = new Image();
tableBottomCornerImage.src = "./images/tablebottomcorner.png";
tableBottomCornerImage.onload = function(){
    assetsLoadingLeft--;
}

let cornerHoleImage = new Image();
cornerHoleImage.src = "./images/cornerhole.png";
cornerHoleImage.onload = function(){
    assetsLoadingLeft--;
}

let centerHoleImage = new Image();
centerHoleImage.src = "./images/centerhole.png";
centerHoleImage.onload = function(){
    assetsLoadingLeft--;
}

let cueBallImage = new Image();
cueBallImage.src = "./images/white_ball.png";
cueBallImage.onload = function(){
    assetsLoadingLeft--;
}

let blackBallImage = new Image();
blackBallImage.src = "./images/black_ball.png";
blackBallImage.onload = function(){
    assetsLoadingLeft--;
}

let halfBallImage = new Image();
halfBallImage.src = "./images/yellow_ball.png";
halfBallImage.onload = function(){
    assetsLoadingLeft--;
}

let fullBallImage = new Image();
fullBallImage.src = "./images/red_ball.png";
fullBallImage.onload = function(){
    assetsLoadingLeft--;
}

let ballInHandImage = new Image();
ballInHandImage.src = "./images/ball_in_hand.png";
ballInHandImage.onload = function(){
    assetsLoadingLeft--;
}

let stickImage = new Image();
stickImage.src = "./images/stick.png";
stickImage.onload = function(){
    assetsLoadingLeft--;
}

let checkPreloader = setInterval(() => {
    if(assetsLoadingLeft === 0){
        clearInterval(checkPreloader);
        
        document.querySelector(".start-menu").style.display = "flex";

        let count = 100;
        let removePreloader = setInterval(() => {
            if(count <= 0){
                clearInterval(removePreloader);
                preloader.style.display = "none";
            }else{
                count-=2;
                preloader.style.opacity = count + "%";
            }
        }, 10);
    }
}, 100);

document.querySelector("#doublePlayer").addEventListener("click", function(){
    document.querySelector(".start-menu").style.display = "none";
    load2Player();
    load();
    animate();
});

document.querySelector("#singlePlayer").addEventListener("click", function(){
    document.querySelector(".start-menu").style.display = "none";
    load1Player();
    load();
    animate();
});

document.querySelector("#playAgain").addEventListener("click", function(){
    document.querySelector(".scoreboard").style.display = "none";
    loadExistingPlayer();
    load();
    animate();
});

document.querySelector("#menu").addEventListener("click", function(){
    document.querySelector(".scoreboard").style.display = "none";
    document.querySelector(".start-menu").style.display = "flex";
});

document.querySelector("#openInstruction").addEventListener("click", function(){
    document.querySelector(".instructions").style.display = "block";
});

document.querySelector("#closeInstruction").addEventListener("click", function(){
    document.querySelector(".instructions").style.display = "none";
});