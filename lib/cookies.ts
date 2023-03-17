import { serialize } from 'cookie';
import { NextApiResponse } from 'next';

const TOKEN_NAME = 'jwt';
const MAX_AGE = 60 * 60 * 24 * parseInt(process.env.SESSION_LENGTH_IN_DAYS || '7');

export function setTokenCookie(res: NextApiResponse, token: string) {
    const cookie = serialize(TOKEN_NAME, token, {
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // if true, cookie will only be set if https (won't be set if http)
        path: '/',
        sameSite: 'lax',
    });
    res.setHeader('Set-Cookie', cookie);
}

export function removeTokenCookie(res: NextApiResponse) {
    res.setHeader(
        'Set-Cookie',
        serialize(TOKEN_NAME, '', {
            httpOnly: true,
            maxAge: -1,
            secure: process.env.NODE_ENV !== 'development',
            expires: new Date(0),
            sameSite: 'strict',
            path: '/',
        })
    );
    res.status(200);
    res.json({ success: true });
}
