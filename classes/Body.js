/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class Body {
	constructor(location) {
		this.setLocation(location);
		this.setVelocity(new Vector(0, 0));
		this.setAcceleration(new Vector(0,0));
		this.setMass(1); // default mass
		this.setData({});
		this.static = false;
		this.shape = Shape.Circle(1);
		this.is_colliding = false;
	}

	setStatic(_static) {
		this.static = _static;
	}
	isStatic() {
		return this.static;
	}

	applyForce(force) {
		// f = m a
		// => a = (1/m) f
		let tmp = force.times(-1 / this.mass);
		this.setAcceleration(Vector.add(this.getAcceleration(), tmp ));
	}
	update() {
		let vel = this.getVelocity();
		
		// dx <- dx + d^2 x
		let acc = this.getAcceleration();
		this.setVelocity( Vector.add(vel, acc) );

		// x <- x + dx
		if( ! this.isStatic() ) {
			let loc = this.getLocation();
			this.setLocation( Vector.add(loc, vel) );
		}
	}

	setLocation(location) {
		this.location = location || new Vector(0, 0);	
	}
	setVelocity(velocity) {
		this.velocity = velocity || new Vector(0, 0);	
	}
	setAcceleration(acceleration) {
		this.acceleration = acceleration || new Vector(0, 0);	
	}
	setMass(mass) {
		if(mass <= 0) {
			throw EXCEPTION.IS_NEGATIVE_OR_NULL;
		}
		let tmp = parseFloat(mass);
		if(isNaN(tmp)) {
			throw EXCEPTION.NOT_A_NUMBER;
		}
		this.mass = tmp;
	}
	setData(data_obj) {
		this.data = data_obj;
	}
	setShape(shape) {
		this.shape = shape;
	}
	collides(bool) {
		if(bool == undefined) {
			return this.is_colliding;
		}
		this.is_colliding = bool;
	}

	getX() {
		return this.getLocation().x;
	}
	getY() {
		return this.getLocation().y;
	}
	getLocation() {
		return this.location;
	}
	getVelocity() {
		return this.velocity;
	}
	getAcceleration() {
		return this.acceleration;
	}
	getMass() {
		return this.mass;
	}
	getData() {
		return this.data;
	}
	getShape() {
		return this.shape;
	}
}