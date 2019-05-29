import { Room, Client, FossilDeltaSerializer, serialize } from "colyseus";
import MatchState from './State'
import PersistPlayerInputAction from './PersistPlayerInputAction'

@serialize(FossilDeltaSerializer)
class MatchRoom extends Room<MatchState> {
  onInit(_options: any) {
    this.setState(new MatchState())
  }

  onJoin(client: Client, _options: any) {
    this.state.addPlayer(client)
  }

  onLeave(client: Client) {
    this.state.removePlayer(client)
  }
  
  onMessage(client: Client, action: PersistPlayerInputAction) {
    this.state.persistPlayerInput(client, action)
  }
}

export default MatchRoom
