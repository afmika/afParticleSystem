/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class DrawingTools {
	constructor(context) {
		if(context) {
			this.context = context;
		} else {
			throw "PLEASE DEFINE A 2D CONTEXT FIRST";
		}
	}
	setFill(color) {
		this.context.fillStyle = color;
	}
	setOutline(color) {
		this.context.strokeStyle = outline;
	}
	setLineWidth(width) {
		this.context.lineWidth = width;
	}

	polyShape(poly_shape, stroke, fill) {
		let context = this.context;
		let vertexs = poly_shape.getVertexs();

		context.beginPath();
		context.strokeStyle = stroke || "black";
		
		for (var i = 0; i < vertexs.length; i++) {
			let [x, y] = [ vertexs[i].getX(), vertexs[i].getY() ];
			if( i == 0) {
				context.moveTo(x, y);
			} else {
				context.lineTo(x, y);
			}
		}
		
		if(vertexs.length > 0) {
			context.lineTo(vertexs[0].getX(), vertexs[0].getY());
		}
		if( fill ) {
			context.fillStyle = fill;
			context.fill();
		}		
		context.stroke();
		context.closePath();
	}

	circleShape(center, circle_shape, stroke, fill) {
		let x = center.getX(), y = center.getY();
		let context = this.context;

		context.beginPath();
		context.strokeStyle = stroke || "black";
		
		context.arc(x, y, circle_shape.getRadius(), 0, 2 * Math.PI, false);
		if( fill ) {
			context.fillStyle = fill;
			context.fill();
		}
		context.stroke();
		context.closePath();
	}

	point( vec , color ) {
		let x = vec.getX(), y = vec.getY();
		let context = this.context;

		context.beginPath();
		context.fillStyle = color || "red";
		context.arc(x, y, 2, 0, 2 * Math.PI, false);
		context.fill();
		context.closePath();
	}
}