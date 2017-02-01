import { db } from '../db'
import { externalizeIdOf } from '../../src/mongo'
import log from '../../src/log'

export default {
  teamMemberships(player, _, context) {
    log('teamMemberships', player)
    return db.TeamMemberships()
    .then(mships => mships.find({ playerId: player.id }))
    .then(result => result.toArray())
    .then(a => { log('a', a); return a })
    .then(a => a.map(externalizeIdOf))
  }
}
