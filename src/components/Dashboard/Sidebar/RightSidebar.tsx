import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const RightSidebar = () => {
    return (
        <AnimatePresence>
            <motion.div
                className="basis-full h-screen bg-light-100 md:basis-[18%] p-8 space-y-4"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}>
                <div className="w-full h-full flex flex-col gap-y-10 text-light-100">
                    <div className="relative flex w-full 2xl:h-[135px] h-[100px]">
                        <Image src="/assets/logo.png" alt="logo" fill objectFit="contain" />
                    </div>

                    <div className="flex flex-col justify-start items-center p-4 rounded-2xl font-semibold h-80 bg-primary-500">
                        Order Status Statistics
                    </div>

                    <div className="flex flex-col justify-start items-center p-4 rounded-2xl font-semibold h-60 bg-primary-400 text-dark-800">
                        Ticket Status
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default RightSidebar;
