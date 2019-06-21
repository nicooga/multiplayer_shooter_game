import Vector from '@lib/Vector'
import Quaternion from '@lib/Quaternion'

export default class Projectile {
  position: Vector = new Vector();
  direction: Vector = new Vector();
  rotation: Quaternion = new Quaternion();

  // This is tricky and redundant AF.
  // Sadly, the `public` keyword does not work with destructuring and that's a
  // long standing issue: https://github.com/Microsoft/TypeScript/issues/5326
  constructor(
    { position, direction, rotation } :
    { position?: Vector, direction?: Vector, rotation: Quaternion } =
    { position: new Vector(), direction: new Vector(), rotation: new Quaternion() }) {
    this.position = position || this.position
    this.direction = direction || this.direction
    this.rotation = rotation || this.rotation
  }
}
