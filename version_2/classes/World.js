/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class World {
	constructor(anchor) {
		this.setAnchor(anchor);
		this.bodies = [];

		this.collision = true; // collision detection
		this.momentum = false;

		// this.minVelocity = 0.2;
	}
	
	setEachBodyDampingFactor(damping_factor) {
		this.each(body => {
			body.setDampingFactor(damping_factor);
		});
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
				// check collision
				let collision = that.solveCollision(p)
				if( collision != null ) {
					let compute_momentum = this.getMomentum();
					if( compute_momentum ) {
						//collision.resolveMomentumNoNormals();
						collision.resolveMomentum();
					}

					p.collides(true);
				} else {
					p.collides(false);
				}
			}
			/*
			if(p.getVelocity().getLength() < this.minVelocity ) {
				p.setVelocity(Vector.zero());
			}
			*/
			
			p.update( delta_time );
		});
	}

	AABB(box1, box2){
	    var bool = ( (box2.x >= box1.x+box1.width) || (box2.x+box2.width<= box1.x) || (box2.y >= box1.y + box1.height)|| (box2.y + box2.height <= box1.y));
	 	 return !bool;
	}

	solveCollision(body_a) {
		let collision = null;
		this.each(body_b => {
			if(body_b != body_a) {
				collision = Collision.detect(body_a, body_b);
				if( collision != null ) {
					collision.resolvePenetration();
					return;
				}
			}
		});

		return collision;
	}
}