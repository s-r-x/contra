/**
 * Convert from radians to degrees
 * @example
 * ```ts
 *radToDeg(Math.PI);
 * ```
 */
export function radToDeg(radians: number): number {
  return 57.29577951308232 * radians;
}
/**
 * Convert from degrees to radians
 * @example
 * ```ts
 *degToRad(90);
 * ```
 */
export function degToRad(degrees: number): number {
  return 0.017453292519943295 * degrees;
}

/**
 * Generate random number between min and max
 * @example
 * ```ts
 *random(0, 100);
 * ```
 */
export function random(min: number, max: number): number {
  if (!min && !max) return 0;
  return Math.floor(Math.random() * (max - min + 1) + min);
}
