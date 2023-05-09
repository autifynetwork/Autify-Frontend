import { useState } from 'react';
import TextInput from '@/components/ui/Input/TextInput';
import Button from '@/components/ui/Button';
import Underline from '@/components/ui/Underline';
import Table from '@/components/ui/Table';

const Categories = () => {
    const [categoryData, setCategoryData] = useState({ name: '', image: '' });
    const onFieldChange = (e: { target: { name: any; value: any } }) => {
        setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="flex flex-col gap-8 rounded-[20px] bg-light-100 p-10">
                <div>
                    <h1 className="text-2xl font-semibold">Add Category</h1>
                    <Underline />
                </div>

                <div className="grid grid-cols-2 gap-10 mt-6">
                    <TextInput
                        label={'Category Name'}
                        type={'text'}
                        value={categoryData.name}
                        name={'name'}
                        onFieldChange={onFieldChange}
                        placeholder="Ex. Garments"
                        required={true}
                    />

                    <TextInput
                        label={'Category Image'}
                        type={'text'}
                        value={categoryData.name}
                        name={'name'}
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

            <div className="flex flex-col gap-8 rounded-[30px] bg-light-100 p-10">
                <Table />
            </div>
        </>
    );
};

export default Categories;
