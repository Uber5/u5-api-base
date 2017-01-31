//@flow
import { readdirSync } from 'fs'
import { join } from 'path'

function getTypenameFromFilename(name) {
  return name
    .replace(/\.js$/, '') // remove '.js' suffix
    .replace(/-([a-z])/g, g => g[1].toUpperCase()) // make it camelCase
    .replace(/^.?/, g => g.toUpperCase()) // make first character uppercase
}

export default ({ fromDir }: { fromDir: string }) => {
  const resolvers = {}
  readdirSync(fromDir).forEach(file => {
    if (file !== 'index.js') {
      const name = getTypenameFromFilename(file)
      //$FlowFixMe why should we not use a dynamic string for require()?
      resolvers[name] = require(join(fromDir, file)).default
    }
  })
  return resolvers
}
