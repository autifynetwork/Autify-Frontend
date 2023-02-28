import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import { magic } from '@/lib/magic';
import { UserContext } from '@/store/UserContext';
import { LoadingContext } from '@/store/LoadingContext';
import Button from '@/components/ui/Button';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [isDisabled, setDisabled] = useState(false);
    const [, setLoading] = useContext(LoadingContext);
    const [user, setUser] = useContext(UserContext);

    // Redirect to /dashboard if the user is logged in
    useEffect(() => {
        user?.issuer && Router.push('/dashboard');
    }, [user]);

    async function handleLoginWithEmail() {
        try {
            if (magic) {
                setDisabled(true); // disable login button to prevent multiple emails from being triggered

                // Trigger Magic link to be sent to user
                let didToken = await magic.auth.loginWithMagicLink({
                    email,
                    redirectURI: new URL('/magic-callback', window.location.origin).href, // optional redirect back to your app after magic link is clicked
                });

                setLoading({ status: true });
                // Validate didToken with server
                const res = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + didToken,
                    },
                });

                if (res.status === 200) {
                    // Set the UserContext to the now logged in user
                    let userMetadata = await magic.user.getMetadata();
                    await setUser(userMetadata);
                    Router.push('/dashboard');
                    setLoading({ status: false });
                }
            }
        } catch (error) {
            setDisabled(false); // re-enable login button - user may have requested to edit their email
            setLoading({ status: false });
            console.log(error);
        }
    }

    return (
        <div className="w-full flex flex-col items-center justify-center bg-light-100">
            <div className="w-full max-w-[1920px] h-screen flex flex-col">
                <div className="w-full h-full flex">
                    <div className="w-fit flex flex-col items-start justify-center pl-24 pr-32">
                        <h1 className="text-5xl w-full whitespace-nowrap">ADMIN LOGIN</h1>
                        <p className="text-md font-light mt-4">Lorem Ipsum.</p>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleLoginWithEmail();
                            }}
                            className="w-full flex flex-col mt-10">
                            <label htmlFor="email" className="text-sm text-dark-500 font-semibold">
                                Enter Your Email ID
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 w-full bg-light-100 border border-dark-500 transition duration-300 outline-0 rounded-md px-3 py-[10px] normal-case"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <div className="mt-6">
                                <Button variant="primary" isLoading={isDisabled} classes="text-md px-8 py-3">
                                    Sign In
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div className="relative w-full">
                        <Image src="/assets/login/bg.png" alt="bg" fill className="object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
}
