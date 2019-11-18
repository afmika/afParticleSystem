const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const _fps = 60;
const _anim = 1000 / _fps;

let particle = new Particle(100, 50);
particle.setVelocity(new Vector(0.5, 0.5));
particle.setAcceleration(new Vector(0.01, 0.01));



function update() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let [x, y, v, a] = [particle.getX(), particle.getY(), particle.getVelocity(), particle.getAcceleration()];

	ctx.fillStyle = "rgb(0,0,50,0.8)";
	ctx.fillRect(x, y, 20, 20);

	if(x <= 0 || x+20 >= canvas.width) {
		particle.setVelocity( v.times(-1, 1) );
	}
	if(y <= 0 || y+20 >= canvas.height) {
		particle.setVelocity( v.times(1, -1) );
	}

	document.getElementById("text").innerHTML = "Vel "+v.getStatus(10);
	document.getElementById("text").innerHTML += "| Acc "+a.getStatus(10);
	particle.update();
}

let interval = setInterval(update, _anim);