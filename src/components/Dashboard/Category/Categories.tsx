import { useState } from 'react';
import Image from 'next/image';
import TextInput from '@/components/ui/Input/TextInput';
import ImageUploadInput from '@/components/ui/Input/ImageUploadInput';
import Button from '@/components/ui/Button';
import Underline from '@/components/ui/Underline';
import Table from '@/components/Dashboard/Category/Table';

const Categories = () => {
    const [categoryData, setCategoryData] = useState({ name: '' });
    const onFieldChange = (e: { target: { name: any; value: any } }) => {
        setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
    };

    const [image, setImage] = useState('');

    const [tableData, setTableData] = useState({
        head: ['SL No', 'Name', 'Product Image', 'Status', 'Action'],
        body: [
            { id: 1, name: 'Category 1', image: '', status: 'active' },
            { id: 2, name: 'Category 2', image: '', status: 'active' },
            { id: 3, name: 'Category 3', image: '', status: 'inactive' },
            { id: 4, name: 'Category 4', image: '', status: 'active' },
        ],
    });

    return (
        <>
            <div className="relative flex flex-col gap-8 rounded-[20px] bg-light-100 p-10">
                <div>
                    <h1 className="text-2xl font-semibold">Add Category</h1>
                    <Underline />
                </div>

                <div className="absolute right-10 w-[100px] h-[100px] rounded-lg">
                    {image ? (
                        <Image
                            src={image}
                            alt="image"
                            objectFit="cover"
                            layout="fill"
                            className="rounded-lg"
                            priority
                        />
                    ) : (
                        <div
                            className={`bg-primary-300 opacity-40 w-full h-full flex items-center justify-center rounded-lg text-light-100 text-4xl`}>
                            <i className="fa-solid fa-image"></i>
                        </div>
                    )}
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

                    <ImageUploadInput
                        image={image}
                        setImage={setImage}
                        label={'Category Image (Ratio 1 : 1)'}
                        required={true}
                    />
                </div>

                <div className="flex self-end">
                    <Button type="button" variant="primary">
                        Submit
                    </Button>
                </div>
            </div>

            <Table heading={'CATEGORY TABLE'} tableData={tableData} setTableData={setTableData} />
        </>
    );
};

export default Categories;
