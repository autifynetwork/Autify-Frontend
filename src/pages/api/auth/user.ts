import { NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { setTokenCookie } from '@/lib/cookies';

/**
 * Verify then refresh JWT each time user sends a request to /api/user
 * so they only get logged out after SESSION_LENGTH_IN_DAYS of inactivity
 */
export default async function user(req: any, res: NextApiResponse) {
    try {
        if (!req.cookies.token) return res.json({ user: null });

        let token = req.cookies.token;

        let user = jwt.verify(token, process.env.JWT_SECRET || '');

        let newToken = jwt.sign(
            {
                user,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * parseInt(process.env.SESSION_LENGTH_IN_DAYS || '7'),
            },
            process.env.JWT_SECRET || ''
        );

        setTokenCookie(res, newToken);

        res.status(200).json({ user });
    } catch (error) {
        res.status(200).json({ user: null });
    }
}
