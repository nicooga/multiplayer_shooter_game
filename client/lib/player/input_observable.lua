local Rx = require 'vendor.rx'

local InputObservable = {}

function InputObservable:__index(key)
  return InputObservable[key] or self.observable[key]
end

function InputObservable.create(observable)
  local observable = observable or Rx.Subject.create()
  local self = { observable = observable }
  return setmetatable(self, InputObservable)
end

function InputObservable:pressed()
  return InputObservable.create(
    self:filter(function(input) return input.pressed end)
  )
end

function InputObservable:released()
  return InputObservable.create(
    self:filter(function(input) return input.released end)
  )
end

function InputObservable:by_action(action_name)
  return InputObservable.create(
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

return InputObservable
