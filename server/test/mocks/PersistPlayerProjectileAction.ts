import PersistPlayerProjectileAction from '@lib/Match/PersistPlayerProjectileAction'
import Projectile from '@lib/Projectile'

export default class PersistPlayerProjectileActionMock implements PersistPlayerProjectileAction {
  type: 'persistPlayerProjectile' = 'persistPlayerProjectile';
  projectile: Projectile = new Projectile();
}
