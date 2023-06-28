import type { AppProps } from 'next/app';
import Script from 'next/script';
import Layout from '@/layout/Layout';
import UserProvider from '@/store/UserContext';
import LoadingProvider from '@/store/LoadingContext';
import StatusContextProvider from '@/store/StatusContextProvider';
import { SmartAccountProvider } from '@/store/SmartAccountContext';
import '@/styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';
import { wrapper } from '@/redux/redux-store';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@/lib/apollo-client';

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Script src="https://kit.fontawesome.com/51d719f5d6.js" crossOrigin="anonymous"></Script>
            <Script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/tw-elements.umd.min.js"></Script>

            <ApolloProvider client={apolloClient}>
                <UserProvider>
                    <LoadingProvider>
                        <StatusContextProvider>
                            <SmartAccountProvider>
                                <Layout>
                                    <Component {...pageProps} />
                                </Layout>
                            </SmartAccountProvider>
                        </StatusContextProvider>
                    </LoadingProvider>
                </UserProvider>
            </ApolloProvider>
        </>
    );
}

export default wrapper.withRedux(App);
