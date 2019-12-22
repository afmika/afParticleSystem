/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class Ball extends Body {
	constructor(x, y, radius) {
		super(new Vector(x, y));
		this.setShape(new CircleShape(radius));
	}
}