import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/Dashboard/Sidebar/Sidebar';
import RightSidebar from '@/components/Dashboard/Sidebar/RightSidebar';
import Clock from '@/components/Dashboard/Clock';

export default function DashboardWrapper({ children }: any) {
    return (
        <main className="w-full flex flex-col items-center justify-center bg-primary-500">
            <div className="w-full max-w-[1920px] flex justify-center items-start min-h-screen">
                <div className="relative w-full h-full flex flex-col md:flex-row">
                    <Sidebar />

                    <AnimatePresence>
                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="basis-full md:basis-[64%] flex flex-col bg-primary-500 bg-gradient-to-r from-primary-500 to-white">
                            <div className="rounded-[42px] bg-[#F4FAFF] min-h-screen h-full pt-10 pb-10 flex flex-col gap-y-16 px-10">
                                <div className="w-full flex justify-center">
                                    <Clock />
                                </div>
                                {children}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <RightSidebar />
                </div>
            </div>
        </main>
    );
}
