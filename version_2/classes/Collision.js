/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class Collision {
	constructor(bodies, depth, normal) {
		this.bodies = bodies || [];
		this.depth = depth || [];
		this.normal = normal || [];
		this.correction_rate = 1.2;
	}

	resolvePenetration() {
		let a = this.bodies[0],
			b = this.bodies[1];

		let a_inv_mass = a.getInverseMass();
		let b_inv_mass = b.getInverseMass();

		let length = this.correction_rate * (this.depth / (a_inv_mass + b_inv_mass));
		let correctionAmount = this.normal.times( length );
		
		let correction_a = correctionAmount.times(-a_inv_mass),
			correction_b = correctionAmount.times(b_inv_mass);

		let new_loc_a = Vector.add(a.getLocation(), correction_a),
			new_loc_b = Vector.add(b.getLocation(), correction_b);

		a.setLocation(new_loc_a);
		b.setLocation(new_loc_b);
	}
	resolveMomentumNoNormals() {
		let p = this.bodies[0],
			other = this.bodies[1];
			
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
	resolveMomentum() {
		let a = this.bodies[0],
			b = this.bodies[1];

		let a_inv_mass = a.getInverseMass();
		let b_inv_mass = b.getInverseMass();		
		// TODO
		// Body restitution + 
		// FUCK

		let n = this.normal;
		let v1 = a.getVelocity();
		let v2 = b.getVelocity();

		let relativeVelocity = Vector.sub(v2, v1);

		// Relative velocity in normal direction
		let rVelocityInNormal = Vector.dot(relativeVelocity, n);

		// if objects moving apart ignore
		if (rVelocityInNormal > 0) {
			// alert("APART")
		   	return;			
		}

		// compute and apply response impulses for each object    
	  	let newRestituion = Math.min(a.getRestitution(), b.getRestitution());
		let newFriction = Math.min(a.getFriction(), b.getFriction());

		// Calc impulse scalar
		let jN = -(1 + newRestituion) * rVelocityInNormal / (a_inv_mass + b_inv_mass);
		
		//impulse is in direction of normal ( from s1 to s2)
		let impulse = n.times(jN);
		// impulse = F dt = m * dv
		// dv = impulse / m

		a.setVelocity( Vector.sub(a.getVelocity(), impulse.times(a_inv_mass)) );
		b.setVelocity( Vector.add(b.getVelocity(), impulse.times(b_inv_mass)) );

		let tangent = Vector.sub(
			relativeVelocity, 
			n.times(Vector.dot(relativeVelocity, n))
		);
		// relativeVelocity.dot(tangent) should less than 0
		tangent = tangent.normalize().times(-1);

		let jT = -(1 + newRestituion) * Vector.dot(relativeVelocity, tangent) * newFriction;
			jT = jT / (a_inv_mass + b_inv_mass);

		// friction should be less than force in normal direction
		if (jT > jN) 
				jT = jN;
	
		
		//impulse is from s1 to s2 (in opposite direction of velocity)
		impulse = tangent.times(jT);

		//alert(impulse.getStatus());
		//alert(Vector.add(a.getVelocity(), impulse.times(a_inv_mass)).getStatus() + " et " +Vector.sub(b.getVelocity(), impulse.times(b_inv_mass)).getStatus() )
		a.setVelocity( Vector.add(a.getVelocity(), impulse.times(a_inv_mass)) );
		b.setVelocity( Vector.sub(b.getVelocity(), impulse.times(b_inv_mass)) );
	}

	static detect(a, b) {
		let shape_a = a.getShape();
		let shape_b = b.getShape();

		let depth = 0;
		let normal = 0;


		// circle VS circle
		if(shape_a instanceof CircleShape && shape_b instanceof CircleShape) {
			// normal
			let direction = Vector.sub(b.getLocation(), a.getLocation());
			let dist = direction.getLength();
			let sum_R = shape_a.getRadius() + shape_b.getRadius();
			if(dist < sum_R) {
				depth = sum_R - dist;
				normal = direction.normalize();
				return new Collision([a, b], depth, normal);
			}
		}
		return null;
	}
}