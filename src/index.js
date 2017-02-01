//@flow
import { randomBytes } from 'crypto'
import { GraphQLSchema } from 'graphql'
import graphqlHTTP from 'express-graphql'
import { ClientRequest, ServerResponse } from 'http'

import type { Middleware } from 'express'

import typesFromDir from './types-from-dir'
import resolversFromDir from './resolvers-from-dir'
import log from './log'

export const configureEndpoint = ({ schema }: { schema: GraphQLSchema }) => {

  return graphqlHTTP(request => {
    request.schema = schema
    const startTime = Date.now()
    return ({
      context: request,
      schema: schema,
      pretty: true,
      graphiql: true,
      formatError: (error) => {
        const ref = randomBytes(13).toString('hex')
        log('graphql error', ref, error)
        return {
          message: error.message,
          ref
          //stack: error.stack
        }
      },
      extensions({ document, variables, operationName, result }) {
        return {
          runTime: Date.now() - startTime,
        };
      }
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
