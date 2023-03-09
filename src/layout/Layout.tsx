import { useContext, useEffect } from 'react';
import Router from 'next/router';
import { magic } from '@/lib/magic';
import { LoadingContext } from '@/store/LoadingContext';
import { UserContext } from '@/store/UserContext';
import Loading from '@/components/ui/Loading';

const Layout = ({ children }: any) => {
    const { setUser } = useContext(UserContext);
    const { loading } = useContext(LoadingContext);

    // If isLoggedIn is true, set the UserContext with user data
    // Otherwise, redirect to /login and set UserContext to { user: null }
    useEffect(() => {
        magic &&
            magic.user.isLoggedIn().then((isLoggedIn) => {
                if (isLoggedIn) {
                    if (magic && magic.rpcProvider)
                        magic.user.getMetadata().then((userData) => {
                            setUser({ ...userData, provider: magic && magic.rpcProvider });
                        });
                } else {
                    Router.push('/auth/admin-login');
                }
            });
    }, []);

    return (
        <>
            <Loading
                status={loading.status}
                section={loading.section}
                title={loading.title}
                showProgressBar={loading.showProgressBar}
                progress={loading.progress}
                message={loading.message}
                waitMessage={loading.waitMessage}
            />
            {children}
        </>
    );
};

export default Layout;
