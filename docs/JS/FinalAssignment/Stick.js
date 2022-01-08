function Stick(){
    this.xPosition = 100;
    this.yPosition = 100;
    this.rotation = 0;
    this.pullDistance = 5;
    this.power = 0;

    this.draw = function (ballXPos, ballYPos, radius){
        
        this.xPosition = ballXPos;
        this.yPosition = ballYPos;
        ctx.save();
        ctx.translate(this.xPosition, this.yPosition);
        ctx.rotate(this.rotation);
        ctx.drawImage(stickImage, -stickImage.width-radius-this.pullDistance, stickImage.height/2, stickImage.width, -stickImage.height);
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