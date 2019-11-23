/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const _fps = 60;
const _anim = 1000 / _fps;



let anchor = new Vector(5, 5);
let system = new World(anchor);
// init
let dim = 42;
let vec_length = 20;

for(let y = 0; y < canvas.height / dim; y++) {
	for(let x = 0; x < canvas.width / dim; x++) {
		let p = new Particle(x * dim, y * dim);
		p.setStatic(true);
		//p.setVelocity(new Vector(Math.random(), Math.random()))
		p.setVelocity(new Vector(0, 1));
		p.setMass(1);
		system.add(p);
	}	
}


let attractor = new GravitySource(canvas.width/2, canvas.height/2);
attractor.setMass(1000);
let m = {x: 0, y: 0};
let do_gravity = false;
let attract = true;

function switch_mode() {
	attract = !attract;
	if(attract) {
		document.getElementById("btn").innerHTML = "MODE : ATTRACT";
	} else {
		document.getElementById("btn").innerHTML = "MODE : REPULSE";
	}
}

function mouseCoord(e) {
    var canvasLocation = [0,0];
    var canvasXOffset = canvas.offsetLeft;
    var canvasYOffset = canvas.offsetTop;
    
    // Get cursor location relative to the broswer
    if ((e.pageX != undefined) && (e.pageY != undefined)) {
        canvasLocation[0] = e.pageX;
        canvasLocation[1] = e.pageY;
    } else {
        canvasLocation[0] = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        canvasLocation[1] = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    
    canvasLocation[0] -= canvasXOffset;
    canvasLocation[1] -= canvasYOffset;
	return {x : canvasLocation[0], y : canvasLocation[1]};
}

function update() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// attracted
	system.each(particle => {
		let [pos, v] = [particle.getLocation(), particle.getVelocity()];

		let unitVel = v.normalize().times(vec_length);
		let [x, y] = [unitVel.getX(), unitVel.getY()];
		let [gx, gy] = [pos.getX(), pos.getY()];

		ctx.beginPath();
		
		ctx.strokeStyle = "white";
		ctx.lineWidth = 2;

		ctx.moveTo(gx, gy);
		ctx.lineTo(gx + x, gy + y);
		
		ctx.stroke();
		ctx.closePath();

		if(do_gravity) {
			attractor.setLocation(new Vector(m.x, m.y));
			if(attract) {
				attractor.attract(particle);
			} else {
				attractor.repulse(particle);
			}
			// a little trick
			particle.setVelocity(particle.getVelocity().normalize());
			particle.setAcceleration(particle.getAcceleration().normalize());
		}
	});
	
	system.update();
}


canvas.addEventListener("mousedown", function(e) {
	// document.getElementById("txt").innerHTML += "DOWN";
	do_gravity = true;
});
canvas.addEventListener("mouseup", function(e) {
	// document.getElementById("txt").innerHTML += "UP";
	do_gravity = false;
});
canvas.addEventListener("mousemove", function(e) {
	//alert("MOVE")
	m = mouseCoord(e);
	document.getElementById("txt").innerHTML = m.x + " | " +m.y + " GRAVITY : "+(do_gravity ? "ON" : "OFF");
});

let interval = setInterval(update, _anim);