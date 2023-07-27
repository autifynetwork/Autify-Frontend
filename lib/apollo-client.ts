import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
    // uri: 'http://localhost:4000/graphql',
    uri: 'http://ec2-43-205-111-224.ap-south-1.compute.amazonaws.com:4000/graphql',
    cache: new InMemoryCache(),
    // defaultOptions: {
    //     query: 'no-cache' as any
    // },
});

export default apolloClient;
