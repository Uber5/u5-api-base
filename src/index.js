//@flow
import { GraphQLSchema } from 'graphql'
import graphqlHTTP from 'express-graphql'
import { ClientRequest, ServerResponse } from 'http'

import type { Middleware } from 'express'

import typesFromDir from './types-from-dir'
import resolversFromDir from './resolvers-from-dir'

export const configureEndpoint = ({ schema }: { schema: GraphQLSchema }) => {

  return graphqlHTTP(request => {
    request.schema = schema
    return ({
      context: request,
      schema: schema,
      pretty: true,
      graphiql: true,
      formatError: (error) => ({
        message: error.message,
        stack: error.stack
      })
    })
  })

}

export const getLiteralTypes = ({
  fromDir, types
}: {
  fromDir: string, types: Array<string>
}) => {
  return types.slice(0).concat(typesFromDir(fromDir))
}

export const getResolvers = ({
  fromDir
}: {
  fromDir: string
}) => resolversFromDir({ fromDir })
