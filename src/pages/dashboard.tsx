import { useEffect, useContext } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { UserContext, UserContextType } from '@/store/UserContext';
import { RootState, useTypedDispatch, useTypedSelector } from '@/redux/redux-store';
import { logoutUser, clearErrors } from '@/redux/actions/userActions';
import Loading from '@/components/ui/Loading';
import Button from '@/components/ui/Button';
import { useSmartAccountContext } from '@/store/SmartAccountContext';

export default function Dashboard(): JSX.Element {
    const { user, setUser } = useContext<UserContextType>(UserContext);
    const { selectedAccount, loading } = useSmartAccountContext();

    // Redux state
    const dispatch = useTypedDispatch();
    const { success, loading: logoutLoading, error } = useTypedSelector((state: RootState) => state.logout);

    useEffect(() => {
        if (success) {
            setUser(null as any);
            // Redirect to admin login form if the user is logged out
            Router.push('/auth/admin-login');
            Router.reload();
        }
        if (error) {
            dispatch(clearErrors());
        }
    }, [dispatch, success, error]);

    const logout = () => {
        dispatch(logoutUser());
    };

    return (
        <>
            <Head>
                <title>Admin Dashboard | Autify Network</title>
                <meta name="description" content="Autify Network Admin Dashboard" />
            </Head>

            {!user || loading ? (
                <Loading status={true} section={true} />
            ) : (
                user?.issuer && (
                    <div className="w-full flex flex-col items-center justify-center bg-light-100">
                        <div className="w-full max-w-[1920px] h-screen flex flex-col">
                            <div className="w-full h-full flex flex-col items-center justify-center">
                                <h1 className="text-5xl w-full whitespace-nowrap text-center">DASHBOARD</h1>

                                <div className="mt-10 flex flex-col gap-8">
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="label">Email</p>
                                        <p className="profile-info">{user.email}</p>
                                    </div>

                                    <div className="flex flex-col items-center justify-center">
                                        <p className="label">Wallet Address</p>
                                        <p className="profile-info">{user.publicAddress}</p>
                                    </div>

                                    {selectedAccount?.smartAccountAddress && (
                                        <div className="flex flex-col items-center justify-center">
                                            <p className="label">Smart Account Address</p>
                                            <p className="profile-info">{selectedAccount.smartAccountAddress}</p>
                                        </div>
                                    )}

                                    <div className="flex flex-col items-center justify-center">
                                        <p className="label">User Id</p>
                                        <p className="profile-info">{user.issuer}</p>
                                    </div>

                                    <Button variant="secondary" isLoading={logoutLoading} onClick={() => logout()}>
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </>
    );
}
