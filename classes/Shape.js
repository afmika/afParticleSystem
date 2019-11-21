/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class Shape {
	constructor() {
	}

	static Square(width, height) {
		let _default = {
			type: "SQUARE",
			dim: new Vector(1, 1)
		};
		return {type: "SQUARE", dim: new Vector(width, height)} || _default;
	}

	static Circle(radius) {
		let _default = {
			type: "CIRCLE",
			radius: 1
		};
		return {type: "CIRCLE", radius: radius} || _default;
	}
}