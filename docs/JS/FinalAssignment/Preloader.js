let assetsLoadingLeft = 9;

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

let stickImage = new Image();
stickImage.src = "./images/stick.png";
stickImage.onload = function(){
    assetsLoadingLeft--;
}

let checkPreloader = setInterval(() => {
    if(assetsLoadingLeft === 0){
        clearInterval(checkPreloader);
        load();
        animate();
    }
}, 100);