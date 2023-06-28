import { useState, useContext } from 'react';
import Image from 'next/image';
import TextInput from '@/components/ui/Input/TextInput';
import ImageUploadInput from '@/components/ui/Input/ImageUploadInput';
import Button from '@/components/ui/Button';
import Underline from '@/components/ui/Underline';
import Table from '@/components/Dashboard/Table';
import TableSearch from '@/components/Dashboard/TableSearch';
import { StatusContext } from '@/store/StatusContextProvider';
import apolloClient from '@/lib/apollo-client';
import { CREATE_CATEGORY_MUTATION } from '@/lib/queries/api';

const Categories = () => {
    const [categoryData, setCategoryData] = useState({ name: '' });
    const onFieldChange = (e: { target: { name: any; value: any } }) => {
        setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
    };

    const [image, setImage] = useState('');

    const [tableSearchText, setTableSearchText] = useState('');
    const onSearchTextChange = (e: { target: { name: any; value: any } }) => {
        setTableSearchText(e.target.value);
    };
    const [tableData, setTableData] = useState({
        head: ['SL No', 'Name', 'Product Image', 'Status', 'Action'],
        body: [
            { id: 1, name: 'Category 1', image: '', status: 'active' },
            { id: 2, name: 'Category 2', image: '', status: 'active' },
            { id: 3, name: 'Category 3', image: '', status: 'inactive' },
            { id: 4, name: 'Category 4', image: '', status: 'active' },
        ],
    });

    const { setError, setSuccess } = useContext(StatusContext);
    const addCategory = async () => {
        let imageUrl = 'image url 1iojrrasgddaagsggasfkagdgaqns';
        try {
            // if (image) {
            if (imageUrl) {
                // const imageUrl = await uploadImage(image);
                // if (!imageUrl) {
                // setLoading({ status: false, showProgressBar: false, progress: 0 });
                //     return;
                // }
                const result = await apolloClient.mutate({
                    mutation: CREATE_CATEGORY_MUTATION,
                    variables: {
                        categoryName: categoryData.name,
                        categoryImgUrl: imageUrl,
                        status: true,
                    },
                });

                if (result?.data?.createCategory?.id) {
                    setSuccess({
                        title: 'Category added successfully',
                        message: 'Category has been added successfully',
                        showSuccessBox: true,
                    });
                }
            } else {
                setError({
                    title: 'Image is required',
                    message: 'Please upload an image',
                    showErrorBox: true,
                });
            }
        } catch (error) {
            console.log('Error:', error);

            setError({
                title: 'Something went wrong',
                message: error?.message || 'Please try again',
                showErrorBox: true,
            });
            return;
        }
    };

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addCategory();
                }}
                className="relative flex flex-col gap-8 rounded-[20px] bg-light-100 p-10">
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
                        required={false}
                    />
                </div>

                <div className="flex self-end">
                    <Button type="submit" variant="primary">
                        Submit
                    </Button>
                </div>
            </form>

            <Table
                heading={'CATEGORY TABLE'}
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

export default Categories;
