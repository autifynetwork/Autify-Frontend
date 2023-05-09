import { useState } from 'react';
import TextInput from '@/components/ui/Input/TextInput';
import Button from '@/components/ui/Button';
import Underline from '@/components/ui/Underline';

const SubCategories = () => {
    const [subCategoryData, setSubCategoryData] = useState({ name: '', category: '' });
    const onFieldChange = (e: { target: { name: any; value: any } }) => {
        setSubCategoryData({ ...subCategoryData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-col gap-8 rounded-[20px] bg-light-100 p-10">
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
    );
};

export default SubCategories;
