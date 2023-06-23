import { useState } from 'react';
import Image from 'next/image';
import StatusInfoCard from './StatusInfoCard';
import TransactionsTable from '@/components/Dashboard/TransactionsTable';

const Dashboard = () => {
    // @ts-ignore
    const [tableData, setTableData] = useState({
        head: ['Name', 'Date', 'Type', 'Quantity', 'Transaction Type', 'Price', 'Amount'],
        body: [
            {
                name: 'APPL',
                date: '20/05/2021',
                type: 'Buy',
                quantity: '112.0',
                transactionType: 'Cash',
                price: '$112.1',
                amount: '$14.11K',
            },
            {
                name: '',
                date: '',
                type: '',
                quantity: '',
                transactionType: '',
                price: '',
                amount: '',
            },
            {
                name: '',
                date: '',
                type: '',
                quantity: '',
                transactionType: '',
                price: '',
                amount: '',
            },
            {
                name: '',
                date: '',
                type: '',
                quantity: '',
                transactionType: '',
                price: '',
                amount: '',
            },
            {
                name: '',
                date: '',
                type: '',
                quantity: '',
                transactionType: '',
                price: '',
                amount: '',
            },
            {
                name: '',
                date: '',
                type: '',
                quantity: '',
                transactionType: '',
                price: '',
                amount: '',
            },
        ],
    });

    return (
        <>
            <div className="w-full flex justify-center">
                <div className="flex gap-x-10 py-6 pl-8 pr-16 rounded-2xl bg-light-100 shadow-lg">
                    <div className="flex flex-col">
                        <span className="text-lg">Hi, John Doe 👋</span>
                        <span className="text-2xl font-semibold mt-2">Welcome back!</span>
                        <span className="mt-4 font-normal">Since your last login on the system, there were:</span>
                        <ul className="list-disc list-inside">
                            <li className="mt-1">15 new reports</li>
                            <li className="mt-1">45 new tickets</li>
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <Image src="/assets/dashboard/analysis.svg" alt="analysis" width={200} height={200} />
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-2xl font-semibold">Business Analytics</h1>
                <div className="grid grid-cols-4 gap-x-4 mt-4">
                    <div className="min-h-[150px] flex flex-col justify-center items-center bg-[#3B76EF] text-light-100 rounded-2xl p-4">
                        Chart
                    </div>
                    <div className="min-h-[150px] flex flex-col justify-center items-center bg-[#FD9ACB] text-light-100 rounded-2xl p-4">
                        Chart
                    </div>
                    <div className="min-h-[150px] flex flex-col justify-center items-center bg-[#F2AE69] text-light-100 rounded-2xl p-4">
                        Chart
                    </div>
                    <div className="min-h-[150px] flex flex-col justify-center items-center bg-[#798AF5] text-light-100 rounded-2xl p-4">
                        Chart
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-x-4 mt-10">
                    <StatusInfoCard icon={<i className="fa-solid fa-truck-ramp-box text-xl"></i>} text={'Delivered'} />
                    <StatusInfoCard icon={<i className="fa-solid fa-ban text-xl"></i>} text={'Canceled'} />
                    <StatusInfoCard icon={<i className="fa-solid fa-rotate-left text-xl"></i>} text={'Returned'} />
                    <StatusInfoCard icon={<i className="fa-solid fa-circle-xmark text-xl"></i>} text={'Failed'} />
                </div>
            </div>

            <TransactionsTable heading={'TRANSACTIONS'} tableData={tableData} />
        </>
    );
};

export default Dashboard;
