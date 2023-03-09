import { Magic } from '@magic-sdk/admin';
import { NextApiResponse } from 'next';

// Initiating Magic instance for server-side methods
const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default async function login(req: any, res: NextApiResponse) {
    try {
        const didToken: (string | undefined) = req.headers.authorization?.substr(7);
        if (didToken) {
            magic.token.validate(didToken);
            res.status(200).json({ authenticated: true });
        }
    } catch (error) {
        res.status(500).json({ error: error.message || 'Something went wrong' });
    }
}
