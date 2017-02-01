import { db } from '../db'
import { externalizeIdOf, internalize } from '../../src/mongo'
import { failIfNotFound } from '../../src/utils'
import log from '../../src/log'

export default {

  team(_, { id }, context) {
    log('fetching team', id)
    return db.Teams()
    .then(teams => teams.findOne({ _id: internalize(id) }))
    .then(failIfNotFound(`Team with id ${ id }`))
    .then(externalizeIdOf)
  },

  teams() {
    log('fetching all teams')
    return db.Teams()
    .then(teams => teams.find().toArray())
    .then(a => a.map(t => externalizeIdOf(t)))
  },

  player(_, { id }, context) {

  },

  players(_, { teamId }, context) {
    log('fetching all players')
    return db.Players()
    .then(p => p.find().toArray())
    .then(a => a.map(externalizeIdOf))
  }

}
