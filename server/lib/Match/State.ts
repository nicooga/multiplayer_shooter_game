import { Client } from "colyseus";
import MoveAction from './MoveAction'

class Player {
  x: number = 0;
  y: number = 0;
}

class MatchState {
  players: {[id: string]: Player} = {}

  addPlayer(client: Client): void {
    this.players[client.sessionId] = new Player()
  }

  removePlayer(client: Client): void {
    delete this.players[client.sessionId]
  }

  movePlayer(client: Client, action: MoveAction): void {
    this.players[client.sessionId].x = action.x
    this.players[client.sessionId].y = action.y
  }
}

export default MatchState
