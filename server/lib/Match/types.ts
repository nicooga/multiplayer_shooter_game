import BaseAction from '../BaseAction'

export interface UpdatePlayerPositionAction extends BaseAction {
  type: 'updatePlayerPosition';
  x: number;
  y: number;
}

export interface PlayerInput {
  actionName: string;
  pressed: boolean;
  released: boolean;
}

export interface PersistPlayerInputAction extends BaseAction {
  type: 'persistPlayerInput';
  input: PlayerInput;
}
