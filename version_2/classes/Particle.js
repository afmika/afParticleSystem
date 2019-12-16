/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class Particle extends Body {
	constructor(location) {
		super(location);
		this.shape = new CircleShape(1);
		this.life = 100;
	}

	isActive() {
		return this.life > 0;
	}
	
}