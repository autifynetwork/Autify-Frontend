import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import OrderStatusStats from './RightSidebar/OrderStatusStats';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const RightSidebar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <AnimatePresence>
            <motion.div
                className="basis-full min-h-screen flex bg-light-100 md:basis-[18%] p-8 space-y-4"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}>
                <div className="w-full h-full flex flex-col gap-y-10 ">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => setShowDropdown((prevState) => !prevState)}>
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

                    {showDropdown && (
                        <div className="flex flex-col gap-y-3 justify-start items-center rounded-2xl pb-4 font-semibold h-68 bg-light-100 text-dark-800 border border-gray-200">
                            <div className="relative h-28 w-full bg-gray-300 rounded-t-2xl">
                                <Image src="/bg.jpg" alt="bg" fill className="rounded-t-2xl" />
                            </div>
                            <span className="-mt-10 relative flex items-center justify-center w-[60px] h-[60px] bg-gray-200 rounded-full">
                                <i className="fa-solid fa-user-astronaut text-2xl"></i>
                            </span>
                            <div className="w-full flex flex-col items-center px-6">
                                <span>John Doe</span>
                                <div className="w-full flex justify-between text-[12px] mt-4">
                                    <span className="font-light">AutyTok9800123</span>
                                    <span className="text-primary-500">Wallet ID</span>
                                </div>
                                <div className="mt-2 w-full border-2 border-primary-500"></div>
                                <div className="w-full flex flex-col mt-4 gap-y-1">
                                    <Link
                                        href="/profile"
                                        className="w-full flex items-center space-x-4 rounded-t-lg p-2 border-b-2 border-primary-300 hover:bg-gray-200 cursor-pointer">
                                        <div className="flex flex-col justify-center items-center bg-[#FF4267] text-light-100 text-sm rounded-lg w-7 h-7">
                                            <i className="fa-solid fa-file-invoice-dollar"></i>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <span className="text-[12px] font-semibold">My Profile</span>
                                            <span className="text-[10px] font-light -mt-[2px]">Lorem</span>
                                        </div>
                                    </Link>
                                    <Link
                                        href="/kyc"
                                        className="w-full flex space-x-4 rounded-t-lg p-2 border-b-2 border-primary-300 hover:bg-gray-200 cursor-pointer">
                                        <div className="flex flex-col justify-center items-center bg-[#0890FE] text-light-100 text-sm rounded-lg w-7 h-7">
                                            <i className="fa-solid fa-certificate"></i>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <span className="text-[12px] font-semibold">KYC</span>
                                            <span className="text-[10px] font-light -mt-[2px]">Lorem</span>
                                        </div>
                                        <div className="border-b-2 border-primary-300"></div>
                                    </Link>
                                </div>
                                <div className="mt-4">
                                    <Button>
                                        <div className="flex items-center justify-center text-sm gap-x-4">
                                            <span>Logout</span> <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

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
