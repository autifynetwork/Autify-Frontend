import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function KYBPopup({ setKYBModalOpen }: any) {
    const router = useRouter();

    // TODO: fetch KYB status from API
    const KYBCompleted = false;
    const [showKYBPopup, setShowKYBPopup] = useState(true);

    return showKYBPopup && !KYBCompleted && router.pathname.startsWith('/dashboard') ? (
        <div className="p-[10px] group relative w-full flex items-center justify-between text-center text-base text-light-100 bg-error-500">
            <div className="w-full flex justify-center">
                Please complete your KYB to access your Dashboard.
                <span onClick={() => setKYBModalOpen(true)} className="ml-3 cursor-pointer underline">
                    Click Here
                </span>
            </div>
            <motion.span
                whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.2 },
                }}
                onClick={() => setShowKYBPopup(false)}
                className="cursor-pointer self-start sm:self-center">
                <Image src="/ui/close.png" alt="close" width="20" height="20" className="sm:block hidden" />
                <Image src="/ui/close.png" alt="close" width="40" height="40" className="sm:hidden block" />
            </motion.span>
        </div>
    ) : (
        <></>
    );
}
