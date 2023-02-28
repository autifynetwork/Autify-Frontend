import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { magic } from '@/lib/magic';
import { UserContext } from '@/store/UserContext';
import Loading from '@/components/ui/Loading';

const Callback = () => {
    const router = useRouter();
    const [, setUser] = useContext(UserContext);

    // The redirect contains a `provider` query param if the user is logging in with a social provider
    useEffect(() => {
        finishEmailRedirectLogin();
    }, [router.query]);

    // `loginWithCredential()` returns a didToken for the user logging in
    const finishEmailRedirectLogin = () => {
        if (router.query.magic_credential && magic)
            magic.auth.loginWithCredential().then((didToken) => authenticateWithServer(didToken));
    };

    // Send token to server to validate
    const authenticateWithServer = async (didToken: string | null) => {
        let res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + didToken,
            },
        });

        if (res.status === 200 && magic) {
            // Set the UserContext to the now logged in user
            let userMetadata = await magic.user.getMetadata();
            await setUser(userMetadata);
            router.push('/profile');
        }
    };

    return <Loading status={true} section={true} />;
};

export default Callback;
