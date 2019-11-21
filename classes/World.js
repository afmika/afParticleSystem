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
	
	update(bool) {
		this.each(p => {
			if( this.collision ) { 
				if( bool || bool == undefined ) {// first priority
					if( this.solveCollision(p) ) {
						p.collides(true);
					} else {
						p.collides(false);
					}
				}
			}
			p.update();
		});
	}

	solveCollision(body) {
		let is_colliding = false;
		this.each(p => {
			if(p != body) {
				let _a = {
					pos : body.getLocation(),
					shape: body.getShape()
				};
				let _b = {
					pos : p.getLocation(),
					shape: body.getShape()
				};
				// x,y is always defined as the center of gravity
				if(_a.shape.type == _b.shape.type) {
					if(_a.shape.type == 'CIRCLE') {
						let dist = Vector.sub(_b.pos, _a.pos).getLength();
						if(dist <= _a.shape.radius + _b.shape.radius) {
							is_colliding = true;
							return;
						}
					}
				} 
			}
		});
		return is_colliding;
	}
}