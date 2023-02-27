import { Magic } from 'magic-sdk';

const networkOptions = {
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || '',
    chainId: parseInt(process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK_ID || '80001'),
};

// Create client-side Magic instance
const createMagic = (key: any) => {
    return typeof window != 'undefined' && new Magic(key, { network: networkOptions });
};

export const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
