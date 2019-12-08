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
let dim = 45;
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


let meteor = new GravitySource(canvas.width, canvas.height/2 - 100);
meteor.setVelocity(new Vector(-0.1, 0));
meteor.setMass(10);

let commet = new GravitySource(0, canvas.height/2 + 100);
commet.setVelocity(new Vector(0.1, 0));
commet.setMass(10);

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

		meteor.repulse(particle);
		commet.repulse(particle);

		meteor.attract(commet);
		commet.attract(meteor);
	});
	
	ctx.fillStyle = "white";
	ctx.fillRect(meteor.getLocation().getX(), meteor.getLocation().getY(), 5, 5);
	ctx.fillStyle = "blue";
	ctx.fillRect(commet.getLocation().getX(), commet.getLocation().getY(), 5, 5);

	commet.update();
	meteor.update();
	system.update();
}


let interval = setInterval(update, _anim);