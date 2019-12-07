

// Entry point
$(document).ready(function(){
    var canvas = document.getElementById("game");
    management.ctx = canvas.getContext("2d");
    management.handleInput();
    //
    management.initSides();
    management.drawCircles(management.ctx);
});


// set up an interval to loop the game loop
setInterval(gameloop, 30);

function gameloop() {
    management.frame += 1;
    // Update the values.
    management.updateValues();
    // clear the Canvas before re-drawing.
    management.clear();
    // Management
    management.drawCircles(management.ctx);
    management.drawMovingCircle(management.ctx);
    
}
