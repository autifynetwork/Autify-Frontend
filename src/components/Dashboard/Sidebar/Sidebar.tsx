import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from './SectionHeading';
import SidebarButton from './SidebarButton';

const Sidebar = () => {
    return (
        <AnimatePresence>
            <motion.div
                className="basis-full h-screen bg-primary-500 md:basis-[18%] p-10 space-y-4"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}>
                <div className="w-full h-full flex flex-col gap-y-10 text-light-100">
                    <div className="relative flex w-full 2xl:h-[135px] h-[100px]">
                        <Image src="/assets/logo.png" alt="logo" fill objectFit="contain" />
                    </div>

                    <div className="py-2 px-4 flex gap-x-4 justify-start items-center bg-primary-600 font-light rounded-lg">
                        <i className="fa-solid fa-house text-sm"></i>
                        <span>DASHBOARD</span>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <SectionHeading>PRODUCT MANAGEMENT</SectionHeading>
                        <SidebarButton
                            icon={<i className="fa-regular fa-rectangle-list"></i>}
                            text="Category Setup"
                            path={'/category-setup'}
                        />
                        <SidebarButton
                            icon={<i className="fa-solid fa-shirt"></i>}
                            text="Product Setup"
                            path={'/product-setup'}
                        />
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <SectionHeading>USER MANAGEMENT</SectionHeading>
                        <SidebarButton
                            icon={<i className="fa-solid fa-user-group"></i>}
                            text="Vendor Setup"
                            path={'/vendor-setup'}
                        />
                        <SidebarButton
                            icon={<i className="fa-solid fa-gear"></i>}
                            text="Vendor Roles"
                            path={'/vendor-roles'}
                        />
                        <SidebarButton
                            icon={<i className="fa-solid fa-bell"></i>}
                            text="Send Notifications"
                            path={'/send-notifications'}
                        />
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <SectionHeading>HELP & SUPPORT SECTION</SectionHeading>
                        <SidebarButton
                            icon={<i className="fa-solid fa-headset"></i>}
                            text="Raise Ticket"
                            path={'/raise-ticket'}
                        />
                        <SidebarButton
                            icon={<i className="fa-solid fa-code-pull-request"></i>}
                            text="Feature Request"
                            path={'/feature-request'}
                        />
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <SectionHeading>ORDER MANAGEMENT</SectionHeading>
                        <SidebarButton icon={<i className="fa-solid fa-circle"></i>} text="Orders" path={'/orders'} />
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Sidebar;
