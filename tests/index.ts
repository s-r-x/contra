import { expect } from 'chai';
import { Vector } from '../src';

describe('constructor', () => {
  it('should create new vector from point', () => {
    expect(new Vector({ x: 1, y: 2 })).to.deep.eq({ x: 1, y: 2 });
  });
  it('should create new vector from another vector', () => {
    expect(new Vector(Vector.create(1, 2))).to.deep.eq({ x: 1, y: 2 });
  });
  it('should create new vector with primitive x and y arguments', () => {
    expect(new Vector(1, 2)).to.deep.eq({ x: 1, y: 2 });
  });
});
describe('statics', () => {
  describe('create', () => {
    it('should create new vector', () => {
      expect(Vector.create(1, 2)).to.deep.eq({ x: 1, y: 2 });
    });
  });
  describe('fromTuple', () => {
    it('should create new vector from tuple', () => {
      expect(Vector.fromTuple([1, 2])).to.deep.eq({ x: 1, y: 2 });
    });
  });
  describe('fromPoint', () => {
    it('should create new vector from point', () => {
      expect(Vector.fromPoint({ x: 1, y: 2 })).to.deep.eq({ x: 1, y: 2 });
    });
    it('should create new vector from another vector', () => {
      expect(Vector.fromPoint(Vector.create(1, 2))).to.deep.eq({ x: 1, y: 2 });
    });
  });
  describe('random', () => {
    it('should create new vector with random x and y components', () => {
      const vec = Vector.random();
      expect(typeof vec.x).to.eq('number');
      expect(typeof vec.y).to.eq('number');
    });
    it('should create new vector with random x and y components, when min and max props have been passed', () => {
      const min = 5,
        max = 10;
      const vec = Vector.random(min, max);
      (['x', 'y'] as ['x', 'y']).forEach(p => {
        expect(vec[p]).to.be.lessThanOrEqual(max);
        expect(vec[p]).to.be.greaterThanOrEqual(min);
      });
    });
  });
  describe('zero', () => {
    it('should create new vector with 0,0 x/y components', () => {
      expect(Vector.zero()).to.deep.eq({ x: 0, y: 0 });
    });
  });
});
describe('methods', () => {
  describe('add', () => {
    it('should add scalar', () => {
      expect(Vector.create(1, 2).add(1)).to.deep.eq({ x: 2, y: 3 });
    });
    it('should add another vector', () => {
      expect(Vector.create(1, 2).add({ x: 5, y: 6 })).to.deep.eq({
        x: 6,
        y: 8,
      });
    });
  });
  describe('addX', () => {
    it('should add x component', () => {
      expect(Vector.create(1, 2).addX(3)).to.deep.eq({
        x: 4,
        y: 2,
      });
    });
  });
  describe('addY', () => {
    it('should add y component', () => {
      expect(Vector.create(1, 2).addY(3)).to.deep.eq({
        x: 1,
        y: 5,
      });
    });
  });
  describe('angle', () => {
    it('should return angle in radians', () => {
      expect(Vector.create(0, 45).angle()).to.eq(1.5707963267948966);
    });
    it('should return angle in degrees', () => {
      expect(Vector.create(0, 45).angle(true)).to.eq(90);
    });
  });
  describe('angleBetween', () => {
    it('should return angle in radians', () => {
      expect(Vector.create(0, 0).angleBetween({ x: 90, y: 90 })).to.eq(
        0.7853981633974483
      );
    });
    it('should return angle in degrees', () => {
      expect(Vector.create(0, 0).angleBetween({ x: 90, y: 90 }, true)).to.eq(
        45
      );
    });
  });
  describe('cross', () => {
    it('should return cross product', () => {
      expect(Vector.create(10, 20).cross({ x: 5, y: 15 })).to.eq(50);
    });
  });
  describe('clone', () => {
    it('should clone vector', () => {
      const vec = Vector.create(1, 2);
      const vec2 = vec.clone();
      expect(vec).to.not.eq(vec2);
      expect(vec.eq(vec2)).to.be.true;
    });
  });
  describe('dist', () => {
    it('should return distance between two vectors', () => {
      expect(Vector.create(1, 10).dist({ x: 1, y: 20 })).to.eq(10);
    });
  });
  describe('distSq', () => {
    it('should return squared distance between two vectors', () => {
      expect(Vector.create(2, 15).distSq({ x: 2, y: 20 })).to.eq(25);
    });
  });
  describe('div', () => {
    it('should divide vector by scalar', () => {
      expect(Vector.create(2, 4).div(2)).to.deep.eq({ x: 1, y: 2 });
    });
    it('should divide vector by another vector', () => {
      expect(Vector.create(4, 9).div({ x: 2, y: 3 })).to.deep.eq({
        x: 2,
        y: 3,
      });
    });
  });
  describe('divX', () => {
    it('should divide x component', () => {
      expect(Vector.create(10, 5).divX(5)).to.deep.eq({ x: 2, y: 5 });
    });
  });
  describe('divY', () => {
    it('should divide y component', () => {
      expect(Vector.create(10, 5).divY(5)).to.deep.eq({ x: 10, y: 1 });
    });
  });
  describe('dot', () => {
    it('should calculate dot product', () => {
      expect(Vector.create(1, 2).dot({ x: 3, y: 4 })).to.eq(11);
    });
  });
  describe('eq', () => {
    it('should return true if x and y components are equal', () => {
      expect(Vector.create(1, 2).eq({ x: 1, y: 2 })).to.be.true;
    });
    it('should return false if x component is different', () => {
      expect(Vector.create(2, 2).eq({ x: 1, y: 2 })).to.be.false;
    });
    it('should return false if y component is different', () => {
      expect(Vector.create(1, 2).eq({ x: 1, y: 3 })).to.be.false;
    });
  });
  describe('length', () => {
    it('should return magnitude', () => {
      expect(Vector.create(0, 10).length()).to.eq(10);
    });
  });
  describe('lengthSq', () => {
    it('should return magnitude squared', () => {
      expect(Vector.create(0, 5).lengthSq()).to.eq(25);
    });
  });
  describe('limit', () => {
    it('should clamp the magnitude', () => {
      expect(Vector.create(0, 10).limit(5).length()).to.eq(5);
    });
    it('should not change x and y components if magnitude is less than max', () => {
      expect(Vector.create(0, 5).limit(6).length()).to.eq(5);
    });
  });
  describe('limitX', () => {
    it('should clamp the x component', () => {
      expect(Vector.create(5, 1).limitX(4)).to.deep.eq({ x: 4, y: 1 });
    });
    it('should not change x component if x is less than max', () => {
      expect(Vector.create(5, 2).limitX(6)).to.deep.eq({ x: 5, y: 2 });
    });
  });
  describe('limitY', () => {
    it('should clamp the y component', () => {
      expect(Vector.create(1, 5).limitY(4)).to.deep.eq({ x: 1, y: 4 });
    });
    it('should not change y component if y is less than max', () => {
      expect(Vector.create(1, 5).limitY(6)).to.deep.eq({ x: 1, y: 5 });
    });
  });
  describe('mul', () => {
    it('should mul vector by scalar', () => {
      expect(Vector.create(3, 4).mul(2)).to.deep.eq({ x: 6, y: 8 });
    });
    it('should multiple vector by another vector', () => {
      expect(Vector.create(4, 5).mul({ x: 2, y: 3 })).to.deep.eq({
        x: 8,
        y: 15,
      });
    });
  });
  describe('mulX', () => {
    it('should multiple x component', () => {
      expect(Vector.create(10, 4).mulX(5)).to.deep.eq({ x: 50, y: 4 });
    });
  });
  describe('mulY', () => {
    it('should multiple y component', () => {
      expect(Vector.create(10, 5).mulY(3)).to.deep.eq({ x: 10, y: 15 });
    });
  });
  describe('notEq', () => {
    it('should return false if x and y components are equal', () => {
      expect(Vector.create(1, 2).notEq({ x: 1, y: 2 })).to.be.false;
    });
    it('should return true if x and y components are not equal', () => {
      expect(Vector.create(1, 3).notEq({ x: 1, y: 2 })).to.be.true;
    });
    it('should return true if x component is different', () => {
      expect(Vector.create(2, 2).notEq({ x: 1, y: 2 })).to.be.true;
    });
    it('should return true if y component is different', () => {
      expect(Vector.create(1, 2).notEq({ x: 1, y: 3 })).to.be.true;
    });
  });
  describe('randomize', () => {
    it('should randomize x and y components', () => {
      const min = 2,
        max = 5;
      const vec = Vector.zero().randomize(min, max);
      (['x', 'y'] as ['x', 'y']).forEach(p => {
        expect(vec[p]).to.be.lessThanOrEqual(max);
        expect(vec[p]).to.be.greaterThanOrEqual(min);
      });
    });
  });
  describe('reset', () => {
    it('should set x and y components to zero', () => {
      expect(Vector.create(1, 2).reset()).to.deep.eq({ x: 0, y: 0 });
    });
  });
  describe('reset', () => {
    it('should set x and y components to zero', () => {
      expect(Vector.create(1, 2).reset()).to.deep.eq({ x: 0, y: 0 });
    });
  });
  describe('rotate', () => {
    it('should rotate vector by angle in radians', () => {
      expect(Vector.create(1, 2).rotate(1)).to.deep.eq({
        x: -1.1426396637476532,
        y: 1.922075596544176,
      });
    });
    it('should rotate vector by angle in degrees', () => {
      expect(Vector.create(1, 2).rotate(45, true)).to.deep.eq({
        x: -0.7071067811865474,
        y: 2.121320343559643,
      });
    });
  });
  describe('setLength', () => {
    it('should set magnitude', () => {
      expect(Vector.create(1, 2).setLength(5).length()).to.eq(5);
    });
  });
  describe('setX', () => {
    it('should set x component', () => {
      expect(Vector.create(1, 2).setX(10)).to.deep.eq({ x: 10, y: 2 });
    });
  });
  describe('setY', () => {
    it('should set y component', () => {
      expect(Vector.create(1, 2).setY(10)).to.deep.eq({ x: 1, y: 10 });
    });
  });
  describe('sub', () => {
    it('should subtract scalar', () => {
      expect(Vector.create(3, 4).sub(1)).to.deep.eq({ x: 2, y: 3 });
    });
    it('should subtract another vector', () => {
      expect(Vector.create(10, 4).sub({ x: 3, y: 2 })).to.deep.eq({
        x: 7,
        y: 2,
      });
    });
  });
  describe('subX', () => {
    it('should subtract x component', () => {
      expect(Vector.create(1, 2).subX(3)).to.deep.eq({
        x: -2,
        y: 2,
      });
    });
  });
  describe('subY', () => {
    it('should subtract y component', () => {
      expect(Vector.create(1, 2).subY(3)).to.deep.eq({
        x: 1,
        y: -1,
      });
    });
  });
  describe('swap', () => {
    it('should swap x and y components with another vector', () => {
      const vec1 = Vector.create(1, 2);
      const vec2 = Vector.create(3, 4).swap(vec1);
      expect(vec1).to.deep.eq({ x: 3, y: 4 });
      expect(vec2).to.deep.eq({ x: 1, y: 2 });
    });
  });
  describe('swapX', () => {
    it('should swap x component with another vector', () => {
      const vec1 = Vector.create(1, 2);
      const vec2 = Vector.create(3, 4).swapX(vec1);
      expect(vec1).to.deep.eq({ x: 3, y: 2 });
      expect(vec2).to.deep.eq({ x: 1, y: 4 });
    });
  });
  describe('swapY', () => {
    it('should swap y component with another vector', () => {
      const vec1 = Vector.create(1, 2);
      const vec2 = Vector.create(3, 4).swapY(vec1);
      expect(vec1).to.deep.eq({ x: 1, y: 4 });
      expect(vec2).to.deep.eq({ x: 3, y: 2 });
    });
  });
  describe('toArray', () => {
    it('should convert vector to array', () => {
      expect(Vector.create(1, 2).toArray()).to.deep.eq([1, 2]);
    });
  });
  describe('toObject', () => {
    it('should convert vector to object', () => {
      expect(Vector.create(1, 2).toObject()).to.deep.eq({ x: 1, y: 2 });
    });
  });
  describe('toJSON', () => {
    it('should convert vector to json', () => {
      expect(Vector.create(1, 2).toJSON()).to.deep.eq({ x: 1, y: 2 });
    });
  });
  describe('toString', () => {
    it('should convert vector to string', () => {
      expect(Vector.create(1, 2).toString()).to.eq('x: 1, y: 2');
    });
  });
  describe('unit', () => {
    it('should normalize vector', () => {
      expect(Math.round(Vector.create(5, 10).unit().length())).to.eq(1);
    });
  });
});
