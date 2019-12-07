
management.drawLine = function(ctx, x1, y1, x2, y2, thickness=1) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineWidth = thickness;
    ctx.strokeStyle = "#cfc";
    ctx.stroke();
}

management.clear = function() {
    var ctx = management.ctx;
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
};

//
management.drawCircle = function(ctx, x, y, radius, fillstyle) {
    if(fillstyle === undefined) {
	ctx.fillStyle = "DarkTurquoise";
    } else {
	ctx.fillStyle = fillstyle;
    }
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
};

management.drawCircles = function(ctx) {
    var cx = ctx.canvas.width / 2;
    var cy = ctx.canvas.height / 2;
    var positions = management.getPositions(ctx);

    management.drawLine(ctx, 0, cy, ctx.canvas.width, cy);
    management.drawLine(ctx, cx, 0, cx, ctx.canvas.height);
    for(var i = 0; i < positions.length - 1; ++i) {
	management.drawLine(ctx, positions[i][0], positions[i][1], positions[i + 1][0], positions[i + 1][1], 2);
    }
    management.drawLine(ctx, positions[3][0], positions[3][1], positions[0][0], positions[0][1], 2);
    for(var i = 0; i < positions.length; ++i) {
	management.drawCircle(ctx, positions[i][0], positions[i][1], management.radius);
    }
};

management.drawMovingCircle = function(ctx) {
    var circle = management.movingCircle;
    if( circle !== undefined) {
	var poss = management.getPositions(ctx);
	management.drawLine(ctx, circle.x, circle.y, poss[management.targetCircleIndex][0], poss[management.targetCircleIndex][1], 4);
	management.drawCircle(ctx, circle.x, circle.y, 11, "Aqua");
    }
}
