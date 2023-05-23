import { useState, useContext, useEffect } from 'react';
import { magic } from '@/lib/magic';
import { LoadingContext } from '@/store/LoadingContext';
import { UserContext } from '@/store/UserContext';
import Loading from '@/components/ui/Loading';
import KYBModal from '@/components/KYB/KYBModal';

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

    // TODO: fetch KYB status from API
    const KYBCompleted = false;
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
            {!KYBCompleted && (
                <div className="p-[10px] group relative w-full flex items-center justify-center text-center text-base text-light-100 bg-error-500">
                    <div>
                        Please complete your KYB to access your Dashboard.{' '}
                        <span onClick={() => setKYBModalOpen(true)} className="cursor-pointer underline">
                            Click Here
                        </span>
                    </div>
                </div>
            )}
            {children}
            <KYBModal isOpen={isKYBModalOpen} setOpen={setKYBModalOpen} />
        </>
    );
};

export default Layout;
