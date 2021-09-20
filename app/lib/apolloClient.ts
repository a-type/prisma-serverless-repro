import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const wsLink = process.browser
  ? new WebSocketLink(
      new SubscriptionClient(
        process.env.NEXT_PUBLIC_GRAPHQL_SUBSCRIPTION_ENDPOINT!,
        {
          lazy: true,
          reconnect: true,
        },
        null,
        []
      )
    )
  : null;

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
  credentials: "include",
});

const mainLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink!,
      httpLink
    )
  : httpLink;

export const apolloClient = new ApolloClient({
  link: mainLink,
  cache: new InMemoryCache(),
  credentials: "include",
});
