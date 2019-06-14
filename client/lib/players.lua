local Player = require 'lib.player'
local utils = require 'lib.utils'

local Players = {
  players_by_session_id = {},
  players_by_id = {}
}

function Players:build_player(opts)
  opts.id = opts.id or #self.players_by_id + 1
  return Player.create(opts)
end

function Players:persist_player(player)
  if player.session_id then
    self.players_by_session_id[player.session_id] = player
  end

  self.players_by_id[player.id] = player
end

function Players:create_game_object(player)
  return factory.create('/root#player_factory', nil, nil, { player_id = player.id })
end

function Players:update_player(player, properties)
  local player = self:get_player_by_id(player.id)
  utils.assign(player, properties)
  self:persist_player(player)
end

function Players:create_player(opts)
  local player = self:build_player(opts)
  self:persist_player(player)
  -- Important to create game object after storing player.
  -- Instantiated game object will `get_player_by_id`, and if it is not
  -- stored, a new one will be created.
  -- TODO: diferentiate between get_player_by_id and get_or_create_palyer_by_id,
  -- so, if player is not present we get an error, instead of an ifinite loop.
  local go_id = self:create_game_object(player)
  self:update_player(player, { go_id = go_id })
  return player
end

function Players:get_player_by_session_id(session_id)
  if not self.players_by_session_id[session_id] then
    self:create_player({ session_id = session_id })
  end

  return self.players_by_session_id[session_id]
end

function Players:get_player_by_id(id)
  if not self.players_by_id[id] then
    self:create_player({ id = id })
  end

  return self.players_by_id[id]
end

return Players
