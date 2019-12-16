/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
const canvas = document.getElementById("canvas");
const controlContainer = document.getElementById("controls");
const timerContainer = document.getElementById("timer");
let ctx = canvas.getContext("2d");

let Draw = new DrawingTools( ctx );
let Gui = new ControlsGUI( controlContainer );
let TimerGui = new ControlsGUI( timerContainer );

const _fps = 60;
const _anim = 1000 / _fps;
let t1 = Date.now(),
	t2 = t1;
let nframes = 0;
let timeSec = 0;
let scale = 0.0001;
let avg_vel = 0;


let anchor = new Vector(0, 0);
let system = new World(anchor);

for (var i = 0; i < 60; i++) {
	let x = 200 + Math.random() * 200;
	let y = 100 + Math.random() * canvas.height/2;

	let particle = new Particle(new Vector(x, y));
	particle.setVelocity(new Vector(Math.random() * 10, Math.random() * 10));
	particle.setAcceleration(new Vector(0, 0.5));
	particle.setMass( 1 );
	system.add( particle );
}


system.setEachBodyDampingFactor(0.999);


function update() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	t2 = Date.now();
	let delta_time = (t2 - t1);
	timeSec += delta_time;
	t2 = t1;
	delta_time *= scale;

	TimerGui.show("- Virtual Time (simulation) :: "+Math.round(timeSec / 1000000)+" s -");
	
	avg_vel = 0;
	
	system.each(particle => {
		let [x, y, v, a] = [particle.getX(), particle.getY(), particle.getVelocity(), particle.getAcceleration()];
		let shape = particle.getShape();
		let center = particle.getLocation();

		if(x-shape.getRadius() <= 0 || x+shape.getRadius() >= canvas.width) {
			particle.setVelocity( v.times(-1, 1) );
		}
		if(y+shape.getRadius() >= canvas.height) {
			particle.setVelocity( v.times(1, -1) );
		}

		Draw.point( center );
		avg_vel += v.getLength();
		Draw.circleShape(center, shape, "#ffffff", "#ffffff" );
	});
	system.update(delta_time);
	nframes++;
}


let frame_counter = setInterval(function() {
	Gui.show("SIMULATION STATUS\n");
	Gui.appendText("FPS "+nframes);
	Gui.appendText(" - BODIES "+system.getBodies().length);
	Gui.appendText(" - AVG VELOCITY : "+Math.floor(avg_vel / system.bodies.length) + "px/s");
	nframes = 0;
}, 1000);
let interval = setInterval(update, _anim);