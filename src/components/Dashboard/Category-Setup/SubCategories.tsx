import { useState } from 'react';
import TextInput from '@/components/ui/Input/TextInput';
import Button from '@/components/ui/Button';
import Underline from '@/components/ui/Underline';
import Table from '@/components/Dashboard/Table';
import TableSearch from '@/components/Dashboard/TableSearch';

const SubCategories = () => {
    const [subCategoryData, setSubCategoryData] = useState({ name: '', category: '' });
    const onFieldChange = (e: { target: { name: any; value: any } }) => {
        setSubCategoryData({ ...subCategoryData, [e.target.name]: e.target.value });
    };

    const [tableSearchText, setTableSearchText] = useState('');
    const onSearchTextChange = (e: { target: { name: any; value: any } }) => {
        setTableSearchText(e.target.value);
    };
    const [tableData, setTableData] = useState({
        head: ['SL No', 'Main Category Name', 'Sub Category Name', 'Status', 'Action'],
        body: [
            { id: 1, name: 'Category 1', subCategoryName: 'Sub-Category 1', status: 'inactive' },
            { id: 2, name: 'Category 2', subCategoryName: 'Sub-Category 2', status: 'active' },
            { id: 3, name: 'Category 3', subCategoryName: 'Sub-Category 3', status: 'active' },
            { id: 4, name: 'Category 4', subCategoryName: 'Sub-Category 4', status: 'inactive' },
        ],
    });

    return (
        <>
            <div className="relative flex flex-col gap-8 rounded-[20px] bg-light-100 p-10">
                <div>
                    <h1 className="text-2xl font-semibold">Add Sub-Category</h1>
                    <Underline />
                </div>

                <div className="grid grid-cols-2 gap-10 mt-6">
                    <TextInput
                        label={'Sub-Category Name'}
                        type={'text'}
                        value={subCategoryData.name}
                        name={'name'}
                        onFieldChange={onFieldChange}
                        placeholder="Ex. Garments"
                        required={true}
                    />

                    <TextInput
                        label={'Main Category'}
                        type={'text'}
                        value={subCategoryData.category}
                        name={'category'}
                        onFieldChange={onFieldChange}
                        placeholder="Ex. Garments"
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
                heading={'SUB-CATEGORY TABLE'}
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

export default SubCategories;
