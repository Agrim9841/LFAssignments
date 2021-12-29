let imageCount = 8;
let loadedImage = 0;
let preloader = document.querySelector(".preloader");

let carImage1 = new Image();
let carImage2 = new Image();
let carImage3 = new Image();
let carImage4 = new Image();
let carImage5 = new Image();
let carImage6 = new Image();
let roadImage = new Image();
let truckImage = new Image();
let playerImage = new Image();
let bulletImage = new Image();
let explosionImage = new Image();
let carImageList = [];

carImage1.src = './assets/Car1.png';
carImage1.onload = function(){
    loadedImage += 1;
    carImageList.push(carImage1);
}

carImage2.src = './assets/Car2.png';
carImage2.onload = function(){
    loadedImage += 1;
    carImageList.push(carImage2);
}

carImage3.src = './assets/Car3.png';
carImage3.onload = function(){
    loadedImage += 1;
    carImageList.push(carImage3);
}

carImage4.src = './assets/Car4.png';
carImage4.onload = function(){
    loadedImage += 1;
    carImageList.push(carImage4);
}

carImage5.src = './assets/Car5.png';
carImage5.onload = function(){
    loadedImage += 1;
    carImageList.push(carImage5);
}

roadImage.src = './assets/road.png';
roadImage.onload = function(){
    loadedImage += 1;
}

truckImage.src = './assets/Truck.png';
truckImage.onload = function(){
    loadedImage += 1;
    carImageList.push(truckImage);
}

playerImage.src = './assets/Player.png';
playerImage.onload = function(){
    loadedImage += 1;
}

explosionImage.src = './assets/explosion.png';
explosionImage.onload = function(){
    loadedImage += 1;
}

bulletImage.src = './assets/Bullet.png';
bulletImage.onload = function(){
    loadedImage += 1;
}

let puthighscore = localStorage.getItem("highscore");
if(puthighscore){
    document.querySelector(".highscore").innerText = puthighscore;
}

document.querySelector(".reset-score-btn").addEventListener("click", ()=>{
    localStorage.setItem("highscore", "0");
    document.querySelector(".highscore").innerText = "0";
})