import type { AppProps } from 'next/app';
import Script from 'next/script';
import Layout from '@/layout/Layout';
import UserProvider from '@/store/UserContext';
import LoadingProvider from '@/store/LoadingContext';
import { SmartAccountProvider } from '@/store/SmartAccountContext';
import '@/styles/globals.css';
import { wrapper } from '@/redux/redux-store';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@/lib/apollo-client';

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Script src="https://kit.fontawesome.com/51d719f5d6.js" crossOrigin="anonymous"></Script>

            <ApolloProvider client={apolloClient}>
                <UserProvider>
                    <LoadingProvider>
                        <SmartAccountProvider>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </SmartAccountProvider>
                    </LoadingProvider>
                </UserProvider>
            </ApolloProvider>
        </>
    );
}

export default wrapper.withRedux(App);
