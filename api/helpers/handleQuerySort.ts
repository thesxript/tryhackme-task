
export const handleQuerySort = (query: string ) => {
  try {
    const toJSONString = ('{' + query + '}').replace(/(\w+:)|(\w+ :)/g, matched => {
      return '"' + matched.substring(0, matched.length - 1) + '":'
    })

    return JSON.parse(toJSONString)
  } catch (err) {
    return JSON.parse('{}')
  }
}
