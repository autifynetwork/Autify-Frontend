import { useState } from 'react';
import { useRouter } from 'next/router';
import Table from '@/components/Dashboard/Table';
import Button from '@/components/ui/Button';

const VendorList = () => {
    const router = useRouter();

    // @ts-ignore
    const [tableSearchText, setTableSearchText] = useState('');
    // @ts-ignore
    const onSearchTextChange = (e: { target: { name: any; value: any } }) => {
        setTableSearchText(e.target.value);
    };

    const [tableData, setTableData] = useState({
        head: ['SL No', 'Vendor Name', 'Vendor Role', 'Status', 'Action'],
        body: [
            {
                serialNumber: 1,
                vendor: { image: '', name: 'Vendor 1', contact: '+91 980 7654 321' },
                role: 'DISTRIBUTOR',
                status: 'active',
            },
            {
                serialNumber: 2,
                vendor: { image: '', name: 'Vendor 2', contact: '+91 980 7654 321' },
                role: 'DISTRIBUTOR',
                status: 'active',
            },
            {
                serialNumber: 3,
                vendor: { image: '', name: 'Vendor 3', contact: '+91 980 7654 321' },
                role: 'DISTRIBUTOR',
                status: 'inactive',
            },
            {
                serialNumber: 4,
                vendor: { image: '', name: 'Vendor 4', contact: '+91 980 7654 321' },
                role: 'DISTRIBUTOR',
                status: 'active',
            },
        ],
    });

    return (
        <div>
            <h3 className="text-xs font-bold mb-6">VENDOR TABLE</h3>

            <Table
                header={
                    <div className="w-full flex justify-between">
                        {/* <TableSearch
                            name={'tableSearchText'}
                            value={tableSearchText}
                            onFieldChange={onSearchTextChange}
                            placeholder={'Search by name or ID...'}
                        /> */}
                        <div></div>

                        <div className="w-fit flex gap-x-4">
                            <Button
                                type={'button'}
                                variant={'primary'}
                                outline={true}
                                classes={'text-xs px-4 py-2 rounded-[4px] shadow-none'}>
                                Export to CSV <i className="fa-solid fa-download ml-2"></i>
                            </Button>
                            <Button
                                type={'button'}
                                onClick={() => router.push('/vendor-setup/add-vendor')}
                                variant={'primary'}
                                classes={'text-xs px-4 py-2 rounded-[4px] shadow-none'}>
                                ADD VENDOR <i className="fa-solid fa-plus ml-2"></i>
                            </Button>
                        </div>
                    </div>
                }
                tableData={tableData}
                setTableData={setTableData}
                ignore={true}
            />
        </div>
    );
};

export default VendorList;
