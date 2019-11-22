/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const _fps = 42;
const _anim = 1000 / _fps;


let anchor = new Vector(0, 0);
let system = new World(anchor);
system.setMomentum(true);
// air
let air = new Friction(0.0001);

let dim = 10;
let n = 50;


// init
let propag_width = 50, propag_height = 100;
let tx = canvas.width / 2 - propag_width / 2, 
	ty = canvas.height / 2 - propag_height / 2 + 100;
for(let i = 0; i < n; i++) {
	let x = Math.random() * propag_width + tx;
	let y = Math.random() * propag_height + ty;
	let ball = new Ball(x, y, 2);
	let vx = Math.random() / 3 * (Math.random() > 0.5 ? -1 : 1 );
	ball.setVelocity(new Vector(vx, -0.5));
	system.add(ball);
}

// box
let bw = 200, bh = 10; 
let box = new Box(canvas.width/2 - bw/2, canvas.height/2 - bh/2, bw, bh);
box.setStatic(true);

system.add(box);

function update() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	system.each(body => {
		let shape = body.getShape();
		if(shape.type == "CIRCLE") {
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
			air.applyForce(body);

		} else {
			ctx.beginPath();
			ctx.fillStyle = "yellow";
			ctx.fillRect(box.getX(), box.getY(), shape.dim.x, shape.dim.y);
			ctx.closePath();
		}

	});
	system.update(true);
}


let interval = setInterval(update, _anim);