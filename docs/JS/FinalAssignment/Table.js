function Table(){
    this.width = canvas.width;
    this.height = canvas.height;
    this.cornorThickness = (CORNER_WIDTH * canvas.width) / TABLE_WIDTH;
    this.linePos = (LINE_POS * canvas.width) / TABLE_WIDTH;
    this.pockets = [
        {
            name: "topleft",
            image: cornerHoleImage,
            xPosition: this.cornorThickness,
            yPosition: this.cornorThickness,
            rotation: 0,
            radius: this.cornorThickness,
        },
        {
            name: "topright",
            image: cornerHoleImage,
            xPosition: this.width - this.cornorThickness,
            yPosition: this.cornorThickness,
            rotation: 90,
            radius: this.cornorThickness,
        },
        {
            name: "bottomleft",
            image: cornerHoleImage,
            xPosition: this.cornorThickness,
            yPosition: this.height - this.cornorThickness,
            rotation: -90,
            radius: this.cornorThickness,
        },
        {
            name: "bottomright",
            image: cornerHoleImage,
            xPosition: this.width - this.cornorThickness,
            yPosition: this.height - this.cornorThickness,
            rotation: 180,
            radius: this.cornorThickness,
        },
        {
            name: "topcenter",
            image: centerHoleImage,
            xPosition: this.width / 2,
            yPosition: this.cornorThickness,
            rotation: 0,
            radius: this.cornorThickness / 1.5,
        },
        {
            name: "bottomcenter",
            image: centerHoleImage,
            xPosition: this.width / 2,
            yPosition: this.height - this.cornorThickness,
            rotation: 180,
            radius: this.cornorThickness / 1.5,
        },
    ]

    this.draw = function(){
        // drawing table cloth
        ctx.drawImage( tableImage, this.cornorThickness, this.cornorThickness, this.width - 2*this.cornorThickness, this.height - 2 * this.cornorThickness);
        
        // drawing line
        ctx.beginPath();
        ctx.moveTo(this.linePos + this.cornorThickness, this.cornorThickness);
        ctx.lineTo(this.linePos + this.cornorThickness, this.height - this.cornorThickness);
        ctx.stroke(); 
        
        // drawing corners
        ctx.drawImage( tableLeftCornerImage, 0, 0, this.cornorThickness, this.height);
        ctx.drawImage( tableRightCornerImage, this.width-this.cornorThickness, 0, this.cornorThickness, this.height);
        ctx.drawImage( tableTopCornerImage, 0, 0, this.width, this.cornorThickness);
        ctx.drawImage( tableBottomCornerImage, 0, this.height - this.cornorThickness, this.width, this.cornorThickness);
        
        // drawing pockets
        for(let i = 0; i < this.pockets.length; i++){
            ctx.save();
            ctx.translate( this.pockets[i].xPosition, this.pockets[i].yPosition);
            ctx.rotate(degToRad(this.pockets[i].rotation));
            ctx.drawImage( this.pockets[i].image, -this.cornorThickness*1.5, -this.cornorThickness*1.5, this.cornorThickness*3, this.cornorThickness*3);
            ctx.restore();
        }
    }
}