import { makeExecutableSchema } from '@graphql-tools/schema';
import { Server } from 'aws-lambda-graphql';

import { createContext } from '../lib/graphql/context';
import { resolvers } from '../lib/graphql/resolvers';
import { connectionManager, eventProcessor, subscriptionManager } from '../lib/graphql/subscriptions';
import { typeDefs } from '../lib/graphql/typeDefs';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new Server({
  schema,
  context: createContext,
  connectionManager,
  subscriptionManager,
  eventProcessor,
  playground: {
    settings: {
      'request.credentials': 'include',
    },
  },
});

export const httpHandler = server.createHttpHandler();
export const webSocketHandler = server.createWebSocketHandler();
export const eventHandler = server.createEventHandler();
