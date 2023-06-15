import { useState } from 'react';
import TextInput from '@/components/ui/Input/TextInput';
import Button from '@/components/ui/Button';
import Underline from '@/components/ui/Underline';
import Table from '@/components/Dashboard/Table';
import TableSearch from '@/components/Dashboard/TableSearch';

const ProductSku = () => {
    const [productSku, setProductSkuData] = useState({ name: '', category: '' });
    const onFieldChange = (e: { target: { name: any; value: any } }) => {
        setProductSkuData({ ...productSku, [e.target.name]: e.target.value });
    };

    const [tableSearchText, setTableSearchText] = useState('');
    const onSearchTextChange = (e: { target: { name: any; value: any } }) => {
        setTableSearchText(e.target.value);
    };
    const [tableData, setTableData] = useState({
        head: ['SL No', 'SKU Details', 'Main Category Name', 'Status', 'Action'],
        body: [
            { id: 1, name: 'SKU-GG 1', mainCategoryName: 'Main Category 1', status: 'inactive' },
            { id: 2, name: 'SKU-GG 2', mainCategoryName: 'Main Category 2', status: 'active' },
            { id: 3, name: 'SKU-GG 3', mainCategoryName: 'Main Category 3', status: 'active' },
            { id: 4, name: 'SKU-GG 4', mainCategoryName: 'Main Category 4', status: 'inactive' },
        ],
    });

    return (
        <>
            <div className="relative flex flex-col gap-8 rounded-[20px] bg-light-100 p-10">
                <div>
                    <h1 className="text-2xl font-semibold">Product SKU</h1>
                    <Underline />
                </div>

                <div className="grid grid-cols-2 gap-10 mt-6">
                    <TextInput
                        label={'Add SKU'}
                        type={'text'}
                        value={productSku.name}
                        name={'name'}
                        onFieldChange={onFieldChange}
                        placeholder="Ex. UGG-BB-PUR-06"
                        required={true}
                    />

                    <TextInput
                        label={'Select Category'}
                        type={'text'}
                        value={productSku.category}
                        name={'category'}
                        onFieldChange={onFieldChange}
                        placeholder="Main Category Title"
                        required={true}
                    />
                </div>

                <div className="flex self-end">
                    <Button type="button" variant="primary">
                        Submit
                    </Button>
                </div>
            </div>

            <Table
                heading={'PRODUCT SKU TABLE'}
                header={
                    <TableSearch
                        name={'tableSearchText'}
                        value={tableSearchText}
                        onFieldChange={onSearchTextChange}
                        placeholder={'Search for...'}
                    />
                }
                tableData={tableData}
                setTableData={setTableData}
            />
        </>
    );
};

export default ProductSku;
