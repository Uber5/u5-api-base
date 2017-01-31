import { join } from 'path'
import express from 'express'
import { makeExecutableSchema } from 'graphql-tools'
import { configureEndpoint, getLiteralTypes, getResolvers } from '../src'

const app = express()

const queries = `
  type Queries {
    team(id: ID!): Team
    teams: [Team]

    player(id: ID!): Player
    players(teamId: ID): [Player]
  }
`

const mutations = `
  type Mutations {
    createTeam(input: TeamInput): Team
    createPlayer(input: PlayerInput, addToTeamId: ID): Player
    updateTeam(input: TeamInput, id: ID!): Team
    updatePlayer(input: PlayerInput, id: ID!): Player
    addPlayerToTeam(teamID: ID!, playerId: ID!): Player
    removePlayerFromTeam(teamID: ID!, playerId: ID!): Player
    archivePlayer(id: ID!): Player
    archiveTeam(id: ID!): Player
  }
`

const schemaDefinition = `

  enum Level {
    None
    Basic
    Average
    VeryGood
    Excellent
  }

  scalar DateTime

  schema {
    query: Queries
    mutation: Mutations
  }
`

const typeDefs = getLiteralTypes({
  fromDir: join(__dirname, './types'),
  types: [ schemaDefinition, queries, mutations ]
})

const resolvers = getResolvers({
  fromDir: join(__dirname, './resolvers')
})

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const endpoint = configureEndpoint({
  schema
})
app.use('/api', endpoint);

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('listening on port', port)
});
