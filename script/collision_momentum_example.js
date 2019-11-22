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

let dim = 10;
let n = 10;


let ball_a = new Ball(20 , canvas.height/2, 10);
ball_a.setVelocity(new Vector(1, 0));
ball_a.setMass(1);

let ball_b = new Ball(canvas.width/2 + 100, canvas.height/2 -100, 25);
ball_b.setVelocity(new Vector(-1.5, 0.5));
ball_b.setMass(2);

system.add(ball_a);
system.add(ball_b);



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