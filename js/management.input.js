
management.handleInput = function(){
    // Add Mouse Event Listener to canvas
    // we find if the mouse down position is on any circle
    // and set that circle as target dragging circle.
    $("#game").bind("mousedown", function(e) {
	var canvasPosition = $(this).offset();
	var mouseX = e.pageX - canvasPosition.left;
	var mouseY = e.pageY - canvasPosition.top;
	var circles = management.getPositions(management.ctx)
	for(var i = 0; i < circles.length; i++) {
	    var circleX = circles[i][0];
	    var circleY = circles[i][1];
	    var radius = management.radius;
	    if (Math.pow(mouseX - circleX, 2)
		+ Math.pow(mouseY - circleY, 2)
		< Math.pow(radius, 2)) {
		management.targetCircleIndex = i;
		management.movingCircle = {
		    "x" : circleX,
		    "y" : circleY
		};
		break;
	    }
	}});
    // we move the target dragging circle
    // when the mouse is moving
    $("#game").bind("mousemove", function(e) {
	if (management.targetCircleIndex !== undefined) {
	    var canvasPosition = $(this).offset();
	    var mouseX = e.pageX - canvasPosition.left;
	    var mouseY = e.pageY - canvasPosition.top;
	    if(management.targetCircleIndex % 2 == 0) {
		management.movingCircle.x = mouseX;
	    } else {
		management.movingCircle.y = mouseY;
	    }
	}
    });
    // We clear the dragging circle data when mouse is up
    $("#game").bind("mouseup", function(e) {
	// First change corresponding circle to a new position.
	var poss = management.getPositions(management.ctx);
	switch(management.targetCircleIndex) {
	case 0:
	    management.updatePos(0, management.movingCircle.x - poss[0][0]);
	    break;
	case 1:
	    management.updatePos(1, poss[1][1] - management.movingCircle.y);
	    break;
	case 2:
	    management.updatePos(2, poss[2][0] - management.movingCircle.x);
	    break;
	case 3:
	    management.updatePos(3, management.movingCircle.y - poss[3][1]);
	    break;
	}
	management.targetCircleIndex = undefined;
	management.movingCircle = undefined;
    });
};
