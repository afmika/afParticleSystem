/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class Box extends Body {
	constructor(x, y, width, height) {
		super(new Vector(x, y));
		this.setShape( Shape.Square(width, height) );
	}
}