import BaseAction from '../BaseAction'
import PlayerInput from './PlayerInput'

interface PersistPlayerInputAction extends BaseAction {
  type: 'persistPlayerInput';
  input: PlayerInput;
}

export default PersistPlayerInputAction
