export default defineEventHandler((event) => {
  const filename = getRouterParam(event, 'filename')

  return `I want to load ${filename}`
})
