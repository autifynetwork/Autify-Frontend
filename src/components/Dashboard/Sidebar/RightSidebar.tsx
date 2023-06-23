import { motion, AnimatePresence } from 'framer-motion';
import OrderStatusStats from './RightSidebar/OrderStatusStats';

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

                    <div className="flex flex-col gap-y-5 justify-start items-center p-4 rounded-2xl font-semibold h-68 bg-primary-500 text-light-100">
                        Order Status Statistics
                        <OrderStatusStats />
                    </div>

                    <div className="flex flex-col justify-start items-center p-4 rounded-2xl font-semibold h-56 bg-primary-400 text-dark-800">
                        Ticket Status
                        <div className="w-full mt-4 flex flex-col gap-y-6 text-sm font-normal">
                            <div>
                                <div className="text-[#7C828A]">XX of total XX</div>
                                <div className="w-full rounded-full h-2.5 bg-[#7388A95A]">
                                    <div className="bg-blue-600 h-2.5 w-1/3 rounded-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="text-[#7C828A]">XX of total XX</div>
                                <div className="w-full rounded-full h-2.5 bg-[#7388A95A]">
                                    <div className="bg-[#EC6666] h-2.5 w-4/5 rounded-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="text-[#7C828A]">XX of total XX</div>
                                <div className="w-full rounded-full h-2.5 bg-[#7388A95A]">
                                    <div className="bg-[#FFED1A] h-2.5 w-3/5 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default RightSidebar;
