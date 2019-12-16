/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class Body {
     constructor(location) {
          this.setLocation(location);
          this.setVelocity(new Vector(0, 0));
          this.setAcceleration(new Vector(0,0));
          this.setMass(1); // default mass
          this.setData({});
          this.static = false;
          // this.shape = Shape.Circle(1);
          this.is_colliding = false;
          this.inverseMass = 1;
          this.setDampingFactor(0.999);
     }

     setDampingFactor(damping_factor) {
          this.damping_factor = damping_factor;
     }
     setStatic(_static) {
          this.static = _static;
     }
     isStatic() {
          return this.static;
     }

     applyForce(force) {
          // SHOULD NOT BE CALLED WHEN MULTIPLE
          // FORCE IS APPLIED TO THE BODY

          // single force only
          // f = m a
          // => a = (1/m) f
          let tmp = force.times( this.getInverseMass() );
          this.setAcceleration(Vector.add(this.getAcceleration(), tmp ));
     }
     applyMultipleForces(forces_array) {
          // SHOULD BE called WHEN THERE IS
          // multiple forces AT THE SAME TIME
          let sum = new Vector(0, 0);
          forces_array.forEach(force => {
               sum = Vector.add( sum, force);
          });
          this.applyForce( sum );          
     }
     update( delta_time ) {
          let dt = 1;
          if( delta_time ) {
               dt = delta_time;
          }
          let vel = this.getVelocity();
          let acc = this.getAcceleration();
          // dv/dt= a
          // dv = a dt
          // dv <- dv + a dt
          // dv <- dv * dampingFactor
          let damping_factor = this.getDampingFactor();
          let new_velocity = Vector.add( vel, acc.times(dt) ).times(damping_factor);
          this.setVelocity( new_velocity );
          // dx/dt = v
          // dx = v dt
          // x <- x + dx = x + v dt
          if( ! this.isStatic() ) {
               let loc = this.getLocation();
               this.setLocation( Vector.add(loc, new_velocity.times(dt)) );

               let shape = this.getShape();
               if(shape.getType() != "CIRCLE") {
                    // need to update each vertex position
                    let vertexs = shape.getVertexs();
                    vertexs.forEach(vertex => {
                         let temp = Vector.add(vertex, new_velocity.times(dt));
                         vertex.setX(temp.getX());
                         vertex.setY(temp.getY());
                    });
               }
          }
     }

     setLocation(location) {
          if(! (location instanceof Vector ) ) {
               throw "LOCATION MUST BE A 2D-VECTOR";
          } 
          this.location = location || new Vector(0, 0);     
     }
     setVelocity(velocity) {
          if(! (velocity instanceof Vector ) ) {
               throw "VELOCITY MUST BE A 2D-VECTOR";
          }
          this.velocity = velocity || new Vector(0, 0);     
     }
     setAcceleration(acceleration) {
          if(! (acceleration instanceof Vector ) ) {
               throw "ACCELERATION MUST BE A 2D-VECTOR";
          }
          this.acceleration = acceleration || new Vector(0, 0);  
     }
     setMass(mass) {
          if(mass <= 0) {
               throw EXCEPTION.IS_NEGATIVE_OR_NULL;
          }
          let tmp = parseFloat(mass);
          if(isNaN(tmp)) {
               throw EXCEPTION.NOT_A_NUMBER;
          }
          this.mass = tmp;
          this.inverseMass = 1 / tmp;
     }
     setData(data_obj) {
          this.data = data_obj;
     }
     setShape(shape) {
          this.shape = shape;
     }
     collides(bool) {
          if(bool == undefined) {
               return this.is_colliding;
          }
          this.is_colliding = bool;
     }

     getX() {
          return this.getLocation().x;
     }
     getY() {
          return this.getLocation().y;
     }
     getLocation() {
          return this.location;
     }
     getVelocity() {
          return this.velocity;
     }
     getAcceleration() {
          return this.acceleration;
     }
     getMass() {
          return this.mass;
     }
     getInverseMass() {
          return this.mass;
     }
     getDampingFactor() {
          return this.damping_factor;
     }
     getData() {
          return this.data;
     }
     getShape() {
          return this.shape;
     }
}