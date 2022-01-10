function Cue(){
    this.xPosition = 200;
    this.yPosition = 100;
    this.radius = (BALL_RADIUS * canvas.width) / TABLE_WIDTH;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.moving = false;
    this.pocketing = false;
    this.pocketed = false;
    this.opacity = 1;
    this.type = "cue";

    this.draw = function(){
        ctx.save();
        ctx.translate(this.xPosition, this.yPosition);
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(cueBallImage, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
        ctx.restore();
    }

    this.update = function(){
        if(this.pocketed){
            cue.moving = false;
            cue.pocketin = false;
        }else if(this.pocketing){
            if(this.opacity <= 0){
                this.opacity = 0;
                this.pocketed = true;
                this.moving = false;
                this.pocketin = false;
            }else{
                this.opacity -= 0.05;
            }
        }else{
            this.xPosition += this.xSpeed;
            this.yPosition += this.ySpeed;

            this.xSpeed = this.xSpeed*0.98;
            this.ySpeed = this.ySpeed*0.98;

            if(Math.abs(this.xSpeed) < 0.005 && Math.abs(this.ySpeed) < 0.005){
                this.moving = false;
            }else{
                this.moving = true;
            }
        }
    }

    this.shoot = function(power, rotation){
        this.xSpeed = power * Math.cos(rotation) / 100;
        this.ySpeed = power * Math.sin(rotation) / 100;
    }
}

function Ball(xPosition, yPosition, image, type){
    this.xPosition = (xPosition * canvas.width) / TABLE_WIDTH;
    this.yPosition = (yPosition * canvas.width) / TABLE_WIDTH;
    this.radius = (BALL_RADIUS * canvas.width) / TABLE_WIDTH;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.image = image;
    this.moving = false;
    this.pocketing = false;
    this.pocketed = false;
    this.opacity = 1;
    this.type = type;

    this.draw = function(){
        ctx.save();
        ctx.translate(this.xPosition, this.yPosition);
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(this.image, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
        ctx.restore();
    }

    this.update = function(){
        if(this.pocketed){
            //
        }else if(this.pocketing){
            if(this.opacity <= 0){
                this.opacity = 0;
                this.pocketed = true;
                this.moving = false;
                this.pocketin = false;
            }else{
                this.opacity -= 0.05;
            }
        }else{
            this.xPosition += this.xSpeed;
            this.yPosition += this.ySpeed;

            this.xSpeed = this.xSpeed*0.98;
            this.ySpeed = this.ySpeed*0.98;

            if(Math.abs(this.xSpeed) < 0.005 && Math.abs(this.ySpeed) < 0.005){
                this.moving = false;
            }else{
                this.moving = true;
            }
        }
    }
}

function BallInHand(){
    this.xPosition = 0;
    this.yPosition = 0;
    this.radius = (BALL_RADIUS * canvas.width) / TABLE_WIDTH;

    this.draw = function(){
        ctx.drawImage(ballInHandImage, this.xPosition - this.radius, this.yPosition - this.radius * 1.5, this.radius*3, this.radius*3);
    }

    this.update = function(){
        this.xPosition = mouse.xPosition;
        this.yPosition = mouse.yPosition
    }
}