import { ApolloProvider } from '@apollo/client';
import client from '../components/graphql/graphqlClient';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import { GlobalCss } from '../styles/globalcss';
import ContextProvider from '../components/context';

function MyApp({ Component, pageProps }) {
  return (
  // eslint-disable-next-line react/jsx-filename-extension
    <ApolloProvider client={client}>
      <ContextProvider>
        <Layout>
          <Navbar />
          <GlobalCss />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
