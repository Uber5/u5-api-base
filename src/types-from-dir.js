//@flow
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import { getTypenameFromFilename } from './utils'

export default (dir: string) => {
  const types = []
  readdirSync(dir).forEach(file => {
    types.push(readFileSync(join(dir, file), 'utf8'))
  })
  return types
}
