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
let scale = 0.001;
let applied = false;


let anchor = new Vector(0, 0);
let system = new World(anchor);
// ENABLE MOMENTUM
system.setMomentum(true);

let ball_a = new Body(new Vector(100, 100));
ball_a.setShape(new CircleShape(60));

ball_a.setRestitution( 1 );
ball_a.setFriction( 0.1 );
ball_a.setMass( 600 );

ball_a.setVelocity( new Vector(10.4, 10.2) );
system.add( ball_a );

let ball_b = new Body(new Vector(300, 300));
ball_b.setShape(new CircleShape(30));

ball_b.setRestitution( 0 );
ball_b.setFriction( 1 );
ball_b.setMass( 200 );

system.add( ball_b );

function update() {
	ctx.fillStyle = "black";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	t2 = Date.now();
	let delta_time = (t2 - t1);
	timeSec += delta_time;
	t2 = t1;
	delta_time *= scale;

	
	if( delta_time >= 0.2) {
		delta_time = 0;
	}
	

	TimerGui.show("- Virtual Time (simulation) :: "+Math.round(timeSec / 1000000)+" s -");
	system.each(body => {
		let [x, y, v, a] = [body.getX(), body.getY(), body.getVelocity(), body.getAcceleration()];
		let shape = body.getShape();
		let center = body.getLocation();

		Draw.point( center );
		if( shape instanceof CircleShape) {
			Draw.circleShape(center, shape );
		} else {
			Draw.polyShape( shape );
		}
	});

	system.update(delta_time);
	nframes++;
}


let frame_counter = setInterval(function() {
	Gui.show("SIMULATION STATUS\n");
	Gui.appendText("FPS "+nframes);
	Gui.appendText(" - BODIES "+system.getBodies().length);
	nframes = 0;
}, 1000);
let interval = setInterval(update, _anim);