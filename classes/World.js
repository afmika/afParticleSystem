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
					
					if(this.getMomentum()) {
						// F = dp / dt = m (dv / dt) = m a
						/*
						// ONE DIMENSIONAL MODEL (vfinal // vinitial => no change of direction)
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

						p.setVelocity(v1_f);
						other.setVelocity(v2_f);
						*/

						/*
						2Dimensionnal modal
						*/
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

						p.setVelocity(v1_f);
						other.setVelocity(v2_f);
					}

					p.collides(true);
				} else {
					p.collides(false);
				}
			}
			p.update();
		});
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
					if(_a.shape.type == 'CIRCLE') {
						let dist = Vector.sub(_b.pos, _a.pos).getLength();
						if(Math.round(dist) <= (_a.shape.radius + _b.shape.radius)) {
							collides_with = p;
							//debugger
							return;
						}
					}
				} 
			}
		});

		return collides_with;
	}
}