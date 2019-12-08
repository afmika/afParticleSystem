/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class PolyShape {
	constructor() {
		this.vertexs = [];
		this.face_normals = [];
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