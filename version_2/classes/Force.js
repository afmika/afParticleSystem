class Force {
	static gravity(body_a, body_b) {
		let G = 10;
		let m1 = body_a.getMass(),
			m2 = body_b.getMass();
		let dir = Vector.sub(body_a.getLocation(), body_b.getLocation());
		let d = dir.getLength();
		dir = dir.normalize();
		// a -> b
		return dir.times( -G * m1 * m2 / (d * d * d));
	}

	static drag(body, k) {
		return body.getVelocity().times( k );
	}
}