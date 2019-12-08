/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class Particle extends Body {
	constructor(x, y) {
		super(new Vector(x, y));
		this.life = 100;
	}

	isActive() {
		return this.life > 0;
	}
	
}