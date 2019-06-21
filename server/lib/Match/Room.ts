import { Room, Client, FossilDeltaSerializer, serialize } from 'colyseus';
import MatchState from './State'
import UpdatePlayerPositionAction from './UpdatePlayerPositionAction'
import PersistPlayerProjectileAction from './PersistPlayerProjectileAction'

@serialize(FossilDeltaSerializer)
class MatchRoom extends Room<MatchState> {
  onInit(_options: any) { this.setState(new MatchState()) }
  onJoin(client: Client, _options?: any) { this.state.addPlayer(client) }
  onLeave(client: Client) { this.state.removePlayer(client) }
  
  onMessage(client: Client, action: UpdatePlayerPositionAction | PersistPlayerProjectileAction) {
    if (action.type === 'updatePlayerPosition')
      this.state.updatePlayerPosition(client, action)
    else if (action.type === 'persistPlayerProjectile')
      this.state.persistPlayerProjectile(client, action)
  }
}

export default MatchRoom
