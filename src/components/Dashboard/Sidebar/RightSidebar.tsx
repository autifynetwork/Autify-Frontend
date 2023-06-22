import { motion, AnimatePresence } from 'framer-motion';

const RightSidebar = () => {
    return (
        <AnimatePresence>
            <motion.div
                className="basis-full min-h-screen flex bg-light-100 md:basis-[18%] p-8 space-y-4"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}>
                <div className="w-full h-full flex flex-col gap-y-10 ">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-x-3">
                            <span className="relative flex items-center justify-center w-[45px] h-[45px] bg-gray-200 rounded-full">
                                <i className="fa-solid fa-user-astronaut text-xl"></i>
                            </span>
                            <div className="flex flex-col">
                                <span>John Doe</span>
                                <span className="text-sm font-light">SUPER ADMIN</span>
                            </div>
                        </div>
                        <span className="relative flex items-center justify-center w-[22px] h-[22px] bg-primary-500 text-light-100 rounded-full">
                            <i className="fa-solid fa-angle-down"></i>
                        </span>
                    </div>

                    <div className="flex flex-col justify-start items-center p-4 rounded-2xl font-semibold h-80 bg-primary-500 text-light-100">
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
