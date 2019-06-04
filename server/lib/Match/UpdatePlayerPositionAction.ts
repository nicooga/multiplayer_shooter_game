import BaseAction from '../BaseAction'

interface UpdatePlayerPositionAction extends BaseAction {
  type: 'updatePlayerPosition';
  x: number;
  y: number;
}

export default UpdatePlayerPositionAction
