const variableRegex = /(?<!\\){([^{}]+)(?<!\\)}/g //Matches {myvar}

export const getPathParams = url => {
  if (!url) {
    return url
  }
  let params = []
  const matches = url.matchAll(variableRegex)
  for (const match of matches) {
    params.push(match)
  }
  return params
}
