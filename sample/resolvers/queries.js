import { db } from '../db'
import { externalizeIdOf, internalize } from '../../src/mongo'
import { failIfNotFound } from '../../src/utils'

export default {

  team(_, { id }, context) {
    return db.Teams()
    .then(teams => teams.findOne({ _id: internalize(id) }))
    .then(failIfNotFound(`Team with id ${ id }`))
    .then(externalizeIdOf)
  },

  teams() {
    return db.Teams()
    .then(teams => teams.find().toArray())
    .then(a => a.map(t => externalizeIdOf(t)))
  },

  player(_, { id }, context) {

  },

  players(_, { teamId }, context) {

  }

}
