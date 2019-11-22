/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const _fps = 60;
const _anim = 1000 / _fps;

let anchor = new Vector(0, 0);
let system_a = new World(anchor);
let system_b = new World(anchor);

// init
let dim = 10;
let n = 5;
for(let i = 0; i < n; i++) {
	let rx = 5 + Math.random() * canvas.width;
	let ry = 5 + Math.random() * canvas.height;
	let invalid = rx + dim >= canvas.width || ry + dim >= canvas.height;
	if(invalid) {
		i--;
	} else {
		system_a.add(new Ball( rx , ry , dim));
		system_b.add(new Ball( rx , ry , dim));
	}
}

system_a.eachIndex((i, p) => {
	p.setVelocity(new Vector(Math.random()/2, Math.random()/2));
	p.setMass(1);
});

system_b.eachIndex((i, p) => {
	p.setVelocity(new Vector(Math.random()/2, Math.random()/2));
	p.setMass(1);
});

// ATTRACTOR
let attractor = new GravitySource(canvas.width/2, canvas.height/2); 
attractor.setShape(Shape.Circle(dim * 2));
attractor.setMass(3);

function update() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// attracted
	system_a.each(body => {
		let [x, y, v, a] = [body.getX(), body.getY(), body.getVelocity(), body.getAcceleration()];

		ctx.beginPath();
		ctx.fillStyle = "blue";
		ctx.arc(x, y, body.getShape().radius, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();

		if(x - body.getShape().radius <= 0 || x+ body.getShape().radius >= canvas.width) {
			body.setVelocity( v.times(-1, 1) );
		}
		if(y - body.getShape().radius <= 0 || y+ body.getShape().radius >= canvas.height) {
			body.setVelocity( v.times(1, -1) );
		}

		attractor.attract(body);
	});

	// repulsed
	system_b.each(body => {
		let [x, y, v, a] = [body.getX(), body.getY(), body.getVelocity(), body.getAcceleration()];

		ctx.beginPath();
		ctx.fillStyle = "red";
		ctx.arc(x, y, body.getShape().radius, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();

		if(x - body.getShape().radius <= 0 || x+ body.getShape().radius >= canvas.width) {
			body.setVelocity( v.times(-1, 1) );
		}
		if(y - body.getShape().radius <= 0 || y+ body.getShape().radius >= canvas.height) {
			body.setVelocity( v.times(1, -1) );
		}

		attractor.repulse(body);
	});
	
	ctx.beginPath();
	ctx.fillStyle = "green";
	ctx.arc(attractor.getLocation().getX(), attractor.getLocation().getY(), attractor.getShape().radius, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.closePath();

	system_a.update();
	system_b.update();
}


let interval = setInterval(update, _anim);