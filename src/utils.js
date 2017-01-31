//@flow
import { readdirSync } from 'fs'
import pluralize from 'pluralize'

export const getTypenameFromFilename= (name: string) => {
  return name
    .replace(/\.js$/, '') // remove '.js' suffix
    .replace(/-([a-z])/g, g => g[1].toUpperCase()) // make it camelCase
    .replace(/^.?/, g => g.toUpperCase()) // make first character uppercase
}

export const getCollectionNameFromFileName = (name: string) => {
  return pluralize(
    name
      .replace(/\.js$/, '') // remove '.js' suffix
      .replace(/-([a-z])/g, g => g[1].toUpperCase()) // make it camelCase
  )
}
