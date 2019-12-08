/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class Friction {
	constructor(coefficient) {
		this.setCoefficient(coefficient);
	}

	setCoefficient(coefficient) {
		this.coefficient = coefficient || 0.1;
	}

	getCoefficient() {
		return this.coefficient;
	}

	getForce(body) {
		let v = body.getVelocity();
		let u =  v.normalize();
		let force = u.times(-1).times(this.getCoefficient());
		return force;
	}
	applyForce(body) {
		let force = this.getForce(body);
		body.applyForce(force); 
	}
}