import {
  ApolloClient, HttpLink,
  InMemoryCache,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'https://graphql-pokeapi.vercel.app/api/graphql', fetch }),
});

export default client;
