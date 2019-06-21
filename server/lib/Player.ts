import Vector from './Vector'
import Projectile from './Projectile'

export default class Player {
  position: Vector = new Vector();
  projectiles: {[sessionId: string]: Projectile} = {};
}
