import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import { magic } from '@/lib/magic';
import { UserContext } from '@/store/UserContext';
import { LoadingContext } from '@/store/LoadingContext';
import Button from '@/components/ui/Button';
import { sleep } from '@/utils/sleep';
import EmailNotWhitelistedModal from '@/components/Auth/Admin/EmailNotWhitelistedModal';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [isEmailWhitelisted, setEmailWhitelisted] = useState(false);
    const [showEmailNotWhitelistedErrorInput, setShowEmailNotWhitelistedErrorInput] = useState(false);
    const [isEmailNotWhitelistedModalOpen, setEmailNotWhitelistedModalOpen] = useState(false);

    const [isDisabled, setDisabled] = useState(false);
    const { loading, setLoading } = useContext(LoadingContext);
    const { user, setUser } = useContext(UserContext);

    // Redirect to /dashboard if the user is logged in
    useEffect(() => {
        user?.issuer && Router.push('/dashboard');
    }, [user]);

    useEffect(() => {
        async function checkEmailWhitelistStatus() {
            // TODO: Make API call to validate email whitelist status
            const whitelisted = email.endsWith('autify.network');

            if (whitelisted) {
                setEmailWhitelisted(true);
            } else {
                setEmailWhitelisted(false);
                console.error('Email not found in whitelist');
            }
            setShowEmailNotWhitelistedErrorInput(false);
        }
        checkEmailWhitelistStatus();
    }, [email]);

    async function handleLoginWithMagicLink() {
        try {
            if (magic) {
                setDisabled(true); // disable login button to prevent multiple emails from being triggered

                // Trigger Magic link to be sent to user
                let didToken = await magic.auth.loginWithMagicLink({
                    email,
                    // redirectURI: new URL('/magic-callback', window.location.origin).href, // optional redirect back to your app after magic link is clicked
                });

                setLoading({ ...loading, status: true });
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
                    setUser({ ...userMetadata, provider: magic.rpcProvider });
                    Router.push('/dashboard');
                    setLoading({ ...loading, status: false });
                }
            }
        } catch (error) {
            setDisabled(false); // re-enable login button - user may have requested to edit their email
            setLoading({ ...loading, status: false });
            console.log(error);
        }
    }

    return (
        <>
            <div className="w-full flex flex-col items-center justify-center bg-light-100">
                <div className="w-full max-w-[1920px] h-screen flex flex-col">
                    <div className="w-full h-full grid grid-cols-12">
                        <div className="w-fit col-span-5 flex flex-col items-start justify-center pl-28 pr-32">
                            <Image src="/assets/logo.png" alt="logo" width={400} height={100} />
                            <p className="w-1/2 border-b-2 border-dark-400 my-8"></p>

                            <h1 className="mt-4 text-4xl font-semibold w-full whitespace-nowrap">ADMIN LOGIN</h1>
                            <p className="text-md font-light mt-4">Lorem Ipsum.</p>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (isEmailWhitelisted) {
                                        handleLoginWithMagicLink();
                                    } else {
                                        setShowEmailNotWhitelistedErrorInput(true);
                                        sleep(1000).then(() => {
                                            setEmailNotWhitelistedModalOpen(true);
                                        });
                                    }
                                }}
                                className="w-full flex flex-col mt-10">
                                <label htmlFor="email" className="text-lg text-dark-500 font-semibold">
                                    Enter Your Email ID
                                </label>
                                <div className="relative flex justify-center items-center mt-2">
                                    <input
                                        type="email"
                                        id="email"
                                        className={
                                            'w-full bg-light-100 border transition duration-300 outline-0 rounded-xl px-3 py-[14px] normal-case shadow-md ' +
                                            (showEmailNotWhitelistedErrorInput
                                                ? 'border-error-400'
                                                : isEmailWhitelisted
                                                ? 'border-success-400'
                                                : 'border-dark-1000 focus:border-dark-400')
                                        }
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        placeholder="yourname@email.com"
                                        required
                                    />
                                    {email && (
                                        <Image
                                            className="cursor-pointer absolute right-4"
                                            onClick={() => setEmail('')}
                                            src={
                                                showEmailNotWhitelistedErrorInput
                                                    ? '/assets/login/error.svg'
                                                    : isEmailWhitelisted
                                                    ? '/assets/login/check.svg'
                                                    : '/assets/login/close-circle-outline.svg'
                                            }
                                            alt="close"
                                            width={20}
                                            height={20}
                                        />
                                    )}
                                </div>

                                <div className="mt-10">
                                    <Button variant="primary" isLoading={isDisabled} classes="text-md px-8 py-3">
                                        Sign In
                                    </Button>
                                </div>

                                <div className="w-full text-center font-bold mt-12 text-dark-400">
                                    Interested in the product?&nbsp;<span className="underline">TALK TO US</span>
                                </div>
                            </form>
                        </div>

                        <div className="col-span-7 relative">
                            <Image src="/assets/login/bg.svg" alt="bg" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </div>

            <EmailNotWhitelistedModal
                isOpen={isEmailNotWhitelistedModalOpen}
                setOpen={setEmailNotWhitelistedModalOpen}
            />
        </>
    );
}
