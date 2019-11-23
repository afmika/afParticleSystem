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
// ENABLE MOMENTUM
system.setMomentum(true);

let dim = 100;
let stx = canvas.width/2,
	sty = canvas.height - 2;
let box1 = new Box(stx, sty-dim, dim, dim);
box1.setVelocity(new Vector(-1, 0));
box1.setMass(3);
system.add(box1);

let box2 = new Box(dim/2 + 70, sty-(dim/2), dim/2, dim/2);
box2.setMass(1);
system.add(box2);

function update() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	system.each(body => {
		let [x, y, v, a] = [body.getX(), body.getY(), body.getVelocity(), body.getAcceleration()];
		ctx.beginPath();
		ctx.fillStyle = body.collides() ? "red" : "white";
		ctx.fillRect(x, y, body.getShape().dim.x, body.getShape().dim.y);
		ctx.closePath();

		if(x <= 0 || x+body.getShape().dim.x >= canvas.width) {
			body.setVelocity( v.times(-1, 1) );
		}
		if(y <= 0 || y+body.getShape().dim.y >= canvas.height) {
			body.setVelocity( v.times(1, -1) );
		}

	});

	system.update(true);
}


let interval = setInterval(update, _anim);