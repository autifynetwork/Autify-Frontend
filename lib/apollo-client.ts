import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    // defaultOptions: {
    //     query: 'no-cache' as any
    // },
});

export default apolloClient;
