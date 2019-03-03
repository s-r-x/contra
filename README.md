# Contra

> A Swiss army knife for 2D vectors math

## Getting started

```bash
npm install contra.js
```

```javascript
import Vector, { toDeg, ToRad } from 'contra.js';
// or
const { Vector, toDeg, toRad } = require('contra.js');


// ^-^ create ^-^
const vec = new Vector(4, 2);
const vec2 = new Vector(2, 4);

// ^-^ equality check ^-^
vec.isEquals(vec2);
vec.isNotEquals(vec2);

// ^-^ add ^-^
vec.add(vec2);

// ^-^ subtract ^-^
vec.sub(vec2);

// ^-^ multiply ^-^
vec.mult(5);
// aliases:
// * vec.scale

// ^-^ divide ^-^
vec.div(2)
// aliases:
// * vec.divide

// ^-^ get magnitude ^-^
vec.mag();
// aliases:
// * vec.magnitude
// * vec.length
// * vec.len

// ^-^ set magnitude ^-^
vec.setMag(10)
// aliases:
// * vec.setMagnitude

// ^-^ get square of magnitude(sqrt is slow, you might don't need it) ^-^
vec.magSq();
// aliases:
// * vec.magnitudeSq
// * vec.lengthSq

// ^-^ get angle ^-^
vec.angle();
// aliases:
// * vec.heading

// ^-^ normalize ^-^
vec.norm();
// aliases:
// * vec.normalize
// * vec.unit

// ^-^ limit the magnitude ^-^
vec.limit(10);
// aliases:
// * vec.lim

// ^-^ limit the x component ^-^
vec.limitX(3);

// ^-^ limit the y component ^-^
vec.limitY(8);

// ^-^ dot product ^-^
vec.dot(vec2);
// aliases:
// * vec.dotProduct

// ^-^ cross product with another vector. returns scalar ^-^
vec.cross(vec2);
// aliases:
// * vec.crossProduct

// ^-^ clone ^-^
vec1.clone() === vec1;
// aliases:
// * vec1.copy

// ^-^ distance between two vectors ^-^
vec1.distance(vec2);
// aliases:
// * vec1.dist

// ^-^ get square of distance between two vectors ^-^
vec1.distanceSq(vec2);
// aliases:
// * vec1.distSq

// ^-^ angle between two vectors ^-^
vec1.angleBetween(vec2);
// aliases:
// * vec1.angle_between

// ^-^ rotate the vector ^-^
vec1.rotate(Math.PI);

// ^-^ randomize x and y components with values from 0 to 1
vec1.random();
// aliases:
// * vec1.rand

// set x and y components to zero
vec1.nil();

// ^-^ some tiny utils ^-^
const vec3 = new Vector(1, 2);
vec3.toArray();
// -> [ 1, 2 ]
vec3.toObject();
// -> { x: 1, y: 2 }
vec3.toString();
// -> '1 2'

// every operation that returns a vector is chainable e.g.
// new Vector(1, 2).sub(new Vector(3, 4)).norm().mult(3).mag();
// all angle operations expect input to be in radians. you can convert it 
// from degrees like so -> toRad(90)
```
