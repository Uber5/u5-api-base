import { db } from '../db'
import { externalizeIdOf, internalize } from '../../src/mongo'
import log from '../../src/log'

export default {

  createTeam(_, { input }, context) {
    log('create team', input)
    // TODO: validate input here (compare https://gitlab.uber5.com/misav-dev/quotes-api/tree/master/src/validate)
    return db.Teams()
    .then(teams => teams.insert(input))
    .then(result => externalizeIdOf(input))
  },

  createPlayer(_, { input, addToTeamId }, context) {
    log('create player', input, addToTeamId)
    return db.Players()
    .then(players => players.insert(input))
    .then(result => externalizeIdOf(input))
  },

  updateTeam(_, { input, id }, context) {
    return db.Teams()
    .then(teams => teams.findOneAndUpdate(
      { _id: internalize(id) },
      { $set: input },
      { returnOriginal: false }
    ))
    .then(res => res.value)
    .then(externalizeIdOf)
  },

  updatePlayer(_, { input, id }, context) {
    return db.Players()
    .then(players => players.findOneAndUpdate(
      { _id: internalize(id) },
      { $set: input },
      { returnOriginal: false }
    ))
    .then(res => res.value)
    .then(externalizeIdOf)
  },

  addPlayerToTeam(_, { teamId, playerId }, context) {

    const doc = {
      teamId: internalize(teamId),
      playerId: internalize(playerId)
    }
    
    log('addPlayerToTeam, doc', doc)
    return db.TeamMemberships()
    .then(memberships => memberships.insert(doc))
    .then(result => externalizeIdOf(doc))
  },

  removePlayerFromTeam(_, { teamId, playerId }, context) {
    return db.TeamMemberships()
    .then(memberships => memberships.findOneAndUpdate(
      { teamId: internalize(teamId), playerId: internalize(playerId) },
      { $set: { archived: true } },
      { returnOriginal: false }
    ))
    .then(res => res.value)
    .then(externalizeIdOf)
  },

  archivePlayer(_, { id }, context) {

  },

  archiveTeam(_, { id }, context) {

  }
}
