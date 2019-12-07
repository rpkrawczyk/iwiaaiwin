
management.getPositions = function(ctx) {
    var cx = ctx.canvas.width / 2;
    var cy = ctx.canvas.height / 2;
    var positions = [
	[ cx + management.sides[0], cy],
	[ cx, cy - management.sides[1]],
	[ cx - management.sides[2], cy],
	[ cx, cy + management.sides[3]]
    ];
    return positions;
}

management.updatePos = function(pos, delta) {
    var even = pos % 2 === 0;
    var abcd;
    var eight_d;
    var old_sides = management.sides;

    if(even) {
	abcd = 2*management.sides[0] + management.sides[1] + 2*management.sides[2] + management.sides[3];
	eight_d = 8*delta*(management.sides[1]+management.sides[3]);
    } else {
	abcd = management.sides[0] + 2*management.sides[1] + management.sides[2] + 2*management.sides[3];
	eight_d = 8*delta*(management.sides[0]+management.sides[2]);
    }
    var change = 1/4*(-Math.sqrt((abcd + 2*delta)**2
				 - eight_d)
		      + abcd
		      + 2 * delta
		     );

    // console.log(abcd**2);
    // console.log(abcd**2-8*delta*(management.sides[1]+management.sides[3]));
    // console.log(change);
    for(var i = 0; i < management.sides.length; ++i) {
	if(pos === i) {
	    management.sides[i] += delta;
	    if(management.sides[i] < 0) {
		management.sides = old_sides;
		break;
	    }
	} else {
	    management.sides[i] -= change;
	    if(management.sides[i] < 0) {
		management.sides = old_sides;
		break;
	    }
	}
    }
}

management.updateValues = function() {
    var fRound = function(val) {
	val /= management.defaultPos;
	return val.toExponential(6);
    }
    document.getElementById("valueA").innerText = fRound(management.sides[0]);
    document.getElementById("valueB").innerText = fRound(management.sides[1]);
    document.getElementById("valueC").innerText = fRound(management.sides[2]);
    document.getElementById("valueD").innerText = fRound(management.sides[3]);
}

management.initSides = function() {
    var pos = 70;
    management.sides = [pos, pos, pos, pos];
    management.defaultPos = pos;
}

management.radius = 10;
management.frame = 0;
management.targetCircleIndex = undefined;
management.movingCircle = undefined;
