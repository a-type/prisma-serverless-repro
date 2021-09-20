import '../styles/globals.css';

import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';

import { apolloClient } from '../lib/apolloClient';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
