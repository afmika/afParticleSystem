/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class CircleShape {
	constructor(radius) {
		this.setRadius( radius );
		this.setType( "CIRCLE" );
	}

	getType() {
		return this.type;
	}
	setType(type) {
		this.type = type;
	}
	setRadius(radius) {
		this.radius = radius;
	}
	getRadius() {
		return this.radius;
	}
}