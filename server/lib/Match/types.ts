import BaseAction from '../BaseAction'
import Vector from '../Vector'
import Quaternion from '../Quaternion'

export class Projectile {
  position: Vector;
  direction: Vector;
  rotation: Quaternion;

  constructor({
    position,
    direction,
    rotation
  }: { position: Vector, direction: Vector, rotation: Quaternion }) {
    this.position = position
    this.direction = direction
    this.rotation = rotation
  }
}

export class Player {
  position: Vector = new Vector();
  projectiles: {[sessionId: string]: Projectile} = {};
}

export interface UpdatePlayerPositionAction extends BaseAction {
  type: 'updatePlayerPosition';
  position: Vector;
}

export interface PersistPlayerProjectileAction extends BaseAction {
  type: 'persistPlayerProjectile';
  projectile: Projectile;
}
