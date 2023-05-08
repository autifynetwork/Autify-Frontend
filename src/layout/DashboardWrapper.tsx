import Sidebar from '@/components/Dashboard/Sidebar/Sidebar';
import RightSidebar from '@/components/Dashboard/Sidebar/RightSidebar';

export default function DashboardWrapper({ children }: any) {
    return (
        <main className="w-full flex flex-col items-center justify-center bg-light-200">
            <div className="w-full max-w-[1920px] flex justify-center items-start min-h-screen">
                <div className="relative w-full h-full flex flex-col md:flex-row">
                    <Sidebar />

                    <div className="basis-full md:basis-[64%] flex flex-col bg-primary-500 bg-gradient-to-r from-primary-500 to-white">
                        <div className="rounded-[42px] bg-[#F4FAFF] min-h-screen py-10 pb-32 gap-y-10 pl-6 pr-10 md:pl-0">
                            {children}
                        </div>
                    </div>

                    <RightSidebar />
                </div>
            </div>
        </main>
    );
}
