/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class ParticleSystem {
	constructor(anchor) {
		this.setAnchor(anchor);
		this.particles = [];
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
		this.each(p => {
			p.update();
		});
	}
}