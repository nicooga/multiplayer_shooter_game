local Rx = require 'vendor.rx'
local PlayerInputObservable = require 'lib.player_input_observable'

local MultiplayerOrchestrator = {
  players_by_session_id = {},
  players_by_id = {}
}

function MultiplayerOrchestrator:build_player(opts)
  return {
    id         = opts.id or #self.players_by_id + 1,
    session_id = opts.session_id,
    input      = PlayerInputObservable.create(),
    position   = Rx.Subject.create()
  }
end

function MultiplayerOrchestrator:store_player(player)
  if player.session_id then
    self.players_by_session_id[player.session_id] = player
  end

  self.players_by_id[player.id] = player
end

function MultiplayerOrchestrator:create_game_object(player)
  return factory.create('/root#player_factory', nil, nil, { player_id = player.id })
end

function MultiplayerOrchestrator:update_player(player, properties)
  local player = self:get_player_by_id(player.id)
  for k, v in pairs(properties) do player[k] = v end
  self:store_player(player)
end

function MultiplayerOrchestrator:create_player(opts)
  local player = self:build_player(opts)
  self:store_player(player)
  -- Important to create game object after storing player.
  -- Instantiated game object will `get_player_by_id`, and if it is not
  -- stored, a new one will be created.
  -- TODO: diferentiate between get_player_by_id and get_or_create_palyer_by_id,
  -- so, if player is not present we get an error, instead of an ifinite loop.
  local game_object = self:create_game_object(player)
  self:update_player(player, { game_object = game_object })
  return player
end

function MultiplayerOrchestrator:get_player_by_session_id(session_id)
  if not self.players_by_session_id[session_id] then
    self:create_player({ session_id = session_id })
  end

  return self.players_by_session_id[session_id]
end

function MultiplayerOrchestrator:get_player_by_id(id)
  if not self.players_by_id[id] then
    self:create_player({ id = id })
  end

  return self.players_by_id[id]
end

return MultiplayerOrchestrator
