/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class World {
	constructor(anchor) {
		this.setAnchor(anchor);
		this.bodies = [];
		this.collision = true;
		this.momentum = false;
	}
	
	setMomentum(bool) {
		this.momentum = bool;
	}
	setCollision(bool) {
		this.collision = bool;
	}

	setAnchor(anchor) {
		this.anchor = anchor || new Vector(0, 0);
		console.log("* ANCHOR = ", this.anchor.getStatus(3));
	}

	getBodies() {
		return this.bodies;
	}
	getAnchor() {
		return this.anchor;
	}
	getCollision() {
		return this.collision;
	}
	getMomentum() {
		return this.momentum;
	}

	add(body) {
		body.setLocation(Vector.add( body.getLocation(), this.getAnchor() ));
		this.bodies.push(body);
	}
	each(fun) {
		this.bodies.forEach(p => fun(p));
	}
	eachIndex(fun) {
		let i = 0;
		this.bodies.forEach(p => { 
			fun(i, p);
			i++;
		});
	}

	applyForce(force) {
		this.each(p => {
			p.applyForce(force);
		});
	}

	removeIndex(index) {
		let tab = [];
		this.eachIndex((i, p) => {
			if(i != index) {
				tab.push(p);
			}
		});
		this.bodies = tab;
	}
	
	update( delta_time ) {
		let that = this;
		this.each(p => {
			if( that.collision ) { 
				let other = that.solveCollision(p)
				if( other != null ) {
					let compute_momentum = this.getMomentum();
					if( compute_momentum ) {
						// F = dp / dt = m (dv / dt) = m a
						let m1 = p.getMass(),
							m2 = other.getMass();
						// before collision
						let v1 = p.getVelocity(),
							v2 = other.getVelocity();
						// after collision
						let A = v1.times( (m1 - m2) / (m1 + m2) ),
							B = v2.times( (2 * m2) / (m1 + m2) );
						let v1_f = Vector.add(A, B);

						let _A = v2.times( (m2 - m1) / (m1 + m2) ),
							_B = v1.times( (2 * m1) / (m1 + m2) );
						let v2_f = Vector.add(_A, _B);

						if( ! other.isStatic() ) {
							p.setVelocity(v1_f);
							other.setVelocity(v2_f);
							
						} else {							
							p.setVelocity(v1.times(-1));
						}
					}

					p.collides(true);
				} else {
					p.collides(false);
				}
			}
			p.update( delta_time );
		});
	}

	AABB(box1, box2){
	    var bool = ( (box2.x >= box1.x+box1.width) || (box2.x+box2.width<= box1.x) || (box2.y >= box1.y + box1.height)|| (box2.y + box2.height <= box1.y));
	 	 return !bool;
	}

	solveCollision(body) {
		let collides_with = null;
		this.each(body => {
			
		});

		return collides_with;
	}
}