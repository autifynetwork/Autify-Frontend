import { useContext } from 'react';
import Router from 'next/router';
import { magic } from '@/lib/magic';
import { UserContext,UserContextType } from '@/store/UserContext';
import Loading from '@/components/ui/Loading';
import Button from '@/components/ui/Button';
import { useSmartAccountContext } from '@/store/SmartAccountContext';

export default function Dashboard():JSX.Element {
    const { user, setUser } = useContext<UserContextType>(UserContext);
    const { selectedAccount,loading } = useSmartAccountContext()
    

    const logout:(()=>void) = () =>{
        magic &&
            magic.user.logout().then(() => {
                setUser(null as any);
                Router.push('/auth/admin-login');
            });
    };

    return (
        <>
            {!user || loading ?  (
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
                                        
                                        {selectedAccount?.smartAccountAddress &&
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="label">Smart Account Address</p>
                                                <p className="profile-info">{selectedAccount.smartAccountAddress}</p>
                                            </div>}

                                    <div className="flex flex-col items-center justify-center">
                                        <p className="label">User Id</p>
                                        <p className="profile-info">{user.issuer}</p>
                                        </div>
                                        
                                    <Button variant="secondary" onClick={() => logout()}>
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
