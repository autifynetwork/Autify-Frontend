import { useState } from 'react';
import Table from '@/components/Dashboard/Table';
import Button from '@/components/ui/Button';
import TableSearch from '@/components/Dashboard/TableSearch';

const Track = () => {
    // @ts-ignore
    const [tableSearchText, setTableSearchText] = useState('');
    // @ts-ignore
    const onSearchTextChange = (e: { target: { name: any; value: any } }) => {
        setTableSearchText(e.target.value);
    };

    const [tableData, setTableData] = useState({
        head: [
            'SL No',
            'Product Name',
            'SKU',
            'Last Status Update',
            'Current Journey Point',
            'Overall Status',
            'Action',
        ],
        body: [
            {
                serialNumber: 1,
                product: { image: '', name: 'Product XYZ' },
                sku: '#000-1000-490',
                lastStatusUpdate: 'BOM - {{YARN}} COMPLETED',
                currentJourneyPoint: 'BOM - {{KNITTING}} IN PROGRESS',
                overallStatus: 'ON TIME',
            },
            {
                serialNumber: 2,
                product: { image: '', name: 'Product ABC' },
                sku: '#000-1000-491',
                lastStatusUpdate: 'BOM - {{YARN}} COMPLETED',
                currentJourneyPoint: 'BOM - {{KNITTING}} IN PROGRESS',
                overallStatus: 'DELAYED',
            },
        ],
    });

    return (
        <div>
            <h3 className="text-xs font-bold mb-6">TRACK TABLE</h3>

            <Table
                header={
                    <div className="w-full flex justify-between">
                        <TableSearch
                            name={'tableSearchText'}
                            value={tableSearchText}
                            onFieldChange={onSearchTextChange}
                            placeholder={'Search by name or ID...'}
                        />
                        <div></div>

                        <div className="w-fit flex gap-x-4">
                            <Button
                                type={'button'}
                                variant={'primary'}
                                outline={true}
                                classes={'text-xs px-4 py-2 rounded-[4px] shadow-none'}>
                                Export to CSV <i className="fa-solid fa-download ml-2"></i>
                            </Button>
                        </div>
                    </div>
                }
                tableData={tableData}
                setTableData={setTableData}
            />
        </div>
    );
};

export default Track;
