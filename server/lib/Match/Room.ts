import { Room, Client, FossilDeltaSerializer, serialize } from "colyseus";
import MatchState from './State'
import MoveAction from './MoveAction'

@serialize(FossilDeltaSerializer)
class MatchRoom extends Room<MatchState> {
  onInit(_options: any) {
    this.setState(new MatchState())
  }

  onJoin(client: Client, _options: any) {
    console.log({ sessionId: client.sessionId })
    this.state.addPlayer(client)
  }

  onLeave(client: Client) {
    this.state.removePlayer(client)
  }
  
  onMessage(client: Client, action: MoveAction) {
    this.state.movePlayer(client, action)
  }
}

export default MatchRoom
