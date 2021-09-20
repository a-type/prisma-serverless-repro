import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useEffect } from 'react';

const FoosQuery = gql`
  query Foos {
    foos {
      id
      name
    }
  }
`;

const FoosSubscription = gql`
  subscription FoosSubscription {
    fooCreated {
      foo {
        id
        name
      }
    }
  }
`;

const useLiveFoos = () => {
  const result = useQuery(FoosQuery);
  const { subscribeToMore } = result;
  useEffect(() => {
    return subscribeToMore({
      document: FoosSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFoo = subscriptionData.data.fooCreated.foo;
        return {
          ...prev,
          foos: [...prev.foos, newFoo],
        };
      },
    });
  });

  return result;
};

const CreateFooMutation = gql`
  mutation CreateFoo($name: String!) {
    createFoo(input: { name: $name }) {
      foo {
        id
        name
      }
    }
  }
`;

export default function Home() {
  const { loading, data: foos } = useLiveFoos();
  const [createFoo] = useMutation(CreateFooMutation);

  return (
    <div>
      <div>
        <h1>Foos</h1>
        {loading && <p>Loading...</p>}
        {foos && (
          <ul>
            {foos.foos.map((foo) => (
              <li key={foo.id}>{foo.name}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h1>Create Foo</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createFoo({ variables: { name: "New Foo" } });
          }}
        >
          <input type="text" />
          <button type="submit">Create Foo</button>
        </form>
      </div>
    </div>
  );
}
