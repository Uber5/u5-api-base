export default {

  createTeam(_, { input }, context) {
    console.log('should create team', input)
    return null
  },

  createPlayer(_, { input, addToTeamId }, context) {
    console.log('should create player', input, addToTeamId)
  },

  updateTeam(_, { input, id }, context) {

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
