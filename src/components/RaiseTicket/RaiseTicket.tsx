import { useState } from 'react';
import TextInput from '@/components/ui/Input/TextInput';
import Textarea from '@/components/ui/Input/Textarea';
import Button from '@/components/ui/Button';
import Table from '@/components/Dashboard/Table';
import TableSearch from '@/components/Dashboard/TableSearch';

const RaiseTicket = () => {
    // @ts-ignore
    const [tableSearchText, setTableSearchText] = useState('');
    // @ts-ignore
    const onSearchTextChange = (e: { target: { name: any; value: any } }) => {
        setTableSearchText(e.target.value);
    };

    const [tableData, setTableData] = useState({
        head: ['SL No', 'Vendor Name', 'Subject', 'Status', 'Priority', 'Created Date'],
        body: [
            {
                serialNumber: 1,
                vendor: { image: '', name: 'John Doe', contact: '+91 980 7654 321' },
                subject: 'Billing Issues',
                ticketStatus: 'OPEN',
                priority: 'Low',
                createdDate: '01/08/2023',
            },
            {
                serialNumber: 2,
                vendor: { image: '', name: 'John Doe', contact: '+91 980 7654 321' },
                subject: 'Product Mgmt',
                ticketStatus: 'CLOSED',
                priority: 'Medium',
                createdDate: '26/07/2023',
            },
        ],
    });

    return (
        <Table
            header={
                <div className="w-full flex justify-between">
                    <TableSearch
                        name={'tableSearchText'}
                        value={tableSearchText}
                        onFieldChange={onSearchTextChange}
                        placeholder={'Search by name or ID...'}
                    />

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
                            onClick={() => {}}
                            variant={'primary'}
                            classes={'text-xs px-4 py-2 rounded-[4px] shadow-none'}>
                            CREATE TICKET <i className="fa-solid fa-plus ml-2"></i>
                        </Button>
                    </div>
                </div>
            }
            tableData={tableData}
            setTableData={setTableData}
            tableType={'ticket'}
        />
    );
};

export default RaiseTicket;
