import { IContext as AwsLambdaGraphQLContextExtensions } from 'aws-lambda-graphql';

import { prisma } from '../dataSources/prisma';
import { pubSub } from './subscriptions';

export const createContext = async ({
  event,
  context,
}: {
  event: any;
  context: any;
}) => {
  const isDynamoDbEventSource =
    event.Records && event.Records[0].eventSource === 'aws:dynamodb';

  return {
    prisma,
    pubSub,
    event,
    isDynamoDbEventSource,
  };
};

export type Context = UnwrapPromise<ReturnType<typeof createContext>> &
  AwsLambdaGraphQLContextExtensions;

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
