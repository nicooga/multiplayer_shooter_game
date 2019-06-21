import BaseAction from '../BaseAction'
import Vector from '../Vector'

export default interface UpdatePlayerPositionAction extends BaseAction {
  type: 'updatePlayerPosition';
  position: Vector;
}
