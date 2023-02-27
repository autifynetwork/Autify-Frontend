import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import { magic } from '@/lib/magic';
import Layout from '@/layout/Layout';
import { UserContext } from '@/store/UserContext';
import { LoadingContext } from '@/store/LoadingContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    const [user, setUser] = useState<any | null>(null);
    const [isLoading, setLoading] = useState({
        status: false,
        section: false,
        title: '',
        message: '',
        waitMessage: '',
        showProgressBar: false,
        progress: 0,
    });

    // If isLoggedIn is true, set the UserContext with user data
    // Otherwise, redirect to /login and set UserContext to { user: null }
    useEffect(() => {
        setUser({ loading: true });
        magic &&
            magic.user.isLoggedIn().then((isLoggedIn) => {
                if (isLoggedIn) {
                    magic &&
                        magic.user.getMetadata().then((userData) => {
                            setUser(userData);
                        });
                } else {
                    Router.push('/auth/admin-login');
                    setUser({ user: null });
                }
            });
    }, []);

    // Getting the provider
    useEffect(() => {
        if (magic) {
            console.log('Provider:', magic.rpcProvider);
        }
    }, []);

    return (
        <UserContext.Provider value={[user, setUser]}>
            <LoadingContext.Provider value={[isLoading, setLoading]}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </LoadingContext.Provider>
        </UserContext.Provider>
    );
}
