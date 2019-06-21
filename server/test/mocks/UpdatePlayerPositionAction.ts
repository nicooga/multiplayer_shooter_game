import UpdatePlayerPositionAction from '../../lib/Match/UpdatePlayerPositionAction'
import Vector from '../../lib/Vector'

export default class UpdatePlayerPositionActionMock implements UpdatePlayerPositionAction {
  type: 'updatePlayerPosition' = 'updatePlayerPosition';
  constructor(public position: Vector = new Vector()) { }
}
