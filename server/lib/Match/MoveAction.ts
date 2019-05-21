import BaseAction from '../BaseAction'

interface MoveAction extends BaseAction {
  type: 'move_action',
  x: number,
  y: number
}

export default MoveAction
