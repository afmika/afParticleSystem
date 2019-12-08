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

let dim = 8;

// triangle
let stx = canvas.width/2 + 100;
let sty = canvas.height/2;

system.add(new Ball(stx, sty, dim));

system.add(new Ball(stx + 2*dim+2, sty - dim - 1, dim));
system.add(new Ball(stx + 2*dim+2, sty + dim + 1, dim));

system.add(new Ball(stx + 4*dim+2, sty - 2*dim - 2, dim));
system.add(new Ball(stx + 4*dim+2, sty, dim));
system.add(new Ball(stx + 4*dim+2, sty + 2*dim + 2, dim));

system.add(new Ball(stx + 6*dim+4, sty - 3*dim - 4, dim));
system.add(new Ball(stx + 6*dim+4, sty - dim - 1, dim));
system.add(new Ball(stx + 6*dim+4, sty + dim + 1, dim));
system.add(new Ball(stx + 6*dim+4, sty + 3*dim + 4, dim));

// 
let ball = new Ball(100, sty, dim);
ball.setVelocity(new Vector(2, 0));
ball.setMass(5);
system.add(ball);

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

		if(x-body.getShape().radius <= 0 || x+body.getShape().radius >= canvas.width) {
			body.setVelocity( v.times(-1, 1) );
		}
		if(y-body.getShape().radius <= 0 || y+body.getShape().radius >= canvas.height) {
			body.setVelocity( v.times(1, -1) );
		}
	});

	system.update(true);
}


let interval = setInterval(update, _anim);