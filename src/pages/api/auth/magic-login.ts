import { Magic } from '@magic-sdk/admin';
import { NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { setTokenCookie } from '@/lib/cookies';

// Initiating Magic instance for server-side methods
const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default async function login(req: any, res: NextApiResponse) {
    try {
        const didToken: string | undefined = req.headers.authorization?.substr(7);
        if (didToken) {
            magic.token.validate(didToken);
            const metadata = await magic.users.getMetadataByToken(didToken);

            const token = jwt.sign(
                {
                    ...metadata,
                    exp:
                        Math.floor(Date.now() / 1000) +
                        60 * 60 * 24 * parseInt(process.env.SESSION_LENGTH_IN_DAYS || '7'),
                },
                process.env.JWT_SECRET || ''
            );

            setTokenCookie(res, token);

            res.status(200).json({ authenticated: true, user: metadata });
        }
    } catch (error) {
        res.status(500).json({ error: error.message || 'Something went wrong' });
    }
}
