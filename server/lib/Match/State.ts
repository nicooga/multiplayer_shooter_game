import { Client } from "colyseus";

import PersistPlayerInputAction from './PersistPlayerInputAction'
import UpdatePlayerPositionAction from './UpdatePlayerPositionAction'

import PlayerInput from './PlayerInput'

class Position {
  x: number = 0;
  y: number = 0;
}

class Player {
  position: Position = new Position();
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
    this.players[client.sessionId].input[new Date().getTime()] = action.input
  }

  updatePlayerPosition(client: Client, action: UpdatePlayerPositionAction) {
    console.log(action)
    this.players[client.sessionId].position.x = action.x
    this.players[client.sessionId].position.y = action.y
  }
}

export default MatchState
