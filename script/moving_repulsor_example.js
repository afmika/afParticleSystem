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
let system = new ParticleSystem(anchor);

// init
let dim = 2;
let n = 200;
for(let i = 0; i < n; i++) {
	let rx = 5 + Math.random() * canvas.width;
	let ry = 5 + Math.random() * canvas.height;
	let invalid = rx + dim >= canvas.width || ry + dim >= canvas.height;
	if(invalid) {
		i--;
	} else {
		system.add(new Particle( rx , ry ));
	}
}


// ATTRACTOR
let repulsoid = new GravitySource(canvas.width, canvas.height/2); 
repulsoid.setMass(0.5);
repulsoid.setVelocity(new Vector(-1, 0));
repulsoid.setAcceleration(new Vector(0, -0.005));

// BLACK HOLE
let blackhole = new GravitySource(canvas.width/2, canvas.height/2); 

function update() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// attracted
	system.each(particle => {
		let [x, y, v, a] = [particle.getX(), particle.getY(), particle.getVelocity(), particle.getAcceleration()];

		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.fillRect(x, y, dim, dim);
		
		ctx.fillStyle = "yellow";
		ctx.fillRect(repulsoid.getX(), repulsoid.getY(), dim * 2, dim * 2);
		
		ctx.fillStyle = "red";
		ctx.fillRect(blackhole.getX(), blackhole.getY(), dim * 2, dim * 2);

		ctx.closePath();


		repulsoid.repulse(particle);
		blackhole.attract(particle);

	});

	blackhole.attract(repulsoid);
	repulsoid.repulse(blackhole);

	repulsoid.update();
	blackhole.update();
	
	system.update();
}


let interval = setInterval(update, _anim);