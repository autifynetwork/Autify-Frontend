import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Router from 'next/router';
import { magic } from '@/lib/magic';
import { UserContext, UserContextType } from '@/store/UserContext';
import { LoadingContext, LoadingContextType } from '@/store/LoadingContext';
import { RootState, useTypedDispatch, useTypedSelector } from '@/redux/redux-store';
import { emailWhitelistCheck, loginUser, resetState, clearErrors } from '@/redux/actions/userActions';
import Button from '@/components/ui/Button';
import { sleep } from '@/utils/sleep';
import EmailNotWhitelistedModal from '@/components/Auth/Admin/EmailNotWhitelistedModal';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [isEmailNotWhitelistedModalOpen, setEmailNotWhitelistedModalOpen] = useState(false);

    // Contexts
    const { loading, setLoading } = useContext<LoadingContextType>(LoadingContext);
    const { setUser } = useContext<UserContextType>(UserContext);

    // Redux states
    const dispatch = useTypedDispatch();
    const { success, error } = useTypedSelector((state: RootState) => state.auth);
    const { success: emailWhitelistCheckSuccess, error: emailWhitelistCheckError } = useTypedSelector(
        (state: RootState) => state.emailWhitelistCheck
    );

    useEffect(() => {
        // Redirect to /dashboard if the user is logged in
        if (success) {
            Router.push('/dashboard');
            dispatch(resetState());
        }
        if (error) {
            dispatch(clearErrors());
        }
    }, [dispatch, success, error]);

    useEffect(() => {
        // Check if email is whitelisted on every email input change
        if (email) {
            dispatch(emailWhitelistCheck(email, false));
        }
    }, [email, dispatch]);

    async function handleLoginWithMagicLink() {
        try {
            if (magic) {
                setButtonDisabled(true); // disable login button to prevent multiple emails from being triggered

                // Trigger Magic link to be sent to user
                const didToken = await magic.auth.loginWithMagicLink({
                    email,
                    // redirectURI: new URL('/magic-callback', window.location.origin).href, // optional redirect back to your app after magic link is clicked
                });

                setLoading({ ...loading, status: true });
                // Validate didToken with server
                const res = await fetch('/api/auth/magic-login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + didToken,
                    },
                });

                if (res.status === 200) {
                    // Set the UserContext to the now logged in user
                    const userData = await magic.user.getMetadata();
                    setUser({ ...userData, provider: magic.rpcProvider });
                    // Dispatch loginUser action to update redux store
                    dispatch(loginUser(userData));
                    setLoading({ ...loading, status: false });
                }
            }
        } catch (error) {
            setButtonDisabled(false); // re-enable login button - user may have requested to edit their email
            setLoading({ ...loading, status: false });
            console.error(error);
        }
    }

    return (
        <>
            <Head>
                <title>Admin Login | Autify Network</title>
                <meta name="description" content="Autify Network Admin Login" />
            </Head>

            <div className="w-full flex flex-col items-center justify-center bg-light-100">
                <div className="w-full h-screen flex flex-col">
                    <div className="w-full h-full grid grid-cols-12">
                        <div className="w-full col-span-5 flex flex-col items-center justify-center">
                            <div className="w-fit flex flex-col items-center justify-center -ml-10">
                                <Image src="/assets/logo.png" alt="logo" width={400} height={100} />
                                <div className="w-full flex items-start">
                                    <p className="w-1/2 border-b-2 border-dark-400 my-8"></p>
                                </div>

                                <h1 className="mt-4 text-4xl font-semibold w-full whitespace-nowrap">ADMIN LOGIN</h1>
                                <p className="w-full text-md text-start font-light mt-4">Lorem Ipsum.</p>

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (emailWhitelistCheckSuccess) {
                                            handleLoginWithMagicLink();
                                        } else {
                                            dispatch(emailWhitelistCheck(email, true));
                                            sleep(600).then(() => {
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
                                                (emailWhitelistCheckError
                                                    ? 'border-error-400'
                                                    : emailWhitelistCheckSuccess
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
                                                    emailWhitelistCheckError
                                                        ? '/assets/login/error.svg'
                                                        : emailWhitelistCheckSuccess
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
                                        <Button
                                            variant="primary"
                                            isLoading={isButtonDisabled}
                                            classes="text-md px-8 py-3">
                                            Sign In
                                        </Button>
                                    </div>

                                    <div className="w-full text-center font-bold mt-12 text-dark-400">
                                        Interested in the product?&nbsp;
                                        <span className="underline cursor-pointer">TALK TO US</span>
                                    </div>
                                </form>
                            </div>
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
