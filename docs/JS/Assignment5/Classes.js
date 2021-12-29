let canvas = document.getElementById("canvas1");
const ACCELERATION_DUE_TO_GRAVITY = 9.8;
const PI = Math.PI;

canvas.height = window.innerHeight -25;
canvas.width = window.innerWidth;
// canvas.height = (window.innerHeight -25)>599? (window.innerHeight -25): 600;
// canvas.width = (window.innerWidth -25)>459? (window.innerWidth -25): 460;
canvas.style.backgroundColor = "red";
ctx = canvas.getContext("2d");

function degToRad(angle){
    return (angle * PI)/180;
}

function Player(xPosition, yPosition, length){
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.image1 = birdImage1;
    this.image2 = birdImage2;
    this.length = length;
    this.speed = -8;
    this.rotation = 0;
    this.score = 0;

    this.draw = function(){
        ctx.save();
        ctx.translate(this.xPosition, this.yPosition);
        ctx.rotate(degToRad(this.rotation));
        if(this.speed<0){
            ctx.drawImage(this.image2, -this.length/2, -this.length/2, this.length, this.length);
        }else{
            ctx.drawImage(this.image1, -this.length/2, -this.length/2, this.length, this.length);
        }
        
        ctx.restore();
    }

    this.update = function(){
        this.yPosition += this.speed;
        if(this.speed > 0){
            if(this.rotation < 90){
                this.rotation += 2;
            }
        }else{
            this.rotation = 0;
        }
        this.speed = this.speed + (ACCELERATION_DUE_TO_GRAVITY * 0.05);
    }
}

function BackgroundImage(xPosition, height){
    this.xPosition = xPosition;
    this.yPosition = 0;
    this.image = backgroundImage;
    this.height = height;
    this.width = (this.image.width * this.height) / this.image.height;

    this.draw = function(){
        ctx.save();
        ctx.translate(this.xPosition, this.yPosition);
        ctx.drawImage(this.image, 0, 0, this.width, this.height);        
        ctx.restore();
    }

    this.update = function(){
        this.xPosition -= 0.1;
    }
}

function PlatformImage(xPosition, yPosition, height){
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.image = platformImage;
    this.height = height;
    this.width = (this.image.width * this.height) / this.image.height;

    this.draw = function(){
        ctx.save();
        ctx.translate(this.xPosition, this.yPosition);
        ctx.drawImage(this.image, 0, 0, this.width, this.height);        
        ctx.restore();
    }

    this.update = function(){
        this.xPosition -= 1;
    }
}

function PipeObject(xPosition, yPosition, width, height){
    this.scored = false;
    this.topPipe = {
        xPosition: xPosition,
        yPosition: yPosition - height - 70,
        width: width,
        height: height,
        image: pipeTopImage,
    }
    this.bottomPipe = {
        xPosition: xPosition,
        yPosition: yPosition + 70,
        width: width,
        height: height,
        image: pipeBottomImage,
    }

    this.draw = function(){
        ctx.save();
        ctx.translate(this.topPipe.xPosition, this.topPipe.yPosition);
        ctx.drawImage(this.topPipe.image, 0, 0, this.topPipe.width, this.topPipe.height);        
        ctx.restore();

        ctx.save();
        ctx.translate(this.bottomPipe.xPosition, this.bottomPipe.yPosition);
        ctx.drawImage(this.bottomPipe.image, 0, 0, this.bottomPipe.width, this.bottomPipe.height);        
        ctx.restore();
    }

    this.update = function(){
        this.topPipe.xPosition -= 1;
        this.bottomPipe.xPosition -= 1;
    }
}