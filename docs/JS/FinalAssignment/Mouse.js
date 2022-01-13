function Mouse(){
    this.xPosition = 0;
    this.yPosition = 0;
    this.pressed = false;
}

mouse = new Mouse();

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    };
}
