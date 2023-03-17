import { NextApiResponse } from 'next';
import { removeTokenCookie } from '@/lib/cookies';

/**
 * Clear the cookie with the JWT to log the user out
 * Log the user our of their session with Magic if it's still valid (valid for 7 days after initial login)
 * Redirect the user to /login
 */
export default async function logout(req: any, res: NextApiResponse) {
    try {
        if (!req.cookies.jwt) return res.status(401).json({ message: 'User is not logged in' });

        removeTokenCookie(res);

        res.end();
    } catch (error) {
        res.status(401).json({ message: 'User is not logged in' });
    }
}
