/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class GravitySource extends Body {
	constructor(x, y) {
		super(new Vector(x, y));
		this.GRAVITY_CONSTANT = 0.4;
		this.setShape(Shape.Circle(1));
		// this.setStatic(true);
	}

	setGravityConstant(g) {
		this.GRAVITY_CONSTANT = g;
	}
	getGravityConstant() {
		return this.GRAVITY_CONSTANT;
	}

 	getGravityForce(body) {
		let m1 = this.getMass(),
			m2 = body.getMass();
		// loc_body - loc_this = direction this -> body
		let source = this.getLocation(),
			target = body.getLocation();

		let tmp = Vector.sub( target, source );
		let dist = tmp.getLength();

		let _G = this.getGravityConstant();
		let force = tmp.normalize().times( ( _G * m1 * m2 ) / (dist * dist) );
		return force;
	}

	attract(body) {
		body.applyForce(this.getGravityForce(body).times(-1)); 
	}

	repulse(body) {
		body.applyForce(this.getGravityForce(body)); 
	}

}