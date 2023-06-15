import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from './SectionHeading';
import SidebarButton from './SidebarButton';
import SidebarDropdown from './SidebarDropdown';
import { useRouter } from 'next/router';

const Sidebar = () => {
    const router = useRouter();

    return (
        <AnimatePresence>
            <motion.div
                className="basis-full min-h-screen bg-primary-500 md:basis-[18%] p-8 space-y-4"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}>
                <div className="w-full h-full flex flex-col gap-y-10 text-light-100 text-sm">
                    <div className="relative flex w-full 2xl:h-[135px] h-[100px]">
                        <Image src="/assets/logo_white_transparent_bg.png" alt="logo" fill objectFit="contain" />
                    </div>

                    <Link
                        href="/dashboard"
                        className={
                            'py-2 px-4 inline-block align-middle font-light rounded-lg ' +
                            (router.pathname == '/dashboard' ? 'bg-primary-600' : '')
                        }>
                        <i className="fa-solid fa-house text-sm"></i>
                        <span className="ml-3">DASHBOARD</span>
                    </Link>

                    <div className="flex flex-col gap-y-2">
                        <SectionHeading>PRODUCT MANAGEMENT</SectionHeading>
                        <SidebarDropdown
                            icon={<i className="fa-regular fa-rectangle-list"></i>}
                            text="Category Setup"
                            path={'/category-setup'}
                            options={[
                                { name: 'Categories', path: '/category-setup/categories' },
                                { name: 'Sub-Categories', path: '/category-setup/sub-categories' },
                            ]}
                        />
                        <SidebarDropdown
                            icon={<i className="fa-solid fa-shirt"></i>}
                            text="Product Setup"
                            path={'/product-setup'}
                            options={[
                                { name: 'Product List', path: '/product-setup/product-list' },
                                { name: 'Product Attribute', path: '/product-setup/product-attribute' },
                                { name: 'Bulk Import', path: '/product-setup/bulk-import' },
                                { name: 'Product SKU', path: '/product-setup/product-sku' },
                            ]}
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
                            icon={<i className="fa-solid fa-clipboard-question"></i>}
                            text="Knowledge Base"
                            path={'/knowledge-base'}
                        />
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
