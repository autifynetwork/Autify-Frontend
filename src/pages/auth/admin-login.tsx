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
        // Redirect to /profile if the user is logged in
        if (success) {
            Router.push('/profile');
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
                            <div className="w-7/12 max-w-[500px] flex flex-col items-start justify-start -ml-10">
                                <div className="w-full h-[100px] 2xl:w-full 2xl:h-[135px] relative">
                                    <Image src="/assets/logo.png" alt="logo" fill objectFit="contain" />
                                </div>

                                <div className="w-full flex items-start">
                                    <p className="w-1/2 border-b-2 border-dark-400 my-8"></p>
                                </div>

                                <h1 className="mt-4 text-4xl font-semibold w-full whitespace-nowrap">ADMIN LOGIN</h1>
                                <p className="w-full text-md text-start font-light mt-4">Hello there!</p>

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
                                        <Button variant="secondary" isLoading={isButtonDisabled}>
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

                        <div className="col-span-7 relative bg-primary-400 rounded-l-[100px] flex items-center justify-center">
                            <div style={{ width: '85%', height: '85%', position: 'absolute' }}>
                                <Image src="/assets/login/people.svg" alt="bg" fill objectFit="contain" />
                            </div>
                            <div style={{ width: '74%', height: '74%' }}>
                                <svg
                                    id="Illustration_BG"
                                    data-name="Illustration BG"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    width="full"
                                    height="full"
                                    viewBox="0 0 892.292 829.469">
                                    <defs>
                                        <clipPath id="clip-path">
                                            <rect
                                                id="Rectangle_16857"
                                                data-name="Rectangle 16857"
                                                width="892.292"
                                                height="829.469"
                                                fill="none"
                                                stroke="#707070"
                                                stroke-width="4"
                                            />
                                        </clipPath>
                                        <clipPath id="clip-path-3">
                                            <rect
                                                id="Rectangle_16851"
                                                data-name="Rectangle 16851"
                                                width="700.107"
                                                height="673.36"
                                                fill="none"
                                                stroke="#707070"
                                                stroke-width="4"
                                            />
                                        </clipPath>
                                        <clipPath id="clip-path-4">
                                            <rect
                                                id="Rectangle_16852"
                                                data-name="Rectangle 16852"
                                                width="387.062"
                                                height="183.799"
                                                fill="none"
                                                stroke="#707070"
                                                stroke-width="4"
                                            />
                                        </clipPath>
                                        <clipPath id="clip-path-5">
                                            <rect
                                                id="Rectangle_16853"
                                                data-name="Rectangle 16853"
                                                width="387.063"
                                                height="183.799"
                                                fill="none"
                                                stroke="#707070"
                                                stroke-width="4"
                                            />
                                        </clipPath>
                                        <clipPath id="clip-path-6">
                                            <rect
                                                id="Rectangle_16854"
                                                data-name="Rectangle 16854"
                                                width="250.152"
                                                height="527.474"
                                                fill="none"
                                                stroke="#707070"
                                                stroke-width="4"
                                            />
                                        </clipPath>
                                    </defs>
                                    <g id="Group_9778" data-name="Group 9778" clip-path="url(#clip-path)">
                                        <g id="Group_9777" data-name="Group 9777">
                                            <g id="Group_9776" data-name="Group 9776" clip-path="url(#clip-path)">
                                                <g
                                                    id="Group_9763"
                                                    data-name="Group 9763"
                                                    transform="translate(53.745 22.893)"
                                                    opacity="0.51">
                                                    <g id="Group_9762" data-name="Group 9762">
                                                        <g
                                                            id="Group_9761"
                                                            data-name="Group 9761"
                                                            clip-path="url(#clip-path-3)">
                                                            <path
                                                                id="Path_9265"
                                                                data-name="Path 9265"
                                                                d="M50.468,492.849c-73.74-177.97,10.754-382.02,188.724-455.763S621.212,47.839,694.952,225.81,684.2,607.83,506.231,681.57"
                                                                transform="translate(-22.656 -9.277)"
                                                                fill="none"
                                                                stroke="#fff"
                                                                stroke-miterlimit="10"
                                                                stroke-width="4"
                                                            />
                                                        </g>
                                                    </g>
                                                </g>
                                                <g
                                                    id="Group_9766"
                                                    data-name="Group 9766"
                                                    transform="translate(130.129 485.455)"
                                                    opacity="0.51">
                                                    <g id="Group_9765" data-name="Group 9765">
                                                        <g
                                                            id="Group_9764"
                                                            data-name="Group 9764"
                                                            clip-path="url(#clip-path-4)">
                                                            <path
                                                                id="Path_9266"
                                                                data-name="Path 9266"
                                                                d="M442.457,370.392C291.9,432.774,119.282,361.3,56.9,210.74"
                                                                transform="translate(-55.836 -210.297)"
                                                                fill="none"
                                                                stroke="#fff"
                                                                stroke-miterlimit="10"
                                                                stroke-width="4"
                                                            />
                                                        </g>
                                                    </g>
                                                </g>
                                                <g
                                                    id="Group_9769"
                                                    data-name="Group 9769"
                                                    transform="translate(290.404 76.636)"
                                                    opacity="0.51">
                                                    <g id="Group_9768" data-name="Group 9768">
                                                        <g
                                                            id="Group_9767"
                                                            data-name="Group 9767"
                                                            clip-path="url(#clip-path-5)">
                                                            <path
                                                                id="Path_9267"
                                                                data-name="Path 9267"
                                                                d="M126.144,56.29C276.7-6.093,449.317,65.386,511.7,215.942"
                                                                transform="translate(-125.701 -32.585)"
                                                                fill="none"
                                                                stroke="#fff"
                                                                stroke-miterlimit="10"
                                                                stroke-width="4"
                                                            />
                                                        </g>
                                                    </g>
                                                </g>
                                                <g id="Group_9772" data-name="Group 9772" opacity="0.51">
                                                    <g id="Group_9771" data-name="Group 9771">
                                                        <g
                                                            id="Group_9770"
                                                            data-name="Group 9770"
                                                            clip-path="url(#clip-path-6)">
                                                            <path
                                                                id="Path_9268"
                                                                data-name="Path 9268"
                                                                d="M31.264,526.43C-53.836,321.045,43.674,85.562,249.059.462"
                                                                transform="translate(0.653 0.603)"
                                                                fill="none"
                                                                stroke="#fff"
                                                                stroke-miterlimit="10"
                                                                stroke-width="4"
                                                            />
                                                        </g>
                                                    </g>
                                                </g>
                                                <g
                                                    id="Group_9775"
                                                    data-name="Group 9775"
                                                    transform="translate(557.443 218.417)"
                                                    opacity="0.51">
                                                    <g id="Group_9774" data-name="Group 9774">
                                                        <g
                                                            id="Group_9773"
                                                            data-name="Group 9773"
                                                            clip-path="url(#clip-path-6)">
                                                            <path
                                                                id="Path_9269"
                                                                data-name="Path 9269"
                                                                d="M459.756,94.922c85.1,205.385-12.409,440.868-217.794,525.968"
                                                                transform="translate(-241.519 -94.479)"
                                                                fill="none"
                                                                stroke="#fff"
                                                                stroke-miterlimit="10"
                                                                stroke-width="4"
                                                            />
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>

                            {/* <div className="xl:w-[53%] lg:w-[60%] md:w-[70%] absolute top-[68%] left-1/2 transform -translate-x-[54%] -translate-y-1/3 bg-white/10 backdrop-blur rounded-2xl px-8 pt-14 pb-[94px] border border-[#C4C4C4]">
                                <h2 className="text-3xl font-bold text-dark-400">Lorem Ipsum</h2>
                                <p className="text-lg mt-4 text-dark-400">
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod t
                                    magna aliquyam erat, sed diam voluptua
                                </p>
                            </div> */}
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
