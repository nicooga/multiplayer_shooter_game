local Rx = require 'vendor.rx'

ProjectilesObservable = {}

-- Takes a player input observable and returns a new observable
-- which converts clicks into projectiles.
--
-- Returns: Observable -> { position: Vector, direction: Vector, rotation: Quaternion }
function ProjectilesObservable.create(player)
  local player_go_id

  local proyectiles = Rx.Subject.create()

  player.input:pressed():by_action('click'):subscribe(function(input)
    local position      = go.get_position(player.go_id)
    local destination = vmath.vector3(input.x, input.y, 0)
    local direction   = vmath.normalize(destination - position)

    direction.z = 0

    local angle    = math.atan2(direction.y, direction.x)
    local rotation = vmath.quat_rotation_z(angle)

    proyectiles:onNext({
      position  = position,
      direction = direction,
      rotation  = rotation
    })
  end)

  return proyectiles
end

return ProjectilesObservable
