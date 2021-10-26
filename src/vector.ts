import type { IPoint } from './typings';
import { random } from './utils';

export class Vector {
  public x: number;
  public y: number;
  /**
   *
   * Create a new vector with 0,0 x/y components
   * @example
   * ```ts
   * const vec = Vector.zero();
   * ```
   */
  public static zero(): Vector {
    return new Vector(0, 0);
  }
  /**
   *
   * Create a new vector from tuple
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
   * Create a new vector from point
   * @example
   * ```ts
   * const vec = Vector.create({x: 1, y: 1});
   * ```
   */
  public static fromPoint(point: IPoint): Vector {
    return new Vector(point);
  }
  /**
   *
   * Create a new vector
   * @example
   * ```ts
   * const vec = Vector.create(Vector.create(1, 2));
   * ```
   */
  public static create(x: number, y: number): Vector {
    return new Vector(x, y);
  }
  constructor(x: number, y: number);
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
   *
   * Compare x and y components with another vector
   * @returns true if vectors are equal, false otherwise
   * @example
   * ```ts
   *Vector.create(1, 2).eq({x:1,y:2});
   * // true
   * ```
   * @example
   * ```ts
   *Vector.create(1, 1).eq(Vector.create(1, 2));
   * //false
   * ```
   */
  public eq(point: IPoint): boolean {
    return this.x === point.x && this.y === point.y;
  }
  /**
   *
   * Compare x and y components with another vector
   * @returns false if vectors are equal, true otherwise
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
    return this.x !== point.x || this.y !== point.y;
  }
  /**
   * Set x and y components to 0
   * @example
   * ```ts
   * vec.reset()
   * ```
   */
  public reset(): this {
    this.x = 0;
    this.y = 0;
    return this;
  }
  /**
   * Add x and y components of another vector
   * @example
   * ```ts
   *vec.add({x:1,y:1});
   * ```
   * @example
   * ```ts
   *vec.add(Vector.create(1, 2));
   * ```
   */
  public add(point: IPoint): this {
    this.x += point.x;
    this.y += point.y;
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
  public sub(point: IPoint): this {
    this.x -= point.x;
    this.y -= point.y;
    return this;
  }
  /**
   * Get a magnitude of a vector
   * {@link https://chortle.ccsu.edu/vectorlessons/vch04/vch04_4.html#:~:text=The%20formula%20for%20the%20length,its%20tail%20at%20the%20origin.}
   */
  public length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * Get square of a magnitude of a vector.
   * Performs faster than length(), because there is no Math.sqrt involved
   * {@link https://chortle.ccsu.edu/vectorlessons/vch04/vch04_4.html#:~:text=The%20formula%20for%20the%20length,its%20tail%20at%20the%20origin.}
   */
  public lengthSq(): number {
    return this.x * this.x + this.y * this.y;
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
  public angle(): number {
    return Math.atan2(this.y, this.x);
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
    this.x /= mag;
    this.y /= mag;
    return this;
  }
  /**
   * Multiple x and y components by another vector
   * @example
   * ```ts
   *vec.mul({x:1,y:1});
   * ```
   * @example
   * ```ts
   *vec.mul(Vector.create(1, 2));
   * ```
   */
  public mul(scalar: number): this {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }
  /**
   * Divide x and y components by another vector
   * @example
   * ```ts
   *vec.div({x:1,y:1});
   * ```
   * @example
   * ```ts
   *vec.div(Vector.create(1, 2));
   * ```
   */
  public div(scalar: number): this {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }
  /**
   * @example
   * ```ts
   *vec.limit(1);
   */
  public limit(scalar: number): this {
    const mSq = this.lengthSq();
    if (mSq > scalar * scalar) {
      this.div(Math.sqrt(mSq)).mul(scalar);
    }
    return this;
  }
  /**
   * @example
   * ```ts
   *vec.limitX(1);
   */
  public limitX(scalar: number): this {
    if (this.x > scalar) {
      this.x = scalar;
    }
    return this;
  }
  /**
   * @example
   * ```ts
   *vec.limitY(1);
   */
  public limitY(scalar: number): this {
    if (this.y > scalar) {
      this.y = scalar;
    }
    return this;
  }
  /**
   *
   * Calculate the dot product
   * {@link https://www.mathsisfun.com/algebra/vectors-dot-product.html}
   * @example
   * ```ts
   *vec.dot({x:1,y:1});
   * ```
   * @example
   * ```ts
   *vec.dot(Vector.create(1, 2));
   * ```
   */
  public dot(point: IPoint): number {
    return this.x * point.x + this.y * point.y;
  }
  /**
   *
   * Calculate the cross product
   * @example
   * ```ts
   *vec.cross({x:1,y:1});
   * ```
   * @example
   * ```ts
   *vec.cross(Vector.create(1, 2));
   * ```
   */
  public cross(point: IPoint): number {
    return this.x * point.y - this.y * point.x;
  }
  /**
   *
   * Create a new vector using x and y components of the vector
   * @example
   * ```ts
   *const newVec = oldVec.clone();
   * ```
   */
  public clone(): Vector {
    return new Vector(this.x, this.y);
  }
  /**
   *
   * Get distance between two vectors
   * @example
   * ```ts
   *vec.dist({x:1,y:1});
   * ```
   * @example
   * ```ts
   *vec.dist(Vector.create(1, 2));
   */
  public dist(point: IPoint): number {
    const deltaX = this.x - point.x;
    const deltaY = this.y - point.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }
  /**
   * Get square of a distance between two vectors.
   * Performs faster than dist(), because there is no Math.sqrt involved
   * @example
   * ```ts
   *vec.distSq({x:1,y:1});
   * ```
   * @example
   * ```ts
   *vec.distSq(Vector.create(1, 2));
   */
  public distSq(point: IPoint): number {
    const deltaX = this.x - point.x;
    const deltaY = this.y - point.y;
    return deltaX * deltaX + deltaY * deltaY;
  }
  /**
   * Get the angle between two vectors
   * @example
   * ```ts
   *vec.angleBetween({x:1,y:1});
   * ```
   * @example
   * ```ts
   *vec.angleBetween(Vector.create(1, 2));
   */
  public angleBetween(point: IPoint): number {
    return Math.atan2(point.y - this.y, point.x - this.x);
  }
  /**
   * Rotate the vector by angle
   * @param angle - angle in radians
   * @example
   * ```ts
   *vec.rotate(Math.PI);
   */
  public rotate(angle: number): this {
    const x = this.x;
    const y = this.y;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    this.x = x * cos - y * sin;
    this.y = x * sin + y * cos;
    return this;
  }
  /**
   * Randomize x and y components of the vector
   * @param min - min random value
   * @param max - max random value
   * @example
   * ```ts
   *vec.randomize(0, 100);
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
   *vec.randomizeX(0, 100);
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
   *vec.randomizeY(0, 100);
   */
  public randomizeY(min = 0, max = 100): this {
    this.y = random(min, max);
    return this;
  }
  /**
   * Convert vector to array
   * @example
   * ```ts
   * Vector.create(1, 2).toArray()
   * // [1, 2]
   */
  public toArray(): [number, number] {
    return [this.x, this.y];
  }
  /**
   * Convert vector to object
   * @example
   * ```ts
   * Vector.create(1, 2).toObject()
   * // {x: 1, y: 2 }
   */
  public toObject(): IPoint {
    return { x: this.x, y: this.y };
  }
  /**
   * Convert vector to JSON
   * @example
   * ```ts
   * Vector.create(1, 2).toJSON()
   * // {x: 1, y: 2 }
   */
  public toJSON(): IPoint {
    return this.toObject();
  }
  /**
   * Convert vector to string
   * @example
   * ```ts
   * Vector.create(1, 2).toString()
   * // 1 2
   */
  public toString(): string {
    return this.x + ' ' + this.y;
  }
}
