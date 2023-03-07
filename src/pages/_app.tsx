import type { AppProps } from 'next/app';
import Layout from '@/layout/Layout';
import UserProvider from '@/store/UserContext';
import LoadingProvider from '@/store/LoadingContext';
import '@/styles/globals.css';
import { wrapper } from '@/redux/redux-store';

function App({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <LoadingProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </LoadingProvider>
        </UserProvider>
    );
}

export default wrapper.withRedux(App);
