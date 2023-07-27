import { useState } from 'react';
import { useRouter } from 'next/router';
import Table from '@/components/Dashboard/Table';
import Button from '@/components/ui/Button';

const ProductList = () => {
    const router = useRouter();

    // @ts-ignore
    const [tableSearchText, setTableSearchText] = useState('');
    // @ts-ignore
    const onSearchTextChange = (e: { target: { name: any; value: any } }) => {
        setTableSearchText(e.target.value);
    };

    const [tableData, setTableData] = useState({
        head: ['SL No', 'Product Image', 'Product Name', 'Status', 'Action'],
        body: [
            { serialNumber: 1, image: '', name: 'Product 1', status: 'active' },
            { serialNumber: 2, image: '', name: 'Product 2', status: 'active' },
            { serialNumber: 3, image: '', name: 'Product 3', status: 'inactive' },
            { serialNumber: 4, image: '', name: 'Product 4', status: 'active' },
        ],
    });

    return (
        <div>
            <h3 className="text-xs font-bold mb-6">PRODUCT TABLE</h3>

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
                            {/* <Button
                                type={'button'}
                                variant={'primary'}
                                outline={true}
                                classes={'text-xs px-4 py-2 rounded-[4px] shadow-none'}>
                                Export to CSV <i className="fa-solid fa-download ml-2"></i>
                            </Button> */}
                            <Button
                                type={'button'}
                                onClick={() => router.push('/product-setup/add-product')}
                                variant={'primary'}
                                classes={'text-xs px-4 py-2 rounded-[4px] shadow-none'}>
                                ADD PRODUCT <i className="fa-solid fa-plus ml-2"></i>
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

export default ProductList;
