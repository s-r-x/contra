import type { IPoint } from './typings';
import { degToRad, radToDeg, random } from './utils';

export class Vector {
  public x: number;
  public y: number;
  /**
   * Create a new vector
   * @example
   * ```ts
   * const vec = Vector.create(1, 2);
   * ```
   */
  public static create(x: number, y: number): Vector {
    return new Vector(x, y);
  }
  /**
   *
   * Create a new vector from a tuple
   * @example
   * ```ts
   * const vec = Vector.fromTuple([1, 2]);
   * ```
   */
  public static fromTuple([x, y]: [x: number, y: number]): Vector {
    return new Vector(x, y);
  }
  /**
   *
   * Create a new vector from a point
   * @example
   * ```ts
   * const vec = Vector.fromPoint({x: 1, y: 1});
   * ```
   */
  public static fromPoint(point: IPoint): Vector {
    return new Vector(point);
  }
  /**
   * Create a new vector with random x and y components
   * @param min - min random value
   * @param max - max random value
   * @example
   * ```ts
   * const vec = Vector.random(0, 100);
   * ```
   */
  public static random(min = 0, max = 100): Vector {
    return Vector.zero().randomize(min, max);
  }
  /**
   *
   * Create a new vector with 0,0 x and y components
   * @example
   * ```ts
   * const vec = Vector.zero();
   * ```
   */
  public static zero(): Vector {
    return new Vector(0, 0);
  }
  /**
   * @example
   * ```ts
   * const vec = new Vector(1, 2);
   * ```
   */
  constructor(x: number, y: number);
  /**
   * @example
   * ```ts
   * const vec = new Vector({x: 1, y: 2});
   * ```
   * @example
   * ```ts
   * const vec = new Vector(anotherVec);
   * ```
   */
  constructor(point: IPoint);
  constructor(x: number | IPoint = 0, y = 0) {
    if (typeof x === 'object') {
      this.x = x.x || 0;
      this.y = x.y || 0;
    } else {
      this.x = x;
      this.y = y;
    }
  }
  /**
   * Add x and y components of another vector
   * @example
   * ```ts
   *vec.add({x: 1,y: 1});
   * ```
   * @example
   * ```ts
   *vec.add(anotherVec);
   * ```
   */
  public add(point: IPoint): this;
  /**
   * Add scalar to x and y components
   * @example
   * ```ts
   *vec.add(1);
   * ```
   */
  public add(scalar: number): this;
  public add(scalarOrPoint: IPoint | number): this {
    if (typeof scalarOrPoint === 'object') {
      this.x += scalarOrPoint.x;
      this.y += scalarOrPoint.y;
    } else {
      this.x += scalarOrPoint;
      this.y += scalarOrPoint;
    }
    return this;
  }
  /**
   * Add value to the x component
   * @example
   * ```ts
   *vec.addX(1);
   * ```
   */
  public addX(x: number): this {
    this.x += x;
    return this;
  }
  /**
   * Add value to the y component
   * @example
   * ```ts
   *vec.addY(1);
   * ```
   */
  public addY(y: number): this {
    this.y += y;
    return this;
  }
  /**
   * Get the angle of rotation of the vector
   * @param degrees - return angle in degrees instead of radians
   * @example
   * ```ts
   *vec.angle();
   * ```
   * @example
   * ```ts
   *vec.angle(true);
   * ```
   * @returns angle in radians, or in degrees if degrees param is true
   */
  public angle(degrees?: boolean): number {
    const angle = Math.atan2(this.y, this.x);
    return degrees ? radToDeg(angle) : angle;
  }
  /**
   * Set the angle of rotation of the vector
   * @param degrees - use degrees instead of radians
   * @example
   * ```ts
   *vec.setAngle(Math.PI);
   * ```
   * @example
   * ```ts
   *vec.setAngle(90, true);
   * ```
   */
  public setAngle(angle: number, degrees?: boolean): this {
    if (degrees) {
      angle = degToRad(angle);
    }
    const len = this.length();
    this.x = len * Math.cos(angle);
    this.y = len * Math.sin(angle);
    return this;
  }
  /**
   * Get the angle between two vectors
   * @param degrees - return angle in degrees instead of radians
   * @example
   * ```ts
   *vec.angleBetween({x: 1,y: 1});
   * ```
   * @example
   * ```ts
   *vec.angleBetween(anotherVec);
   * ```
   * @example
   * ```ts
   *vec.angleBetween(anotherVec, true);
   * ```
   * @returns angle in radians, or in degrees if degrees param is true
   */
  public angleBetween(point: IPoint, degrees?: boolean): number {
    const angle = Math.atan2(point.y - this.y, point.x - this.x);
    return degrees ? radToDeg(angle) : angle;
  }
  /**
   *
   * Create a new vector using x and y components of the vector
   * @example
   * ```ts
   *const oldVec = new Vector(1, 2);
   *const newVec = oldVec.clone();
   *oldVec === newVec
   * // false
   *oldVec.eq(newVec)
   * // true
   * ```
   * @returns new Vector instance
   */
  public clone(): Vector {
    return new Vector(this.x, this.y);
  }
  /**
   * The cross product of 2D vectors results in a 3D vector with only a z component.
   * @returns the magnitude of the z value
   * @example
   * ```ts
   *vec.cross({x:1,y:1});
   * ```
   * @example
   * ```ts
   *vec.cross(anotherVec);
   * ```
   */
  public cross(point: IPoint): number {
    return this.x * point.y - this.y * point.x;
  }
  /**
   *
   * Get the Euclidean distance between two vectors
   * @example
   * ```ts
   *vec.dist({x:1,y:1});
   * ```
   * @example
   * ```ts
   *vec.dist(anotherVec);
   * ```
   */
  public dist(point: IPoint): number {
    return Math.sqrt(this.distSq(point));
  }
  /**
   * Get the square of the Euclidean distance between two vectors.
   * @remarks
   * Performs faster than dist(), because there is no Math.sqrt involved
   * @example
   * ```ts
   *vec.distSq({x:1,y:1});
   * ```
   * @example
   * ```ts
   *vec.distSq(anotherVec);
   * ```
   * @example
   * ```ts
   *Math.sqrt(vec.distSq(anotherVec)) === vec.dist(anotherVec);
   * // true
   * ```
   */
  public distSq(point: IPoint): number {
    const deltaX = this.x - point.x;
    const deltaY = this.y - point.y;
    return deltaX * deltaX + deltaY * deltaY;
  }
  /**
   * Divide x and y components by x and y components of another vector, e.g. v1.x / v2.x, v1.y / v2.y
   * @example
   * ```ts
   *vec.div({x: 1, y: 2});
   * ```
   * @example
   * ```ts
   *vec.div(anotherVec);
   * ```
   */
  public div(point: IPoint): this;
  /**
   * Divide x and y components by a scalar
   * @example
   * ```ts
   *vec.div(2);
   * ```
   */
  public div(scalar: number): this;
  public div(scalarOrPoint: IPoint | number): this {
    if (typeof scalarOrPoint === 'object') {
      this.x /= scalarOrPoint.x;
      this.y /= scalarOrPoint.y;
    } else {
      this.x /= scalarOrPoint;
      this.y /= scalarOrPoint;
    }
    return this;
  }
  /**
   * Divide the x component by a scalar
   * @example
   * ```ts
   *vec.divX(2);
   * ```
   */
  public divX(scalar: number): this {
    this.x /= scalar;
    return this;
  }
  /**
   * Divide the y component by a scalar
   * @example
   * ```ts
   *vec.divY(2);
   * ```
   */
  public divY(scalar: number): this {
    this.y /= scalar;
    return this;
  }
  /**
   *
   * Calculate the dot product
   *
   * {@link https://www.mathsisfun.com/algebra/vectors-dot-product.html}
   * @example
   * ```ts
   *vec.dot({x:1,y:1});
   * ```
   * @example
   * ```ts
   *vec.dot(anotherVec);
   * ```
   */
  public dot(point: IPoint): number {
    return this.x * point.x + this.y * point.y;
  }
  /**
   *
   * Compare x and y components with another vector
   * @returns true if x and y components are equal, false otherwise
   * @example
   * ```ts
   *Vector.create(1, 2).eq({x:1,y:2});
   * // true
   * ```
   * @example
   * ```ts
   *Vector.create(1, 1).eq(Vector.create(1, 2));
   * // false
   * ```
   */
  public eq(point: IPoint): boolean {
    return this.x === point.x && this.y === point.y;
  }
  /**
   * Get the magnitude of the vector
   *
   * {@link https://chortle.ccsu.edu/vectorlessons/vch04/vch04_4.html}
   * @example
   * ```ts
   *vec.length();
   * ```
   */
  public length(): number {
    return Math.sqrt(this.lengthSq());
  }
  /**
   * Get the square of the magnitude of the vector.
   *
   * {@link https://chortle.ccsu.edu/vectorlessons/vch04/vch04_4.html}
   * @remarks
   * Performs faster than length(), because there is no Math.sqrt involved
   * @example
   * ```ts
   *vec.lengthSq();
   * ```
   * @example
   * ```ts
   *Math.sqrt(vec.lengthSq()) === vec.length();
   * // true
   * ```
   */
  public lengthSq(): number {
    return this.x * this.x + this.y * this.y;
  }
  /**
   * Limit the magnitude of the vector
   * @example
   * ```ts
   *vec.limit(1);
   * ```
   */
  public limit(max: number): this {
    const lenSq = this.lengthSq();
    if (lenSq > max * max) {
      this.div(Math.sqrt(lenSq)).mul(max);
    }
    return this;
  }
  /**
   * Limit the x component of the vector
   * @example
   * ```ts
   *vec.limitX(1);
   * ```
   * @example
   * ```ts
   * Vector.create(10, 1).limitX(5).x;
   * // 5
   * ```
   * @example
   * ```ts
   * Vector.create(10, 1).limitX(15).x;
   * // 10
   * ```
   */
  public limitX(max: number): this {
    if (this.x > max) {
      this.x = max;
    }
    return this;
  }
  /**
   * Limit the y component of the vector
   * @example
   * ```ts
   *vec.limitY(1);
   * ```
   * @example
   * ```ts
   * Vector.create(1, 10).limitY(5).y;
   * // 5
   * ```
   * @example
   * ```ts
   * Vector.create(1, 10).limitY(15).y;
   * // 10
   * ```
   */
  public limitY(max: number): this {
    if (this.y > max) {
      this.y = max;
    }
    return this;
  }
  /**
   * Multiple x and y components by a scalar
   * @example
   * ```ts
   *vec.mul(2);
   * ```
   */
  public mul(scalar: number): this;
  /**
   * Multiple x and y components by x and y components of another vector, e.g. v1.x * v2.x, v1.y * v2.y
   * @example
   * ```ts
   *vec.mul({x: 1, y: 2});
   * ```
   * @example
   * ```ts
   *vec.mul(anotherVec);
   * ```
   */
  public mul(point: IPoint): this;
  public mul(scalarOrPoint: number | IPoint): this {
    if (typeof scalarOrPoint === 'object') {
      this.x *= scalarOrPoint.x;
      this.y *= scalarOrPoint.y;
    } else {
      this.x *= scalarOrPoint;
      this.y *= scalarOrPoint;
    }
    return this;
  }
  /**
   * Multiple the x component by a scalar
   * @example
   * ```ts
   *vec.mulX(2);
   * ```
   */
  public mulX(scalar: number): this {
    this.x *= scalar;
    return this;
  }
  /**
   * Multiple the y component by a scalar
   * @example
   * ```ts
   *vec.mulY(2);
   * ```
   */
  public mulY(scalar: number): this {
    this.y *= scalar;
    return this;
  }
  /**
   *
   * Call .toString() and print the output to the console
   * @example
   * ```ts
   * vec.print();
   * ```
   */
  public print(): this {
    console.log(this.toString());
    return this;
  }
  /**
   *
   * Compare x and y components with another vector
   * @returns false if x and y components are equal, true otherwise
   * @example
   * ```ts
   *Vector.create(1, 2).notEq({x:1,y:2});
   * // false
   * ```
   * @example
   * ```ts
   *Vector.create(1, 1).notEq(Vector.create(1, 2));
   * // true
   * ```
   */
  public notEq(point: IPoint): boolean {
    return !this.eq(point);
  }
  /**
   * Randomize x and y components of the vector
   * @param min - min random value
   * @param max - max random value
   * @example
   * ```ts
   *vec.randomize(0, 100);
   * ```
   */
  public randomize(min = 0, max = 100): this {
    this.randomizeX(min, max);
    this.randomizeY(min, max);
    return this;
  }
  /**
   * Randomize x component of the vector
   * @param min - min random value
   * @param max - max random value
   * @example
   * ```ts
   *vec.randomizeX(0, 100).x;
   * // some number between 0 and 100
   * ```
   */
  public randomizeX(min = 0, max = 100): this {
    this.x = random(min, max);
    return this;
  }
  /**
   * Randomize y component of the vector
   * @param min - min random value
   * @param max - max random value
   * @example
   * ```ts
   *vec.randomizeY(0, 100).y;
   * // some number between 0 and 100
   * ```
   */
  public randomizeY(min = 0, max = 100): this {
    this.y = random(min, max);
    return this;
  }
  /**
   * Set x and y components to 0
   * @example
   * ```ts
   * vec.reset();
   * ```
   */
  public reset(): this {
    this.x = 0;
    this.y = 0;
    return this;
  }
  /**
   * Rotate the vector by an angle
   * @param angle - angle in radians, or in degrees if degrees param is true
   * @param degrees - use degrees instead of radians
   * @example
   * ```ts
   *vec.rotate(Math.PI);
   * ```
   * @example
   * ```ts
   *vec.rotate(90, true);
   * ```
   */
  public rotate(angle: number, degrees?: boolean): this {
    if (degrees) {
      angle = degToRad(angle);
    }
    const x = this.x;
    const y = this.y;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    this.x = x * cos - y * sin;
    this.y = x * sin + y * cos;
    return this;
  }
  /**
   * Set a magnitude of the vector
   * @example
   * ```ts
   *vec.setLength(1);
   * ```
   */
  public setLength(newLength: number): this {
    const length = this.length();
    this.x = (this.x / length) * newLength;
    this.y = (this.y / length) * newLength;
    return this;
  }
  /**
   * Set the x component of the vector
   * @example
   * ```ts
   * vec.setX(5);
   * ```
   */
  public setX(x: number): this {
    this.x = x;
    return this;
  }
  /**
   * Set the y component of the vector
   * @example
   * ```ts
   * vec.setY(5);
   * ```
   */
  public setY(y: number): this {
    this.y = y;
    return this;
  }
  /**
   * Subtract x and y components of another vector
   * @example
   * ```ts
   *vec.sub({x:1,y:1});
   * ```
   * @example
   * ```ts
   *vec.sub(Vector.create(1, 2));
   * ```
   */
  public sub(point: IPoint): this;
  /**
   * Subtract scalar from x and y components
   * @example
   * ```ts
   *vec.sub(1);
   * ```
   */
  public sub(scalar: number): this;
  public sub(scalarOrPoint: IPoint | number): this {
    if (typeof scalarOrPoint === 'object') {
      this.x -= scalarOrPoint.x;
      this.y -= scalarOrPoint.y;
    } else {
      this.x -= scalarOrPoint;
      this.y -= scalarOrPoint;
    }
    return this;
  }
  /**
   * Subtract value from the x component
   * @example
   * ```ts
   *vec.subX(1);
   * ```
   */
  public subX(x: number): this {
    this.x -= x;
    return this;
  }
  /**
   * Subtract value from the y component
   * @example
   * ```ts
   *vec.subY(1);
   * ```
   */
  public subY(y: number): this {
    this.y -= y;
    return this;
  }
  /**
   * Swap x and y components with another vector
   * @example
   * ```ts
   * vec.swap(anotherVector);
   * ```
   */
  public swap(point: IPoint): this {
    const tempX = this.x,
      tempY = this.y;
    this.x = point.x;
    this.y = point.y;
    point.x = tempX;
    point.y = tempY;
    return this;
  }
  /**
   * Swap the x component with another vector
   * @example
   * ```ts
   * vec.swapX(anotherVector);
   * ```
   */
  public swapX(point: IPoint): this {
    const tempX = this.x;
    this.x = point.x;
    point.x = tempX;
    return this;
  }
  /**
   * Swap the x component with another vector
   * @example
   * ```ts
   * vec.swapY(anotherVector);
   * ```
   */
  public swapY(point: IPoint): this {
    const tempY = this.y;
    this.y = point.y;
    point.y = tempY;
    return this;
  }
  /**
   * Convert the vector to array
   * @example
   * ```ts
   * Vector.create(1, 2).toArray()
   * // [1, 2]
   * ```
   */
  public toArray(): [number, number] {
    return [this.x, this.y];
  }
  /**
   * Convert the vector to JSON
   * @example
   * ```ts
   * Vector.create(1, 2).toJSON()
   * // {x: 1, y: 2 }
   * ```
   */
  public toJSON(): IPoint {
    return this.toObject();
  }
  /**
   * Convert the vector to object
   * @example
   * ```ts
   * Vector.create(1, 2).toObject()
   * // {x: 1, y: 2 }
   * ```
   */
  public toObject(): IPoint {
    return { x: this.x, y: this.y };
  }
  /**
   * Convert the vector to string
   * @example
   * ```ts
   * Vector.create(1, 2).toString()
   * // x: 1, y: 2
   * ```
   */
  public toString(): string {
    return 'x: ' + this.x + ', y: ' + this.y;
  }
  /**
   * Normalize the vector
   * {@link https://en.wikipedia.org/wiki/Unit_vector}
   * @example
   * ```ts
   *vec.unit();
   * ```
   */
  public unit(): this {
    const mag = this.length();
    if (mag !== 0) {
      this.mul(1 / this.length());
    }
    return this;
  }
}
