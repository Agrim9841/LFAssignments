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

        this.findStrikePos(this.balls[0].xPosition, this.balls[0].yPosition, 
            this.table.pockets[3].xPosition, this.table.pockets[3].yPosition,
            this.balls[0].radius*2);

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
            if(decided = true){
                break;
            }
            this.angle = Math.atan2(
                this.balls[i].yPosition - this.table.pockets[3].yPosition,
                this.balls[i].xPosition - this.table.pockets[3].xPosition
                );
            this.power = 2000;
            this.findStrikePos(this.balls[i].xPosition, this.balls[i].yPosition, 
                this.table.pockets[3].xPosition, this.table.pockets[3].yPosition,
                this.balls[i].radius*2);
                
            console.log(this.xPosition, this.yPosition);
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