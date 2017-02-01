import { db } from '../db'
import { externalizeIdOf } from '../../src/mongo'
import log from '../../src/log'

export default {
  team(mship, _, context) {
    log('teamMembership.team', mship)
    return db.Teams()
    .then(teams => teams.findOne({ _id: mship.teamId }))
    .then(externalizeIdOf)
  }
}
