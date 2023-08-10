import { useState, useEffect, useContext } from 'react';
import Table from '@/components/Dashboard/Table';
import { StatusContext } from '@/store/StatusContextProvider';
import apolloClient from '@/lib/apollo-client';
import { useQuery, useMutation } from '@apollo/client';
import {
    CREATE_CATEGORY_MUTATION,
    GET_ALL_CATEGORIES,
    DELETE_CATEGORY_MUTATION,
    UPDATE_CATEGORY_MUTATION,
} from '@/lib/queries/api';
import AddCategory from './AddCategory';
import { generateRandomString } from '@/utils';

const Categories = () => {
    const { setError, setSuccess } = useContext(StatusContext);

    const [categoryData, setCategoryData] = useState({ name: '' });
    const onFieldChange = (e: { target: { name: any; value: any } }) => {
        setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
    };

    const [image, setImage] = useState('');
    const [itemToUpdate, setItemToUpdate] = useState({ id: '', name: '' });
    const onUpdateFieldChange = (e: { target: { name: any; value: any } }) => {
        setItemToUpdate({ ...itemToUpdate, [e.target.name]: e.target.value });
    };

    const [tableData, setTableData] = useState({
        head: ['SL No', 'Name', 'Status', 'Action'],
        body: [
            // { serialNumber: 1, categoryName: 'Category 1', categoryImgUrl: '', status: 'active' },
            // { serialNumber: 2, categoryName: 'Category 2', categoryImgUrl: '', status: 'active' },
            // { serialNumber: 3, categoryName: 'Category 3', categoryImgUrl: '', status: 'inactive' },
            // { serialNumber: 4, categoryName: 'Category 4', categoryImgUrl: '', status: 'active' },
        ],
    });

    const addCategory = async () => {
        let imageUrl = generateRandomString(10);
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
                        // categoryImgUrl: imageUrl,
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
                window.location.reload();
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

    const { loading, error, data } = useQuery(GET_ALL_CATEGORIES);
    const categories = data?.getAllCategories;
    useEffect(() => {
        if (error) {
            setError({
                title: 'Something went wrong',
                message: error?.message || 'Please try again',
                showErrorBox: true,
            });
            return;
        }
        if (categories && categories.length > 0) {
            setTableData({
                head: ['SL No', 'Name', 'Status', 'Action'],
                body: categories.map((category: any, index: number) => {
                    return {
                        serialNumber: index + 1,
                        id: category.id,
                        name: category.categoryName,
                        // image: category.categoryImgUrl,
                        status: category.status ? 'active' : 'inactive',
                    };
                }),
            });
        }
    }, [categories, error]);

    const [updateCategory] = useMutation(UPDATE_CATEGORY_MUTATION);
    const handleUpdateCategory = async (categoryId: string, newCategoryData: any) => {
        // let imageUrl = generateRandomString(10);
        try {
            const { data } = await updateCategory({
                variables: {
                    categoryId,
                    categoryName: newCategoryData.name,
                    // categoryImgUrl: imageUrl,
                    status: newCategoryData.status === 'active' ? true : false,
                },
            });
            if (data?.updateCategory?.id) {
                setSuccess({
                    title: 'Category updated successfully',
                    message: 'Selected category has been updated',
                    showSuccessBox: true,
                });
            }
        } catch (error) {
            console.error('Error updating category:', error.message);
            setError({
                title: 'Something went wrong',
                message: error?.message || 'Please try again',
                showErrorBox: true,
            });
            return;
        }
    };

    const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION);
    const handleDeleteCategory = async (categoryId: string) => {
        try {
            const { data } = await deleteCategory({
                variables: { categoryId },
            });

            // Handle the response data here if needed
            console.log('Deleted Category:', data.deleteCategory);
            setSuccess({
                title: 'Category deleted successfully',
                message: 'Selected category has been deleted',
                showSuccessBox: true,
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            // Handle the error if the mutation fails
            console.error('Error deleting category:', error.message);
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
                <AddCategory
                    categoryData={categoryData}
                    onFieldChange={onFieldChange}
                    image={image}
                    setImage={setImage}
                />
            </form>

            <Table
                loading={loading}
                heading={'CATEGORY TABLE'}
                type={'category'}
                tableData={tableData}
                setTableData={setTableData}
                handleDelete={handleDeleteCategory}
                handleUpdate={handleUpdateCategory}
                setItemToUpdate={setItemToUpdate}
                editComponent={
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            await handleUpdateCategory(itemToUpdate.id, itemToUpdate);
                            window.location.reload();
                        }}
                        className="relative flex flex-col gap-8 p-10">
                        <AddCategory
                            categoryData={categoryData}
                            onFieldChange={onFieldChange}
                            image={image}
                            setImage={setImage}
                            handleUpdate={handleUpdateCategory}
                            onUpdateFieldChange={onUpdateFieldChange}
                            itemToUpdate={itemToUpdate}
                        />
                    </form>
                }
            />
        </>
    );
};

export default Categories;
