/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class Vector {
	constructor(x, y) {
		this.setX(x);
		this.setY(y);
	}

	static add(u, v) {
		return new Vector(u.getX() + v.getX(), u.getY() + v.getY());
	}
	static sub(u, v) {
		return Vector.add(u, v.times(-1));
	}
	
	normalize() {
		return this.times(1 / this.getLength());
	}

	times(a, b) {
		let vec = null;
		if(b != undefined || !isNaN(parseFloat(b))) {
			vec = new Vector(this.getX() * a, this.getY() * b);
		} else {
			vec = new Vector(this.getX() * a, this.getY() * a);
		}
		return vec;
	}

	setX(x) {
		let tmp = parseFloat(x);
		if(isNaN(tmp)) {
			throw EXCEPTION.NOT_A_NUMBER;
		}
		this.x = parseFloat(x);
	}
	setY(y) {
		let tmp = parseFloat(y);
		if(isNaN(tmp)) {
			throw EXCEPTION.NOT_A_NUMBER;
		}
		this.y = parseFloat(y);
	}

	getX() {
		return this.x;
	}
	getY() {
		return this.y;
	}
	getLength() {
		return Math.sqrt( this.getSqrLength() );
	}
	getSqrLength() {
		let x = this.getX(), y = this.getY();
		return x*x + y*y;
	}

	getStatus(precision) {
		if(precision != undefined) {
			let pow = Math.pow(10, precision);
			let tx = Math.round( this.getX() * pow );
			let ty = Math.round( this.getY() * pow );
			tx = Math.floor(tx) / pow;
			ty = Math.floor(ty) / pow;
			return tx+", "+ty;
		}
		return this.getX() + ", "+this.getY();
	}

}