function Stick(){
    this.xPosition = 100;
    this.yPosition = 100;
    this.rotation = 0;
    this.pullDistance = 5;
    this.power = 0;
    this.width = (STICK_WIDTH * canvas.width) / TABLE_WIDTH;
    this.height = (STICK_HEIGHT * canvas.width) / TABLE_WIDTH;

    this.draw = function (ballXPos, ballYPos, radius){
        
        this.xPosition = ballXPos;
        this.yPosition = ballYPos;
        ctx.save();
        ctx.translate(this.xPosition, this.yPosition);
        ctx.rotate(this.rotation);
        ctx.drawImage(stickImage, -this.width-radius-this.pullDistance, this.height/2, this.width, -this.height);
        ctx.restore();
    }

    this.update = function(){
        this.updateRotation();
    }

    this.updateRotation = function(){
        let height = mouse.yPosition - this.yPosition; 
        let base = mouse.xPosition - this.xPosition;

        this.rotation = Math.atan2(height, base);
    }
}