/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class PolyShape {
	constructor(x, y, vertexs) {
		this.setVertexs(vertexs);
		this.computeNormals();
		this.setType( "POLYGON" )
	}

	getType() {
		return this.type;
	}
	getVertexs() {
		return this.vertexs;
	}
	
	setVertexs(vertexs) {
		this.vertexs = vertexs || [];
	}
	setType(type) {
		this.type = type;
	}

	addVertex(vector) {
		this.vertexs.push(vector);
	}

	computeNormals() {
		this.face_normals = [];
		// sens . anti horaire. => normal = normalise(Vi - Vi+1)
		for(let i = 0; i < this.vertexs.length; i++) {
			let prev = this.vertexs[ i ];
			let next = i + 1 >= this.vertexs.length ? this.vertexs[ 0 ] : this.vertexs[ i + 1 ];
			let temp = Vector.sub( prev, next );
			this.face_normals.push( temp.normalize() );
		}
	}

	static Square(x, y, width, height) {
		let rect = new PolyShape(x, y, []);
		rect.setType("SQUARE");
		rect.addVertex(new Vector(x - width / 2, y - height / 2));
		rect.addVertex(new Vector(x + width / 2, y - height / 2));
		rect.addVertex(new Vector(x + width / 2, y + height / 2));
		rect.addVertex(new Vector(x - width / 2, y + height / 2));
		rect.computeNormals();
		return rect;
	}
}