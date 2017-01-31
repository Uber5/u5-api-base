export default {

  team(_, { id }, context) {

  },

  teams() {
    return [ { name: 'bla', id: '123123123123', createdAt: new Date() } ]
  },

  player(_, { id }, context) {

  },

  players(_, { teamId }, context) {

  }

}
