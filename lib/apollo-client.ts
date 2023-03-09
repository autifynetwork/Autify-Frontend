import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://api.autify.network/graphql',
    cache: new InMemoryCache(),
    defaultOptions: {
        query: 'no-cache' as any,
    },
});

export default client;
