import { gql } from 'apollo-server-lambda';

export const typeDefs = gql`
  type Foo {
    id: ID!
    name: String!
  }

  type Query {
    foo(id: ID!): Foo
    foos: [Foo!]!
  }

  input CreateFooInput {
    name: String!
  }
  type CreateFooResult {
    foo: Foo!
  }

  type Mutation {
    createFoo(input: CreateFooInput!): CreateFooResult!
  }

  type FooCreatedEvent {
    foo: Foo!
  }

  type Subscription {
    subscribeFoo: FooCreatedEvent!
  }
`;
