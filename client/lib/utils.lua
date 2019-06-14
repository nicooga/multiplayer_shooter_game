local function assign(obj, properties)
  for k, v in pairs(properties) do obj[k] = v end
  return obj
end

return {
  assign = assign
}
