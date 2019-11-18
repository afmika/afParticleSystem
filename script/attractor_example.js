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
let system_a = new ParticleSystem(anchor);
let system_b = new ParticleSystem(anchor);

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
		system_a.add(new Particle( rx , ry ));
		system_b.add(new Particle( rx , ry ));
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
attractor.setMass(3);

function update() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// attracted
	system_a.each(particle => {
		let [x, y, v, a] = [particle.getX(), particle.getY(), particle.getVelocity(), particle.getAcceleration()];

		ctx.beginPath();
		ctx.fillStyle = "blue";
		ctx.fillRect(x, y, dim, dim);
		ctx.closePath();

		if(x <= 0 || x+dim >= canvas.width) {
			particle.setVelocity( v.times(-1, 1) );
		}
		if(y <= 0 || y+dim >= canvas.height) {
			particle.setVelocity( v.times(1, -1) );
		}

		attractor.attract(particle);
	});

	// repulsed
	system_b.each(particle => {
		let [x, y, v, a] = [particle.getX(), particle.getY(), particle.getVelocity(), particle.getAcceleration()];

		ctx.beginPath();
		ctx.fillStyle = "red";
		ctx.fillRect(x, y, dim, dim);
		ctx.closePath();

		if(x <= 0 || x+dim >= canvas.width) {
			particle.setVelocity( v.times(-1, 1) );
		}
		if(y <= 0 || y+dim >= canvas.height) {
			particle.setVelocity( v.times(1, -1) );
		}

		attractor.repulse(particle);
	});
	ctx.fillStyle = "green";
	ctx.fillRect(attractor.getX(), attractor.getY(), 20, 20);

	system_a.update();
	system_b.update();
}


let interval = setInterval(update, _anim);