/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
const canvas = document.getElementById("canvas");
const controlContainer = document.getElementById("controls");
let ctx = canvas.getContext("2d");

let Draw = new DrawingTools( ctx );
let Gui = new ControlsGUI( controlContainer );

const _fps = 60;
const _anim = 1000 / _fps;
let t1 = Date.now(),
	t2 = t1;
let nframes = 0;


let anchor = new Vector(0, 0);
let system = new World(anchor);
// ENABLE MOMENTUM
system.setMomentum(true);

for (var i = 0; i < 6; i++) {
	let x = Math.random() * canvas.width;
	let y = Math.random() * canvas.height;
	let w = Math.random() * 100 + 10; 
	let h = Math.random() * 50 + 10; 

	let body = new Body(new Vector(x, y));
	body.setVelocity(new Vector(Math.random() / 5, Math.random() / 5));

	body.setShape( PolyShape.Square(x, y, w, h) );
	system.add( body );
}

for (var i = 0; i < 6; i++) {
	let x = Math.random() * canvas.width;
	let y = Math.random() * canvas.height;
	let radius = Math.random() * 60 + 10; 

	let body = new Body(new Vector(x, y));
	body.setVelocity(new Vector(Math.random() / 5, Math.random() / 5));
	body.setShape( new CircleShape(radius) );
	system.add( body );
}




function update() {
	ctx.fillStyle = "black";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	t2 = Date.now();
	let delta_time = (t2 - t1) * 0.001;
	t2 = t1;
	
	system.each(body => {
		let [x, y, v, a] = [body.getX(), body.getY(), body.getVelocity(), body.getAcceleration()];
		let shape = body.getShape();
		let center = body.getLocation();

		Draw.point( center );
		if( shape.getType() == "CIRCLE") {
			Draw.circleShape(center, shape );
		} else {
			// shape contains vertexs arr. 
			// we dont need the center 'cause we can guess it
			// from the vertexs positions
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