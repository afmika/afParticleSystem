/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class World {
	constructor(anchor) {
		this.setAnchor(anchor);
		this.particles = [];
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

	getParticles() {
		return this.particles;
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

	add(particle) {
		particle.setLocation(Vector.add( particle.getLocation(), this.getAnchor() ));
		this.particles.push(particle);
	}
	each(fun) {
		/*
			Ex: 
			ParticleSystem.each(particle => {
				draw(particle);
			});
		*/
		this.particles.forEach(p => fun(p));
	}
	eachIndex(fun) {
		/*
			Ex: 
			ParticleSystem.eachIndex((index, particle) => {
				draw(particle);
				console.log("Particle n_ "+index);
			});
		*/
		let i = 0;
		this.particles.forEach(p => { 
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
		this.particles = tab;
	}
	
	update() {
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
			p.update();
		});
	}

	AABB(box1, box2){
	    var bool = ( (box2.x >= box1.x+box1.width) || (box2.x+box2.width<= box1.x) || (box2.y >= box1.y + box1.height)|| (box2.y + box2.height <= box1.y));
	 	 return !bool;
	}

	solveCollision(body) {
		let collides_with = null;
		this.each(p => {
			if(p != body) {
				let _a = {
					pos : p.getLocation(),
					shape: p.getShape()
				};
				let _b = {
					pos : body.getLocation(),
					shape: body.getShape()
				};
				// x,y is always defined as the center of gravity
				if(_a.shape.type == _b.shape.type) {
					// CIRCLE VS CIRCLE
					if(_a.shape.type == 'CIRCLE') {
						let dist = Vector.sub(_b.pos, _a.pos).getLength();
						if(Math.round(dist) <= (_a.shape.radius + _b.shape.radius)) {
							collides_with = p;
							//debugger
							return;
						}
					}
					
					// BOX VS BOX
					if(_a.shape.type == 'SQUARE') {
						let aa = {
							x: _a.pos.x, 
							y: _a.pos.y,
							width: _a.shape.dim.x,
							height: _a.shape.dim.y
						};
						let bb = {
							x: _b.pos.x, 
							y: _b.pos.y,
							width: _b.shape.dim.x,
							height: _b.shape.dim.y
						};
						
						if( this.AABB(aa, bb) ) {
							collides_with = p;
							// debugger
							return;
						}
					}					
				} 


				// BOX VS CIRCLE
				if(_a.shape.type == 'SQUARE' && _b.shape.type == 'CIRCLE') {
					let aa = {
						x: _a.pos.x, 
						y: _a.pos.y,
						width: _a.shape.dim.x,
						height: _a.shape.dim.y
					};
					let bb = {
						x: _b.pos.x - _b.shape.radius,
						y: _b.pos.y - _b.shape.radius,
						width : _b.shape.radius * 2,
						height : _b.shape.radius * 2
					};
					
					if( this.AABB(aa, bb) ) {
						collides_with = p;
						// debugger
						return;
					}
				} 


			}
		});

		return collides_with;
	}
}