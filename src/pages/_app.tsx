import type { AppProps } from 'next/app';
import Layout from '@/layout/Layout';
import UserProvider from '@/store/UserContext';
import LoadingProvider from '@/store/LoadingContext';
import { SmartAccountProvider } from '@/store/SmartAccountContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <LoadingProvider>
            <SmartAccountProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SmartAccountProvider>
            </LoadingProvider>
            </UserProvider>
    );
}
