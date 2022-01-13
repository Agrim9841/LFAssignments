function Computer(){
    this.adjusted = false;
    this.angle = 0;
    this.power = 200;
    this.table;
    this.cue;
    this.balls = []
    this.xPosition;
    this.yPosition;

    this.getShootValues = function(table, balls, player, cue){
        this.filterBalls(balls, player);
        this.table = table;
        this.cue = cue;

        let decided = false;
        for(let i = 0; i< this.balls.length; i++){
            if(decided == true){
                break;
            }
            for(let j = 0; j < this.table.pockets.length; j++){
                if(decided == true){
                    break;
                }
                this.findStrikePos(this.balls[i].xPosition, this.balls[i].yPosition, 
                    this.table.pockets[j].xPosition, this.table.pockets[j].yPosition,
                    this.balls[i].radius*2);

                decided = true;
                let slope = (this.yPosition - this.cue.yPosition) / (this.xPosition - this.cue.xPosition);
                let c = this.yPosition - (slope * this.xPosition);
                for(let k = 0; k < balls.length; k++){
                    if(!balls[i].pocketed && !balls[i].pocketing){
                        if((balls[i].xPosition > (this.cue.xPosition - this.cue.radius) && balls[i].xPosition < (this.xPosition + this.cue.radius)) ||
                        (balls[i].xPosition > (this.xPosition - this.cue.radius) && balls[i].xPosition < (this.cue.xPosition + this.cue.radius))
                        ){
                            if((balls[i].yPosition > (this.cue.yPosition - this.cue.radius) && balls[i].yPosition < (this.yPosition + this.cue.radius)) ||
                            (balls[i].yPosition > (this.yPosition - this.cue.radius) && balls[i].yPosition < (this.cue.yPosition + this.cue.radius))
                            ){
                                let numerator = Math.abs(slope* balls[i].xPosition - balls[i].yPosition + c);
                                let denomenator = Math.sqrt((slope ** 2) + 1);
                                let dist = numerator / denomenator;
                                if(dist < 2*this.cue.radius){
                                    decided = false;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        

        this.angle = Math.atan2(this.yPosition - cue.yPosition, this.xPosition - cue.xPosition);
        this.power = 2000;
    }

    this.findStrikePos = function(x1, y1, x2, y2, a){
        let slope = (y2 - y1) / (x2 - x1);
        let c = y1 - (slope * x1);
        let temp = a / Math.sqrt(slope ** 2 + 1);

        this.xPosition = x1 - temp;
        if((this.xPosition < x1 && this.xPosition > x2) || (this.xPosition > x1 && this.xPosition < x2)){
            this.xPosition = x1 + temp;
        }

        this.yPosition = (slope * this.xPosition) + c;
    }

    this.getCuePos = function(table, balls, player){
        this.filterBalls(balls, player);
        this.table = table;

        let decided = false;
        
        for(let i=0; i< this.balls.length; i++){
            if(decided == true){
                break;
            }
        
            this.findStrikePos(this.balls[i].xPosition, this.balls[i].yPosition, 
                this.table.pockets[3].xPosition, this.table.pockets[3].yPosition,
                this.balls[i].radius*2);
            this.angle = Math.atan2(this.yPosition - this.table.pockets[3].yPosition, this.xPosition - this.table.pockets[3].xPosition);
            this.power = 2000;
            
            decided = true;
            for(let j=0 ; j< balls.length; j++){
                if(!balls[j].pocketed && !balls[j].pocketing){
                    let dist = calcDistance(this.xPosition, this.yPosition, balls[j].xPosition, balls[j].yPosition);
                    if(dist < 2*balls[j].radius){
                        decided = false;
                        break;
                    }
                }
            }
        }
        this.adjusted = true;
    }

    this.filterBalls = function(balls, player){
        this.balls = [];
        if(player.ball == ""){
            this.balls = balls;
        }else{
            this.balls = balls.filter(ball => {
                if(player.ball == ball.type){
                    if(!ball.pocketed && !ball.pocketing){
                        return ball;
                    }
                }
            });

            if(this.balls.length == 0){
                this.balls = balls.filter(ball => {
                    if(ball.type == "black"){
                        return ball;
                    }
                })
            }
        }
    }
}