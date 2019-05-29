import { Client } from "colyseus";
import PersistPlayerInputAction from './PersistPlayerInputAction'
import PlayerInput from './PlayerInput'

class Player {
  x: number = 0;
  y: number = 0;
  input: {[id: string]: PlayerInput} = {};
}

class MatchState {
  players: {[session_id: string]: Player} = {}

  addPlayer(client: Client): void {
    this.players[client.sessionId] = new Player()
  }

  removePlayer(client: Client): void {
    delete this.players[client.sessionId]
  }

  persistPlayerInput(client: Client, action: PersistPlayerInputAction): void {
    console.log(action)
    this.players[client.sessionId].input[new Date().getTime()] = action.input
  }
}

export default MatchState
