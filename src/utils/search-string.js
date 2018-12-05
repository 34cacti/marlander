export function searchString(str, tokens) {
  if (tokens.length === 0 || tokens[0] === '') return false

  const strLower = str.toLowerCase()
  for (const token of tokens)
    if (strLower.includes(token.toLowerCase())) return true
  return false
}
