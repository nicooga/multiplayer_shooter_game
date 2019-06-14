import { Client } from "colyseus";
import Vector from '../Vector'
import Quaternion from '../Quaternion'
import {
  Player,
  Projectile,
  UpdatePlayerPositionAction,
  PersistPlayerProjectileAction
} from './types'

class MatchState {
  players: {[session_id: string]: Player} = {}

  addPlayer(client: Client): void {
    this.players[client.sessionId] = new Player()
  }

  removePlayer(client: Client): void {
    delete this.players[client.sessionId]
  }

  updatePlayerPosition(client: Client, action: UpdatePlayerPositionAction) {
    this.players[client.sessionId].position.x = action.position.x
    this.players[client.sessionId].position.y = action.position.y
  }

  persistPlayerProjectile(client: Client, action: PersistPlayerProjectileAction) {
    const { position, direction, rotation } = action.projectile

    const projectile = new Projectile({
      position: new Vector(position.x, position.y, position.z),
      direction: new Vector(direction.x, direction.y, direction.z),
      rotation: new Quaternion(rotation.x, rotation.y, rotation.z, rotation.w)
    })

    this.players[client.sessionId].projectiles[new Date().getTime()] = projectile

    console.log(this.players[client.sessionId])
  }
}

export default MatchState
