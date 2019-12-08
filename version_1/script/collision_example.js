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
let dim = 10;
let n = 10;
for(let i = 0; i < n; i++) {
	let rx = 5 + Math.random() * canvas.width;
	let ry = 5 + Math.random() * canvas.height;
	let invalid = rx + dim >= canvas.width || ry + dim >= canvas.height;
	if(invalid) {
		i--;
	} else {
		system.add(new Ball( rx , ry, dim));
	}
}

system.eachIndex((i, p) => {
	let smth = i + 1;
	p.setVelocity(new Vector(Math.random(), Math.random()));
	// p.setAcceleration(new Vector(0, 0.05 * smth));
	p.setMass(1000);
	//p.applyForce(new Vector(0, -9.81 / 100));
});
system.applyForce(new Vector(0, -9.81));
// system.setMomentum(true);


function update() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	system.each(body => {
		let [x, y, v, a] = [body.getX(), body.getY(), body.getVelocity(), body.getAcceleration()];
		ctx.beginPath();
		ctx.fillStyle = body.collides() ? "red" : "white";
		ctx.arc(x, y, body.getShape().radius, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();
		if(x <= 0 || x+dim >= canvas.width) {
			body.setVelocity( v.times(-1, 1) );
		}
		if(/*y <= 0 ||*/ y+dim >= canvas.height) {
			body.setVelocity( v.times(1, -1) );
		}
	});

	system.update();
}


let interval = setInterval(update, _anim);