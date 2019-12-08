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
let system = new World(anchor);
let dim = 5;
let n = 5;
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

system.eachIndex((i, p) => {
	let smth = i + 1;
	p.setVelocity(new Vector(Math.random(), Math.random()));
	// p.setAcceleration(new Vector(0, 0.05 * smth));
	p.setMass(100);
	//p.applyForce(new Vector(0, -9.81 / 100));
});
system.applyForce(new Vector(0, -9.81));


function update() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	system.each(particle => {
		let [x, y, v, a] = [particle.getX(), particle.getY(), particle.getVelocity(), particle.getAcceleration()];
		ctx.fillStyle = "white";
		ctx.fillRect(x, y, dim, dim);

		if(x <= 0 || x+dim >= canvas.width) {
			particle.setVelocity( v.times(-1, 1) );
		}
		if(/*y <= 0 ||*/ y+dim >= canvas.height) {
			particle.setVelocity( v.times(1, -1) );
		}
	});

	system.update();
}


let interval = setInterval(update, _anim);