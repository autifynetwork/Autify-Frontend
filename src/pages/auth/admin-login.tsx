import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { title_admin_login, meta_description } from '@/config/constants';
import Image from 'next/image';
import Router from 'next/router';
import { magic } from '@/lib/magic';
import { UserContext, UserContextType } from '@/store/UserContext';
import { LoadingContext, LoadingContextType } from '@/store/LoadingContext';
import { RootState, useTypedDispatch, useTypedSelector } from '@/redux/redux-store';
import { emailWhitelistCheck, loginUser, resetState, clearErrors } from '@/redux/actions/userActions';
import { sleep } from '@/utils/sleep';
import Button from '@/components/ui/Button';
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
            // TODO: Handle Error
            console.log('Error:', error);
            dispatch(clearErrors());
        }
    }, [dispatch, success, error]);

    useEffect(() => {
        // This useEffect is triggered when the emailWhitelistCheckSuccess or emailWhitelistCheckError state changes
        if (email) {
            // Making a delay in order for the user to see the success/error state of the email input
            sleep(200).then(async () => {
                if (emailWhitelistCheckSuccess) {
                    await handleLoginWithMagicLink();
                }
                if (emailWhitelistCheckError) {
                    setEmailNotWhitelistedModalOpen(true);
                    // TODO: Handle Error
                }
                setButtonDisabled(false);
            });
        }
    }, [dispatch, emailWhitelistCheckSuccess, emailWhitelistCheckError]);

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
            dispatch(clearErrors());
            console.error(error);
        }
    }

    return (
        <>
            <Head>
                <title>{title_admin_login}</title>
                <meta name="description" content={meta_description} />
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
                                        setButtonDisabled(true);
                                        // Check if email is whitelisted
                                        dispatch(emailWhitelistCheck(email));
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
                                                dispatch(resetState());
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
                                        <Button variant="primary" isLoading={isButtonDisabled}>
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
                            <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-1/2 bg-white/40 backdrop-blur rounded-2xl px-8 pt-10 pb-16 border border-[#C4C4C4]">
                                <h2 className="text-4xl font-bold text-dark-400">Lorem Ipsum</h2>
                                <p className="text-lg mt-4 text-dark-400">
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod t
                                    magna aliquyam erat, sed diam voluptua
                                </p>
                            </div>
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
