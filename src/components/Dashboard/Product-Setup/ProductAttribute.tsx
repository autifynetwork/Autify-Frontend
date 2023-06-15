import { useState } from 'react';
import TextInput from '@/components/ui/Input/TextInput';
import Button from '@/components/ui/Button';
import Underline from '@/components/ui/Underline';
import Table from '@/components/Dashboard/Table';
import TableSearch from '@/components/Dashboard/TableSearch';

const ProductAttribute = () => {
    const [productAttribute, setProductAttributeData] = useState({ name: '', category: '' });
    const onFieldChange = (e: { target: { name: any; value: any } }) => {
        setProductAttributeData({ ...productAttribute, [e.target.name]: e.target.value });
    };

    const [tableSearchText, setTableSearchText] = useState('');
    const onSearchTextChange = (e: { target: { name: any; value: any } }) => {
        setTableSearchText(e.target.value);
    };
    const [tableData, setTableData] = useState({
        head: ['SL No', 'Attribute Name', 'Main Category Name', 'Status', 'Action'],
        body: [
            { id: 1, name: 'Size 1', mainCategoryName: 'Main Category 1', status: 'inactive' },
            { id: 2, name: 'Size 2', mainCategoryName: 'Main Category 2', status: 'active' },
            { id: 3, name: 'Size 3', mainCategoryName: 'Main Category 3', status: 'active' },
            { id: 4, name: 'Size 4', mainCategoryName: 'Main Category 4', status: 'inactive' },
        ],
    });

    return (
        <>
            <div className="relative flex flex-col gap-8 rounded-[20px] bg-light-100 p-10">
                <div>
                    <h1 className="text-2xl font-semibold">Product Attribute</h1>
                    <Underline />
                </div>

                <div className="grid grid-cols-2 gap-10 mt-6">
                    <TextInput
                        label={'Add Attribute'}
                        type={'text'}
                        value={productAttribute.name}
                        name={'name'}
                        onFieldChange={onFieldChange}
                        placeholder="Ex. Size"
                        required={true}
                    />

                    <TextInput
                        label={'Select Category'}
                        type={'text'}
                        value={productAttribute.category}
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
                heading={'PRODUCT ATTRIBUTES TABLE'}
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

export default ProductAttribute;
