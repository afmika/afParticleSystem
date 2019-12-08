/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const _fps = 60;
const _anim = 1000 / _fps;


// ATTRACTOR
let dim = 5;
let sun = new GravitySource(canvas.width/2, canvas.height/2);
sun.setMass(2);

let anchor = new Vector(0, 0);
let system = new World(anchor);
let planet = new Particle(200, canvas.height/2 - 200);
planet.setMass(10);

system.add(planet);
system.each(p => {
	/*
	|a| = |an + at| , since at = dv/dt = 0
	|a| = |an + 0| = |an| = |v|^2 / R = G Msun / R^2
	=> |an| = Math.sqrt(ax^2 + ay^2)= G Msun / R^2 = K
	=> ax^2 + ay^2 = K^2 => ay^2 = K^2 - ax^2
	=> Ex. let s say that ax = a
	=> (ax, ay) = (a, sqrt(K^2 - a^2))
	*/
	let dist = Vector.sub(sun.getLocation(), p.getLocation()).getLength();
	let K = (sun.getGravityConstant() * sun.getMass())/ dist;
	let ax = 0.001;
	let ay = Math.sqrt(K*K - ax*ax); 
	p.setAcceleration(new Vector(ax, ay));
});

function update() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// attracted
	system.each(particle => {
		let [x, y, v, a] = [particle.getX(), particle.getY(), particle.getVelocity(), particle.getAcceleration()];

		ctx.beginPath();
		ctx.fillStyle = "white";
		// planet
		ctx.fillRect(x, y, dim, dim);
		// sun
		ctx.fillRect(sun.getX() - 5, sun.getY() - 5, 10, 10);
		ctx.closePath();

		sun.attract(particle);
	});

	sun.update();
	system.update();
}


let interval = setInterval(update, _anim);