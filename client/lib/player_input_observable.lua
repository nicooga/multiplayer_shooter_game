local Rx = require 'vendor.rx'

local PlayerInputObservable = {}

PlayerInputObservable.__index = function(self, key)
  return PlayerInputObservable[key] or self.observable[key]
end

function PlayerInputObservable.create(observable)
  local observable = observable or Rx.Subject.create()
  local self = { observable = observable }
  return setmetatable(self, PlayerInputObservable)
end

function PlayerInputObservable:pressed()
  return PlayerInputObservable.create(
    self:filter(function(input) return input.pressed end)
  )
end

function PlayerInputObservable:released()
  return PlayerInputObservable.create(
    self:filter(function(input) return input.released end)
  )
end

function PlayerInputObservable:by_action(action_name)
  return PlayerInputObservable.create(
    self
      :filter(function(input)
        if input.action_id then
          return input.action_id == hash(action_name)
        elseif input.action_name then
          return input.action_name == action_name
        end
      end)
      :map(function(input)
        input.action_name = action_name
        return input
      end)
  )
end

return PlayerInputObservable
