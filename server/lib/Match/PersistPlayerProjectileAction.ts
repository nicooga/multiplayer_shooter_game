import BaseAction from '../BaseAction'
import Projectile from '../Projectile'

export default interface PersistPlayerProjectileAction extends BaseAction {
  type: 'persistPlayerProjectile';
  projectile: Projectile;
}
