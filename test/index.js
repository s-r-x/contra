const { Vector, toDeg, toRad } = require('../dist/contra');
const test = require('ava');

let vec1;
let vec2;
test.beforeEach(_ => {
  vec1 = new Vector(2, 3);
  vec2 = new Vector(4, 5);
});
test('init', t => {
  t.is(vec1.x, 2);
  t.is(vec1.y, 3);
});
test('clone', t => {
  t.deepEqual(vec1, vec1.clone());
  t.deepEqual(vec1, vec1.copy());
});
test('reset', t => {
  const expect = new Vector(0, 0);  
  t.deepEqual(expect, vec1.clone().nil());
});
test('equal', t => {
  t.not(vec1.isEquals(vec2));
  t.truthy(vec1.isNotEquals(vec2));
});
test('addition', t => {
  t.deepEqual(vec1.add(vec2), new Vector(6, 8));
});
test('subtraction', t => {
  t.deepEqual(vec2.clone().sub(vec1), new Vector(2, 2));
  t.deepEqual(vec2.subtract(vec1), new Vector(2, 2));
});
test('set magnitude', t => {
  const expect = vec1.clone().norm().mult(5).mag();
  t.is(expect, vec1.setMag(5).mag());
});
test('magnitude', t => {
  const expect = Math.sqrt(Math.pow(vec1.x, 2) + Math.pow(vec1.y, 2));
  t.is(vec1.mag(), expect);
  t.is(vec1.magnitude(), expect);
  t.is(vec1.length(), expect);
});
test('magnitude square', t => {
  const expect = Math.pow(vec1.x, 2) + Math.pow(vec1.y, 2);
  t.is(vec1.magSq(), expect);
  t.is(vec1.magnitudeSq(), expect);
  t.is(vec1.lengthSq(), expect);
});
test('angle', t => {
  t.is(Math.atan2(vec1.y, vec1.x), vec1.angle());
  t.is(Math.atan2(vec1.y, vec1.x), vec1.heading());
});
test('unit vector', t => {
  const mag = vec1.mag();
  const expect = vec1.clone().norm();
  const expect1 = vec1.clone().normalize();
  const expect2 = vec1.clone().unit();
  const unit = new Vector(vec1.x / mag, vec1.y / mag);
  t.deepEqual(expect, unit);
  t.deepEqual(expect1, unit);
  t.deepEqual(expect2, unit);
});
test('mult', t => {
  const expect = new Vector(vec1.x * 2, vec1.y * 2);
  t.deepEqual(vec1.clone().scale(2), expect);
  t.deepEqual(vec1.clone().mult(2), expect);
});
test('division', t => {
  const vec = new Vector(4, 8);
  const expect = new Vector(vec.x / 2, vec.y / 2);
  t.deepEqual(vec.clone().divide(2), expect);
  t.deepEqual(vec.clone().div(2), expect);
});
test('limit', t => {
  const expect = vec1.clone().norm();
  const expect2 = new Vector(5, 10);
  t.deepEqual(vec1.clone().limit(1), expect);
  t.deepEqual(vec1.clone().lim(1), expect);
  t.deepEqual(expect2.clone().limit(100), expect2);
  t.deepEqual(expect2.clone().lim(100), expect2);
});
test('limit x/y', t => {
  const vec = new Vector(100, 50).limitX(5).limitY(10);
  t.deepEqual(vec, new Vector(5, 10));
});
test('dot product', t => {
  const expect = vec1.x * vec2.x + vec1.y * vec2.y;
  t.is(expect, vec1.clone().dot(vec2));
  t.is(expect, vec1.clone().dotProduct(vec2));
});
test('cross product', t => {
  const expect = (vec1.x * vec2.y) - (vec1.y * vec2.x);
  t.is(vec1.cross(vec2), expect);
  t.is(vec1.crossProduct(vec2), expect);
});
test('distance', t => {
  const delta = new Vector(Math.abs(vec1.x - vec2.x), Math.abs(vec1.y - vec2.y));
  const dist = Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2));
  t.is(dist, vec1.distance(vec2));
  t.is(dist, vec1.dist(vec2));
});
test('distance square', t => {
  const delta = new Vector(Math.abs(vec1.x - vec2.x), Math.abs(vec1.y - vec2.y));
  const distSq = Math.pow(delta.x, 2) + Math.pow(delta.y, 2);
  t.is(distSq, vec1.distanceSq(vec2));
  t.is(distSq, vec1.distSq(vec2));
});
test('angle between two vectors', t => {
  const expect = Math.atan2(vec2.y - vec1.y, vec2.x - vec1.x);
  t.is(expect, vec1.angle_between(vec2));
  t.is(expect, vec1.angleBetween(vec2));
});
test('rotate', t => {
  const x = 5, y = 10, a = Math.PI;
  const expect = new Vector(Math.cos(a) * x - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a));
  t.deepEqual(new Vector(5, 10).rotate(a), expect);
});
test('to array', t => {
  const arr = vec1.toArray();
  t.deepEqual([ 2, 3 ], arr);
});
test('to object', t => {
  const obj = vec1.toObject();
  t.deepEqual({ x: 2, y: 3 }, obj);
});
test('to string', t => {
  const str = vec1.toString();
  t.is('2 3', str);
});
test('degress to rad', t => {
  t.is(360, toDeg(Math.PI * 2));
});
test('rad to degree', t => {
  t.is(Math.PI, toRad(180));
});
test('rand', t => {
  const vec = new Vector().rand();
  t.truthy(typeof vec.x === 'number');
  t.truthy(typeof vec.y === 'number');
});
