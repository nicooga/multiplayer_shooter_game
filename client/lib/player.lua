local Rx = require 'vendor.rx'

local PlayerInputObservable = require 'lib.player.input_observable'
local PlayerProjectilesObservable = require 'lib.player.projectiles_observable'

local Player = {}
Player.__index = Player

function Player.create(opts)
  local self = {
    id         = opts.id,
    session_id = opts.session_id,
    input      = PlayerInputObservable.create(),
    position   = Rx.Subject.create()
  }

  self.projectiles = PlayerProjectilesObservable.create(self)

  return setmetatable(self, Player)
end

return Player
