import { useState, useContext, useEffect } from 'react';
import { magic } from '@/lib/magic';
import { LoadingContext } from '@/store/LoadingContext';
import { UserContext } from '@/store/UserContext';
import Loading from '@/components/ui/Loading';
import KYBModal from '@/components/KYB/KYBModal';
import KYBPopup from '@/components/KYB/KYBPopup';
import ErrorBox from '@/components/ui/Toast/ErrorBox';
import SuccessBox from '@/components/ui/Toast/SuccessBox';

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
                    // TODO: Uncomment
                    // Router.push('/auth/admin-login');
                }
            });
    }, []);

    const [isKYBModalOpen, setKYBModalOpen] = useState(false);
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
            <KYBPopup setKYBModalOpen={setKYBModalOpen} />
            {children}
            <KYBModal isOpen={isKYBModalOpen} setOpen={setKYBModalOpen} />
            <ErrorBox style={3} />
            <SuccessBox style={3} />
        </>
    );
};

export default Layout;
