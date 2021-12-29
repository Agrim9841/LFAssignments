let imageCount = 6;
let loadedImage = 0;
let preloader = document.querySelector(".preloader");

let birdImage1 = new Image();
let birdImage2 = new Image();
let platformImage = new Image();
let pipeTopImage = new Image();
let pipeBottomImage = new Image();
let backgroundImage = new Image();

birdImage1.src = './assets/Bird1.png';
birdImage1.onload = function(){
    loadedImage += 1;
}

birdImage2.src = './assets/Bird2.png';
birdImage2.onload = function(){
    loadedImage += 1;
}

platformImage.src = './assets/Platform.png';
platformImage.onload = function(){
    loadedImage += 1;
}

pipeTopImage.src = './assets/Pipetop.png';
pipeTopImage.onload = function(){
    loadedImage += 1;
}

pipeBottomImage.src = './assets/Pipebottom.png';
pipeBottomImage.onload = function(){
    loadedImage += 1;
}

backgroundImage.src = './assets/Background.png';
backgroundImage.onload = function(){
    loadedImage += 1;
}

setTimeout(() => {
    let checkPreloader = setInterval(() => {
        if(loadedImage === 6){
            clearInterval(checkPreloader);
            let highscore = localStorage.getItem("highscore");
            if(!highscore){
                localStorage.setItem("highscore", "0");
                document.querySelector(".board-high-score").innerText = "0";
            }else{
                document.querySelector(".board-high-score").innerText = highscore;
            }
            setup();
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
}, 3000);