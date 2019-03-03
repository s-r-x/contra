export function Vector(x, y) {
  this.x = x;
  this.y = y;
}

// ^-^ RESET ^-^
Vector.prototype.nil = function() {
  this.x = 0;
  this.y = 0;
  return this;
}

// ^-^ EQUALS ^-^
Vector.prototype.isEquals = function(vector) {
  return this.x === vector.x && this.y === vector.y;  
}
Vector.prototype.isNotEquals = function(vector) {
  return this.x !== vector.x || this.y !== vector.y;
}
Vector.prototype.eq = Vector.prototype.isEquals;
Vector.prototype.notEq = Vector.prototype.isEquals;

// ^-^ ADD ^-^
Vector.prototype.add = function(vector) {
  this.x += vector.x;
  this.y += vector.y;
  return this;
}

// ^-^ SUB ^-^
Vector.prototype.sub = function(vector) {
  this.x -= vector.x;
  this.y -= vector.y;
  return this;
}
Vector.prototype.subtract = Vector.prototype.sub;

// ^-^ MAGNITUDE ^-^
Vector.prototype.mag = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
}
Vector.prototype.magnitude = Vector.prototype.mag;
Vector.prototype.length = Vector.prototype.mag;
Vector.prototype.len = Vector.prototype.mag;

// ^-^ SET MAGNITUDE ^-^
Vector.prototype.setMag = function(newMag) {
  var mag = Math.sqrt(this.x * this.x + this.y * this.y);
  this.x = this.x / mag * newMag;
  this.y = this.y / mag * newMag;
  return this;
}
Vector.prototype.setMagnitude = Vector.prototype.setMag;

// ^-^ MAGNITUDE SQUARE ^-^
Vector.prototype.magSq = function() {
  return this.x * this.x + this.y * this.y;
}
Vector.prototype.magnitudeSq = Vector.prototype.magSq;
Vector.prototype.lengthSq = Vector.prototype.magSq;

// ^-^ ANGLE ^-^
Vector.prototype.angle = function() {
  return Math.atan2(this.y, this.x);
}
Vector.prototype.heading = Vector.prototype.angle;

// ^-^ UNIT VECTOR ^-^
Vector.prototype.norm = function() {
  var mag = this.mag();
  this.x /= mag;
  this.y /= mag;
  return this;
}
Vector.prototype.normalize = Vector.prototype.norm;
Vector.prototype.unit = Vector.prototype.norm;

// ^-^ MULTIPLYING ^-^
Vector.prototype.scale = function(scalar) {
  this.x *= scalar;
  this.y *= scalar;
  return this;
}
Vector.prototype.mult = Vector.prototype.scale;

// ^-^ DIVISION ^-^
Vector.prototype.divide = function(scalar) {
  this.x /= scalar;
  this.y /= scalar;
  return this;
}
Vector.prototype.div = Vector.prototype.divide;

// ^-^ LIMIT ^-^
// limit function is from P5.js library
//https://p5js.org/
Vector.prototype.limit = function(scalar) {
  var mSq = this.magSq();
  if (mSq > scalar * scalar) {
    this.div(Math.sqrt(mSq))
      .mult(scalar);
  }
  return this;
}
Vector.prototype.lim = Vector.prototype.limit;
Vector.prototype.limitX = function(scalar) {
  if(this.x > scalar) {
    this.x = scalar;
  }
  return this;
}
Vector.prototype.limitY = function(scalar) {
  if(this.y > scalar) {
    this.y = scalar;
  }
  return this;
}

// ^-^ DOT PRODUCT ^-^
Vector.prototype.dot = function(vector) {
  return this.x * vector.x + this.y * vector.y;
}
Vector.prototype.dotProduct = Vector.prototype.dot;

// ^-^ CROSS PRODUCT ^-^
Vector.prototype.cross = function(vector) {
  return (this.x * vector.y) - (this.y * vector.x);
}
Vector.prototype.crossProduct = Vector.prototype.cross;

// ^-^ CLONE ^-^ 
Vector.prototype.clone = function() {
  return new Vector(this.x, this.y);
}
Vector.prototype.copy = Vector.prototype.clone;

// ^-^ DISTANCE ^-^
Vector.prototype.distance = function(vector) {
  var deltaX  = this.x - vector.x;
  var deltaY  = this.y - vector.y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}
Vector.prototype.dist = Vector.prototype.distance;

// ^-^ DISTANCE SQUARE ^-^
Vector.prototype.distanceSq = function(vector) {
  var deltaX  = this.x - vector.x;
  var deltaY  = this.y - vector.y;
  return deltaX * deltaX + deltaY * deltaY;
}
Vector.prototype.distSq = Vector.prototype.distanceSq;

// ^-^ ANGLE BETWEEN TWO VECTORS ^-^
Vector.prototype.angle_between = function(vector) {
  return Math.atan2(vector.y - this.y, vector.x - this.x);
}
Vector.prototype.angleBetween = Vector.prototype.angle_between;

// ^-^ ROTATION ^-^
Vector.prototype.rotate = function(angle) {
  var x = this.x;
  var y = this.y;
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  this.x = x * cos - y * sin;
  this.y = x * sin + y * cos;
  return this;
}

// ^-^ RAND ^-^
Vector.prototype.random = function() {
  this.x = Math.random();
  this.y = Math.random();
  return this;
}
Vector.prototype.rand = Vector.prototype.random;

// ^-^ UTILS ^-^
Vector.prototype.toArray = function() {
  return [ this.x, this. y ];
}
Vector.prototype.toObject = function() {
  return { x: this.x, y: this.y };
}
Vector.prototype.toString = function() {
  return this.x + ' ' + this.y;
}

export function toDeg(rad) {
  return 57.29577951308232 * rad;
}
export function toRad(deg) {
  return 0.017453292519943295 * deg;
}

export default Vector;
