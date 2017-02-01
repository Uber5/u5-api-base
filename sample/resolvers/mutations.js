import { db } from '../db'
import { externalizeIdOf, internalize } from '../../src/mongo'

export default {

  createTeam(_, { input }, context) {
    console.log('should create team', input)
    return db.Teams()
    .then(teams => teams.insert(input))
    .then(result => externalizeIdOf(input))
  },

  createPlayer(_, { input, addToTeamId }, context) {
    console.log('should create player', input, addToTeamId)
  },

  updateTeam(_, { input, id }, context) {
    return db.Teams()
    .then(teams => teams.findOneAndUpdate(
      { _id: internalize(id) },
      { $set: input },
      { returnOriginal: false }
    ))
    .then(res => console.log('result', res))
  },

  updatePlayer(_, { input, id }, context) {

  },

  addPlayerToTeam(_, { teamId, playerId }, context) {

  },

  removePlayerFromTeam(_, { teamId, playerId }, context) {

  },

  archivePlayer(_, { id }, context) {

  },

  archiveTeam(_, { id }, context) {

  }
}
