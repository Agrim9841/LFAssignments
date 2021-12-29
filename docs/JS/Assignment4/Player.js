

function Player(lanePosition, screenWidth, screenHeight, playerImage,) {
    let positions = [screenWidth / 6, (screenWidth / 6) * 3, (screenWidth / 6) * 5 ];
    this.lanePosition = lanePosition;
    this.width = screenWidth / 3 - 100;
    this.height = playerImage.height * this.width / playerImage.width;
    this.xPosition = positions[this.lanePosition];
    this.yPosition =  screenHeight - this.height /2 -20;
    this.image = playerImage;
    this.score = 0;

    this.reset = function(){
        this.score = 0;
        this.lanePosition = 1;
        this.xPosition = positions[this.lanePosition];
    }

    this.update = function(speed){
        let diff = Math.abs(this.xPosition - positions[this.lanePosition]);
        if(diff <= 5){
            this.xPosition = positions[this.lanePosition];
        }
        if(this.xPosition < positions[this.lanePosition]){
            this.xPosition += (2 * speed);
        }else if(this.xPosition > positions[this.lanePosition]){
            this.xPosition -= (2 * speed);
        }
    }

    this.moveRight = function(){
        if(this.lanePosition < 2){
            this.lanePosition ++;
        }
    }

    this.moveLeft = function(){
        if(this.lanePosition > 0){
            this.lanePosition --;
        }
    }
}

function Car(lanePosition, screenWidth, carImage){
    let positions = [screenWidth / 6, (screenWidth / 6) * 3, (screenWidth / 6) * 5 ];
    this.lanePosition = lanePosition;
    this.width = screenWidth / 3 - 100;
    this.height = carImage.height * this.width / carImage.width;
    this.xPosition = positions[this.lanePosition];
    this.yPosition =  -100;
    this.image = carImage;
    this.scored = false;

    this.update = function(speed){
        this.yPosition += (2 * speed);
    }
}

function BackgroundImage(screenWidth, laneImage){
    this.width = screenWidth;
    this.height = laneImage.height * this.width / laneImage.width;
    this.xPosition = 0;
    this.yPosition = 0;
    this.image = laneImage;

    this.update = function(speed){
        this.yPosition += (4 * speed);
    }
}

function Bullet(xPosition, yPosition, width, height){
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.width = width;
    this.height = height;
    this.image = bulletImage;

    this.update = function(){
        this.yPosition -= 5;
    }
}